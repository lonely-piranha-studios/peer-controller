import Component from './Component'
import { ValueXY } from './values'
import { Vec2 } from '../utils/math'


export default class JoyStick extends Component {

  constructor (name, radius = 80) {
    super('joystick', name)

    this.radius = radius
    this.down = false
    this.value = new ValueXY(0, 0)

    this.center = new Vec2()
    this.stick = new Vec2()

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

  update (touches) {
    for (let touch of touches) {
      if (!this.down && !touch.bound && touch.pressed && this.checkPoint(touch)) {
        touch.bound = this.id
        this.down = true
      }
      if (touch.bound === this.id) {
        this.stick.set(touch.x, touch.y)
        if (touch.released) {
          this.down = false
          this.stick.set(this.center.x, this.center.y)
          this.value.set(0, 0)
        }
      }
    }
    const d = this.stick.clone().sub(this.center)

    if (d.len2() > 0) {
      const maxStick = this.radius * 0.75
      const stick = Math.min(maxStick, d.len())
      const theta = Math.atan2(d.x, d.y)

      // Normalize value in steps of ten (in order to send fewer updates)
      const vx = Math.sin(Math.round(theta * 10)/10)
      const vy = Math.cos(Math.round(theta * 10)/10)
      const vz = Math.round(10 * stick / maxStick)/10

      this.value.set(vx * vz, vy * vz)

      this.stick.set(Math.sin(theta), Math.cos(theta)).scale(stick).add(this.center)
    }
  }

  calculateBounds() {
    this.center.set(
      this.x + this.width / 2,
      this.y + this.height / 2,
    )
    this.stick = this.center.clone()
  }

  draw (ctx) {
    ctx.save()

    ctx.beginPath()
    this.setStyle(ctx, this.style.bg)
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    this.setStyle(ctx, [
      this.style.normal,
      this.down && this.style.down,
    ])
    ctx.arc(this.stick.x, this.stick.y, this.radius / 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }

}
