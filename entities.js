import { SCREEN_HEIGHT, SCREEN_WIDTH, PALETTE } from './constants.js';
import { SPRITES } from './sprites.js';
import { And, Or, rightWall, leftWall } from './booleans.js';


export class Alien {

    constructor(x, y, type, direction = 1) {
        this.tempOffset = y / 10;
        this.dx = 1; // +1 (right), -1 (left)
        this.dy = 0; // +1 (down)
        this.x = x;
        this.y = y;
        this.status = {
            alive: true,
            frame: 1,
        };
        this.type = type;

    }
    get sprite() {
        return SPRITES[this.type][this.status.frame];
    }
    update(frameCount) {
        if (!this.status.alive) return;
        if (this.status.frame === 1) this.status.frame = 2;
        else this.status.frame = 1;
        this.x = (this.x + this.dx) % SCREEN_WIDTH;
        this.y = (this.y + this.dy) % SCREEN_HEIGHT;
    }
    draw(renderer) {
        if (!this.status.alive) return;
        renderer.updateScreen(this.x, this.y, this.sprite, renderer.screen);
        renderer.updateScreen(this.x, this.y, this.sprite, renderer.enemyScreen);
    }
    kill() {
        this.status.alive = false;
        this.sprite = SPRITES.explosion;
    }
}

class Letter {
    constructor(x, y, letter) {
        this.x = x;
        this.y = y;
        this.letter = letter;
    }
    
    draw(renderer) {
        renderer.updateScreen(this.x, this.y, SPRITES.letters[this.letter]);
    }
}

export class Bunker {

    constructor(x, y) {
        this.x = x;
        this.y = 170;
        this.width = SPRITES.bunker.width;
        this.sprite = SPRITES.bunker.sprite;
    }

    update() {

    }

    draw(renderer) {
        renderer.updateScreen(this.x, this.y, this.sprite, renderer.screen, [0, 255, 0]);
    }

    takeDamage() {

    }
}

export class Player {

    constructor() {
        viewport = document.getElementById("viewport");
        window.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowLeft":
                    this.dx = -1;
                    break;
                case "ArrowRight":
                    this.dx = 1;
                    break;
                case " ":
                    // shoot
                    break;
            }
        });

        window.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "ArrowLeft":
                case "ArrowRight":
                    this.dx = 0;
                    break;
            }
        });

        this.dx = 0; // +1 (right), -1 (left)
        this.x = parseInt(SCREEN_WIDTH / 2 - SPRITES.player.width / 2);
        this.y = parseInt(.9 * SCREEN_HEIGHT);
    }

    draw(renderer) {
        renderer.updateScreen(this.x, this.y, SPRITES.player.sprite, renderer.screen,[0, 255, 0]);
    }
    
    update() {
        this.x = (this.x + this.dx) % SCREEN_WIDTH;
    }
}

export const entities = {
    aliens: [],
    bunkers: [],
    player: [],
    marchCursor: 0,
    pendingReverse: false,
    count: 1,
    updateEntities(frameCount, renderer) {
        for (const alien of this.aliens) {
            alien.draw(renderer);
        }
        this.checkEdges(renderer);

        const alive = this.aliens
            .filter(a => a.status.alive)
            .sort((a, b) => b.y - a.y || a.x - b.x);
        if (alive.length > 0) {
            const alien = alive[this.marchCursor % alive.length];
            alien.update(frameCount);
            this.marchCursor++;
            if (this.marchCursor >= alive.length) {
                renderer.triggerSound('march', this.count);
                this.marchCursor = 0;
                this.count = (this.count) % 4 + 1;
                if (this.pendingReverse) {
                    for (const a of alive) { a.dx = -a.dx; a.y += 1; }
                    this.pendingReverse = false;
                }
            }
        }

        for (const bunker of this.bunkers) {
            bunker.draw(renderer);
        }

        for (const player of this.player) {
            player.update();
            player.draw(renderer);
        }
    },
    checkEdges(renderer) {
        if (!this.aliens.length) return;
        const dx = this.aliens[0].dx;
        if (dx > 0 && And([renderer.enemyScreen, rightWall]).some(row => row.some(val => val > 0))) {
            this.pendingReverse = true;
        } else if (dx < 0 && And([renderer.enemyScreen, leftWall]).some(row => row.some(val => val > 0))) {
            this.pendingReverse = true;
        }
    },


};