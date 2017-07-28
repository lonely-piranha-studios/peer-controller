

export default class Canvas {

  constructor (width, height) {
    this.view = document.createElement('canvas')
    this.ctx = this.view.getContext('2d')

    this.width = this.view.width = width
    this.height = this.view.height = height
  }

  clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  getContext () {
    return this.ctx
  }

}
