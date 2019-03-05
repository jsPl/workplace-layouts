import { GRID_SIZE } from './draw';
import SVG from 'svg.js';

export function generateRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getProductionHallIdFromUrl() {
    return new URL(window.location.href).searchParams.get('hala_id') || '';
}

export function toFloat(number) {
    if (typeof number === 'string') {
        number = number.replace(',', '.');
    }
    return parseFloat(number);
}

export function metersToPixels(meters) {
    // GRID_SIZE = 0.5m => 1m = GRID_SIZE * 2
    return toFloat(meters) * GRID_SIZE * 2;
}

export function pixelsToMeters(pixels) {
    return toFloat(pixels) * 0.5 / GRID_SIZE;
}

export function polygonPointsMetersToPixels(points) {
    if (typeof points === 'string') {
        const newArray = new SVG.PointArray(points).value.map(o => o.map(k => metersToPixels(k)));
        return new SVG.PointArray(newArray).toString();
    }
    return points;
}

export function toFixed(number, precision = 2) {
    return Number.parseFloat(number.toFixed(precision));
}