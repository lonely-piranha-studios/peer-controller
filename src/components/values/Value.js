

export default class Value {

  constructor(value) {
    this.set(value)
  }

  set(value) {
    this._prev = this._value
    this._value = value
  }

  get() {
    return this._value
  }

  changed() {
    if (!(this._value === this._prev)) {
      this._prev = this._value
      return true
    }
    return false
  }

}
