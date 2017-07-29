import ECS from 'yagl-ecs'
import Peer from 'peerjs'
import { Application, Graphics } from 'pixi.js'

class MenuScreen {
	constructor () {
		this.renderer = new Application({
			width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xeeeeee,
		})
		//this.renderer.Graphics = Graphics
		//console.log(new this.renderer.Graphics());

		const g = new Graphics()

		const clickHere = new PIXI.Text('Click to Start Game!', new PIXI.TextStyle({fontSize: 48}))
		clickHere.x = window.innerWidth/2
		clickHere.y = window.innerHeight/3

		clickHere.anchor.x = 0.5

		const credits = new PIXI.Text('Credits:\nTroy Erem\nAiman Josefsson\nJonathan Nguyen\nLinus Wahlgren\nMax Wihlborg')
		credits.x = window.innerWidth/2
		credits.y = window.innerHeight/2
		credits.anchor.x = 0.5

		const creditsISPY = new PIXI.Text('Special thanks to ISPY GROUP for letting us hack at their office!')
		creditsISPY.x = window.innerWidth/2
		creditsISPY.y = 9*window.innerHeight/10
		creditsISPY.anchor.x = 0.5


		this.renderer.stage.addChild(clickHere)
		this.renderer.stage.addChild(credits)
		this.renderer.stage.addChild(creditsISPY)

		//g.stage.addChild(clickHere)
	}
}

export default MenuScreen