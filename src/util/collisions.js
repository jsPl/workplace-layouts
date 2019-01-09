import 'svg.intersections.js'

export function isPathColliding(path1, path2) {
    return path1.intersectsPath(path2, 20).length > 0;
}