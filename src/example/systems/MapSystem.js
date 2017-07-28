import { System } from 'yagl-ecs'


export default class MapSystem extends System {

  constructor (container) {
    super()
    this.container = container
    this.mapGraphic = this.container.createGraphics()
    this.container.addGraphics(this.mapGraphic)
    this.highlight = this.container.createGraphics()
    this.container.addGraphics(this.highlight)
  }

  test (entity) {
    return ['pos', 'physic', 'display'].every(comp => !!entity.components[comp])
  }

  checkCollision (entity) {
    const { pos, physic, display } = entity.components
    const { vel, cor } = physic
    const { width: ew, height: eh } = display

    const tw = this.tileWidth
    const th = this.tileHeight

    // Predicate
    const pred = {
      x: pos.x + vel.x,
      y: pos.y + vel.y,
    }
    // Calculate necessary map area
    const area = {
      tx: Math.floor((Math.min(pos.x, pred.x) - ew / 2) / tw),
      ty: Math.floor((Math.min(pos.y, pred.y) - eh / 2) / th),
      bx: Math.floor((Math.max(pos.x, pred.x) + ew / 2) / tw),
      by: Math.floor((Math.max(pos.y, pred.y) + eh / 2) / th),
    }

    this.highlight.clear()
    this.highlight.beginFill(0xFFFF00, 0.9)
    this.highlight.drawRect(
      area.tx * tw,
      area.ty * th,
      (area.bx - area.tx + 1) * tw,
      (area.by - area.ty + 1) * th,
    );

    physic.onGround = false

    for (let x = area.tx; x <= area.bx; x++) {
      for (let y = area.ty; y <= area.by; y++) {
        // center of tile
        const tx = x * tw + tw/2
        const ty = y * th + th/2

        if (this.collisionMap.solid(x, y)) {

          // distance on the axes
          const dx = Math.abs(pos.x - tx) - (tw + ew)/2
          const dy = Math.abs(pos.y - ty) - (th + eh)/2

          const dist = Math.abs(dx) > Math.abs(dy) ? dx : dy

          const norm = {
            x: (tx >  pos.x) * (dx < 0 ? -1 : 1),
            y: (tx <= pos.x) * (dy < 0 ? -1 : 1),
          }
          // Skip internal edges
          if (this.collisionMap.solid(x + norm.x, y + norm.y)) {
            continue
          }
          const seperation = Math.max(dist, 0)
          const penetration = Math.min(dist, 0)
          const nv = (norm.x * vel.x + norm.y * vel.y) + seperation
          if (nv < 0) {
            cor.x -= norm.x * penetration * 0.2
            cor.y -= norm.y * penetration * 0.2

            vel.x -= nv * norm.x
            vel.y -= nv * norm.y

            physic.onGround = norm.y < 0
          }

        }
      }
    }

  }

  setMap (map) {
    const rows = String(map).trim().split('\n')

    this.tileWidth = 16
    this.tileHeight = 16
    this.width = rows[0].length
    this.height = rows.length

    this.data = rows.reduce((acc, row) => acc.concat(row.split('')), [])
    this.collisionMap = {
      width: this.width,
      height: this.height,
      data: this.data.map(tile => {
        return ['#'].includes(tile) ? 1 : 0
      }),
      solid(x, y) {
        return this.data[x + y*this.width]
      },
    }

    this.initGraphics()
  }

  update (entity) {
    this.checkCollision(entity)
  }

  initGraphics () {
    const { tileWidth: tw, tileHeight: th, width, height } = this
    const t = this.mapGraphic
    t.clear()

    let x = 0, y = 0

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const tile = this.data[x + y * width]
        const tx = x * tw
        const ty = y * th

        switch (tile) {
          case '#':
            t.beginFill(0x000000)
            t.drawRect(tx, ty, tw, th);
            break
          case 'v':
            t.beginFill(0xFF0000)
            t.drawRect(tx, ty + 4, tw, th - 4)
            break
          case 'o':
            t.beginFill(0xFFA500)
            t.arc(tx + tw / 2, ty + th / 2, tw * 0.3, 0, 2 * Math.PI)
            break;
        }
      }
    }
  }

}

