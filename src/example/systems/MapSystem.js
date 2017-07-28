import { System } from 'yagl-ecs'


export default class MapSystem extends System {

  constructor (ctx) {
    super()
    this.ctx = ctx
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

    this.ctx.save()
    this.ctx.globalAlpha = 0.9
    this.ctx.fillStyle = 'yellow'
    this.ctx.fillRect(
      area.tx * tw,
      area.ty * th,
      (area.bx - area.tx + 1) * tw,
      (area.by - area.ty + 1) * th,
    )
    this.ctx.restore()
    physic.onGround = false

    for (let x = area.tx; x <= area.bx; x++) {
      for (let y = area.ty; y <= area.by; y++) {
        const tx = x * tw + tw/2
        const ty = y * th + th/2

        this.ctx.fillRect(tx-1, ty-1, 3, 3)
        if (this.collisionMap.solid(x, y)) {
          // center of tile

          // distance on the axes
          const dx = Math.abs(pos.x - tx) - (tw + ew)/2
          const dy = Math.abs(pos.y - ty) - (th + eh)/2
          const dist = Math.abs(dx) > Math.abs(dy) ? dx : dy

          const norm = {
            x: (dx >  dy) * (dx < 0 ? -1 : 1),
            y: (dx <= dy) * (dy < 0 ? -1 : 1),
          }
          // Skip internal edges
          if (this.collisionMap.solid(x + norm.x, y + norm.y)) {
            continue
          }
          const seperation = Math.max(dist, 0)
          const penetration = Math.min(dist, 0)
          const nv = (norm.x * vel.x + norm.y * vel.y) + seperation
          if (nv < 0) {
            //cor.x -= norm.x * penetration
            //cor.y -= norm.y * penetration

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
  }

  update (entity) {
    this.checkCollision(entity)
  }

  preUpdate () {
    this.draw(this.ctx)
  }

  draw (ctx) {
    const { tileWidth: tw, tileHeight: th, width, height } = this

    ctx.save()
    let x = 0, y = 0

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const tile = this.data[x + y * width]
        const tx = x * tw
        const ty = y * th

        switch (tile) {
          case '#':
            ctx.fillStyle = '#000'
            ctx.fillRect(tx, ty, tw, th)
            break
          case 'v':
            ctx.fillStyle = 'red'
            ctx.fillRect(tx, ty + 4, tw, th - 4)
            break
          case 'o':
            ctx.fillStyle = 'orange'
            ctx.beginPath()
            ctx.arc(tx + tw / 2, ty + th / 2, tw * 0.3, 0, 2 * Math.PI)
            ctx.fill()
            break;
        }
      }
    }

    ctx.restore()
  }

}

