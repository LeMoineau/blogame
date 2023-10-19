/**
 * @author Pierre Faber
 */

class CreatorManager {

  infosBlocksOpen = []

  constructor(game) {
    this.game = game
    this.camera = new CameraCreator(this)
    this.htmlCreatorManager = new HtmlCreatorManager(this)
    this.infosBlocksOpen = []

    this.init()
  }

  init() {

  }

  update() {

  }

  removeInfoOfBlock(b) {
    this.infosBlocksOpen.remove(b, () => {
      this.htmlCreatorManager.closeInfoSection(b)
    })
  }

  getInfoOfBlock(b) {
    this.infosBlocksOpen.add(b, () => {
      this.htmlCreatorManager.openNewInfoSection(b)
    })
  }

  getInfoOfBlocks(blocks) {
    for (let b of blocks) {
      this.getInfoOfBlock(b)
    }
  }

  updateAttributeBlock(block, attribute, value, metadata=false) {
    value = typeof value === "string" && !isNaN(value) ? parseInt(value) : value
    if (attribute === "z") {
      block.z = value
      this.game.map.blocks.sort((a, b) => { return a.z - b.z })
    } else if (metadata) {
      block.metadata[attribute] = value
    } else {
      let method = `set${attribute.substr(0, 1).toUpperCase()}${attribute.substr(1)}`
      if (block[method] !== undefined) {
        block[method](value)
      } else {
        block[attribute] = value
      }
    }
  }

  updateBlockMaterial(block, mat) {
    let newone = eval(`new ${mat}([${block.getX()}, ${block.getY()}], ${block.getWidth()}, ${block.getHeight()})`)
    this.removeInfoOfBlock(block)
    this.game.map.replaceBlock(block, newone)
    this.getInfoOfBlock(newone)
  }

  sendState(eventType, state, callback=(res) => {console.log(res)}) {
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
