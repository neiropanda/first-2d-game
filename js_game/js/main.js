let cvs = document.getElementById(`canvas`);
let ctx = cvs.getContext(`2d`);

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

let clientY = 0;

bird.src = `img/cherry.png`;
bg.src = `img/cherry_bg.png`;
//fg.src = `img/cherry_fg.png`;
pipeUp.src = `img/bird_pipeUp.png`;
pipeUp.src = `img/dima.png`;
pipeBottom.src = `img/tolik.png`;

let gap = 150;

//audio

let fly = new Audio();
let score_audio = new Audio();

fly.src = `audio/fly.mp3`;
score_audio.src = `audio/score.mp3`;

//при нажатии на кнопку 

document.addEventListener(`keydown`, moveUp);

function moveUp() {
	yPos -=25;
	fly.play();
}

cvs.addEventListener('touchstart', function(event) {
if (event.targetTouches.length == 1) {
var clientY=event.targetTouches[0]; 
}
}, false);

let pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0
}

let score = 0;

//позиция птички

let xPos = 10;
let yPos = 150;
let grav = 1.5;

function draw() {
	ctx.drawImage(bg, 0, 0);
	
	for(let i = 0; i < pipe.length; i++ ) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;

		if (pipe[i].x == 110) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}


		if(xPos + bird.width >= pipe[i].x
			&& xPos <= pipe[i].x + pipeUp.width
			&& (yPos <= pipe[i].y + pipeUp.height
				|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
				location.reload();

			}

			if(pipe[i].x == 5) {
				score++;
				score_audio.play();	
			}
		
	}

	ctx.fillStyle = `#f1c40f`;
	ctx.font = `24px Verdana`;
	ctx.fillText(`SCORE: ` + score, 10, cvs.height - 20);

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += grav;
	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;