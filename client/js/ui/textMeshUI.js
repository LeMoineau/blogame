/**
 * @author Pierre Faber
 */

class TextMeshUI {

  CHAR_MAX_BY_LINE = 63 // "mangeons de grande grande galettes aux rois pendant des miliers"
  LINE_MAX_IN_ONE_PAGE = 3

  constructor(text) {
    this.rawText = text
    this.pages = []

    this.init()
  }

  init() {
    if (typeof this.rawText === "string") {
      let tmp = this.rawText.split(" ")
      let currentPage = []
      let currentLine = ""
      for (let word of tmp) {
        if (currentLine.length + word.length >= this.CHAR_MAX_BY_LINE + 1) {
          currentPage.push(currentLine)
          console.log(currentLine.length)
          if (currentPage.length >= this.LINE_MAX_IN_ONE_PAGE) {
            this.pages.push(currentPage)
            currentPage = []
          }
          currentLine = ""
        }
        currentLine += word + " "
      }
      if (currentLine.length > 1) {
        currentPage.push(currentLine)
        this.pages.push(currentPage)
      }
      console.log(this.pages)
    } else {

    }
  }

  write(ctx, x, y, fontSize=25, paddingLeft=0, paddingTop=0, page = 0) {
    ctx.font = `${fontSize}px monospace`
    ctx.textAlign = 'justify'
    ctx.textBaseline = "top"
    let compteur = 0
    for (let p of this.pages[page]) {
      ctx.fillText(p, x + paddingLeft, y + paddingTop + (compteur * fontSize))
      compteur += 1.5
    }
  }

}

/**
 * text = [
 *  [
 *  "line 1",
 *  "line 2"
 *  ],
 *  [
 *  "line 3"
 *  ]
 * ]
 */
