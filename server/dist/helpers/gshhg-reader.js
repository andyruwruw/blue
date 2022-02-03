"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var binary_parser_1 = require("binary-parser");
var path = require("path");
// Local Imports
var config_1 = require("../config");
var file_reader_1 = require("./file-reader");
/**
 * Helper class to read GSHHG binary files.
 */
var GSHHGReader = /** @class */ (function () {
    /**
     * Instantiates a GSHHGReader object.
     *
     * @param {number} resolution Desired level of detail from 0 to 4.
     */
    function GSHHGReader(resolution) {
        this._ready = false;
        this._resolution = resolution;
        this._position = 0;
        this._size = 0;
        this._data = '';
        this._fileReader = new file_reader_1.default();
        this._gshhgParser = new binary_parser_1.Parser()
            .int32be('id')
            .int32be('n')
            .int8('level')
            .int8('version')
            .int8('greenwich')
            .int8('source')
            .int32be('west')
            .int32be('east')
            .int32be('south')
            .int32be('north')
            .int32be('area')
            .int32be('areaFull')
            .int32be('container')
            .int32be('ancestor');
        this._gshhgPointParser = new binary_parser_1.Parser()
            .int32be('x')
            .int32be('y');
    }
    /**
     * Loads the binary GSHHG file into the GSHHGReader.
     */
    GSHHGReader.prototype.loadFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._fileReader.readBinaryFile(this._getFilePath())];
                    case 1:
                        _a._data = _b.sent();
                        this._size = this._data.length;
                        this._ready = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves next GSHHG header.
     *
     * @returns {GSHHG | null} GSHHG header, or null if not available.
     */
    GSHHGReader.prototype.getNextGSHHS = function () {
        if (!this._ready
            || this._position >= this._size
            || this.getNumberPointsUnread() > 0) {
            return null;
        }
        var rawGSSHG = this._gshhgParser.parse(Buffer.from(this._data.substring(this._position, this._position + config_1.GSHHG_HALF_BYTE_SIZE), 'hex'));
        rawGSSHG.id = "".concat(rawGSSHG.id);
        this._registerGSHHGRead();
        this._currentGSSHG = __assign(__assign({}, rawGSSHG), { points: [] });
        this._currentGSSHG.north *= config_1.GSSHG_POSITION_SCALE;
        this._currentGSSHG.south *= config_1.GSSHG_POSITION_SCALE;
        this._currentGSSHG.west *= config_1.GSSHG_POSITION_SCALE;
        this._currentGSSHG.east *= config_1.GSSHG_POSITION_SCALE;
        return this._currentGSSHG;
    };
    /**
     * Whether the reader has any remaining GSHHG headers to read.
     *
     * @returns {boolean} Whether the reader has any remaining GSHHG headers to read.
     */
    GSHHGReader.prototype.hasNext = function () {
        return this._position < this._size;
    };
    /**
     * Retrieves next GSHHG point.
     *
     * @returns {GSHHGPoint | null} GSHHG point, or null if not available.
     */
    GSHHGReader.prototype.getNextGSHHSPoint = function () {
        if (!this._ready
            || this._position >= this._size
            || this._currentGSSHG === null
            || this.getNumberPointsUnread() < 1) {
            return null;
        }
        var rawPoint = this._gshhgPointParser.parse(Buffer.from(this._data.substring(this._position, this._position + config_1.GSSHG_POINT_HALF_BYTE_SIZE), 'hex'));
        this._registerGSHHGPointRead();
        var point = {
            x: rawPoint.x * config_1.GSSHG_POSITION_SCALE,
            y: rawPoint.y * config_1.GSSHG_POSITION_SCALE,
        };
        this._currentGSSHG.points.push(point);
        return point;
    };
    /**
     * Retrieves current GSHHG header being queried.
     *
     * @returns {GSHHG | null} GSHHG header, or null if not available.
     */
    GSHHGReader.prototype.getCurrentGSHHG = function () {
        return this._currentGSSHG;
    };
    /**
     * Retrieves current GSHHG header being queried's identifier.
     *
     * @returns {string} GSHHG header identifier, or empty string if not available.
     */
    GSHHGReader.prototype.getCurrentGSHHGId = function () {
        if (this._currentGSSHG) {
            return this._currentGSSHG.id;
        }
        return "";
    };
    /**
     * Retrieves number of points yet to read for the current GSHGG header.
     *
     * @returns {number} Number of points yet to read.
     */
    GSHHGReader.prototype.getNumberPointsUnread = function () {
        if (this._currentGSSHG) {
            return this._currentGSSHG.n - this._currentGSSHG.points.length;
        }
        return -1;
    };
    /**
     * Generates the file path to binary GSHHS file.
     *
     * @returns {string} File path.
     */
    GSHHGReader.prototype._getFilePath = function () {
        var directory = path.join(__dirname, "../../src/data/".concat(config_1.GSHHG_DIRECTORY_NAME));
        var fileName = "".concat(config_1.GSHHG_FILE_PREFIX).concat(config_1.GSHHG_RESOLUTION_NAMES[this._resolution]).concat(config_1.GSHHG_FILE_POSTFIX);
        return "".concat(directory, "/").concat(fileName);
    };
    /**
     * Marks a GSHHG header read.
     */
    GSHHGReader.prototype._registerGSHHGRead = function () {
        this._position += config_1.GSHHG_HALF_BYTE_SIZE;
    };
    /**
     * Marks a GSHHG point read.
     */
    GSHHGReader.prototype._registerGSHHGPointRead = function () {
        this._position += config_1.GSSHG_POINT_HALF_BYTE_SIZE;
    };
    return GSHHGReader;
}());
exports.default = GSHHGReader;
//# sourceMappingURL=gshhg-reader.js.map