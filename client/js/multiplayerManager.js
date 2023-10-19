/**
 * @author Pierre Faber
 */

class MultiplayerManager {

  constructor(game, mainPlayer) {
    this.game = game
    this.game.multiplayerManager = this
    this.mainPlayer = mainPlayer

    this.init()
  }

  init() {
    this.sendState("initPlayer", this.mainPlayer.getState(), (res) => {
      this.mainPlayer.setX(res.x)
      this.mainPlayer.setY(res.y)
      this.mainPlayer.id = res.pseudo
      //load map
    })

    $("#chat").hide();
  }

  sendState(eventType, state, callback=(res) => {}) {
    $.ajax({
      type: 'POST',
      url: '../Servlet/AntiCheatServlet',
      data: {
        eventType: eventType,
        state: JSON.stringify(state)
      },
      success: (res) => {
        callback(res)
      }
    })
  }

}
