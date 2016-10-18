$(document).ready(function(){

	var seed = prompt("Type your seed(a goes right, b goes bottom, c goes up, d goes left): ", "");

	var canvas = $('canvas')[0];
	var ctx = canvas.getContext('2d');

	var width = $(window).width();
	var height = $(window).height();

	canvas.width = width;
	canvas.height = height;

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, width, height);
	
	var loopSpeed = 16;
	var walkerAmount = 50;
	var walkers = [];

	for(var i = 0; i < walkerAmount; i++){
		var walker = new Walker(seed, i*10 + 100, i*5);
		walkers.push(walker);
	}

	var walkerSeedLenght = walker.seed.length;
	var count = 0;
	var infiniteCount = 0;
	
	function walkerLoop(){
		count++;
		infiniteCount++;
		
		for(var i = 0; i < walkers.length; i++){
			walkers[i].move();
			walkers[i].draw();	
		}		
		
		if(count<=walkerSeedLenght){
			setTimeout(walkerLoop, loopSpeed);
		}else{
			count = 0;
			walkerLoop();
		}

		console.log(walkers);
	}
	
	walkerLoop();
	
	function Walker(seed, y, id){
		this.seed = seed;
		this.id = id;
		this.x = 100;
		this.y = y;
		this.count = count;
		this.hue = infiniteCount + this.id;
		this.color = "hsl("+this.hue+",100%,50%)";
		this.move = function(){
			var letter = this.seed[count-1];
			switch(letter){
				case "a":
					this.x++;
					break;
				case "b":
					this.y++;
					break;
				case "c":
					this.y--;
					break;
				case "d":
					this.x--;
					break;
				}
		};
		this.draw = function(){
			this.hue = infiniteCount + this.id;
			this.color = "hsl("+this.hue+",100%,50%)";
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, 1 , 1);
		}
	}
  
});