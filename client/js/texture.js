/**
 * @author Pierre Faber
 */

class Texture {

  constructor(path, xTexture, yTexture, widthTexture, heightTexture, width, height) {
    this.path = path
    this.xTexture = xTexture
    this.yTexture = yTexture
    this.widthTexture = widthTexture
    this.heightTexture = heightTexture
    this.width = width
    this.height = height

    this.init()
  }

  init() {
    this.img = new Image(this.width, this.height);
    this.img.src = this.path;
  }

  createPatternCanvas(width=BLOCK_SIZE, height=BLOCK_SIZE) {
    this.patternCanvas = document.createElement('canvas')

    this.patternCanvas.width = BLOCK_SIZE
    this.patternCanvas.height = BLOCK_SIZE

    let patternContext = this.patternCanvas.getContext('2d')
    this.drawImage(patternContext, 0, 0, BLOCK_SIZE, BLOCK_SIZE)
  }

  drawImage(ctx, x, y, width=this.width, height=this.height) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.img,
      this.xTexture, this.yTexture,
      this.widthTexture, this.heightTexture,
      x, y,
      width, height);
  }

  drawPattern(ctx, x, y) {
    this.createPatternCanvas()
    let tmpCanvas = ctx.createPattern(this.patternCanvas, "repeat");
    ctx.fillStyle = tmpCanvas;
    ctx.fillRect(x, y, this.width, this.height);
  }

  setTexturePosition(x, y) {
    this.xTexture = x
    this.yTexture = y
  }

}
