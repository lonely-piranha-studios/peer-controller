import ECS from 'yagl-ecs'

import Canvas from './gfx/Canvas'
import GamePad from './input/GamePad'
import System from './systems'
import Component from './components'

import * as playerActions from '../actions'


class Game {

  constructor () {
    this.canvas = new Canvas(window.innerWidth, window.innerHeight)

    this.ecs = new ECS()

    const mapSystem = new System.MapSystem(this.canvas.getContext())
    mapSystem.setMap(require('./maps/test_lvl.txt'))

    this.ecs.addSystem(new System.GamePadSystem())
    this.ecs.addSystem(mapSystem)
    this.ecs.addSystem(new System.PhysicSystem())
    this.ecs.addSystem(new System.RenderingSystem(this.canvas.getContext()))

    this.openRoom('game')
  }

  openRoom (room) {
    if (this._peer && !this._peer.destroyed) {
      this._peer.destroy()
    }

    const peer = this._peer = new Peer(room, {
      host: location.hostname,
      port: location.port,
      path: '/peer'
    })

    peer.on('connection', (conn) => {
      const entity = new ECS.Entity(null, [
        Component.Controller,
        Component.Position,
        Component.Display,
        Component.Physic,
      ])
      entity.updateComponent('display', {
        width: 16,
        height: 32,
      })
      entity.updateComponent('pos', {
        x: 100,
        y: 100,
      })
      entity.components.controller = new GamePad(conn)

      conn.on('close', () => {
        this.ecs.removeEntity(entity)
      })

      conn.on('data', (action) => {
        switch (action.type) {

          case playerActions.CONNECT:
            console.log(`%c${playerActions.CONNECT}`, 'color:orange', action.payload)
            this.ecs.addEntity(entity)
            break;

          case playerActions.INPUT:
            entity.components.controller.update(action.payload)
            break;
        }
      })
    })

  }

  run () {
    if (this.running) return
    this.running = true

    const loop = now => {
      if (this.running) requestAnimationFrame(loop)
      this.tick()
    }
    loop()
  }

  stop () {
    this.running = false
  }

  tick () {
    this.canvas.clear()
    this.ecs.update()
  }

}

const game = new Game()
game.run()

document.body.appendChild(game.canvas.view)

