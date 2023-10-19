/**
 * @author Pierre Faber
 */

class ImagePane extends Block {

  EMPTY_IMAGE = "https://images-na.ssl-images-amazon.com/images/I/91Nj33omY5L.jpg"

  constructor(coords, width, height, solid=true, metadata={}) {
    super(coords, width, height, solid, Textures.ImagePane(width, height))
    this.metadata = metadata

    this.init()
  }

  init() {
    if (this.metadata.image === undefined || this.metadata.image.length <= 0) {
      this.metadata.image = this.EMPTY_IMAGE
    }
  }

  interact(player) {
    console.log("vous parlez à une affiche !")
    player.openUI(new ImageBox(player, this.metadata.image || this.EMPTY_IMAGE))
  }

  render(ctx) {
    this.texture.drawImage(ctx, this.x, this.y)
  }

}
