/**
 * @author Pierre Faber
 */
class Animation {

  lastDate = null
  time = 0
  duration = 100
  timeoutID = null
  inAnimation = false
  currentFrame = 0
  maxFrame = 3

  constructor(duration, durationBetweenFrame=undefined) {
    this.duration = duration
    if (durationBetweenFrame === undefined) {
      this.durationBetweenFrame = this.duration/2
    }
    this.lastDate = new Date()
  }

  get duration() {
    return this.duration
  }

  set duration(val) {
    this.duration = val
  }

  beginAnimation() {
    this.inAnimation = true
    this.timeoutID = setTimeout(() => {
      this.endAnimation()
    }, this.duration)
  }

  nextFrame(ctx) {
    let currentDate = new Date()
    this.time += (currentDate - this.lastDate) // A regler
    if (this.time >= this.durationBetweenFrame) {
      this.time = 0
      this.currentFrame = (this.currentFrame + 1) % this.maxFrame
      this.modifyTexture(ctx)
      //console.log("currentFrame changed: ", this.currentFrame, this.maxFrame, this.time)
    }
    this.lastDate = currentDate
    this.renderFrame(ctx)
  }

  modifyTexture(ctx) {
    //console.log("methode modifyTexture() pas override")
  }

  renderFrame(ctx) {
    //console.log("methode renderFrame() pas override")
  }

  endAnimation() {
    this.timeoutID = null
    this.inAnimation = false
    this.endAnimationPlus()
  }

  endAnimationPlus() {}

  waitFinishedAnimation() {
    return new Promise(resolve => {
      let interval = setInterval(() => {
        if (!this.inAnimation) {
          clearInterval(interval)
          resolve(true)
        }
      }, TICK_UPDATE)
    });
  }

}
