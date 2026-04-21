import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants.js';
import { SPRITES } from './sprites.js';

export class Alien {
    constructor(x, y, type) {
        this.dx = 0; // +1 (right), -1 (left)
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
        if (frameCount % 30 === 0) {
            this.status.frame = this.status.frame === 1 ? 2 : 1;
        }
        if (frameCount % 5 === 0 ) {
            this.x = (this.x + this.dx) % SCREEN_WIDTH;
            this.y = (this.y + this.dy) % SCREEN_HEIGHT;
        }
    }
    draw(renderer) {
        if (!this.status.alive) return;
        renderer.updateScreen(this.x, this.y, this.sprite);
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
        this.y = 150;
        this.width = SPRITES.bunker.width;
        this.sprite = SPRITES.bunker.sprite;
    }

    update() {

    }

    draw(renderer) {
        renderer.updateScreen(this.x, this.y, this.sprite, [0, 255, 0]);
    }

    takeDamage() {

    }
}

export class Player {
    constructor() {
        viewport = document.getElementById("viewport");
        console.log(viewport);
        window.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowLeft":
                    this.dx = -1;
                    console.log(this.x);
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
        this.y = parseInt(.8 * SCREEN_HEIGHT);
    }

    draw(renderer) {
        renderer.updateScreen(this.x, this.y, SPRITES.player.sprite, [0, 255, 0]);
    }
    
    update() {
        this.x = (this.x + this.dx) % SCREEN_WIDTH;
    }
}

export const entities = {
    aliens: [],
    bunkers: [],
    player: [],
    updateEntities(frameCount, renderer) {
        for (const alien of this.aliens) {
            alien.update(frameCount);
            alien.draw(renderer);
        }

        for (const bunker of this.bunkers) {
            bunker.draw(renderer);
        }

        for (const player of this.player) {
            player.update();
            player.draw(renderer);
        }
    },


};