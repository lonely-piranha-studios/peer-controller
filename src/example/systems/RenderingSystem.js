import { System } from 'yagl-ecs'


export default class RenderingSystem extends System {

  constructor (renderer) {
    super()
    this.renderer = renderer
  }

  test (entity) {
    return ['pos', 'display'].every(comp => !!entity.components[comp])
  }

  enter (entity) {
    const { pos, display } = entity.components

    const { width, height, color } = display
    const w2 = width/2
    const h2 = height/2

    const graphic = new this.renderer.Graphics()

    graphic.beginFill(parseInt(color.substr(1), 16))
    graphic.drawRect(-w2, -h2, width, height)
    graphic.x = pos.x
    graphic.y = pos.y

    entity.updateComponent('display', {
      graphic: graphic
    })

    this.renderer.stage.addChild(graphic)
  }

  exit (entity) {
    const { display } = entity.components
    this.renderer.stage.removeChild(display.graphic)
    display.graphic = undefined
  }

  update (entity) {
    const { pos, display } = entity.components

    display.graphic.x = pos.x
    display.graphic.y = pos.y
  }

}

