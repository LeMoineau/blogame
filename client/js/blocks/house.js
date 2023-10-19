/**
 * @author William Mok
 */

class House extends Block {
  constructor(coords, width, height, solid = true) {
    super(coords, width, height, solid, Textures.House(width, height));
    this.methodDrawing = "drawImage"
  }

  interact(player) {
    console.log("vous etes devant une maison...");
  }
}
