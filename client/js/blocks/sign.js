/**
 * @author Pierre Faber
 */

class Sign extends Block {

  EMPTY_MESSAGE = "Oups, il n'y a pas de texte dans ce panneau..."

  constructor(coords, width, height, solid=true, metadata={}) {
    super(coords, width, height, solid, Textures.Sign(width, height))
    this.metadata = metadata

    this.init()
  }

  init() {
    if (this.metadata.text === undefined || this.metadata.text.length <= 0) {
      this.metadata.text = this.EMPTY_MESSAGE
    }
  }

  interact(player) {
    console.log("vous parlez à une pancarte !")
    player.openUI(new DialogBox(player, new TextMeshUI(this.metadata.text || this.EMPTY_MESSAGE)))
  }

}
