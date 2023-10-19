/**
 * @author Pierre Faber
 */

class BlockData {

  blockData = {}

  constructor(block) {
    this.block = block
    this.blockData = {
      playersWalkingOn: {
        list: [],
        update: () => {
          for (let p of this.blockData.playersWalkingOn.list) {
            if (!this.block.collides({x: p.x, y: p.y})) {
              let index = this.blockData.playersWalkingOn.list.findIndex(player => player === p)
              if (index !== -1) this.blockData.playersWalkingOn.list.splice(index, 1)
            }
          }
        }
      },
      playerInteractOn: {
        list: [],
        update: () => {

        }
      }
    }
  }

  addData(name, value, callbackSuccess = undefined) {
    if (this.blockData[name] !== undefined) {
      this.blockData[name].list.add(value, callbackSuccess)
    }
  }

  removeData(name, value) {
    if (this.blockData[name] !== undefined) {
      this.blockData[name].list.remove(value)
    }
  }

  update() {
    for (let data in this.blockData) {
      this.blockData[data].update()
    }
  }

}
