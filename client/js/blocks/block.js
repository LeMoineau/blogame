/**
 * @author Pierre Faber
 */ 

BLOCK_ID_GENERATOR = 1

class Block {

  x = 0
  y = 0
  width = 1
  height = 1
  solid = true
  texture = null
  metadata = null
  blockData = null

  constructor(coords, width, height, solid, texture=null) { //coords  = [x, y, (z)]
    this.id = this.createNewID()
    this.x = coords[0] * BLOCK_SIZE
    this.y = coords[1] * BLOCK_SIZE
    this.z = coords.length >= 3 ? coords[2] : 0
    this.width = width * BLOCK_SIZE
    this.height = height * BLOCK_SIZE
    this.solid = (solid !== false)
    this.texture = texture
    this.blockData = new BlockData(this)
    this.methodDrawing = "drawPattern"
    this.metadata = {}
  }

  createNewID() {
    let res = BLOCK_ID_GENERATOR
    BLOCK_ID_GENERATOR += 1
    return res
  }

  copyAttributes(block) {
    for (let attribute of Object.keys(block)) {
      if (this[attribute] !== undefined) {
        this[attribute] = block[attribute]
      }
    }
  }

  setX(val) {
    this.x = val * BLOCK_SIZE
  }

  getX() {
    return Math.floor(this.x / BLOCK_SIZE)
  }

  setY(val) {
    this.y = val * BLOCK_SIZE
  }

  getY() {
    return Math.floor(this.y / BLOCK_SIZE)
  }

  setWidth(val) {
    this.texture.width = val * BLOCK_SIZE
    this.width = val * BLOCK_SIZE
  }

  getWidth() {
    return Math.floor(this.width / BLOCK_SIZE)
  }

  setHeight(val) {
    this.texture.height = val * BLOCK_SIZE
    this.height = val * BLOCK_SIZE
  }

  getHeight() {
    return Math.floor(this.height / BLOCK_SIZE)
  }

  render(ctx) {
    if (this.texture !== null) {
      this.texture[this.methodDrawing](ctx, this.x, this.y)
    } else {
      ctx.fillStyle = 'rgb(0, 0, 200)';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  update() {
    this.blockData.update()
  }

  playerWalkOn(player) {
    if (player.constructor.name !== "CameraCreator") {
      this.blockData.addData("playersWalkingOn", player, () => {
        this.walkOn(player)
      })
    }
  }

  walkOn(player) {

  }

  playerInteractOn(player) {
    this.interact(player)
  }

  interact(player) {

  }

  collides(coords) {
    return coords.x >= this.x && coords.x < (this.x + this.width)
      && coords.y >= this.y && coords.y < (this.y + this.height)
  }

  getState() {
    return {
      type: this.constructor.name,
      x: this.getX(),
      y: this.getY(),
      z: this.z,
      solid: this.solid,
      width: this.getWidth(),
      height: this.getHeight(),
      metadata: JSON.stringify(this.metadata)
    }
  }

}
