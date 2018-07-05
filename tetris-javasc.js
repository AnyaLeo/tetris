//VARIABLES

var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var cellWidth = 20;
var cellHeight = 20;

var rectBeginX = canvas.width/2;
var rectBeginY = - cellHeight;

//FUNCTIONS


//draw a box shape
function drawRect() {
	//ctx.clearRect(canvas.width, canvas.height);

	ctx.beginPath();
	ctx.rect(rectBeginX, rectBeginY, cellWidth, cellHeight);
	ctx.fillStyle = "darkblue";
	ctx.fill();
	ctx.closePath();

	rectBeginY += cellWidth;

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
	drawRect(); 
	drawGrid();
}

//drawRect();

setInterval(mainDraw, 1000);

