/*******************************

	VARIABLES

*******************************/

var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var cellWidth = 20;
var cellHeight = 20;
var cellXNum = canvas.width/cellWidth;
var cellYNum = canvas.height/cellHeight;

//the start positions of the box
var boxBeginX = canvas.width/2;
var boxBeginY = -cellHeight;


var cells = [];

//rows and columns start at one
for(var c=1; c<canvas.width/cellWidth; c++) {
	cells[c] = [];
	for(var r=1; r<canvas.height/cellWidth; r++) {
		cells[c][r] = { x: c*cellWidth, y: r*cellWidth, status: 0};
	}
}

var moveLeft = false;
var moveRight = false;

/***************************

	FUNCTIONS

****************************/

document.addEventListener("keydown", move, false);

//move the box
function move (e) {
	if (e.keyCode == 37) {
		//move left
		moveLeft = true;
		console.log("left arrow pressed");

	} else if (e.keyCode == 39) {
		//move right
		moveRight = true;
		console.log("right arrow pressed");
	}

}


//draw a box shape
function drawBox(x, y) {
	//ctx.clearRect(canvas.width, canvas.height);

	ctx.beginPath();
	ctx.rect(x, y, cellWidth, cellHeight);
	ctx.fillStyle = "darkblue";
	ctx.fill();
	ctx.closePath();

	//move it

	//y += cellWidth;

	if(y == canvas.height) {
		var ce = cells[x/20][(y-20)/20];
		//console.log(cells[boxBeginX][400].status);
		//console.log("the values are"+x + y);
		//console.log("we reached the bottom");
		//console.log(ce.status);
		//console.log("success");
		ce.status = 1;

	}
}

function drawi(x, y){
	for( var i = 0; i < 4; i++ ){
		y += 20;
		drawBox(x, y);
	}
}

function drawL(x, y){
	for( var i = 0; i < 3; i++ ){
		drawBox(x, y);
		y += 20;
	}
	drawBox(x+20, y-20);
}

function drawRL(x, y){
	for( var i = 0; i < 3; i++ ){
		drawBox(x, y);
		y += 20;
	}
	drawBox(x-20, y-20);
}

function drawt(x, y){
	drawBox(x, y);
	x -= 20;
	y += 20;
	for( var i = 0; i < 3; i++ ){
		drawBox(x, y);
		x += 20;
	}
}

function drawsq(x, y){
	drawBox(x, y);
	drawBox(x+20, y);
	drawBox(x, y+20);
	drawBox(x+20, y+20);
}

function drawidk(x, y){
	drawBox(x, y);
	drawBox(x+20, y+20);
	drawBox(x, y+20);
	drawBox(x+20, y+20*2);
}

function drawRidk(x, y){
	drawBox(x, y);
	drawBox(x-20, y+20);
	drawBox(x, y+20);
	drawBox(x-20, y+20*2);
}

function drawGrid() {
	//draw vertical lines of grid
  for( var x=0; x<canvas.width; x+=20){
		ctx.beginPath();
    ctx.strokeStyle="black";
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas.height);
		ctx.stroke();
		ctx.closePath();
	}
	//draw horizontal lines
	for( var y=0; y<canvas.height; y+=20){
		ctx.beginPath();
		ctx.strokeStyle="black";
		ctx.moveTo(0, y);
		ctx.lineTo(canvas.width, y);
		ctx.stroke();
		ctx.closePath();
	}
}

//if this function is used in the mainDraw function, the shape will change constantly. where else could it go??
function pickshape(x, y){
	var num = Math.floor(Math.random() * (7 - 1 + 1)) + 1;    //idk how this works but ill trust their logic
	if(num == 1){drawi(x, y);}
	if(num == 2){drawL(x, y);}
	if(num == 3){drawRL(x, y);}
	if(num == 4){drawt(x, y);}
	if(num == 5){drawsq(x, y);}
	if(num == 6){drawidk(x, y);}
	if(num == 7){drawRidk(x, y);}
}

//theoretically, this should work but im getting "cant read property of undefined" lol
function clearrows(){
	for( var c = 0; c < canvas.width/20; c++){
		for( var r = 0; r < canvas.height/20; r++){
			if( cells[c][r].status == 1){
				counter++;
			}
			else {break;}
		}
		if( counter == 20 ){
			ctx.clearRect(0, canvas.height-20, canvas.width, canvas.height);
		}
		counter = 0;
	}
}

function mainDraw () {


	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//check if player moved the box via keys
	if(moveRight) {
		moveRight = false;

		if(boxBeginX < canvas.width-cellWidth) {
			/*console.log("boxBeginX is"+boxBeginX+" canvas width-cellWidth is"+ (canvas.width-cellWidth));
			console.log(boxBeginX <= canvas.width);*/

			boxBeginX += 20;
			}

	} else if(moveLeft) {
		moveLeft = false;

		if(boxBeginX >= cellWidth) {
			boxBeginX -= 20;
		}

	}
	boxBeginY += cellHeight;


	//drawBox(boxBeginX, boxBeginY-20);
	drawL(boxBeginX, boxBeginY);

	//check for non-empty boxes in cells
	for(var c=1; c<canvas.width/cellWidth; c++) {

			for(var r=1; r<canvas.height/cellWidth; r++) {
				if(cells[c][r].status == 1) {
					drawBox(c*cellWidth, r*cellWidth);

				}
			}
		}

	drawGrid();    //here to keep the grid on top of everything else
	clearrows();

}

setInterval(mainDraw, 500);
