/**
 * @author Pierre Faber
 */

class InputBox extends BasicUI {

    constructor(player, title, message, callback) {
      super(0, 0, new Texture("textures/textBox.png", 0, 0, 0, 0, 0, 0))
      this.player = player
      this.title = title
      this.message = message
      this.callback = callback

      this.init()
    }

    init() {
      let box = $(`<div class="input-box"> <h1> ${this.title} </h1> <p> ${this.message} </p></div>`)
      this.input = $(`<input type="text" value="" class="input-box-input" />`)
      this.input.keydown((event) => {
        if (event.keyCode === 13) {
          box.remove()
          this.player.game.uiManager.backUI(this.player)
          this.callback(this.input.val().trim())
        }
      })
      this.input.focusout(() => {
        box.remove()
        this.player.game.uiManager.backUI(this.player)
        this.callback("")
      })
      box.append(this.input)
      $("body").append(box)
      this.input.focus()
    }

}
