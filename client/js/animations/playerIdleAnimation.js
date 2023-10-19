/**
 * @author Pierre Faber
 */ 

class PlayerIdleAnimation extends PlayerAnimation {

  constructor(player) {
    super(RENDER_UPDATE, player)
    this.direction = Direction.DOWN
  }

  nextFrame(ctx) {
    this.player.texture.setTexturePosition(16, this.direction * 16)
    this.player.texture.drawImage(ctx, this.player.x, this.player.y)
  }

}
