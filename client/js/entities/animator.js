/**
 * @author Pierre Faber
 */

class Animator {

  animations = {}
  waitingChangingAnimation = false
  lastWantedAnimation = null
  currentAnimation = null
  animationPlayed = null

  constructor() {
    this.animations = {}
  }

  addAnimation(key, animation) {
    this.animations[key] = animation
    animation.type = key
    if (this.currentAnimation === null) {
      this.currentAnimation = key
    }
  }

  getAnimation(key) {
    return this.animations[key]
  }

  createAnimation() {
    this.animationPlayed = this.animations[this.lastWantedAnimation]
    //console.log("animation created", this.lastWantedAnimation)
  }

  async changeAnimation(newAnimation) {
    this.lastWantedAnimation = newAnimation
    //console.log("changed animation", newAnimation)
  }

  getCurrentAnimation() {
    return this.animationPlayed
  }

  inAnimation() {
    return this.getCurrentAnimation().inAnimation
  }

  calculateNextFrame() {
    this.getCurrentAnimation().calculateFrame()
  }

  renderNextFrame(ctx) {
    this.getCurrentAnimation().nextFrame(ctx)
  }

}
