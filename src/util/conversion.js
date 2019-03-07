//import { GRID_SIZE } from './draw';
//import SVG from 'svg.js';

// https://www.w3schools.com/cssref/css_units.asp
// 1in = 2.54cm = 96px
export const ONE_METER_IN_PIXELS = 3779.5275591;

export function toFloat(number) {
    if (typeof number === 'string') {
        number = number.replace(',', '.');
    }
    return parseFloat(number);
}

export function toFixed(number, precision = 2) {
    return Number.parseFloat(number.toFixed(precision));
}

export function metersToPixels(meters, scale = 1) {
    return toFloat(meters) * ONE_METER_IN_PIXELS * toFloat(scale);
}

// export function metersToPixels(meters) {
//     // GRID_SIZE = 0.5m => 1m = GRID_SIZE * 2
//     return toFloat(meters) * GRID_SIZE * 2;
// }

// export function pixelsToMeters(pixels) {
//     return toFloat(pixels) * 0.5 / GRID_SIZE;
// }

// export function polygonPointsMetersToPixels(points) {
//     if (typeof points === 'string') {
//         const newArray = new SVG.PointArray(points).value.map(o => o.map(k => metersToPixels(k)));
//         return new SVG.PointArray(newArray).toString();
//     }
//     return points;
// }

