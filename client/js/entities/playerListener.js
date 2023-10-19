/**
 * @author Pierre Faber
 */

class PlayerListener {

  constructor(player) {
    this.player = player
    this.init()
  }

  init() {
    $("body").keydown((event) => {
      //console.log(event.key)
      if (event.key === "ArrowUp") {
        this.player.addDirection(Direction.UP)
      }
      if (event.key === "ArrowDown") {
        this.player.addDirection(Direction.DOWN)
      }
      if (event.key === "ArrowLeft") {
        this.player.addDirection(Direction.LEFT)
      }
      if (event.key === "ArrowRight") {
        this.player.addDirection(Direction.RIGHT)
      }
      if (event.key === "Shift") {
        this.player.animator.changeAnimation("run")
      }
    })

    $("body").keyup((event) => {
      if (event.key === "ArrowUp") {
        this.player.removeDirection(Direction.UP)
      }
      if (event.key === "ArrowDown") {
        this.player.removeDirection(Direction.DOWN)
      }
      if (event.key === "ArrowLeft") {
        this.player.removeDirection(Direction.LEFT)
      }
      if (event.key === "ArrowRight") {
        this.player.removeDirection(Direction.RIGHT)
      }
      if (event.key === "Shift") {
        if (this.player.directions.length <= 0) {
          this.player.animator.changeAnimation("idle")
        } else {
          this.player.animator.changeAnimation("walk")
        }
      }
    })

    $("body").keypress((event) => {
      //console.log(event)
      if (event.key === " ") {
        if (this.player.freezed && !this.player.isTappingInInputBox()) {
          this.player.game.uiManager.nextUI(this.player)
        } else {
          let targetedPos = this.player.calculateNextPosition([this.player.getActualDirection()])
          for (let b of this.player.game.map.getBlocksAt(targetedPos)) {
            b.playerInteractOn(this.player)
          }
        }
      }
      if (event.key === "c" && !this.player.isTappingInInputBox()) {
        this.player.game.uiManager.backUI(this.player)
      }
      if (event.key === "t" && !this.player.freezed && !this.player.isTappingInInputBox()) {
        let inputBox = new InputBox(this.player, "Bulle Global", "Entrer un message qui sera visible pour tout le monde", (message) => {
          if (message.length > 0 && message.length <= this.player.bulleGlobal.TAILLE_MAX_MESSAGE) {
            this.player.bulleGlobal.setMessage(message)
          }
        })
        inputBox.input.attr("maxlength", this.player.bulleGlobal.TAILLE_MAX_MESSAGE + "")
        this.player.openUI(inputBox)
        return false
      }
      if (event.key === "m" && !this.player.isTappingInInputBox()) {
        $("#chat").show();
        rechercheMessages();
        this.player.openUI(new ChatBox(this.player))
      }
      if (event.key === "l" && !this.player.isTappingInInputBox() && !this.player.idMap !== 0) {
        this.player.game.multiplayerManager.sendState("leaveLike", this.player.getState(), (res) => {
          console.log(res)
          if (res.nbLike >= 1) {
            this.player.game.map.isVerified();
          }
        })
      }
      if (event.key === "b" && !this.player.isTappingInInputBox()) {
        this.player.teleporteTo(map0)
      }
    })
  }

}
