/**
 * @author Pierre Faber
 */

class TriggerCreator extends Block {

  constructor(coords, width, height, solid=false) {
    super(coords, width, height, solid, Textures.TriggerCreator(width, height))
  }

  walkOn(player) {
    window.location = "creator.jsp" //faire gaffe a prendre la map du joueur en question
  }

  interact(player) {
    window.location = "creator.jsp" //faire gaffe a prendre la map du joueur en question
  }

}
