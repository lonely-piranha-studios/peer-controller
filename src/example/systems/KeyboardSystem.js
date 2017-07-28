import { System } from 'yagl-ecs'


export default class KeyboardSystem extends System {
  
  test (entity) {
    return ['physic', 'keyboard'].every(comp => !!entity.components[comp])
  }
  
  update (entity) {
    const { physic, keyboard } = entity.components
    const { vel } = physic
    const input = keyboard.getState()
    const speed = 3
    
    vel.x = speed * (input.down('right') - input.down('left'))
    vel.y = speed * (input.down('down') - input.down('up'))
  }
  
}
