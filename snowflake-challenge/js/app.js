class Snowflake {
	constructor(position, angle, maxLife, level, movement = 'straight') {
		this.position = position;
		this.angle = angle;
		this.maxLife = maxLife;
		this.lifeLeft = maxLife;
		this.life = 0;
		this.dead = false;
		this.movement = movement;
		this.level = level;
		this.timesMutated = 0;
	}

	move() {
		//handle life
		this.life += maxLifeK;
		this.lifeLeft = this.maxLife - this.life;

		if(this.life >= this.maxLife){
			this.dead = true;
		}

		//handle movement
		switch(this.movement) {
			case 'straight':
				this.position.add(createVector(this.angle));
				break;		
		}		
	}

	draw() {
		fill(snowflakeColor);
		circle(this.position.x, this.position.y, snowflakeSize);
	}

	mutate(ang, lvl) {
		if(this.life > 2 && this.life < 10 || this.life > 16 && this.life < 20 || this.life > 27 && this.level == lvl && this.lifeLeft > 4){
			this.timesMutated++;

			let snowflake1 = new Snowflake(this.position.copy(), this.angle + ang, this.maxLife/2 - this.timesMutated, this.level + 1);
			let snowflake2 = new Snowflake(this.position.copy(), this.angle - ang, this.maxLife/2 - this.timesMutated, this.level + 1);

			snowflakes.push(snowflake1, snowflake2);
		}
	}
}

clearCanvas();

let useWhite = true;
let snowflakeColor;
let maxLifeK = 0.1; //less is more life (am lazy)
let snowflakeSize = 0.5;
let snowflakeGenSpeed = 1;
let legs = 6;

let snowflakes = [];

let genSnowFlakes = () => {
	for(var i = 0; i < 359; i += 360/legs){
		let snowflake = new Snowflake(new Vector(width/2, height/2), i, 32, 1);
		snowflakes.push(snowflake);
	}	
}

let mutate = (angle, level) => {
	for(var i = 0; i < snowflakes.length; i++){
		snowflakes[i].mutate(angle, level);
	}
}

genSnowFlakes();

let draw = () => {
	updateArray(snowflakes);

	if(random(1, 100) < 5){
		mutate(60, 1);
	}

	if(random(1, 100) < 2){
		mutate(120, 2);
	}

	if(random(1, 100) < 1){
		mutate(-30, 3);
	}

	if(useWhite){
		snowflakeColor = '#fff';
	}else{
		snowflakeColor = `hsl(${tick}, 100%, 50%)`;
	}
}

loop();

window.addEventListener('click', () => {
	retry();
});

let retry = () => {
	snowflakes = [];
	clearCanvas();
	genSnowFlakes();
}