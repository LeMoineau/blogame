/**
 * @author Pierre Faber
 */

PLAYER_ID_GENERATOR = 1

class Player {

  game = null

  x = 0
  y = 0
  directions = []
  actions = []
  width = 1
  height = 1
  freezed = false

  animator = null
  texture = null

  constructor(id=this.createNewID(), x=0, y=0, enableListener=true) {
    this.id = id
    this.x = x * BLOCK_SIZE
    this.y = y * BLOCK_SIZE
    this.idMap = 0
    this.directions = []
    this.walkSpeed = 1 * BLOCK_SIZE
    this.runSpeed = 2 * BLOCK_SIZE
    this.speed = this.walkSpeed
    this.width = BLOCK_SIZE
    this.height = BLOCK_SIZE
    this.animator = new PlayerAnimator(this)
    this.animator.changeAnimation("idle")
    this.texture = new Texture("textures/player_sprites.png", 16, 0, 16, 16, this.width, this.height)
    this.freezed = false
    this.keyListener = enableListener ? new PlayerListener(this) : null
    this.bulleGlobal = new BulleGlobal(this)
  }

  getX() {
    return Math.floor(this.x/BLOCK_SIZE)
  }

  setX(val) {
    this.x = val * BLOCK_SIZE
  }

  getY() {
    return Math.floor(this.y/BLOCK_SIZE)
  }

  setY(val) {
    this.y = val * BLOCK_SIZE
  }

  createNewID() {
    let res = PLAYER_ID_GENERATOR
    PLAYER_ID_GENERATOR += 1
    return res
  }

  appendToGame(game) {
    this.game = game
  }

  removeFromGame() {
    this.game = null
  }

  addDirection(direction) {
    if (this.animator.lastWantedAnimation !== "run") {
      this.animator.changeAnimation("walk")
    }
    this.directions.add(direction)
  }

  removeDirection(direction) {
    this.directions.remove(direction, () => {
      this.animator.animations["idle"].setDirection(direction)
    })
    if (this.directions.length <= 0) {
      this.animator.changeAnimation("idle")
    }
  }

  calculateNextPosition(directions) {
    let newPos = {x: this.x, y: this.y}
    if (directions.includes(Direction.UP)) {
      newPos.y -= BLOCK_SIZE
    }
    if (directions.includes(Direction.DOWN)) {
      newPos.y += BLOCK_SIZE
    }
    if (directions.includes(Direction.LEFT)) {
      newPos.x -= BLOCK_SIZE
    }
    if (directions.includes(Direction.RIGHT)) {
      newPos.x += BLOCK_SIZE
    }
    return newPos
  }

  move() {
    if (!this.animator.inAnimation() && !this.freezed) {
      this.animator.createAnimation()

      let endPos = {x: this.x, y: this.y}
      let newPos = this.calculateNextPosition(this.directions)

      if (!this.game.hasCollision(newPos) && !this.game.hasCollision({x: newPos.x, y: this.y}) && !this.game.hasCollision({x: this.x, y: newPos.y})) {
        endPos = newPos
      } else if (!this.game.hasCollision({x: newPos.x, y: this.y})) {
        endPos = {x: newPos.x, y: this.y}
      } else if (!this.game.hasCollision({x: this.x, y: newPos.y})) {
        endPos = {x: this.x, y: newPos.y}
      }

      this.animator.getCurrentAnimation().setDeplacement({
        startPos: {x: this.x, y: this.y},
        endPos: endPos
      })
      if (this.directions.length > 0) {
        this.animator.getCurrentAnimation().setDirection(this.directions[0])
      }
      this.animator.getCurrentAnimation().beginAnimation()
    }
  }

  getActualDirection() {
    return this.animator.getActualDirection()
  }

  calculate() {
    this.animator.calculateNextFrame()
  }

  freeze() {
    this.freezed = true
  }

  defreeze() {
    this.freezed = false
  }

  act() {

  }

  update() {
    this.move()
    this.act()
  }

  render(ctx) {
    //ctx.fillStyle="rgb(255,0,0)"
    //ctx.fillRect(this.x, this.y, this.width, this.height)
    this.animator.renderNextFrame(ctx)
    this.bulleGlobal.render(ctx)
  }

  openUI(ui) {
    this.game.uiManager.addUI(ui)
    this.freeze()
    this.animator.changeAnimation("idle")
  }

  getCurrentUI() {
    return this.game.uiManager.getUIofPlayer(this)
  }

  isTappingInInputBox() {
    let currentUI = this.getCurrentUI()
    return currentUI !== null && (currentUI.constructor.name === "InputBox" || currentUI.constructor.name === "ChatBox")
  }

  teleporteTo(mapData) {
    this.game.map = new Map(mapData)
    this.idMap = mapData.idMap || 0;
    this.setX(0)
    this.setY(0)
    this.game.multiplayerManager.sendState("playerState", this.getState());
    console.log(this.getState());
    if (mapData.isAdmin === true && this.idMap !== 0) {
      let modifierButton = $(`<button id="modifier-map-button"> Modifier </button>`)
      modifierButton.click(() => {
        console.log(mapData.owner);
        this.game.multiplayerManager.sendState("adminModify", mapData.owner, (res) => {
          window.location = "creator.jsp"
        });
      })
      $("body").append(modifierButton);
    }
  }

  getState() {
    return {
      x: this.getX(),
      y: this.getY(),
      idMap: this.idMap,
      bulleGlobal: this.bulleGlobal.message
    }
  }

}
