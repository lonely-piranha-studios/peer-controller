import Value from './Value'


export default class ValueXY {

  constructor (x, y) {
    this._value = {
      x: new Value(x),
      y: new Value(y),
    }
  }

  set (x, y) {
    this._value.x.set(x)
    this._value.y.set(y)
  }

  get () {
    return {
      x: this._value.x.get(),
      y: this._value.y.get(),
    }
  }

  changed() {
    return this._value.x.changed() || this._value.y.changed()
  }

}
