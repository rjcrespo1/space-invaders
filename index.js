const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_SPACE = 32;

const gameWidth = 800;
const gameHeight = 600;

const STATE = {
    xPos: 0,
    yPos: 0,
    moveLeft: false,
    moveRight: false,
    shoot: false,
    bullets: [],
    aliens: [],
    alienLasers: [],
    alienWidth: 50,
    shipWidth: 50,
    cooldown: 0,
    numberOfAliens: 16,
    alienCooldown: 0,
    gameOver: false
}

function setPosition(element, x, y) {
    element.style.transform = `translate(${x}px, ${y}px)`;
}

function setSize(element, width) {
    element.style.width = `${width}px`;
    element.style.height = 'auto';
}

function bound(x) {
    if(x >= gameWidth - STATE.shipWidth) {
        STATE.xPos = gameWidth - STATE.shipWidth;
        return STATE.xPos;
    } if(x <= 0) {
        STATE.xPos = 0;
        return STATE.xPos;
    } else {
        return x;
    }
}

function removeBullet(bullets, bullet1, bullet) {
    const index = bullets.indexOf(bullet1);
    bullets.splice(index, 1);
    container.removeChild(bullet)
}

function collide(rect1, rect2) {
    return!(rect2.left > rect1.right || rect2.right < rect1.left || rect2.top > rect1.bottom || rect2.bottom < rect1.top);
}

//Ship
function createPlayer(container) {
    STATE.xPos = gameWidth / 2;
    STATE.yPos = gameHeight - 50;
    const player = document.createElement("img");
    player.src = "images/ship.png";
    player.className = "player";
    container.appendChild(player);
    setPosition(player, STATE.xPos, STATE.yPos);
    setSize(player, STATE.shipWidth);
}

function updatePlayer() {
    if(STATE.moveLeft) {
        STATE.xPos -= 4;
    } if(STATE.moveRight) {
        STATE.xPos += 4;
    } if(STATE.shoot && STATE.cooldown == 0) {
        createBullet(container, STATE.xPos - STATE.shipWidth / 2, STATE.yPos);
        STATE.cooldown = 20;
    }
    const player = document.querySelector('.player');
    setPosition(player, bound(STATE.xPos), STATE.yPos - 15);
    if(STATE.cooldown > 0) {
        STATE.cooldown -= 0.5;
    }
    console.log(STATE.cooldown)
}

function createBullet(container, x, y) {
    const bullet = document.createElement('img');
    bullet.src = 'images/ship-laser.png';
    bullet.className = 'bullet';
    container.appendChild(bullet);
    const bullet1 = {x, y, bullet};
    STATE.bullets.push(bullet1);
    setPosition(bullet, x, y);
}

function updateBullet(container) {
    const bullets = STATE.bullets;
    for(let i = 0; i < bullets.length; i++) {
        const bullet1 = bullets[i];
        bullet1.y -= 2;
        if(bullet1.y < 0) {
            removeBullet(bullets, bullet1, bullet1.bullet);
        }
        setPosition(bullet1.bullet, bullet1.x, bullet1.y);
        const bulletRect = bullet1.bullet.getBoundingClientRect();
        const aliens = STATE.aliens;
        for(let j = 0; j < aliens.length; j++) {
            const alien = aliens[j];
            const alienRect = alien.alien1.getBoundingClientRect();
            if(collide(alienRect, bulletRect)) {
                removeBullet(bullets, bullet1, bullet1.bullet);
                const index = aliens.indexOf(alien);
                aliens.splice(index, 1);
                container.removeChild(alien.alien1);
            }
        }
    }
}

function createAlien(container, x, y) {
    const alien1 = document.createElement('img');
    alien1.src = 'images/alien.png';
    alien1.className = 'alien';
    container.appendChild(alien1);
    const alienCooldown = Math.floor(Math.random()* 100);
    const alien = {x, y, alien1, alienCooldown};
    STATE.aliens.push(alien);
    setSize(alien1, STATE.alienWidth);
    setPosition(alien1, x, y);
}

function updateAliens(container) {
    const dx = Math.cos(Date.now() / 1000) * 40;
    const dy = Math.sin(Date.now() / 1000) * 30;
    const aliens = STATE.aliens;
    for(let i = 0; i < aliens.length; i++) {
        const alien = aliens[i];
        let a = alien.x + dx;
        let b = alien.y + dy;
        setPosition(alien.alien1, a, b);
        if(alien.alienCooldown == 0) {
            createAlienLaser(container, a, b);
            alien.alienCooldown = Math.floor(Math.random()* 50) + 100;
        }
        alien.alienCooldown -= 0.5;  
    }
}

function createAliens(container) {
    for(let i = 0; i <= STATE.numberOfAliens / 2; i++) {
        createAlien(container, i*80, 100);
    }
    for(let i = 0; i <= STATE.numberOfAliens / 2; i++) {
        createAlien(container, i*80, 180);
    }
}

function createAlienLaser(container, x, y) {
    const alienLaser = document.createElement('img');
    alienLaser.src = 'images/alien-laser.png';
    alienLaser.className = 'alien-laser';
    container.appendChild(alienLaser);
    const alienLaser1 = {x, y, alienLaser};
    STATE.alienLasers.push(alienLaser1);
    setPosition(alienLaser, x, y);
}

function updateAlienLaser() {
    const alienLasers = STATE.alienLasers;
    for(let i = 0; i < alienLasers.length; i++) {
        const alienLaser1 = alienLasers[i];
        alienLaser1.y += 2;
        if(alienLaser1.y > gameHeight - 30) {
            removeBullet(alienLasers, alienLaser1, alienLaser1.alienLaser);
        }
        const alienLaserRect = alienLaser1.alienLaser.getBoundingClientRect();
        const shipRect = document.querySelector('.player').getBoundingClientRect();
        if (collide(shipRect, alienLaserRect)) {
            // console.log('Game Over')
            STATE.gameOver = true;
        }
        setPosition(alienLaser1.alienLaser, alienLaser1.x + STATE.alienWidth / 2, alienLaser1.y + 15);
    }
}

//Ship Movement
function keyPress(event) {
    if(event.keyCode === KEY_RIGHT) {
        STATE.moveRight = true;
        // console.log('right key')
    } else if(event.keyCode === KEY_LEFT) {
        STATE.moveLeft = true;
        // console.log('left key')
    } else if (event.keyCode === KEY_SPACE) {
        STATE.shoot = true;
        // console.log('shoot')
    }
}

function keyRelease(event) {
    if(event.keyCode === KEY_RIGHT) {
        STATE.moveRight = false;
    } else if(event.keyCode === KEY_LEFT) {
        STATE.moveLeft = false;
    } else if(event.keyCode === KEY_SPACE) {
        STATE.shoot = false;
    }
}

//Game
function update() {
    updatePlayer();
    updateBullet(container);
    updateAliens(container);
    updateAlienLaser();

    window.requestAnimationFrame(update);

    if(STATE.gameOver) {
        document.querySelector('.lose').style.display = 'block';
    }
    if(STATE.aliens.length == 0) {
        document.querySelector('.win').style.display = 'block';
    }
}


const container = document.querySelector(".main");
createPlayer(container);
createAliens(container);


// Event Listeners
window.addEventListener('keydown', keyPress);
window.addEventListener('keyup', keyRelease);


//Runs Game
update();