/**
 * @author William Mok
 */

class Fountain extends Block {
  constructor(coords, width, height, solid = true) {
    super(coords, width, height, solid, Textures.Fountain(width, height))
    this.methodDrawing = "drawImage"
  }

  interact(player) {
    console.log("vous etes devant une fontaine...")
  }
}
