/**
 * @author Pierre Faber
 */

class PortalBlog extends Block {

  constructor(coords, width, height, solid=true) {
    super(coords, width, height, solid, Textures.PortalBlog(width, height))
    this.methodDrawing = "drawImage"
  }

}
