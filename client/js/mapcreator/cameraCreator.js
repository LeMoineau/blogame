/**
 * @author Pierre Faber
 */

class CameraCreator extends Player {

  constructor(creatorManager) {
    super()
    this.creatorManager = creatorManager

    this.init()
  }

  init() {
    $("body").unbind("keypress")
    $("body").keypress((event) => {
      //console.log(event)
      if (event.key === " ") {
        if (this.freezed) {
          this.game.uiManager.nextUI(this)
        } else {
          let blocks = this.game.map.getBlocksAt({x: this.x, y: this.y})
          for (let b of blocks) {
            //b.playerInteractOn(this)
            this.creatorManager.getInfoOfBlock(b)
          }
        }
      }
      if (event.key === "c") {
        this.game.uiManager.backUI(this)
      }
    })
  }

  move() {
    if (!this.animator.inAnimation() && !this.freezed) {
      this.animator.createAnimation()

      let endPos = this.calculateNextPosition(this.directions)

      this.animator.getCurrentAnimation().setDeplacement({
        startPos: {x: this.x, y: this.y},
        endPos: endPos
      })
      if (this.directions.length > 0) {
        this.animator.getCurrentAnimation().setDirection(this.directions[0])
      }
      this.animator.getCurrentAnimation().beginAnimation()
    }
  }

  render(ctx) {
    //affiche rien
    ctx.strokeStyle = "red"
    ctx.strokeRect(this.x, this.y, BLOCK_SIZE, BLOCK_SIZE)
  }

}
