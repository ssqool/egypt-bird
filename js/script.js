let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');
let scr = document.getElementById('score')


let bird = new Image();
let coin = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();


//Responsive Canvas
window.onload = function(){
    init();
    window.addEventListener('resize', init, false);
}

function init() {
    cvs.style.display = 'none';

    cvs.width = window.innerWidth * 2;
    cvs.height = window.innerHeight * 2;
    cvs.style.width = window.innerWidth + "px";
    cvs.style.height = window.innerHeight + "px";
    ctx.scale(2, 2);

    cvs.style.display = 'block';
}

pipeBottom.onload = draw; // callback, need to initialization before initializoation src(image)

// move up bird on any kess press
document.addEventListener('click', moveUp);

function moveUp() {
    cooY -= 70;
}

// padding beetwen tubes
let gap = 200;

// creating blocks
let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: -400,
    create: true
}

//creating coin
let newcoin = [];

newcoin[0] = {
    x: cvs.width - 50,
    y: 300,
    create: true
}

//bird position
let cooX = 30;
let cooY = 20;
let grav = 4;

//bird and coin size
let birdCoinSize = 50;

//score
let score = 0;

function draw() {
    //clear
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    ctx.drawImage(bird, cooX, cooY, birdCoinSize, birdCoinSize);

    for (let i = 0; i < newcoin.length; i++) {

        //draw coin
        ctx.drawImage(coin, newcoin[i].x, newcoin[i].y, birdCoinSize, birdCoinSize);
        newcoin[i].x -= 1.5;

        // setTimeout()
        if (newcoin[i].x <= 100 && newcoin[i].create === true) {
            newcoin.push({
                x: cvs.width - 20,
                y: Math.floor(Math.random() * cvs.height),
                create: true
            })
            newcoin[i].create = false;
        }

        // tracking touch with coin
        if (newcoin[i].x < cooX + birdCoinSize  && newcoin[i].x + birdCoinSize  > cooX &&
            newcoin[i].y < cooY + birdCoinSize && newcoin[i].y + birdCoinSize > cooY) {
            newcoin.splice(newcoin[i], 1);
            score++;
        }
    }

    for (let i = 0; i < pipe.length; i++) {

        //draw pipes
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x -= 1.5;

        //adding new tubes
        if (pipe[i].x <= 100 && pipe[i].create === true) {
            pipe.push({
                x: cvs.width / 2,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
                create: true
            })
            pipe[i].create = false;
            setTimeout(()=> {score++}, 1000) ;
        }

        //tracking touch with barrier
        if (cooX + 50 >= pipe[i].x
            && cooX <= pipe[i].x + pipeUp.width
            && (cooY <= pipe[i].y + pipeUp.height
                || cooY + 50 >= pipe[i].y + pipeUp.height + gap)
                || cooY + 50 >= cvs.height) {
            location.href = 'play.html';
            return 0;
        }
    }

    cooY += grav;

    ctx.fillStyle = '#000'
    ctx.font = '36px Verdana'
    scr.innerHTML = `Score: ${score}`;

    requestAnimationFrame(draw);
}

bird.src = 'img/character_.png';
coin.src = 'img/coin.png';
pipeUp.src = 'img/element.png';
pipeBottom.src = 'img/element.png';
