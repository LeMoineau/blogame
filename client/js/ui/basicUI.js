/**
 * @author Pierre Faber
 */

class BasicUI {

  constructor(x, y, texture) {
    this.x = x
    this.y = y
    this.texture = texture
  }

  render(ctx) {
    this.texture.drawImage(ctx, this.x, this.y)
  }

  back() { //-1 = close
    //console.log("has been backed!")
    return -1
  }

  next() {
    //console.log("has been next!")
    return -1
  }

  close() {
    //console.log("has been closed!")
  }

}
