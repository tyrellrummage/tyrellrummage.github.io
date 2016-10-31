$(document).ready(function(){

	//get canvas and context and fill canvas with black bg
	var canvas = $('canvas')[0];
	var ctx = canvas.getContext('2d');

	var width = $(window).width();
	var height = $(window).height();

	canvas.width = width;
	canvas.height = height;

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, width, height);

	//variable declaration
	var seed,
		walkerSpeed,
		walkerAmount,
		walkerSeparation = 10,
		walkerSeedLenght,
		symmetrical = false,
		colorOffset = 30;

	//when clicking start...
	$('button').on('click', function(){

		//assign variables from inputs
		seed = $('.i-seed').val();
		walkerSpeed = parseInt($('.i-speed').val()) || 1000/60;
		walkerAmount = parseInt($('.i-amount').val()) || 50;

		//calculate walker offset to center them vertically, wheter they are 20 or 70 or anything
		var walkerOffset = (height - walkerAmount * walkerSeparation) / 2;

		if(seed==""){
			alert("You must input a seed");
		}else if(walkerAmount>100){
			alert("Walker amount must be less than 100");
		}else{
			if(symmetrical){
				//generate walkers with simmetry
				for(var i = 0; i < walkerAmount * 2; i++){
					if(i < walkerAmount){
						var walker = new Walker(seed, i*walkerSeparation + walkerOffset, i*colorOffset);
						walkers.push(walker);
					}else{
						var walkerMirror = new WalkerMirror(seed, (i - walkerAmount)*walkerSeparation + walkerOffset, i*colorOffset);
						walkersM.push(walkerMirror);
					}
				}	
			}else{
				//generate walkers without simmetry
				for(var i = 0; i < walkerAmount; i++){
					var walker = new Walker(seed, i*walkerSeparation + walkerOffset, i*colorOffset);
					walkers.push(walker);
				}
			}			

			walkerSeedLenght = walker.seed.length;

			walkerLoop();
			$('.gui').fadeOut();
		}
	});

	//walker array
	var walkers = [];
	var walkersM = [];

	var count = 0; //reset count for steps
	var infiniteCount = 0; //non resetable count for rainbow colors

	//main loop
	function walkerLoop(){
		resetCanvas();

		count++;
		infiniteCount++;
		
		for(var i = 0; i < walkers.length; i++){
			walkers[i].move();
			walkers[i].draw();
		}

		if(symmetrical){
			for(var i = 0; i < walkers.length; i++){
				walkersM[i].move();
				walkersM[i].draw();
			}			
		}
		
		if(count<=walkerSeedLenght){ //if seed steps aren't done yet, continue loop, else reset
			setTimeout(walkerLoop, walkerSpeed);
		}else{
			count = 0;
			walkerLoop();
		}
	}

	function resetCanvas(){
		ctx.fillStyle = "rgba(0,0,0,0)";
		ctx.fillRect(0,0, width, height);
	}

	//walker constructor
	function Walker(seed, y, id){
		this.seed = seed;
		this.id = id;
		this.x = 100;
		this.y = y;
		this.count = count;
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
		this.changeColor = function(){
			this.h = infiniteCount + this.id;
			this.s = infiniteCount + this.id + 50;
			this.l = infiniteCount + this.id + 25;
			this.color = "hsl("+this.h+",100%,50%)";
		};
		this.changeColor();
		this.draw = function(){
			this.changeColor();
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, 1 , 1);
		}
	}

	function WalkerMirror(seed, y, id){
		this.seed = seed;
		this.id = id;
		this.x = width-100;
		this.y = y;
		this.count = count;
		this.move = function(){
			var letter = this.seed[count-1];
			switch(letter){
				case "a":
					this.x++;
					break;
				case "w":
					this.y++;
					break;
				case "s":
					this.y--;
					break;
				case "d":
					this.x--;
					break;
				}
		};
		this.changeColor = function(){
			this.h = infiniteCount + this.id;
			this.s = infiniteCount + this.id + 50;
			this.l = infiniteCount + this.id + 25;
			this.color = "hsl("+this.h+",100%,50%)";
		};
		this.changeColor();
		this.draw = function(){
			this.changeColor();
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, 1 , 1);
		}
	}

	$('.check-label').on('click', function(){
		var checkEl = $('.checkbox[data-id="'+id+'"]');
		var id = $(this).attr('data-id');
		$('.checkbox[data-id="'+id+'"]').toggleClass('false');
		if(checkEl.hasClass('false')){symmetrical = false}else{symmetrical = true};
	});

	$('.checkbox').on('click', function(){
		var $this = $(this);
		$this.toggleClass('false');
		if($this.hasClass('false')){symmetrical = false}else{symmetrical = true};
	});

	$('.random').click(function(){
		$('.i-seed').val("");
		var seedArray = ["w","a","s","d","d","d"];
		for(var i = 0; i < 100; i++){
			var randomLetter = seedArray[Math.floor(Math.random() * seedArray.length)];
			var seedVal = $('.i-seed').val();
			$('.i-seed').val(seedVal+randomLetter);
		}
	});
  
});