/**
 * @author Pierre Faber
 */

class BulleGlobal {

  TAILLE_MAX_MESSAGE = 30

  constructor(player) {
    this.player = player
    this.message = ""
    this.fontSize = 25
    this.messageDuration = 5000
    this.paddingY = 5
    this.paddingX = 10
    this.marginTop = 5
    this.timeoutID = null
  }

  setMessage(message) {
    this.message = message
    if (this.timeoutID !== null) {
      clearTimeout(this.timeoutID)
    }
    this.timeoutID = setTimeout(() => {
      this.message = ""
      clearTimeout(this.timeoutID)
      this.timeoutID = null
    }, 5000)
  }

  render(ctx) {
    if (this.message.length > 0) {
      ctx.font = `${this.fontSize}px monospace`
      ctx.textBaseline = "top"

      let messageWidth = ctx.measureText(this.message).width
      let x = this.player.x - 0 + 0.5*BLOCK_SIZE - 0.5*messageWidth
      let y = this.player.y - 0 - this.marginTop - this.fontSize - 2*this.paddingY

      ctx.fillStyle = "rgb(255, 255, 255)"
      ctx.fillRect(x-this.paddingX, y-this.paddingY, messageWidth+this.paddingX*2, this.fontSize+2*this.paddingY)
      ctx.fillStyle = "rgb(0, 0, 0)"
      ctx.fillText(this.message, x, y)
    }
  }

}
