//VARIABLES

var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var cellWidth = 20;
var cellHeight = 20;

function drawRect() {
	ctx.beginPath();
	ctx.rect(0, 0, cellWidth, cellHeight);
	ctx.fillStyle = "darkblue";
	ctx.fill();
	ctx.closePath();
}

drawRect();