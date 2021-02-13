"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateTools_1 = require("./DateTools");
var GetActivities_1 = __importDefault(require("./GetActivities"));
var GetStatus_1 = __importDefault(require("./GetStatus"));
var GetTimesheet_1 = __importDefault(require("./GetTimesheet"));
var GetTimesheets_1 = __importDefault(require("./GetTimesheets"));
var ClockIn_1 = __importDefault(require("./ClockIn"));
var ClockOut_1 = __importDefault(require("./ClockOut"));
var UpdateTimesheet_1 = __importDefault(require("./UpdateTimesheet"));
var KimaiSdk = /** @class */ (function () {
    function KimaiSdk(cfg) {
        // Date tools
        this.getServerTime = DateTools_1.getServerTime.bind(this);
        this.toLocalTime = DateTools_1.toLocalTime.bind(this);
        this.secondsToHumanReadable = DateTools_1.secondsToHumanReadable.bind(this);
        this.getActivities = GetActivities_1.default.bind(this);
        this.getStatus = GetStatus_1.default.bind(this);
        this.getTimesheet = GetTimesheet_1.default.bind(this);
        this.getTimesheets = GetTimesheets_1.default.bind(this);
        this.clockIn = ClockIn_1.default.bind(this);
        this.clockOut = ClockOut_1.default.bind(this);
        this.updateTimesheet = UpdateTimesheet_1.default.bind(this);
        cfg.request_headers = {
            'Content-Type': 'application/json',
            'X-AUTH-USER': cfg.user,
            'X-AUTH-TOKEN': cfg.token,
        };
        this.cfg = cfg;
    }
    return KimaiSdk;
}());
exports.default = KimaiSdk;
//# sourceMappingURL=index.js.map