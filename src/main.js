import { JoyStick, Button } from './components'
import Controller from './controller'


const controller = new Controller({
  room: 'game',
  peer: new Peer(null, { host: location.hostname, port: location.port, path: '/peer' }),
}, Controller.SPLIT_VERTICAL, [
  new JoyStick('joystick'),
  new Controller.Group(Controller.SPLIT_HORIZONTAL, [
    new Controller.Group(Controller.SPLIT_HORIZONTAL),
    new Controller.Group(Controller.SPLIT_VERTICAL, [
      new Button('a', 'A'),
      new Button('b', 'B'),
      new Button('c', 'C'),
    ]),
  ])
])

controller.run()

document.body.appendChild(controller.getView())

