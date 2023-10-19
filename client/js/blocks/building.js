/**
 * @author William Mok
 */

class Building extends Block {
  constructor(coords, width, height, solid = true) {
    super(coords, width, height, solid, Textures.Building(width, height));
    this.methodDrawing = "drawImage"
  }

  interact(player) {
    console.log("vous etes devant un mur...");
  }
}
