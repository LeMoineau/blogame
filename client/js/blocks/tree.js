/**
 * @author William Mok
 */

class Tree extends Block {
  constructor(coords, width, height, solid = true) {
    super(coords, width, height, solid, Textures.Tree(width, height));
  }

  interact(player) {
    console.log("vous etes devant un arbre...");
  }
}
