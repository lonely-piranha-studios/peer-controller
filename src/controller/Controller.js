import ControllerGroup from './ControllerGroup'
import fscreen from 'fscreen'
import * as actions from '../actions'


export default class Controller extends ControllerGroup {

  constructor (config, flags, components) {
    super(flags, components)

    if ((config || {}).peer) {
      this.connect(config)
    }

    this.running = false

    this.view = document.createElement('canvas')
    this.ctx = this.view.getContext('2d')

    this.view.addEventListener('touchstart', this.onTouch.bind(this, 'start'), false)
    this.view.addEventListener('touchmove', this.onTouch.bind(this, 'move'), false)
    this.view.addEventListener('touchend', this.onTouch.bind(this, 'end'), false)
    this.view.addEventListener('click', ({ pageX: x, pageY: y}) => {
      if (this.width - 50 <= x && y <= 50) {
        fscreen.requestFullscreen(this.getView())
      }
    })

    window.addEventListener('resize', this.onSizeChange.bind(this))
    fscreen.addEventListener('fullscreenchange', this.onSizeChange.bind(this))
    this.onSizeChange()

    this.touches = []
  }

  connect ({ peer, room }) {
    peer.on('open', (id) => {
      const conn = peer.connect(room)
      conn.on('open', () => {
        conn.send(actions.connect(id))
        this.connection = conn
      })
    })
  }

  onSizeChange () {
    this.setBound({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    this.view.width = this.width
    this.view.height = this.height
  }

  handle (state, { identifier: ident, pageX: x, pageY: y}) {
    const touch = this.touches[ident] = this.touches[ident] || {}

    touch.down = touch.down || state !== 'end'
    touch.pressed = touch.pressed || state === 'start'
    touch.released = touch.released || state === 'end'

    touch.ident = ident
    touch.x = x
    touch.y = y
  }

  clearTouchState () {
    for (let touch of this.touches) {
      if (touch.released) {
        touch.down = false
        touch.bound = false
      }
      touch.pressed = false
      touch.released = false
    }
  }

  onTouch (state, e) {
    for (let touch of e.changedTouches) {
      this.handle(state, touch)
    }
  }

  getView () {
    return this.view
  }

  run () {
    if (this.running) return
    this.running = true

    const loop = now => {
      if (this.running) requestAnimationFrame(loop)
      this.tick()
    }
    requestAnimationFrame(loop)
  }

  stop () {
    this.running = false
  }

  tick () {
    this.update(this.touches)
    this.clearTouchState()

    const state = this.getState()
    if (state.length && this.connection) {
      this.connection.send(actions.input(state))
    }

    this.ctx.clearRect(0, 0, this.view.width, this.view.height)
    this.draw(this.ctx)
    this.ctx.fillRect(this.width - 50, 0, 50, 50)
  }

}

