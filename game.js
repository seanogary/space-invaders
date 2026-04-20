import { renderer } from './renderer.js';
import { entities, Alien } from './entities.js';
import { TICK_INTERVAL } from './constants.js';

let lastTime = 0;
let frame = 0;

function gameLoop(timestamp) {
    const delta = timestamp - lastTime;
    if (delta >= TICK_INTERVAL) {
        lastTime = timestamp;
        frame++;
        renderer.clearScreen();
        entities.updateAliens(frame, renderer);
        renderer.drawPixels();
    }
    requestAnimationFrame(gameLoop);
}

export function startGame() {
    renderer.init();
    let x = 0;
    let y = 0;
    entities.aliens.push(new Alien(x, y, 'squid'));
    x += 10;
    entities.aliens.push(new Alien(x, y, 'crab'));
    x += 10;
    entities.aliens.push(new Alien(x, y, 'squid'));
    x += 10;
    entities.aliens.push(new Alien(x, y, 'crab'));
    requestAnimationFrame(gameLoop);
}