

export default class Vec2 {
  constructor(x = 0, y = 0) {
    this.set(x, y)
  }
  set (x, y) {
    this.x = x
    this.y = y
    return this
  }
  get () {
    return this
  }
  len2 () {
    return this.x ** 2 + this.y ** 2
  }
  len () {
    return Math.sqrt(this.len2())
  }
  norm () {
    const l = this.len()
    return this.scale(1 / l)
  }
  scale (c) {
    this.x *= c
    this.y *= c
    return this
  }
  add (p) {
    //assert(p instanceof Point, 'arg must be a point')
    this.x += p.x
    this.y += p.y
    return this
  }
  sub (p) {
    //assert(p instanceof Point, 'arg must be a point')
    this.x -= p.x
    this.y -= p.y
    return this
  }
  dot (p) {
    //assert(p instanceof Point, 'arg must be a point')
    this.x *= p.x
    this.y *= p.y
    return this
  }
  clone () {
    return new Vec2(this.x, this.y)
  }
}

