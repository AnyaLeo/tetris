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

drawRect();

setInterval(drawRect, 50);