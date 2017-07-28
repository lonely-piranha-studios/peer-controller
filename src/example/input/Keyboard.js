const Keys = {
  'enter': 19,
  'space': 32,

  'left arrow':  37,
  'up arrow':    38,
  'right arrow': 39,
  'down arrow':  40
}

export default class Keyboard {

  constructor (keys) {
    this._bindings = {}
    this._pressed  = []
    this._down     = []
    this._keyLen   = 256

    if (keys != null) {
      for (const action in keys) {
        this.bindAction(action, keys[action])
      }
    }
    for (let i = 0; i < this._keyLen; i++) {
      this._pressed.push(false)
      this._down.push(false)
    }

    console.log(this._bindings)
    
    document.addEventListener('keydown', this._onKeyDown.bind(this), false)
    document.addEventListener('keyup',   this._onKeyUp.bind(this),   false)
  }

  bindAction (action, key) {
    const c = this._getCode(key)

    if (c == null || 0 > c || c > this._keyLen) {
      throw new Error(`Bad attempted keybinding: ${action}, ${key}!`)
    }

    this._bindings[action] = c
    this._pressed[c] = false
    this._down[c] = false
  }

  getState () {
    return this
  }
  
  down (action) {
    const c = this._bindings[action]
    if (c == null) throw new Error(`Bad inputaction: ${action}!`)
    return this._down[c]
  }

  pressed (action) {
    const c = this._bindings[action]
    if (c == null) throw new Error(`Bad inputaction: ${action}!`)

    if (this._pressed[c] || !this._down[c]) {
      return false
    }
    return this._pressed[c] = true
  }

  _getCode (c) {
    if (typeof c === 'number') {
      return c
    } else if (c.length > 1) {
      return Keys[c]
    }
    return c.toUpperCase().charCodeAt(0)
  }

  _onKeyDown (evt) {
    const c = evt.keyCode
    if (c > this._keyLen) return
    this._down[c] = true
  }

  _onKeyUp (evt) {
    const c = evt.keyCode
    if (c > this._keyLen) return
    this._pressed[c] = false
    this._down[c] = false
  }
}
