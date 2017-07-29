import ECS from 'yagl-ecs'
import Peer from 'peerjs'

import { Application, Graphics } from 'pixi.js'

import Keyboard from './input/Keyboard'
import GamePad from './input/GamePad'
import System from './systems'
import Component from './components'

import * as playerActions from '../actions'


const CHARACTER_SIZE = { width: 16, height: 32 }

class Game {

  constructor () {
    this.renderer = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xFFFFFF,
    })
    this.renderer.Graphics = Graphics

    this.ecs = new ECS()

    this.systems = {
      keyboard: new System.KeyboardSystem(),
      gamePad: new System.GamePadSystem(),
      map: new System.MapSystem(this.renderer),
      physic: new System.PhysicSystem(),
      rendering: new System.RenderingSystem(this.renderer),
      gui: new System.GUIRenderSystem(this.renderer),
    }

    this.ecs.addSystem(this.systems.keyboard)
    this.ecs.addSystem(this.systems.gamePad)
    this.ecs.addSystem(this.systems.map)
    this.ecs.addSystem(this.systems.physic)
    this.ecs.addSystem(this.systems.rendering)
    this.ecs.addSystem(this.systems.gui)

    this.systems.map.setMap(require('./maps/test_lvl.txt'))

    this.openRoom('game')


    const entity = new ECS.Entity(null, [
      Component.Keyboard,
      Component.Position,
      Component.Display,
      Component.Physic,
      Component.Bar,
      Component.Money
    ])
    entity.updateComponents({
      display: Object.assign({}, CHARACTER_SIZE),
      pos: {
        x: 100, y: 100,
      },
    })
    entity.components.keyboard = new Keyboard({
      up:    ['w', 'up'],
      down:  ['s', 'down'],
      left:  ['a', 'left'],
      right: ['d', 'right'],
    })
    this.ecs.addEntity(entity)
    this.renderer.ticker.add(() => this.tick())
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
      entity.updateComponents({
        display: Object.assign({}, CHARACTER_SIZE),
        pos: {
          x: 100, y: 100
        },
      })
      entity.components.controller = new GamePad(conn)

      conn.on('close', () => {
        this.ecs.removeEntity(entity)
      })

      conn.on('data', (action) => {
        switch (action.type) {

          case playerActions.CONNECT:
            console.log(`%c${playerActions.CONNECT}`, 'color:orange', entity.id, action.payload)
            this.ecs.addEntity(entity)
            break;
        }
      })
    })

  }

  tick () {
    this.ecs.update()
  }

}

const game = new Game()

document.body.appendChild(game.renderer.view)

