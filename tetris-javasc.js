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

for(var c=0; c<canvas.width; c+=20) {
	cells[c] = [];
	for(var r=0; r<canvas.height; r+=20) {
		cells[c][r] = { x: c, y: r, status: 0}; 
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
		var ce = cells[x][y-20];
		//console.log(cells[boxBeginX][400].status);
		//console.log("the values are"+x + y);
		//console.log("we reached the bottom");
		//console.log(ce.status); 
		//console.log("success");
		ce.status = 1;

	}



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

function mainDraw () {


	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();

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


	drawBox(boxBeginX, boxBeginY-20); 

	//check for non-empty boxes in cells
	for(var c=0; c<canvas.width; c+=20) {
		
			for(var r=0; r<canvas.height; r+=20) {
				if(cells[c][r].status == 1) {
					drawBox(c, r);
					
				}
			}
		}
	
}

setInterval(mainDraw, 500);

