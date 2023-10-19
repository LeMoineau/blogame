/**
 * @author William Mok
 */

class GrassWhiteFlower extends Block {

  constructor(coords, width, height, solid=false) {
    super(coords, width, height, solid, Textures.GrassWhiteFlower(width, height))
  }

}
