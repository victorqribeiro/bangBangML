class CannonBall {

	constructor(pos, angle, strength){
		this.pos = {
			x: pos.x || 0,
			y: pos.y || 0
		}
		this.angle = angle || 0
		this.strength = strength || 0
		this.acc = {
			x: Math.cos( this.angle ) * this.strength,
			y: Math.sin( this.angle ) * this.strength
		}
		this.TWOPI = 2 * Math.PI
	}

	isGone(){
		return this.pos.y > h
	}

	update(){
	
		if( this.isGone() )
		
			return
			
		this.pos.x += this.acc.x
		this.pos.y += this.acc.y
		
		this.acc.x *= 0.975
		this.acc.y *= 0.975
		
		this.acc.y += Math.sin( Math.PI/2 ) 
	
	}
	
	show(){
	
		c.beginPath()
		c.arc( this.pos.x, this.pos.y, 5, 0, this.TWOPI )
		c.fillStyle = "black"
		c.fill()
	
	}

}
