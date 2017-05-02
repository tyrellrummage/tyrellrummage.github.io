$('body').snowfall({minSize: 3, maxSize:8, round: true, flakeCount: 200});

var merits = parseInt(localStorage.getItem('merits')) || -1;
var previousKey = null;
var multiplier = 1;
var canPlay = true;

var meritUpSound = $('.merit-up')[0];

renderMinus1();

$(window).on('keydown', function(e){
	if(canPlay){
		var key = e.which;

		if(key == 13){
			merits+=multiplier;
		}

		if(key == 37 && previousKey == 39 || previousKey == null){
			merits+=multiplier;
			playSound(meritUpSound);
		}

		if(key == 39 && previousKey == 37 || previousKey == null){
			merits+=multiplier;
			playSound(meritUpSound);
		}

		previousKey = key;
		render();
		checkCompletion();
		localStorage.setItem('merits', merits);
	}	
});

function render(){
	$('.merit-number-true').text(merits.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
}

function renderMinus1(){
	$('.merit-number-true').text((merits + 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
}

function playSound(sound){
	sound.currentTime = 0;
	sound.play();
}

function checkCompletion(){
	if(merits > 14999999){
		canPlay = false;
		finishGame();
	}
}

function finishGame(){
	var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');

	$('.merit-number-true').prop('number', 14999999).animateNumber({
		number: 0,
		numberStep: comma_separator_number_step,
		easing: 'easeInOutQuad'
	}, 60000, 'linear');
	$('.merit-number-true').text();
}