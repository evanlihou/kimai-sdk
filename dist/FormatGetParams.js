"use strict";
/**
 * @file Helper to take an array of parameters and format them as a GET query string
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Take an array of parameters and format them as a GET query string
 * @param {Array} params
 */
function formatGetParams(params) {
    return "?" + Object.keys(params).map(function (key) { return key + "=" + encodeURIComponent(params[key]); }).join('&');
}
exports.default = formatGetParams;
//# sourceMappingURL=FormatGetParams.js.map