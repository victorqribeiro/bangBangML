
let canvas, c, w, h, cannon, cannonBall, nn, target, u, choice, x, y, totalShots, hits, _x, _y

const $ = _ => document.querySelector(_)

const $c = _ => document.createElement(_)

const init = () => {

	totalShots = hits = accuracy = 0

	x = []
	y = []

	canvas = $c('canvas')
	canvas.width = w = innerWidth
	canvas.height = h = innerHeight
	c = canvas.getContext('2d')
	
	c.font = "30px Arial";
	
	$('body').appendChild( canvas )
	
	cannonBall = null
	
	cannon  = new Cannon({x:40	, y:h})
	
	nn = new Dejavu([4,2,2],0.01,10)
	
	target = {
		x: Math.random() * (w-w/2) + w/2,
		y: h
	}
	
	mainLoop()
	
}

const mainLoop = () => {

	if( !cannonBall ){
		_x = [target.x/w, target.y/h, cannon.angle / (-Math.PI / 2), cannon.strength / 100]
		choice = nn.predict( _x ).data
		cannon.angle = choice[0] * (-Math.PI/2)
		cannon.strength = choice[1] * 100
		cannon.shoot()
		totalShots += 1
	}
	
	if( cannonBall && cannonBall.isGone() ){
		if( target.x < cannonBall.pos.x )
			_y = [1,0]
		else
			_y = [0,1]
		nn.fit( [_x], [_y] )
		cannonBall = null
	}
	
	if( cannonBall && dist(target.x, cannonBall.pos.x, target.y, cannonBall.pos.y) < 60 ){
		hits += 1
		
		x.push( _x )
		y.push( [choice[0], choice[1]] )
		nn.shuffle( x, y )
		nn.fit( x, y )
		
		target = {
			x: Math.random() * (w-w/2) + w/2,
			y: h
		}
		cannonBall = null
	}
	

	cannon.update()
	if( cannonBall )
		cannonBall.update()
	draw()
	u = requestAnimationFrame( mainLoop )
	
}

const dist = (x1,x2,y1,y2) => {
	return Math.sqrt( (x1-x2) ** 2 + (y1-y2) ** 2 )
}	

const draw = () => {
	c.clearRect(0,0,w,h)
	c.fillStyle = "black"
	c.fillText("Accuracy: "+parseFloat(hits/totalShots).toFixed(4), 20, 30 )
	cannon.show()
	if( cannonBall )
		cannonBall.show()
	if( target ){
		c.beginPath()
		c.arc(target.x, target.y, 30, 0, Math.PI * 2 )
		c.fillStyle = "red"
		c.fill()
	}
}	

init()
