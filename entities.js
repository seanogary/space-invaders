import { SPRITES } from './sprites.js';

export class Alien {
    constructor(x, y, type) {
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
            this.status.frame = this.status.frame === 1 ? 2 : 1;0
            if (frameCount % 7 == 0) this.status.frame = 3;
        }
    }
    draw(renderer) {
        if (!this.status.alive) return;
        renderer.updateScreen(this.x, this.y, this.sprite);
    }
    kill() {
        this.status.alive = false;
    }
}

export class Bunker {
    constructor() {
        
    }
}

export class Player {

}

export const entities = {
    aliens: [],
    updateAliens(frameCount, renderer) {
        for (const alien of this.aliens) {
            alien.update(frameCount);
            alien.draw(renderer);
        }
    }
};