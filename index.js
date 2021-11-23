const bullet = [];
const aliens = [];


  

let canvas = document.getElementById('myCanvas');

ctx = canvas.getContext('2d');


canvas.width = 1200;
canvas.height = 607;

// console.log('width', innerWidth);
// console.log('height', innerHeight);

// class Game {
//     constructor()
// }

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
        // console.log(this.image, this.y)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    

    loadImage() {
        const img = new Image();
        img.src = this.image;
        // console.log({alien: this})
        img.addEventListener("load", () => {
            this.image = img;
            this.draw();
        
        });
    }
}

class Ship extends Sprite {
    constructor() {
        super("./images/ship.png", canvas.width/2, 525, 50, 50)
    }



    move(e) {
        let rightLimit = canvas.width - this.width
        rightLimit = rightLimit - 25
        if(this.x < rightLimit && e.key === "ArrowRight") {
            // console.log(this.speed)
          this.x += 7;
        }
        if(this.x > 30 && e.key === "ArrowLeft") {
          this.x -= 7;
        }
    }
}



// document.addEventListener('keydown', function(e) {
//     // console.log(e.which);
//     switch (e.keycode) {
//         case 37:
//       ship.moveLeft();
//       console.log('left', ship);
//       break;
//     case 39:
//       ship.moveRight();
//       console.log('right', ship);
//       break;
//     }
//     updateCanvas();
//   });

const ship = new Ship();
function shipImageLoad() {
    ship.loadImage();
}

shipImageLoad();


class Alien extends Sprite {
    constructor(image, x, y, width, height, speed) {
        super(image, x, y, width, height, speed)
        
    }
    
    
}


// const alien = new Alien();
function alienImageLoad() {
    // alien.loadImage();
    aliens.forEach(alien => {
        // console.log({alien})
        alien.loadImage();
    })
}

alienImageLoad();

// class Bullet extends Sprite {
//     constructor() {

//     }
// }


const generateAliens = () => {
    let rowX = 0;
    let colY = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 10; col++) {
            // aliens.push(alien);
            aliens.push(new Alien("./images/alien.png", rowX, colY, 50, 50, 0))
            rowX += 70;
        }
        rowX = 0;
        colY += 70;
    }
}
generateAliens();


const generateBullets = () => {
    bullet.x = (this.ship.x + this.ship.width) / 2
    bullet.y = ((this.ship.y + this.ship.width) / 2) + 5
}
// generateBullets();


function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship.draw();
    aliens.forEach(alien => {
        alien.draw();
    })
}

// redraw();

function startGame() {

     shipImageLoad();
     alienImageLoad();

    
    document.addEventListener('keydown', (e) => { ship.move(e) });

    let spaceInv = setInterval(() => {
        redraw(spaceInv)
    }, 33)
}

startGame();



// window.onload = () => {
//     document.getElementById()
// }



