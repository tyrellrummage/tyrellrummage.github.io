var random = (...arguments) => {

	//if no arguments gen random between 0 and 1 with decimals
	if(arguments.length === 0){
		return Math.random();
	}else{
		//if only 1 parameter, minimum is 0 and maximum is the first argument
		//if 2 parameters, minimum is the first one and maximum the second one
		let minimum = (arguments.length === 1) ? 0 : arguments[0];
		let maximum = (arguments.length === 1) ? arguments[0] : arguments[1];

		//return the random generated number
		return Math.floor(Math.random()*(maximum-minimum+1)+minimum);
	}
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let fill = color => ctx.fillStyle = color;

let rect = (x, y, width, height) =>{
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.fill();
	ctx.closePath();
}

//initial colors, can be changed with right click
let colors = ['#AFFFFF', '#74DBEF', '#5E88FC', '#264E86', '#081d38'];

let genColorScheme = () => {
	//generate a random hue
	let hueSeed = random(0, 359);

	//use it with different brightness values to create the depth effect
	colors[0] = `hsl(${hueSeed}, 50%, 90%)`;
	colors[1] = `hsl(${hueSeed}, 50%, 76%)`;
	colors[2] = `hsl(${hueSeed}, 50%, 50%)`;
	colors[3] = `hsl(${hueSeed}, 50%, 30%)`;
	colors[4] = `hsl(${hueSeed}, 50%, 15%)`;

	genLandscape();
}

let points = [0, 0];
//iterations of the algorithm, warning: the number of points increases exponentially with the iteration count
let iterations = 10;
//steepness offset (customizable with the mousewheel)
let steepnessOffset = 0;

//generate random landscape keeping the colors
let genLandscape = () => {
	fill(colors[0]);
	rect(0, 0, width, height);

	genBatchPoints(10 + steepnessOffset);
	drawPoints(colors[1], -200);

	genBatchPoints(7 + steepnessOffset);
	drawPoints(colors[2], 0);

	genBatchPoints(5 + steepnessOffset);
	drawPoints(colors[3], 100);

	genBatchPoints(6 + steepnessOffset);
	drawPoints(colors[4], 200);
}

//generate x number of points given steepness
var genBatchPoints = steepness => {
	points = [0, 0];

	for(var i = 0; i < iterations; i++){
		generatePoints(steepness);
	}	
}

//generate points
var generatePoints = steepness => {

	//first create a new array and set the initial point
	let newArray = [points[0]];

	//then, loop through the original points array startin from the first one (to correct off by one error)
	for(var i = 1; i < points.length; i++){

		//get the average between the two points
		let avg = (points[i] + points[i - 1]) / 2;

		//get an offset
		let offsetAm = height / ((points.length - 1) * 20/steepness);

		//make the offset random and able to be negative
		let rand = random(-offsetAm, offsetAm);

		//add the randomness to the average (displace the point)
		avg += rand;

		//push the displaced point aswell as the original point
		newArray.push(avg);
		newArray.push(points[i]);
	}

	//finally, copy the new array into points
	points = newArray;
}

//draw the points given fill color and offset (0 for default)
let drawPoints = (fillColor, offset = 0) => {
	fill(fillColor);

	//begin the path and move to the initial point, accounting for the offset
	ctx.beginPath();
	ctx.moveTo(0, height/2 + points[0] + offset);

	//for every point, draw a line to that point
	for(var i = 0; i < points.length; i++){
		let x1 = i * (width / (points.length - 1));
		let y1 = height / 2 + points[i] + offset;

		ctx.lineTo(x1, y1);
	}

	//finally, close the path by going to the bottom of the screen
	ctx.lineTo(width, height);
	ctx.lineTo(0, height);
	ctx.closePath();
	ctx.fill();
}

//on click generate new landscape with the same colors
window.addEventListener('click', () => {
	genLandscape();
});

//on rightclick generate new landscape with different colors
window.addEventListener('keydown', () => {
	if(event.which !== 116) genColorScheme();
});


//change steepness of the terrain if is too steep
window.addEventListener('mousewheel', () => {
	if(event.wheelDelta < 0){
		steepnessOffset -= 0.2;
	}else{
		steepnessOffset += 0.2;
	}
	genLandscape();
});

//on resize, reset canvas dimensions and generate landscape
window.addEventListener('resize', () => {
	width = window.innerWidth;
	height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	genLandscape();
});

//init with a landscape
genLandscape(); 