import { System } from 'yagl-ecs'


export default class PhysicSystem extends System {

  test (entity) {
    return ['pos', 'physic'].every(comp => !!entity.components[comp])
  }

  update (entity) {
    const { pos, physic } = entity.components
    const { vel, cor } = physic

    if (!physic.onGround && false) {
      physic.vel.y = Math.min(12, physic.vel.y + 0.5)
    }

    pos.x += vel.x + cor.x
    pos.y += vel.y + cor.y

    cor.x = 0
    cor.y = 0
  }

}
