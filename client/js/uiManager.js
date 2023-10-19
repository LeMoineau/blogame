/**
 * @author Pierre Faber
 */

class UIManager {

  constructor(game) {
    this.game = game
    this.uis = []
  }

  addUI(ui) {
    this.uis.add({
      content: ui,
      target: ui.player
    })
  }

  render(ctx) {
    for (let ui of this.uis) {
      ui.content.render(ctx)
    }
  }

  getUIofPlayer(player) {
    let res = this.uis.find(u => u.target === player)
    if (res !== undefined) {
      return res.content
    }
    return null
  }

  backUI(player) {
    let ui = this.uis.find(u => u.target === player)
    if (ui !== undefined) {
      let response = ui.content.back()
      if (response === -1) {
        ui.content.close()
        this.uis.remove(ui)
        player.defreeze()
      }
      return response
    }
    return -2
  }

  nextUI(player) {
    let ui = this.uis.find(u => u.target === player)
    if (ui !== undefined) {
      let response = ui.content.next()
      if (response === -1) {
        ui.content.close()
        this.uis.remove(ui)
        player.defreeze()
      }
      return response
    }
    return -2
  }

}
