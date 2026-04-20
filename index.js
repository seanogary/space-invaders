const SPRITES= {
    alien: {
        A:[[0,0,1,0,0,0,1,0,0],[0,0,0,1,0,1,0,0,0],[0,0,1,1,1,1,1,0,0],[0,1,1,0,1,0,1,1,0],[1,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,0,1],[1,0,1,0,0,0,1,0,1],[0,0,0,1,0,1,0,0,0]],
        B: [
            [0, 0, 1, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 1, 0, 1, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 0, 0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0]
        ],
    },
    B:[[0,1,0,0,0,0,0,1,0],[1,0,1,0,0,0,1,0,1],[1,0,1,1,1,1,1,0,1],[1,1,1,0,1,0,1,1,1],[1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,0],[0,0,1,0,0,0,1,0,0],[0,1,0,0,0,0,0,1,0]],
  squid:{
    A: [[0,0,0,1,1,0,0,0],[0,0,1,1,1,1,0,0],[0,1,1,1,1,1,1,0],[1,1,0,1,1,0,1,1],[1,1,1,1,1,1,1,1],[0,0,1,0,0,1,0,0],[0,1,0,1,1,0,1,0],[1,0,1,0,0,1,0,1]],
    B: [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0]
    ],
  },
  bunker: [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
};

// create viewport, fixed aspect ratio and relative size set in CSS
const viewport = document.createElement("div");
viewport.style.backgroundColor = "black";
viewport.id = 'viewport'
document.body.appendChild(viewport);

const width = 800;
const height = width * (3 / 4); 
const pixelSize = viewport.getBoundingClientRect().width / 112;
console.log(pixelSize);
const screen = Array.from({ length: 256 / 2 }, () =>
  Array.from({ length: 224 / 2 }, () => [0, 0, 0])
);

const pixelator = (x, y, [r, g, b]) => {
    pixel = document.createElement("div");
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

function hexToRow(byte) {
  return byte.toString(2).padStart(8, '0').split('').map(Number);
}

// Stack bytes into a 2D array
function hexToSprite(bytes) {
  return bytes.map(hexToRow);
}


const renderer = {
    drawPixels() {
        const fragment = document.createDocumentFragment();
        screen.forEach((row, y) => 
            row.forEach((color, x) => 
                equals(color, [0,0,0]) ? null : fragment.appendChild(pixelator(x, y, color))
            )
        );
        viewport.appendChild(fragment);
    },

    updateScreen(x, y, sprite) {
        sprite.forEach((row, rel_y) =>
            row.forEach((val, rel_x) => 
                this.addPixel(x + rel_x, y + rel_y, val == 1 ? [256, 256, 256] : [0,0,0])
    ));
    },

    addPixel(x, y, color) {
        screen[x][y] = color;
    }
}


const squid1 = SPRITES.squid.B;
const squid2 = SPRITES.squid.A;
const alien1 = SPRITES.alien.A;
const alien2 = SPRITES.alien.B;
const bunker = SPRITES.bunker;
renderer.updateScreen(50, 0, squid1)
renderer.updateScreen(30, 0, squid2)
renderer.updateScreen(50, 15, alien1)
renderer.updateScreen(30, 15, alien2)
renderer.updateScreen(30, 15, alien2)
renderer.updateScreen(26, 30, bunker);
renderer.drawPixels();
