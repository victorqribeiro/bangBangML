class Cannon {

	constructor(pos){
		this.pos = {
			x: pos.x || 0,
			y: pos.y || 0
		}
		this.angle = 0
		this.strength = 10
		this.isRotatingUp = false
		this.isRotatingDown = false
		this.isIncreasingStrength = false
		this.isDecreasingStrength = false
	}
	
	update(){
	
		if( this.isRotatingUp && this.angle > -Math.PI/2)
			this.angle -= 0.1
		else if( this.isRotatingDown && this.angle < 0)
			this.angle += 0.1
	
		if( this.isIncreasingStrength && this.strength < 100)
			this.strength += 1
		else if( this.isDecreasingStrength && this.strength > 0)
			this.strength -= 1
	
	}
	
	show(){
		c.save()
		c.translate(this.pos.x, this.pos.y)
		c.fillStyle = "red"
		c.strokeStyle = "black"
		c.fillRect( -30, -30, 10, -this.strength )
		c.strokeRect( -30, -30, 10, -100)
		c.fillStyle = "black"
		c.beginPath()
		c.arc(0, 0, 30, 0, Math.PI, true)
		c.lineTo(-30,10)	
		c.lineTo(30,10)
		c.fill()
		c.rotate(this.angle)
		c.fillRect(-5,-7,50,14)
		c.restore()
		
	}
	
	shoot(){
		cannonBall = new CannonBall(this.pos, this.angle, this.strength )
	}

}
