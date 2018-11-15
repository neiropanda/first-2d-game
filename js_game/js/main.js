let cvs = document.getElementById(`canvas`);
let ctx = cvs.getContext(`2d`);

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = `img/bird_bird.png`;
bg.src = `img/bird_bg.png`;
fg.src = `img/bird_fg.png`;
pipeUp.src = `img/bird_pipeUp.png`;
pipeBottom.src = `img/bird_pipeBottom.png`;

let gap = 110;

//при нажатии на кнопку 

document.addEventListener(`keydown`, moveUp);

function moveUp() {
	yPos -=15;
}

let pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0
}

//позиция птички

let xPos = 10;
let yPos = 150;
let grav = 1;

function draw() {
	ctx.drawImage(bg, 0, 0);
	
	for(let i = 0; i < pipe.length; i++ ) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;
	}

	ctx.drawImage(pipeUp, 100, 0);
	ctx.drawImage(pipeBottom, 100, 0 + pipeUp.height + gap);


	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += grav;
	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;