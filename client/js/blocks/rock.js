/**
 * @author William Mok
 */

class Rock extends Block {
  constructor(coords, width, height, solid = true) {
    super(coords, width, height, solid, Textures.Rock(width, height));
  }

  interact(player) {
    console.log("vous etes devant une roche...");
  }
}
