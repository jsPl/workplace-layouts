import 'svg.intersections.js'

export function isPathColliding(path1, path2) {
    return path1.intersectsPath(path2, 20).length > 0;
}

/**
 * https://www.ibm.com/developerworks/library/wa-build2dphysicsengine/index.html
 * @param {*} collider SVG.js element
 * @param {*} collidee SVG.js element
 */
export function isRectColliding(collider, collidee) {
    const colliderBox = collider.rbox();
    const collideeBox = collidee.rbox();

    // Store the collider and collidee edges
    var l1 = colliderBox.x;
    var t1 = colliderBox.y;
    var r1 = colliderBox.x2;
    var b1 = colliderBox.y2;

    var l2 = collideeBox.x;
    var t2 = collideeBox.y;
    var r2 = collideeBox.x2;
    var b2 = collideeBox.y2;

    // If any of the edges are beyond any of the
    // others, then we know that the box cannot be
    // colliding
    if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
        return false;
    }

    // If the algorithm made it here, it had to collide
    return true;
}