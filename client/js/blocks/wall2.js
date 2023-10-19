/**
 * @author William Mok
 */

class Wall2 extends Block {
  constructor(coords, width, height, solid = true) {
    super(coords, width, height, solid, Textures.Wall2(width, height));
  }

  interact(player) {
    console.log("vous etes devant un mur...");
  }
}
