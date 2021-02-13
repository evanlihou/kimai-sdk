"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secondsToHumanReadable = exports.getServerTime = exports.toLocalTime = void 0;
var format_1 = __importDefault(require("date-fns/format"));
/**
 * Convert a date to the format that the Kimai API expects
 */
function toLocalTime(date, useSeconds) {
    if (useSeconds === void 0) { useSeconds = true; }
    if (date === null || date === undefined)
        return null;
    // YYYY-MM-DDTHH:mm:ss
    return format_1.default(date, (useSeconds ? "yyyy-MM-dd'T'HH:mm:ss" : "yyyy-MM-dd'T'HH:mm"));
}
exports.toLocalTime = toLocalTime;
/**
 * Get the current server time in a format that can then be sent back to the server
 */
function getServerTime() {
    return __awaiter(this, void 0, void 0, function () {
        var timeResponse, currentTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(this.cfg.base_url + "/config/i18n", {
                        method: 'GET',
                        headers: this.cfg.request_headers,
                    })];
                case 1:
                    timeResponse = _a.sent();
                    if (!timeResponse.ok)
                        throw new Error('Server reported an error trying to get the current time');
                    return [4 /*yield*/, timeResponse.json()];
                case 2:
                    currentTime = (_a.sent()).now;
                    if (currentTime === undefined || currentTime === null) {
                        throw new Error('Unable to get current time from server');
                    }
                    return [2 /*return*/, currentTime];
            }
        });
    });
}
exports.getServerTime = getServerTime;
function secondsToHumanReadable(seconds) {
    var numMinutes = Math.round(seconds / 60) % 60;
    var numHours = Math.max(Math.floor(seconds / 60 / 60), 0);
    return numHours + ":" + (numMinutes < 10 ? "0" + numMinutes : numMinutes);
}
exports.secondsToHumanReadable = secondsToHumanReadable;
//# sourceMappingURL=DateTools.js.map