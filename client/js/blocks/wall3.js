/**
 * @author William Mok
 */

class Wall3 extends Block {
  constructor(coords, width, height, solid = true) {
    super(coords, width, height, solid, Textures.Wall3(width, height));
  }

  interact(player) {
    console.log("vous etes devant un mur...");
  }
}
