/**
 * @author William Mok
 */

class Grass extends Block {

  constructor(coords, width, height, solid=false) {
    super(coords, width, height, solid, Textures.Grass(width, height))
  }

}
