import { SPRITES } from "./sprites.js";

export function And(bitmaps) {
    let result = SPRITES[empty]
    // bitmaps are arrays of arrays of 0s and 1s, 16 x 8
    for (const bitmap of bitmaps) {
        result = result.map((row, y) =>
            row.map((val, x) => val && bitmap[y][x])
        );
    }
    return result;
}

export function Or(bitmaps) {
    let result = SPRITES[empty]
    // bitmaps are arrays of arrays of 0s and 1s, 16 x 8
    for (const bitmap of bitmaps) {
        result = result.map((row, y) =>
            row.map((val, x) => val || bitmap[y][x])
        );
    }
    return result;
}