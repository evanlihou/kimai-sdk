import KimaiConfiguration from "./KimaiConfiguration";
import { getServerTime, toLocalTime, secondsToHumanReadable } from './DateTools';

import getActivities from './GetActivities';
import getStatus from './GetStatus';
import getTimesheet from './GetTimesheet';
import getTimesheets from './GetTimesheets';

import clockIn from './ClockIn';
import clockOut from './ClockOut';
import updateTimesheet from './UpdateTimesheet';

export default class KimaiSdk {
    public cfg: KimaiConfiguration;
    constructor(cfg: KimaiConfiguration) {
        cfg.request_headers = {
            'Content-Type': 'application/json',
            'X-AUTH-USER': cfg.user,
            'X-AUTH-TOKEN': cfg.token,
        } as unknown as Headers;
        this.cfg = cfg;
    }

    // Date tools
    public getServerTime = getServerTime.bind(this);
    public toLocalTime = toLocalTime.bind(this);
    public secondsToHumanReadable = secondsToHumanReadable.bind(this);

    public getActivities = getActivities.bind(this);
    public getStatus = getStatus.bind(this);
    public getTimesheet = getTimesheet.bind(this);
    public getTimesheeets = getTimesheets.bind(this);

    public clockIn = clockIn.bind(this);
    public clockOut = clockOut.bind(this);
    public updateTimesheet = updateTimesheet.bind(this);
}
