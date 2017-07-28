import { Component } from '../components'


export default class ControllerGroup extends Component {

  constructor (options = 0, components = []) {
    super()

    this.options = options
    this.components = []

    for (let component of components) {
      this.addComponent(component)
    }
  }

  addComponent (component) {
    this.components.push(component)
    this.calculateBounds()
  }

  calculateBounds () {
    const h = !!(this.options & ControllerGroup.SPLIT_HORIZONTAL)

    const dx = this.width * (!h ? 1 / (this.components.length||1) : 1)
    const dy = this.height * (h ? 1 / (this.components.length||1) : 1)

    let i = 0
    for (let component of this.components) {
      component.setBound({
        x: dx * i * !h + this.x,
        y: dy * i * h + this.y,
        width: dx,
        height: dy,
      })
      i++
    }
  }

  getState () {
    return this.components.reduce((acc, component) => {
      if (component.getState) {
        const val = component.getState()
        return !!val ? acc.concat(val) : acc
      }
      return acc
    }, [])
  }

  update (touches) {
    for (let component of this.components) {
      component.update(touches)
    }
  }

  draw (ctx) {
    for (let component of this.components) {
      component.draw(ctx)
    }
  }

}

ControllerGroup.SPLIT_VERTICAL = 1 << 0
ControllerGroup.SPLIT_HORIZONTAL = 1 << 1

