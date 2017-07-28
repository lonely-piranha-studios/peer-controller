

export default class Component {

  constructor (type, name) {
    this.id = Component._count++
    this.type = type
    this.name = name || `${type}_${this.id}`
  }

  setStyle (ctx, style) {
    const finalStyles = (Array.isArray(style) ? style : [style]).reduce((acc, s) => {
      if (s) {
        Object.assign(acc, s)
      }
      return acc
    }, {})

    for (let rule in finalStyles) {
      ctx[rule] = finalStyles[rule]
    }
  }

  getState() {
    return this.value && this.value.changed() && {
      name: this.name,
      _ts: Date.now(),
      type: this.type,
      value: this.value.get(),
    }
  }

  checkPoint({ x, y }) {
    return (
      this.x <= x && x <= this.x + this.width &&
      this.y <= y && y <= this.y + this.height
    )
  }

  setBound({ x = 0, y = 0, width = 0, height = 0}) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.calculateBounds()
  }

  draw () {}

  update () {}

  calculateBounds() {}

}

Component._count = 0
