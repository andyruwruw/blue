"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphNode = void 0;
/**
 * Represents data at a given position.
 */
var GraphNode = /** @class */ (function () {
    /**
     * Instantiates a new Node.
     *
     * @param {Vector2} position Initial position of the node.
     * @param {any} data Data the node holds.
     */
    function GraphNode(position, data) {
        if (data === void 0) { data = null; }
        this._position = position;
        this._data = data;
    }
    /**
     * Retrieves the Node's position.
     *
     * @returns {Vector2} Position of the Node.
     */
    GraphNode.prototype.getPosition = function () {
        return this._position;
    };
    /**
     * Retrieves the attatched data for the Node.
     *
     * @returns {any} Data the Node holds.
     */
    GraphNode.prototype.getData = function () {
        return this._data;
    };
    return GraphNode;
}());
exports.GraphNode = GraphNode;
//# sourceMappingURL=graph-node.js.map