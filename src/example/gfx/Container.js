import { Application, Graphics } from 'pixi.js'

export default class Container {

  constructor (width, height) {
    this.app = new Application(width, height, { backgroundColor: 0xFFFFFF })
//    this.app.stop()
    
    this.view = this.app.view
  }

  createGraphics () {
    return new Graphics()
  }
  
  addGraphics (graphics) {
    this.app.stage.addChild(graphics)
  }
  
}
