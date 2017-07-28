import { System } from 'yagl-ecs'


export default class GamePadSystem extends System {

  constructor () {
    super()

    this.gamePads = []
  }

  addGamePad (gamePad) {
    this.gamePads.push(gamePad)
    const out = this.gamePads.length - 1
    console.log(out)
    return out
  }

  getGamePadState ({ id }) {
    const gamePad = this.gamePads[id]
    if (gamePad) {
      return gamePad.getState()
    }
    return false
  }

  test (entity) {
    return ['physic', 'controller'].every(comp => !!entity.components[comp])
  }

  enter (entity) {
    console.log(entity)
  }

  update (entity) {
    const { physic, controller } = entity.components
    const input = this.getGamePadState(controller)
    const speed = 3

    if (!input) {
      return
    }

    if (input.pressed('a') && physic.onGround) {
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

    physic.vel.x = input.axis('joystick').x * speed
    physic.vel.y = input.axis('joystick').y * speed
  }

}

