$(document).ready(function(){

	var canvas = $('canvas')[0];
	var ctx = canvas.getContext('2d');

	var width = $(window).width();
	var height = $(window).height();

	canvas.width = width;
	canvas.height = height;

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, width, height);

	var seed,
		walkerSpeed,
		walkerAmount,
		walkerSeparation = 10,
		walkerSeedLenght;

	$('button').on('click', function(){

		seed = $('.i-seed').val();
		walkerSpeed = parseInt($('.i-speed').val()) || 1000/60;
		walkerAmount = parseInt($('.i-amount').val()) || 50;

		var walkerOffset = (height - walkerAmount * walkerSeparation) / 2;

		if(seed==""){
			alert("You must input a seed");
		}else if(walkerAmount>100){
			alert("Walker amount must be less than 100");
		}else{
			for(var i = 0; i < walkerAmount; i++){
				var walker = new Walker(seed, i*walkerSeparation + walkerOffset, i*5);
				walkers.push(walker);
			}

			walkerSeedLenght = walker.seed.length;

			walkerLoop();
			$('.gui').fadeOut();
		}
	});

	var walkers = [];

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
			setTimeout(walkerLoop, walkerSpeed);
		}else{
			count = 0;
			walkerLoop();
		}
	}

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
				case "d":
					this.x++;
					break;
				case "s":
					this.y++;
					break;
				case "w":
					this.y--;
					break;
				case "a":
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