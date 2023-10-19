/**
 * @author William Mok
 */

class Path extends Block {
  constructor(coords, width, height, solid = false) {
    super(coords, width, height, solid, Textures.Path(width, height));
  }
}
