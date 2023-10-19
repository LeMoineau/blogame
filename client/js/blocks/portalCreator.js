/**
 * @author Pierre Faber
 */

class PortalCreator extends Block {

  constructor(coords, width, height, solid=true) {
    super(coords, width, height, solid, Textures.PortalCreator(width, height))
    this.methodDrawing = "drawImage"
  }

}
