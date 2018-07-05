//VARIABLES

var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var cellWidth = 20;
var cellHeight = 20;

var cellXNum = canvas.width/cellWidth;
var cellYNum = canvas.height/cellHeight; 

var boxBeginX = canvas.width/2;
var boxBeginY = -cellHeight;

var cells = [];

for(var c=0; c<canvas.width; c+=20) {
	cells[c] = [];
	for(var r=0; r<canvas.height; r+=20) {
		cells[c][r] = { x: c, y: r, status: 0}; 
	}
}



//FUNCTIONS


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
		console.log(ce.status); 
		console.log("success");
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

		//check for non-empty boxes in cells
	

	drawGrid();

	drawBox(boxBeginX, boxBeginY-20); 

	boxBeginY += cellHeight;

for(var c=0; c<canvas.width; c+=20) {
	
		for(var r=0; r<canvas.height; r+=20) {
			if(cells[c][r].status == 1) {
				drawBox(c, r);
				console.log("status 1");
				console.log(boxBeginX, boxBeginY);

				//boxBeginY = -cellHeight;
			}
		}
	}
	
}

//drawRect();

setInterval(mainDraw, 50);

