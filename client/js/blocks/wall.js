/**
 * @author William Mok
 */

class Wall extends Block {

  constructor(coords, width, height, solid=true) {
    super(coords, width, height, solid, Textures.Wall(width, height))
  }

  interact(player) {
    console.log("vous etes devant un mur...")
  }

}
