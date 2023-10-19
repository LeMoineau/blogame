/**
 * @author Pierre Faber
 */

let player
let game

const MUTLIPLAYER_LOOP_DURATION = 500

$(document).ready(function() {

  player = new Player()
  game = new Game("canvas", map0)
  game.addMainPlayer(player)

  multiManager = new MultiplayerManager(game, player)

  let gameLoop = setInterval(function() {
    game.update()
  }, 10)

  let debugLoop = setInterval(function() {
    //console.log(player)
  }, 1000)

  let mutliplayerLoop = setInterval(function() {
    multiManager.sendState("playerState", player.getState())
    multiManager.sendState("gameState", {}, (gameState) => {
      if (gameState.players !== undefined) {
        for (let p of gameState.players) {
          if (game.getPlayer(p.pseudo) === undefined) {
            game.addPlayer(new Player(p.pseudo, p.x, p.y, false))
          } else {
            let target = game.getPlayer(p.pseudo)
            target.setX(p.x)
            target.setY(p.y)
            target.bulleGlobal.message = p.bulleGlobal
          }
        }
      }
    })
  }, MUTLIPLAYER_LOOP_DURATION)

})
