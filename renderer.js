import { SCREEN_WIDTH, SCREEN_HEIGHT, PALETTE } from './constants.js';

let viewport;
let pixelSize;
const screen = Array.from({ length: SCREEN_HEIGHT }, () =>
  Array.from({ length: SCREEN_WIDTH }, () => PALETTE.black)
);

const pixelator = (x, y, [r, g, b]) => {
    const pixel = document.createElement("div");
    pixel.style.position = "absolute";
    pixel.style.left = (x * pixelSize) + "px";
    pixel.style.top = (y * pixelSize) + "px";
    pixel.style.width = pixelSize + "px";
    pixel.style.height = pixelSize + "px";
    pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    return pixel;
}

const equals = (a, b) => 
    a.length === b.length && 
    a.every((val, index) => val === b[index]);

export const renderer = {
    init() {
        viewport = document.createElement("div");
        viewport.style.backgroundColor = "black";
        viewport.id = 'viewport'
        document.body.appendChild(viewport);
        pixelSize = viewport.getBoundingClientRect().width / SCREEN_WIDTH;
    },

    clearScreen() {
        for (let row = 0; row < screen.length; row++) {
            for (let col = 0; col < screen[row].length; col++){
                screen[row][col] = PALETTE.black;
            }
        }
        viewport.innerHTML = "";
    },
    drawPixels() {
        const fragment = document.createDocumentFragment();
        screen.forEach((row, y) => 
            row.forEach((color, x) => 
                !equals(color, PALETTE.black) && fragment.appendChild(pixelator(x, y, color))
            )
        );
        viewport.appendChild(fragment);
    },
    updateScreen(x, y, sprite) {
        sprite.forEach((row, rel_y) =>
            row.forEach((val, rel_x) => 
                this.addPixel(x + rel_x, y + rel_y, val == 1 ? PALETTE.white : PALETTE.black)
    ));
    },
    addPixel(x, y, color) {
        if (x >= 0 && x < SCREEN_WIDTH && y >= 0 && y < SCREEN_HEIGHT) {
            screen[y][x] = color;
        }
    }
}