/**
 * @author Pierre Faber & William Mok
 */

const Direction = {
  UP: 3,
  DOWN: 0,
  LEFT: 1,
  RIGHT: 2
}

const Axe = {
  X: 100,
  Y: 101,
  Z: 102
}

const Action = {
  INTERACT: 200,
  BACK: 201
}

const InputType = {
  BOOLEAN: "checkbox",
  STRING: "textarea",
  NUMBER: "number"
}

const Textures = {
  Grass: (width, height) => { return new Texture("textures/textures.png", 17, 0, 16, 16, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  GrassWhiteFlower: (width, height) => { return new Texture("textures/textures.png", 0, 16, 16, 16, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  ImagePane: (width, height) => { return new Texture("textures/textures.png", 1044, 496, 40, 25, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  Sign: (width, height) => { return new Texture("textures/textures.png", 1075, 436, 26, 27, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  Wall: (width, height) => { return new Texture("textures/textures.png", 321, 353, 16, 16, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  PortalBlog: (width, height) => { return new Texture("textures/textures.png", 0, 1124, 128, 147, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  PortalCreator: (width, height) => { return new Texture("textures/textures.png", 237, 1145, 70, 70, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  Wall2: (width, height) => { return new Texture("textures/textures.png", 350, 348, 16, 16, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  Wall3: (width, height) => { return new Texture("textures/textures.png", 336, 336, 16, 16, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  Wall4: (width, height) => { return new Texture("textures/textures.png", 336, 366, 16, 16, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  Tree: (width, height) => { return new Texture("textures/textures.png", 241, 0, 48, 48, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  Fountain: (width, height) => { return new Texture("textures/textures.png", 1391, 174, 82, 82, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  Path: (width, height) => { return new Texture("textures/textures.png", 0, 256, 48, 48, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  Water: (width, height) => { return new Texture("textures/textures.png", 288, 450, 32, 28, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  Rock: (width, height) => { return new Texture("textures/textures.png", 320, 438, 48, 44, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  House: (width, height) => { return new Texture("textures/textures.png", 369, 1062, 65, 76, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  Building: (width, height) => { return new Texture("textures/textures.png", 1197, 1392, 86, 252, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  TriggerCreator: (width, height) => { return new Texture("textures/textures.png", 1312, 1104, 16, 16, width*BLOCK_SIZE, height*BLOCK_SIZE) },
  TriggerBlog: (width, height) => { return new Texture("textures/textures.png", 1312, 1120, 16, 16, width*BLOCK_SIZE, height*BLOCK_SIZE) },
}
