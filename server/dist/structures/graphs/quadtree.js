"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadTree = void 0;
/**
 * Defines a set of spacially queriable data.
 */
var QuadTree = /** @class */ (function () {
    /**
     * Instantiates a new QuadTree with a given boundary.
     *
     * @param {Rectangle} boundary Bounding box of the QuadTree.
     * @param {number} capacity Maximum number of nodes per subdivision.
     */
    function QuadTree(boundary, capacity) {
        this._boundary = boundary;
        this._capacity = capacity;
        this._nodes = [];
        this._divided = false;
        this._topRightQuadrant = null;
        this._topLeftQuadrant = null;
        this._bottomRightQuadrant = null;
        this._bottomLeftQuadrant = null;
    }
    /**
     * Inserts a new node into the QuadTree.
     *
     * @param {GraphNode} node Node to insert.
     * @returns {boolean} Whether the node was inserted.
     */
    QuadTree.prototype.insert = function (node) {
        if (!this._boundary.contains(node.getPosition())) {
            return false;
        }
        if (this._nodes.length < this._capacity) {
            this._nodes.push(node);
            return true;
        }
        if (!this._divided) {
            this._subdivide();
        }
        return (this._topRightQuadrant.insert(node)
            || this._topLeftQuadrant.insert(node)
            || this._bottomRightQuadrant.insert(node)
            || this._bottomLeftQuadrant.insert(node));
    };
    /**
     * Finds all nodes within a given range.
     *
     * @param {Cirlce | Rectangle} range The range to query.
     * @param {GraphNode[]} found Nodes found within the range.
     */
    QuadTree.prototype.query = function (range, found) {
        if (found === void 0) { found = []; }
        if (!range.intersects(this._boundary)) {
            return;
        }
        for (var _i = 0, _a = this._nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            if (range.contains(node.getPosition())) {
                found.push(node);
            }
        }
        if (this._divided) {
            this._topLeftQuadrant.query(range, found);
            this._topRightQuadrant.query(range, found);
            this._bottomLeftQuadrant.query(range, found);
            this._bottomRightQuadrant.query(range, found);
        }
    };
    /**
     * Runs a function on each Node in the QuadTree.
     *
     * @param {Function} fn Function to run on each Node.
     */
    QuadTree.prototype.forEach = function (fn) {
        this._nodes.forEach(fn);
        if (this._divided) {
            this._topRightQuadrant.forEach(fn);
            this._topLeftQuadrant.forEach(fn);
            this._bottomRightQuadrant.forEach(fn);
            this._bottomLeftQuadrant.forEach(fn);
        }
    };
    /**
     * Retrieves the QuadTree's boundary.
     *
     * @returns {Rectangle} QuadTree's boundary.
     */
    QuadTree.prototype.getBoundary = function () {
        return this._boundary;
    };
    /**
     * Retrieves the number of Nodes in the QuadTree.
     *
     * @returns {number} The number of Nodes in the QuadTree.
     */
    QuadTree.prototype.getLength = function () {
        var count = this._nodes.length;
        if (this._divided) {
            count += this._topLeftQuadrant.getLength();
            count += this._topRightQuadrant.getLength();
            count += this._bottomLeftQuadrant.getLength();
            count += this._bottomRightQuadrant.getLength();
        }
        return count;
    };
    /**
     * Subdivides the QuadTree into quadrants.
     */
    QuadTree.prototype._subdivide = function () {
        this._topRightQuadrant = new QuadTree(this._boundary.getTopRightQuadrant(), this._capacity);
        this._topLeftQuadrant = new QuadTree(this._boundary.getTopLeftQuadrant(), this._capacity);
        this._bottomRightQuadrant = new QuadTree(this._boundary.getBottomRightQuadrant(), this._capacity);
        this._bottomLeftQuadrant = new QuadTree(this._boundary.getBottomLeftQuadrant(), this._capacity);
        this._divided = true;
    };
    return QuadTree;
}());
exports.QuadTree = QuadTree;
//# sourceMappingURL=quadtree.js.map