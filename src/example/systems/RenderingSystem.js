import { System } from 'yagl-ecs'


export default class RenderingSystem extends System {

  constructor (container) {
    super()
    this.container = container
  }

  test (entity) {
    return ['pos', 'display'].every(comp => !!entity.components[comp])
  }

  enter (entity) {
    const { pos, display } = entity.components
    const { width, height, color } = display
    const w2 = width/2
    const h2 = height/2

    const graphic = this.container.createGraphics()

    graphic.beginFill(parseInt(color.substr(1), 16))
    graphic.drawRect(-w2, -h2, width, height)
    graphic.x = pos.x
    graphic.y = pos.y

    entity.updateComponent('display', {
      graphic: graphic
    })

    this.container.addGraphics(graphic)
  }

  exit (entity) {
    const { display } = entity.components
    this.container.removeGraphics(display.graphic)
    display.graphic = undefined
  }

  update (entity) {
    const { pos, display } = entity.components

    display.graphic.x = pos.x
    display.graphic.y = pos.y
  }

}

