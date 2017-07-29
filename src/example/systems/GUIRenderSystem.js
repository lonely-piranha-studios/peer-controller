import { System } from 'yagl-ecs'

export default class GUIRenderSystem extends System {
	constructor (renderer) {
		super()
		this.renderer = renderer
		this.height = 20
		this.x = 20
		this.y = 20
		this.fuelColor = 0x44ff44
		this.borderColor = 0x000000
	}

	test (entity) {
		return !!entity.components.bar && !!entity.components.money	
	}

	enter (entity) {
		const backgroundGraphic = new this.renderer.Graphics()

		const { maxValue, currentValue } = entity.components.bar

		backgroundGraphic.beginFill(this.fuelColor)
		backgroundGraphic.drawRoundedRect(this.x,this.y,maxValue,this.height,8)
		backgroundGraphic.beginFill(0xffffff,0.9)
		backgroundGraphic.drawRect(this.x+currentValue,this.y,maxValue-currentValue,this.height)
		backgroundGraphic.endFill()
		
		const foregroundGraphic = new this.renderer.Graphics()

		foregroundGraphic.lineStyle(4, this.borderColor)
		foregroundGraphic.drawRoundedRect(this.x,this.y,maxValue,this.height,8)

		const text = new this.renderer.Graphics()

		let moneyLabel = new PIXI.Text(`€${entity.components.money.amount}`, new PIXI.TextStyle({ fontFamily: 'Arial' }))
		moneyLabel.x = 20
		moneyLabel.y = 40

		entity.updateComponent('bar', {
			backgroundGraphic: backgroundGraphic,
			foregroundGraphic: foregroundGraphic
		})

		entity.updateComponent('money', {
			moneyLabel
		})

		this.renderer.stage.addChild(backgroundGraphic)
		this.renderer.stage.addChild(foregroundGraphic)
		this.renderer.stage.addChild(moneyLabel)
	}

	update (entity) {
		const { backgroundGraphic } = entity.components.bar

		backgroundGraphic.clear()

		const { maxValue, currentValue } = entity.components.bar

		backgroundGraphic.beginFill(this.fuelColor)
		backgroundGraphic.drawRoundedRect(this.x,this.y,maxValue,this.height,8)
		backgroundGraphic.beginFill(0xffffff,0.9)
		backgroundGraphic.drawRect(this.x+currentValue,this.y,maxValue-currentValue,this.height)
		backgroundGraphic.endFill()

		let { moneyLabel } = entity.components.money

		moneyLabel.text = `€${entity.components.money.amount}`

	}
}