import { renderer } from './renderer.js';
import { entities, Alien, Bunker, Player } from './entities.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SEPARATION, TICK_INTERVAL } from './constants.js';
import { SPRITES } from './sprites.js';

let lastTime = 0;
let frame = 0;
let count = 1;
let playing = false;

function gameLoop(timestamp) {

    if (!playing) {
        mainMenu();
    }

    if (playing){
        const delta = timestamp - lastTime;
        if (delta >= TICK_INTERVAL) {
            lastTime = timestamp;
            frame++;
            renderer.clearScreen();
            entities.updateEntities(frame, renderer);
            renderer.printScreen(renderer.centerX("SCORE: 0000", 'small'), 0, "SCORE: 0000", renderer.screen, 'small');
            renderer.drawPixels();
    }
    }
   requestAnimationFrame(gameLoop);
}

function mainMenu() {
    renderer.clearScreen();
    renderer.printScreen(
        renderer.centerX("SPACE INVADERS", 'small'), 
        renderer.centerY("SPACE INVADERS", 'small'),
        "SPACE INVADERS", 
        renderer.screen, 
        'small'
    );
    renderer.printScreen(renderer.centerX("INSERT  COIN", 'small'), 40, "INSERT  COIN", renderer.screen, 'small');
    renderer.printScreen(renderer.centerX("<1 OR 2  P L A Y E R S >", 'small'), 60, "<1 OR 2  PLAYERS>", renderer.screen, 'small');
    renderer.printScreen(0, 224 - 5, "CREDIT 00", renderer.screen, 'small');
    renderer.drawPixels();
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            playing = true;
        }
    });
}

function getAlienWidth(type) {
    return SPRITES[type][1].length;
}

function spawnEnemyRow(type, lat) {
    const centeringOffset = (SCREEN_WIDTH - (SEPARATION * 10  + getAlienWidth(type))) / 2;
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((val) => {
        entities.aliens.push(new Alien(SEPARATION * val + centeringOffset, lat, type))
    })
}

function spawnBunkers(num) {
    const CENTER = (SCREEN_WIDTH - SPRITES.bunker.width) / 2;
    const WIDTH = SPRITES.bunker.width; 
    console.log(CENTER);
    entities.bunkers.push(new Bunker( parseInt(SCREEN_WIDTH / 5) - WIDTH / 2, 100));
    entities.bunkers.push(new Bunker(parseInt(SCREEN_WIDTH * 2 / 5 - WIDTH / 2), 100));
    entities.bunkers.push(new Bunker(parseInt(SCREEN_WIDTH * 3 / 5 ) - WIDTH / 2, 100));
    entities.bunkers.push(new Bunker(parseInt(SCREEN_WIDTH * 4 / 5) - WIDTH / 2, 100));

}

export function startGame() {
    renderer.init();
    entities.player.push(new Player());
    let x = 0;
    let y = 0;
    spawnEnemyRow('squid', 10);
    spawnEnemyRow('crab', 30);
    spawnEnemyRow('octopus', 50);
    spawnEnemyRow('octopus', 70);
    spawnBunkers(3);
    requestAnimationFrame(gameLoop);
}