import { System } from 'yagl-ecs'


export default class KeyboardSystem extends System {

  test (entity) {
    return ['physic', 'keyboard'].every(comp => !!entity.components[comp])
  }

  update (entity) {
    const { physic, keyboard } = entity.components
    const input = keyboard.getState()
    const speed = 3
    const jump = 11

    physic.vel.x = speed * (input.down('right') - input.down('left'))
    if (physic.onGround && input.down('up')) physic.vel.y = -jump
  }

}
