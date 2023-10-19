/**
 * @author Pierre Faber
 */

const BLOCK_SIZE = 50
const RENDER_UPDATE = 30
const TICK_UPDATE = 40

class Game {

  canvasID = ""
  canvas = null
  canvasWidth = 0
  canvasHeight = 0
  ctx = null
  players = []
  map = null
  uiManager = null

  renderUpdate = RENDER_UPDATE
  tickUpdate = TICK_UPDATE
  lastDate = 0
  lastTickDate = 0
  lastRenderDate = 0

  constructor(canvasID, mapURL) {
    this.canvasID = canvasID
    this.canvas = document.getElementById(canvasID)

    this.ctx = this.canvas.getContext('2d')
    this.ctx.canvas.width  = window.innerWidth
    this.ctx.canvas.height = window.innerHeight

    this.canvasWidth = this.canvas.getBoundingClientRect().width
    this.canvasHeight = this.canvas.getBoundingClientRect().height
    this.canvasMiddleX = Math.round(this.canvasWidth/2)
    this.canvasMiddleY = Math.round(this.canvasHeight/2)

    this.players = []
    this.mainPlayer = null
    this.map = new Map(mapURL)
    this.uiManager = new UIManager(this)

    this.lastDate = new Date()

    this.init()
  }

  init() {
    $(window).resize(() => {
      this.ctx.canvas.width = window.innerWidth
      this.ctx.canvas.height = window.innerHeight
      this.canvasWidth = this.canvas.getBoundingClientRect().width
      this.canvasHeight = this.canvas.getBoundingClientRect().height
      this.canvasMiddleX = Math.round(this.canvasWidth/2)
      this.canvasMiddleY = Math.round(this.canvasHeight/2)
      console.log("resized!")
    })

    $(window).on('beforeunload', () => {
      if (this.multiplayerManager !== undefined) {
        this.multiplayerManager.sendState("playerDeconnexion", this.mainPlayer.getState());
      }
    });

    $(".deconnexion-button button").click(() => {
      $.ajax({
        type: 'POST',
        url: '../Servlet/AntiCheatServlet',
        data: {
          eventType: "playerDeconnexion",
          state: JSON.stringify(this.mainPlayer.getState())
        },
        success: (res) => {
          callback(res)
        }
      })
    })
  }

  addPlayer(player) {
    this.players.push(player)
    player.appendToGame(this)
  }

  addMainPlayer(player) {
    this.players.push(player)
    player.appendToGame(this)
    this.mainPlayer = player
    this.mainPlayer.texture = new Texture("textures/main_sprites.png", 16, 0, 16, 16, this.mainPlayer.width, this.mainPlayer.height)
    this.mainPlayer.animator = new PlayerAnimator(this.mainPlayer)
    this.mainPlayer.animator.changeAnimation("idle")
  }

  getPlayer(playerID) {
    return this.players.find(p => p.id === playerID)
  }

  removePlayer(playerID) {
    let index = this.players.findIndex(p => p.id === playerID)
    if (index > -1) {
      let p = this.players[index]
      p.id = -1
      p.removeFromGame()
      this.players.splice(index, 1)
    }
  }

  update() {
    let currentDate = new Date()
    this.lastTickDate += currentDate - this.lastDate
    this.lastRenderDate += currentDate - this.lastDate

    if (this.lastRenderDate >= this.renderUpdate) {
      this.lastRenderDate -= this.renderUpdate
      this.render()
    }
    if (this.lastTickDate >= this.tickUpdate) {
      this.lastTickDate -= this.tickUpdate
      this.tick()
    }

    this.lastDate = currentDate
  }

  render() {
    this.ctx.fillStyle = "rgb(0, 0, 0)"
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.ctx.save()

    for (let p of this.players) {
      p.calculate(this.ctx)
    }

    if (this.players.length > 0) {
      this.ctx.translate(this.canvasMiddleX - this.players[0].x, this.canvasMiddleY - this.players[0].y)
    }

    this.map.renderBackground(this.ctx)

    for (let p of this.players) {
      p.render(this.ctx)
    }

    this.map.renderForeground(this.ctx)

    this.ctx.restore()
    this.uiManager.render(this.ctx)
  }

  tick() {
    if (this.mainPlayer !== null) {
      this.mainPlayer.update()
      for (let b of this.map.getBlocksAt({x: this.mainPlayer.x, y: this.mainPlayer.y})) {
        b.playerWalkOn(this.mainPlayer)
      }
    }
    this.map.update()
  }

  hasCollision(coords) { //coords = {x: ..., y: ...}
    return this.map.checkCollision(coords)
  }

}
