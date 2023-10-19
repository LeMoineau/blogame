/**
 * @author Pierre Faber
 */

class PlayerAnimation extends Animation {

  constructor(duration, player) {
    super(duration)
    this.player = player
    this.direction = Direction.DOWN
    this.deplacement = null
  }

  setDeplacement(deplacement) {
    this.deplacement = deplacement
    this.deplacement.distance = {
      x: this.deplacement.endPos.x - this.deplacement.startPos.x,
      y: this.deplacement.endPos.y - this.deplacement.startPos.y
    }
  }

  setDirection(direction) {
    this.direction = direction
  }

  modifyTexture() {
    this.player.texture.xTexture = this.currentFrame*this.player.texture.widthTexture
    this.player.texture.yTexture = this.direction*this.player.texture.heightTexture
  }

  calculateFrame() {
    if (this.deplacement !== null && this.inAnimation) {
      this.player.x += Math.round(this.deplacement.distance.x/(this.duration/RENDER_UPDATE), 5)
      this.player.y += Math.round(this.deplacement.distance.y/(this.duration/RENDER_UPDATE), 5)
    }
  }

  renderFrame(ctx) {
    this.player.texture.drawImage(ctx, this.player.x, this.player.y)
  }

  endAnimationPlus() {
    if (this.deplacement !== null) {
      this.player.x = this.deplacement.endPos.x
      this.player.y = this.deplacement.endPos.y
    }
  }

}
