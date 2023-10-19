/**
 * @author Pierre Faber
 */

let game
let creatorManager

$(document).ready(function() {

  game = new Game("canvas")
  creatorManager = new CreatorManager(game)
  game.addMainPlayer(creatorManager.camera)

  creatorManager.sendState("initOwnMap", {}, (res) => {
    console.log(res)
    creatorManager.camera.teleporteTo(res)
    creatorManager.htmlCreatorManager.inputMapName.val(res.name)
  })

  let gameLoop = setInterval(function() {
    game.update()
  }, 10)



})
