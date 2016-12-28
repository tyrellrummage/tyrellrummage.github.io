const PI = Math.PI;

var random = (...arguments) => {
	if(arguments.length === 0){
		return Math.random();
	}else{
		if(typeof arguments[0] == 'object'){
			return arguments[0][Math.floor(Math.random() * arguments[0].length)];
		}else{
			let minimum = (arguments.length === 1) ? 0 : arguments[0];
			let maximum = (arguments.length === 1) ? arguments[0] : arguments[1];

			return Math.floor(Math.random()*(maximum-minimum+1)+minimum);
		}
	}
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
	width = window.innerWidth;
	height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	clearCanvas();
});

let clrCanvas = false;
let clrCanvasBackground = '#000';

let clearCanvas = () => {
	if(clrCanvas){
		fill(clrCanvasBackground);
		rect(0, 0, width, height);
	}
}

let randomColor = () => `rgb(${random(255)}, ${random(255)}, ${random(255)})`;

let stroke = color => ctx.strokeStyle = color;
let lineWidth = n => ctx.lineWidth = n;
let fill = color => ctx.fillStyle = color;

let translate = (x,y) => ctx.translate(x, y);
let rotate = deg => ctx.rotate(deg * PI/180);
let save = () => ctx.save();
let restore = () => ctx.restore();

let circle = (x, y, radius) => {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * PI);
	ctx.closePath();
	ctx.fill();
}

let line = (x1, y1, x2, y2) => {
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.closePath();
	ctx.stroke();
}

let rect = (x, y, width, height) =>{
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.fill();
	ctx.closePath();
}

let updateArray = arr => {
	for(let i = 0; i < arr.length; i++){
		arr[i].move();
		arr[i].draw();

		if(arr[i].dead){
			arr.splice(i, 1);
		}
	}
}

let tick = 0;
clrCanvas = true;

class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}

	sub(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}

	mult(vector) {
		this.x *= vector.x;
		this.y *= vector.y;
	}

	div(vector) {
		this.x /= vector.x;
		this.y /= vector.y;
	}

	copy() {
		return new Vector(this.x, this.y);
	}
}

var createVector = (a, b) => {
	if(a === undefined && b === undefined){
		return new Vector();
	}else if(b === undefined){
		let angle = a * (Math.PI / 180);

		let x = Math.cos(angle);
		let y = Math.sin(angle);

		return new Vector(x, y);
	}else{
		return new Vector(a, b);
	}
}

var loop = () => {
	//clearCanvas();

	draw();

	

	requestAnimationFrame(loop);
	tick++;
}