

import { SCREEN_WIDTH, SCREEN_HEIGHT, SEPARATION, PALETTE } from './constants.js';


// screen size m x n array:
let unity = Array.from({ length: SCREEN_HEIGHT }, () =>
    Array.from({ length: SCREEN_WIDTH }, () => 1)
);

let empty = Array.from({ length: SCREEN_HEIGHT }, () =>
    Array.from({ length: SCREEN_WIDTH }, () => 0)
);

export const rightWall = Array.from({ length: SCREEN_HEIGHT }, () =>
    Array.from({ length: SCREEN_WIDTH }, (_, x) => x === SCREEN_WIDTH - 1 ? 1 : 0)
);

export const leftWall = Array.from({ length: SCREEN_HEIGHT }, () =>
    Array.from({ length: SCREEN_WIDTH }, (_, x) => x === 0 ? 1 : 0)
);


export function And(bitmaps) {
    let result = unity;
    // bitmaps are arrays of arrays of 0s and 1s, 16 x 8
    for (const bitmap of bitmaps) {
        result = result.map((row, y) =>
            row.map((val, x) => val && bitmap[y][x])
        );
    }
    return result;
}

export function Or(bitmaps) {
    let result = empty;
    // bitmaps are arrays of arrays of 0s and 1s, 16 x 8
    for (const bitmap of bitmaps) {
        for (let i = 0; i < bitmap.length; i++) {
            for (let j = 0; j < bitmap[i].length; j++) {
                result[i][j] = bitmap[i][j] + result[i][j];
            }
        }
    }
    return result;
}