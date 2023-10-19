/**
 * @author Pierre Faber
 */

class MapChooser extends BasicUI {

  LIMIT_AFFICHAGE = 10

  constructor(player, maps) {
    super(0, 0, new Texture("textures/textBox.png", 0, 0, 0, 0, 0, 0))
    this.player = player
    this.maps = maps

    this.init()
  }

  init() {
    this.mapChooserDiv = $(`<div class="input-box map-chooser">  </div>`)

    let compteur = 0
    while (compteur < this.maps.length && compteur < this.LIMIT_AFFICHAGE) {
      let map = this.maps[compteur];
      let mapSelector = $(`<button> <i>${map.name}</i> chez ${map.owner} </button>`)
      mapSelector.click(() => {
        this.player.game.multiplayerManager.sendState("changeMap", {name: map.name, owner: map.owner}, (mapData) => {
          console.log("map: ", mapData)
          this.player.teleporteTo(mapData)
        })
        this.player.game.uiManager.backUI(this.player)
      })
      this.mapChooserDiv.append(mapSelector)
      compteur += 1;
    }
    $("body").append(this.mapChooserDiv)
  }

  back() {
    this.mapChooserDiv.remove()
    return -1
  }

  next() {
    this.mapChooserDiv.remove()
    return -1
  }

}
