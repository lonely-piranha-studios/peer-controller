import { System } from 'yagl-ecs'


export default class GamePadSystem extends System {

  test (entity) {
    return ['physic', 'controller'].every(comp => !!entity.components[comp])
  }

  update (entity) {
    const { physic, controller } = entity.components
    const input = controller.getState()
    const speed = 3

    if (input.pressed('a') && physic.collision.bottom) {
      //physic.vel.y = -12
    }
    if (input.released('a')) {
      /*
      if (physic.vel.y < -6) {
        physic.vel.y = -6
      }
      */
    }
    if (input.released('b')) {
      console.log(entity.id, 'b is released!')
    }
    if (input.pressed('c')) {
      console.log(entity.id, 'c is pressed!')
    }
    if (input.down('c')) {
      console.log(entity.id, 'c is down!')
    }

    physic.vel.x = input.axis('joystick').x * 3
    physic.vel.y = input.axis('joystick').y * 3
  }

}

