/**
 * @author Pierre Faber
 */

class HtmlCreatorManager {

  MATERIAL_BY_LINE_IN_MATERIAL_CHOOSER = 6
  ATTRIBUTES_TO_HIDE = ["id", "methodDrawing"]

  constructor(creatorManager, navID="nav-creator", materialChooserID="nav-material-chooser") {
    this.creatorManager = creatorManager
    this.navID = navID
    this.navDiv = $(`#${navID}`)
    this.materialChooserID = materialChooserID
    this.materialChooserDiv = $(`#${materialChooserID}`)
    this.callbackMaterialChooser = (mat) => { console.log(`${mat} has been chose`) }
    this.textureSize = BLOCK_SIZE

    this.init()
  }

  init() {
    this.createMaterialChooser()
    this.materialChooserDiv.hide()

    this.materialChooserDiv.click((event) => {
      console.log(event, event.offsetX, event.offsetY)
      let x = Math.floor(event.offsetX/this.textureSize)
      let y = Math.floor(event.offsetY/this.textureSize)
      let index = y*this.MATERIAL_BY_LINE_IN_MATERIAL_CHOOSER + x
      if (index < Object.keys(Textures).length) {
        let mat = Object.keys(Textures)[index]
        console.log(index, x, y, mat)
        this.callbackMaterialChooser(mat)
      } else {
        //this.callbackMaterialChooser(null)
      }
      this.materialChooserDiv.hide()
      this.navDiv.show()
    })

    let createBlockButton = $(`<button id="create-new-block-button"> Ajouter un nouveau block </button>`)
    createBlockButton.click(() => {
      let block = new Grass([this.creatorManager.camera.getX(), this.creatorManager.camera.getY()], 1, 1)
      this.creatorManager.game.map.addBlock(block)
      this.creatorManager.getInfoOfBlock(block)
    })
    this.navDiv.append(createBlockButton)

    let submitButton = $(`<button id="create-map-button"> Sauvegarder la map </button>`)
    submitButton.click(() => {
      let map = this.creatorManager.game.map
      let res = {
        name: $("#input-map-name").val().length > 0 ? $("#input-map-name").val() : "Nouveau monde",
        blocks: []
      }
      for (let b of map.blocks) {
        res.blocks.push(b.getState())
      }
      console.log(res)
      this.creatorManager.sendState("saveMap", res, (res) => {
        console.log("saved succeded!", res)
      })
    })
    this.navDiv.append(submitButton)

    let refreshButton = $(`<button id="back-to-game"> Retourner au jeu </button>`);
    refreshButton.click(() => {
      if (confirm("Attention à bien sauvegarder votre creation avant de partir jouer !")) {
        window.location = "./"
      }
    })
    this.navDiv.append(refreshButton)

    this.inputMapName = $("#input-map-name")
    this.inputMapName.val(this.creatorManager.game.map.name)
    this.inputMapName.focus(() => {
      this.creatorManager.game.mainPlayer.freeze()
    })
    this.inputMapName.focusout(() => {
      this.creatorManager.game.mainPlayer.defreeze()
    })
  }

  openNewInfoSection(b) {
    let infoSection = $(`<div class="nav-info-block" blockID="${b.id}">
        <h2 class="nav-info-block-title"> ${b.constructor.name} </h2>
      </div>`)
    infoSection.append(this.createInfoSectionTitle(b))
    let attributes = Object.keys(b)
    for (let attribute of attributes) {
      if (typeof b[attribute] !== "object" && !this.ATTRIBUTES_TO_HIDE.includes(attribute)) {
        infoSection.append(this.createInfoSectionLine(b, attribute))
      }
    }
    if (attributes.includes("texture")) {
      //choix texture
    }
    if (attributes.includes("metadata") && b.metadata !== null && Object.keys(b.metadata).length > 0) {
      infoSection.append(`<h3> Metadata </h3>`)
      for (let key in b.metadata) {
        infoSection.append(this.createInfoSectionLine(b, key, b.metadata[key], true))
      }
    }
    this.navDiv.prepend(infoSection)
    infoSection.get(0).scrollIntoView()
  }

