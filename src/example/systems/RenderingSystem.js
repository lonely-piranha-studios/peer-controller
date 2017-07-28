import { System } from 'yagl-ecs'


export default class RenderingSystem extends System {

  constructor (ctx) {
    super()
    this.ctx = ctx
  }

  test (entity) {
    return ['pos', 'display'].every(comp => !!entity.components[comp])
  }

  update (entity) {
    const { pos, display } = entity.components
    const { width: w, height: h, color: clr } = display
    const w2 = w/2
    const h2 = h/2

    this.ctx.save()
    this.ctx.fillStyle = clr
    this.ctx.fillRect(pos.x - w2, pos.y - h2, w, h)
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(pos.x - 1, pos.y - 1, 3, 3)
    this.ctx.restore()
  }

}

