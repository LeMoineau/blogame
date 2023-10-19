/**
 * @author Pierre Faber
 */

class PlayerAnimator extends Animator {

  constructor(player) {
    super()
    this.player = player
    this.init()
    this.animationPlayed = this.animations["idle"]
  }

  init() {
    this.addAnimation("idle", new PlayerIdleAnimation(this.player))
    this.addAnimation("walk", new PlayerWalkAnimation(this.player))
    this.addAnimation("run", new PlayerRunAnimation(this.player))
  }

  getActualDirection() {
    if (this.animationPlayed.type === "walk" || this.animationPlayed.type === "run") {
      return this.player.directions[0]
    } else {
      return this.getAnimation("idle").direction
    }
  }

}