  createInfoSectionTitle(block) {
    let navBar = $(`<div class="nav-info-block-button-bar"> </div>`)
    let minButton = $(`<button class="min-max-button"> min </button>`)
    let changeMaterial = $(`<button class="change-material-button"> edit </button>`)
    changeMaterial.click(() => {
      this.openMaterialChooser(block, (mat) => {
        console.log(mat, "has been chose for block", block)
        this.creatorManager.updateBlockMaterial(block, mat)
      })
    })
    let removeButton = $(`<button class="remove-block-button"> remove </button>`)
    removeButton.click(() => {
      this.creatorManager.game.map.removeBlock(block)
      this.creatorManager.removeInfoOfBlock(block)
    })
    let closeButton = $(`<button class="close-button"> close </button>`)
    closeButton.click(() => {
      this.creatorManager.removeInfoOfBlock(block)
    })
    //navBar.append(minButton)
    navBar.append(changeMaterial)
    navBar.append(removeButton)
    navBar.append(closeButton)
    return navBar
  }

  createInfoSectionLine(block, attribute, value=block[attribute], metadata=false) {
    let getter = `get${attribute.substr(0, 1).toUpperCase() + attribute.substr(1)}`
    value = block[getter] === undefined ? value : block[getter](value)
    let sectionLine = $(`<div class="nav-info-block-line"> <p class="nav-info-block-line-label"> ${attribute} </p> </div>`)
    let inputType = InputType[(typeof value).toUpperCase()]
    let input = $(`<input type="${inputType}" value="${value}" placeholder="${value}" ${value === true ? "checked=true" : ""}/>`)
    if (inputType === "checkbox") {
      input.change(() => {
        this.creatorManager.updateAttributeBlock(block, attribute, input[0].checked, metadata)
      })
    } else {
      input.bind('input', (event) => {
        if (input.val().length > 0) {
          this.creatorManager.updateAttributeBlock(block, attribute, input.val(), metadata)
        }
      })
      input.focus(() => {
        this.creatorManager.game.mainPlayer.freeze()
      })
      input.focusout(() => {
        this.creatorManager.game.mainPlayer.defreeze()
      })
    }
    sectionLine.append(input)
    return sectionLine
  }

  closeInfoSection(block) {
    let infoSection = $(`.nav-info-block[blockID="${block.id}"]`)
    infoSection.remove()
  }

  openMaterialChooser(block, callback) {
    this.navDiv.hide()
    this.callbackMaterialChooser = callback
    this.materialChooserDiv.show()
    //this.navDiv.show()
  }

  async createMaterialChooser() {
    let canvas = document.getElementById("material-chooser-canvas")
    let ctx = canvas.getContext('2d')
    for (let i = 0; i<2; i++) { //Faire 2x pour prendre en compte le scroll
      ctx.canvas.width = this.materialChooserDiv.width()
      ctx.canvas.height = this.materialChooserDiv.height()
    }
    let size = ctx.canvas.width/this.MATERIAL_BY_LINE_IN_MATERIAL_CHOOSER
    this.textureSize = size
    let compteur = 0
    for (let mat in Textures) {
      let tex = Textures[mat](1, 1)
      tex.width = size
      tex.height = size
      await loadImage(tex.img)
      tex.drawImage(ctx,
        compteur%(this.MATERIAL_BY_LINE_IN_MATERIAL_CHOOSER)*size,
        Math.floor(compteur/this.MATERIAL_BY_LINE_IN_MATERIAL_CHOOSER)*size)
      compteur += 1
    }
    ctx.strokeStyle = "transparent" //Pour pouvoir annuler
    ctx.strokeRect(
      compteur%(this.MATERIAL_BY_LINE_IN_MATERIAL_CHOOSER)*size,
      Math.floor(compteur/this.MATERIAL_BY_LINE_IN_MATERIAL_CHOOSER)*size,
      size, size)
  }

}
