import { System } from 'yagl-ecs'
import collideAabbTilemap from 'collide-2d-aabb-tilemap'


export default class MapSystem extends System {

  constructor (renderer) {
    super()
    this.renderer = renderer
    this.mapGraphic = new this.renderer.Graphics()
    this.renderer.stage.addChild(this.mapGraphic)
    this.highlight = new this.renderer.Graphics()
    this.renderer.stage.addChild(this.highlight)
  }

  test (entity) {
    return ['pos', 'physic', 'display'].every(comp => !!entity.components[comp])
  }

  update (entity) {
    const { pos, physic, display } = entity.components
    const { vel, cor } = physic
    const { width, height } = display

    const w2 = width / 2
    const h2 = height / 2
    const aabb = [pos.x - w2, pos.y - h2, width, height]

    const offset = this.mapCollider(aabb, [vel.x, vel.y], (moveAxis, moveDir, tileId, tileCoords) => {
      if (moveAxis === 1 && tileId > 0) {
        physic.onGround = moveDir === 1
      }
      return tileId > 0
    })

    if (offset) {
      physic.onGround = offset[1] < vel.y
      vel.x = offset[0]
      vel.y = offset[1]
    }
  }

  setMap (map) {
    const rows = String(map).trim().split('\n')

    this.tileSize = 16
    this.width = rows[0].length
    this.height = rows.length

    this.data = rows.reduce((acc, row) => acc.concat(row.split('')), [])

    const collisionMap = this.data.map(tile => {
      return ['#'].includes(tile) ? 1 : 0
    })

    this.mapCollider = collideAabbTilemap((x, y) => collisionMap[x + y*this.width], this.tileSize, [this.width, this.height])
    this.initGraphics()
  }

  initGraphics () {
    const { tileSize, width, height } = this
    const t = this.mapGraphic
    t.clear()

    let x = 0, y = 0

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const tile = this.data[x + y * width]
        const tx = x * tileSize
        const ty = y * tileSize

        switch (tile) {
          case '#':
            t.beginFill(0x000000)
            t.drawRect(tx, ty, tileSize, tileSize);
            break
          case 'v':
            t.beginFill(0xFF0000)
            t.drawRect(tx, ty + 4, tileSize, tileSize - 4)
            break
          case 'o':
            t.beginFill(0xFFA500)
            t.arc(tx + tileSize / 2, ty + tileSize / 2, tileSize * 0.3, 0, 2 * Math.PI)
            break;
        }
      }
    }
  }

}

