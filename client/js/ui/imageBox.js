/**
 * @author Pierre Faber
 */

class ImageBox extends BasicUI {

  constructor(player, image) {
    super(player.game.canvasWidth*0.25, player.game.canvasHeight*0.25,
      new Texture("textures/textBox.png", 1, 1, 251, 44, player.game.canvasWidth*0.5, player.game.canvasHeight*0.5))
    this.player = player
    this.imagePath = image
    this.img = new Image
    this.imageWidth = 0
    this.imageHeight = 0

    this.init()
  }

  init() {
    this.img.onload = () => {
      this.imageWidth = this.img.width
      this.imageHeight = this.img.height
      while (this.imageWidth > this.player.game.canvasWidth*0.75 || this.imageHeight > this.player.game.canvasHeight*0.75) {
        this.imageWidth *= 0.75
        this.imageHeight *= 0.75
      }
    }
    this.img.src = this.imagePath
  }

  render(ctx) {
    ctx.drawImage(this.img, this.player.game.canvasMiddleX-this.imageWidth/2,
      this.player.game.canvasMiddleY-this.imageHeight/2,
      this.imageWidth,
      this.imageHeight)
  }

}
