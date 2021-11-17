let canvas = document.getElementById('myCanvas');

ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Sprite {
    constructor(image, x, y, width, height, speed) {
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    loadImage() {
        const img = new Image();
        img.src = this.image;
        img.addEventListener("load", () => {
            this.image = img;
            this.draw();
        
        });
    }
}

class Ship extends Sprite {
    constructor() {
        super("./images/ship.png", canvas.width/2, canvas.height/2, 50, 50)
    }

    move(e) {
        let rightLimit = canvas.width - this.width
        rightLimit = rightLimit - 25;
        if(this.x < rightLimit && e.key === 'ArrowRight') {
            this.x += this.pixelChange
        }
        if(this.x > 30 && e.key === 'ArrowLeft') {
            this.x -= this.pixelChange
        }
    }
}

const ship = new Ship();
async function startImageLoad() {
    await ship.loadImage();
}






function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship.draw();
}


async function startGame() {

    await startImageLoad();

    document.addEventListener('keydown', (e) => { ship.move(e) });
    let game = setInterval(() => {
        redraw(game)
    }, 33)
}
// class Alien extends Sprite {
//     constructor() {
//         super("./images/alien.png", 0, 0, 50, 50, 0)
//     }
// }
window.onload = () => {
    document.getElementById()
}



// const canvas = document.getElementById('myCanvas');

// const ctx = canvas.getContext('2d');

// const shipImg = new Image();
// shipImg.src = './images/ship.png'
// let shipX = 0;
// let shipY = 0;

// canvas.width = innerWidth;
// canvas.height = innerHeight;



// function draw(x, y) {

//    console.log(innerHeight, innerWidth)
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(shipImg, shipX, shipY, 50, 50);

//     shipX += 3;

//     setTimeout(() => { draw(x, y) }, 30);

// }
// draw(innerWidth / 2, innerHeight / 2);

// function move(e) {
//     let rightLimit = canvas.width -
// }

// class Player {
//     constructor(x, y) {
//         this.x = x
//         this.y = y
//     }
//     draw() {
//         ctx.beginPath()
//     }
// }

// const player = new Player();