import ECS from 'yagl-ecs'
import Peer from 'peerjs'

import Canvas from './gfx/Canvas'
import GamePad from './input/GamePad'
import System from './systems'
import Component from './components'

import * as playerActions from '../actions'


class Game {

  constructor () {
    this.canvas = new Canvas(window.innerWidth, window.innerHeight)

    this.ecs = new ECS()

    this.systems = {
      gamePad: new System.GamePadSystem(),
      map: new System.MapSystem(this.canvas.getContext()),
      physic: new System.PhysicSystem(),
      rendering: new System.RenderingSystem(this.canvas.getContext())
    }

    this.ecs.addSystem(this.systems.gamePad)
    this.ecs.addSystem(this.systems.map)
    this.ecs.addSystem(this.systems.physic)
    this.ecs.addSystem(this.systems.rendering)

    this.systems.map.setMap(require('./maps/test_lvl.txt'))

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
      const gamePad = new GamePad(conn)
      const entity = new ECS.Entity(null, [
        Component.Controller,
        Component.Position,
        Component.Display,
        Component.Physic,
      ])
      entity.updateComponents({
        display: {
          width: 16, height: 32
        },
        pos: {
          x: 100, y: 100
        },
        controller: {
          id: this.systems.gamePad.addGamePad(gamePad),
        },
      })

      conn.on('close', () => {
        this.ecs.removeEntity(entity)
      })

      conn.on('data', (action) => {
        switch (action.type) {

          case playerActions.CONNECT:
            console.log(`%c${playerActions.CONNECT}`, 'color:orange', entity.id, action.payload)
            this.ecs.addEntity(entity)
            break;

          case playerActions.INPUT:
            gamePad.update(action.payload, entity.id)
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

