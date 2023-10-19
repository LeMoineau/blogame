/**
 * @author Paul Bridier
 */

class ChatBox extends BasicUI {

  constructor(player) {
    super(0, 0, new Texture("textures/textBox.png", 0, 0, 0, 0, 0, 0))
    this.player = player

    this.init()
  }

  init() {
    $("#chat-close-button").click(() => {
      $("#chat").hide()
      this.player.game.uiManager.backUI(this.player)
    })
  }

}
