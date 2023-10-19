/**
 * @author Pierre Faber
 */

class DialogBox extends BasicUI {

  paddingLeft = 30
  paddingTop = 10

  currentPage = 0

  constructor(player, textMesh) {
    super(player.game.canvasWidth*0.125, player.game.canvasHeight*0.7,
      new Texture("textures/textBox.png", 1, 1, 251, 44, player.game.canvasWidth*0.75, player.game.canvasHeight*0.2))
    this.player = player
    this.textMesh = textMesh
    this.paddingLeft = player.game.canvasWidth*0.75 / 26.3
    this.paddingTop = player.game.canvasHeight*0.2 / 10.5

    this.currentPage = 0
  }

  render(ctx) {
    this.texture.drawImage(ctx, this.x, this.y)
    this.textMesh.write(ctx, this.x, this.y, this.player.game.canvasHeight*0.2 / 5.25, this.paddingLeft, this.paddingTop, this.currentPage)
  }

  next() {
    if (this.currentPage < this.textMesh.pages.length - 1) {
      this.currentPage += 1
      return 1
    }
    return -1
  }

  back() {
    if (this.currentPage > 0) {
      this.currentPage -= 1
      return 1
    }
    return -1
  }

}
