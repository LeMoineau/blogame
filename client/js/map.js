/**
 * @author Pierre Faber
 */

class Map {

  mapTemplate = map0
  blocks = []

  constructor(mapName={name: "Nouveau Monde", blocks: [], nbLike: 0}) {
    this.mapTemplate = mapName
    this.name = mapName.name
    this.nbLike = mapName.nbLike

    this.loadMap()
  }

  loadMap() {
    for (let b of this.mapTemplate.blocks) {
      this.addBlock(eval(`new ${b.type}([${b.x}, ${b.y}, ${b.z || 0}], ${b.width}, ${b.height}, ${b.solid}, ${JSON.stringify(b.metadata)})`))
    }
    if (this.nbLike > 0) {
      this.isVerified()
    }
  }

  addBlock(b) {
    this.blocks.push(b)
    this.blocks.sort((a, b) => {return a.z - b.z})
  }

  removeBlock(b) {
    this.blocks.remove(b)
  }

  replaceBlock(previous, newone) {
    newone.id = previous.id
    let index = this.blocks.findIndex(b => b.id === previous.id)
    console.log(index, this.blocks[index])
    if (index !== -1) {
      this.blocks.splice(index, 1, newone)
      this.blocks.sort((a, b) => {return a.z - b.z})
    }
  }

  update() {
    for (let b of this.blocks) {
      b.update()
    }
  }

  renderBackground(ctx) {
    for (let b of this.blocks.filter(b => b.z <= 0)) {
      b.render(ctx)
    }
  }

  renderForeground(ctx) {
    for (let b of this.blocks.filter(b => b.z > 0)) {
      b.render(ctx)
    }
  }

  getBlocksAt(coords) {
    return this.blocks.filter(b => b.collides(coords))
  }

  checkCollision(coords) {
    return this.getBlocksAt(coords).findIndex(b => b.solid) !== -1
  }

  isVerified() {
    this.nbLike = 1;
    $("body").append(`<div class="badge-verifie"> <img src="https://www.icone-png.com/png/8/8127.png" width="30" height="30"/> </div>`)
  }

}
