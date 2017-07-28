import Component from './Component'
import { Value } from './values'
import { Vec2 } from '../utils/math'


export default class Button extends Component {

  constructor (name, label, radius = 40) {
    super('button', name)

    this.label = label
    this.value = new Value(false)
    this.radius = radius

    this.center = new Vec2()

    this.style = {
      bg: {
        lineWidth: 3,
        fillStyle: '#4CA0A2',
        strokeStyle: '#00787A',
      },
      normal: {
        lineWidth: 3,
        fillStyle: '#65A79B',
        strokeStyle: '#FFF',
      },
      down: {
        fillStyle: '#4C8E82',
      },
    }
  }

  calculateBounds () {
    this.center.set(
      this.x + this.width / 2,
      this.y + this.height / 2,
    )
  }

  update (touches) {
    for (let touch of touches) {
      if (!touch.bound && touch.pressed && this.checkPoint(touch)) {
        const len = this.center.clone().scale(-1).add(touch).len()

        if (len <= 1.2 * this.radius) {
          touch.bound = this.id
          this.value.set(true)
        }
      }
      if (touch.bound === this.id && touch.released) {
        this.value.set(false)
      }
    }
  }

  draw (ctx) {
    ctx.save()

    this.setStyle(ctx, this.style.bg)

    ctx.beginPath()
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    this.setStyle(ctx, [
      this.style.normal,
      this.value.get() && this.style.down
    ])
    ctx.arc(this.center.x, this.center.y, this.radius * 0.8, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    if (this.label) {
      // TODO: Draw button label
    }

    ctx.restore()
  }

}
