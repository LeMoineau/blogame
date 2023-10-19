/**
 * @author Pierre Faber
 */

class TriggerBlog extends Block {

  constructor(coords, width, height, solid=false) {
    super(coords, width, height, solid, Textures.TriggerBlog(width, height))
  }

  walkOn(player) {
    player.openUI(new InputBox(player, "Voyager vers un nouveau monde", "Entrer le nom d'un monde pour vous y teleporter !", (text) => {
      console.log(text)
      player.game.multiplayerManager.sendState("searchMap", {name: text}, (res) => {
        player.openUI(new MapChooser(player, res.maps))
      })
    }))
  }

  interact(player) {
    player.openUI(new InputBox(player, "Voyager vers un nouveau monde", "Entrer le nom d'un monde pour vous y teleporter !", (text) => {
      console.log(text)
      player.game.multiplayerManager.sendState("searchMap", {name: text}, (res) => {
        player.openUI(new MapChooser(player, res.maps))
      })
    }))
  }

}
