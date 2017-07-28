import { System } from 'yagl-ecs'


export default class GamePadSystem extends System {

  test (entity) {
    return ['physic', 'controller'].every(comp => !!entity.components[comp])
  }

  update (entity) {
    const { physic, controller } = entity.components
    const input = controller.getState()
    const speed = 3

    if (input.pressed('a')) {
      console.log(entity.id, 'a is pressed!')
    }
    if (input.released('b')) {
      console.log(entity.id, 'b is released!')
    }
    if (input.down('c')) {
      console.log(entity.id, 'c is down!')
    }

    physic.vel.x = input.axis('joystick').x * speed
    physic.vel.y = input.axis('joystick').y * speed
  }

}

