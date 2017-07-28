import CircularBuffer from 'circular-buffer'


export default class GamePad {

  constructor (conn) {
    // Can max hold 100 input actions
    this._actionBuffer = new CircularBuffer(100)
    this._state = {}
    this._conn = conn
  }

  send (action) {
    conn.send(action)
  }

  getState () {
    const state = this._state

    // Clear previous state
    for (let key in state) {
      if (state[key].type === 'button') {
        if (state[key].released) {
          state[key].down = false
        }
        state[key].pressed = false
        state[key].released = false
      }
    }

    // Aggregate all actions since last call
    while (this._actionBuffer.size()) {
      const nextAction = this._actionBuffer.deq()
      if (!nextAction) continue

      const { type, value, name } = nextAction
      const fname = String(name).toLowerCase()
      const action = state[fname] = state[fname] || {}

      switch (action.type = type) {
        // case Controller.JOYSTICK
        case 'joystick':
          action.value = value
          break
        // case Controller.BUTTON
        case 'button':
          action.down = !!action.down || value
          action.pressed = !!action.pressed || value
          action.released = !!action.released || !value
          break
      }
    }
    return this
  }

  axis (name) {
    const fname = String(name).toLowerCase()
    return (this._state[fname] && this._state[fname].value) || {
      x: 0,
      y: 0,
    }
  }

  down (name) {
    const fname = String(name).toLowerCase()
    return (this._state[fname] && this._state[fname].down) || false
  }

  pressed (name) {
    const fname = String(name).toLowerCase()
    return (this._state[fname] && this._state[fname].pressed) || false
  }

  released (name) {
    const fname = String(name).toLowerCase()
    return (this._state[fname] && this._state[fname].released) || false
  }

  update (actions, id) {
    console.log(id)
    if (Array.isArray(actions)) {
      for (let action of actions) {
        this._actionBuffer.enq(action)
      }
    }
  }

}
