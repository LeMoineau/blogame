/**
 * @author William Mok
 */

class Water extends Block {
  constructor(coords, width, height, solid = true) {
    super(coords, width, height, solid, Textures.Water(width, height));
  }

  interact(player) {
    console.log("vous etes devant de l'eau...");
  }
}
