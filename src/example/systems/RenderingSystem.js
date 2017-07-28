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
    const graphic = this.container.createGraphics()
    graphic.beginFill(parseInt(display.color.substr(1), 16))
    graphic.drawRect(-display.width / 2, -display.height / 2, display.width, display.height)
    graphic.x = pos.x
    graphic.y = pos.y

    entity.updateComponent('display', {
      graphic: graphic
    })

    this.container.addGraphics(graphic)
  }

  update (entity) {
    const { pos, display } = entity.components

    display.graphic.x = pos.x
    display.graphic.y = pos.y
  }

}

