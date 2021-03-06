import { startOfWeek, startOfDay, differenceInSeconds } from 'date-fns';
import formatGetParams from './FormatGetParams';
import Timesheet from './@types/serverResponses/Timesheet';
import Activity from './@types/serverResponses/Activity';
import GetTimesheetsData from './@types/GetTimesheetsData';
import KimaiSdk from '.';

export async function GetWeekTotal(this: KimaiSdk, { customer }: { customer?: number }) {
  let totalSeconds = 0;
  const weekStart = startOfWeek(new Date());
  const data: GetTimesheetsData = {
    begin: this.toLocalTime(weekStart) ?? undefined,
  };
  if (customer !== undefined) {
    data.customers = customer;
  }
  const response = await fetch(`${this.cfg.base_url}/timesheets${formatGetParams(data)}`, {
    method: 'GET',
    headers: this.cfg.request_headers,
  });
  if (!response.ok) throw new Error('Server reported an error trying to get week total');
  const body: Timesheet[] = await response.json();
  const durations: number[] = body.map(v => (
    v.end !== null
      ? v.duration
      : differenceInSeconds(new Date(), new Date(v.begin))));
  if (durations.length > 0) totalSeconds += durations.reduce((acc, item) => acc + item);

  return totalSeconds;
}

export async function GetDayTotal(this: KimaiSdk, { customer }: { customer?: number }) {
  let totalSeconds = 0;
  const dayStart = startOfDay(new Date());
  const data: GetTimesheetsData = {
    begin: this.toLocalTime(dayStart) ?? undefined,
  };
  if (customer !== undefined) {
    data.customers = customer;
  }
  const response = await fetch(`${this.cfg.base_url}/timesheets${formatGetParams(data)}`, {
    method: 'GET',
    headers: this.cfg.request_headers,
  });
  if (!response.ok) throw new Error('Server reported an error trying to get day total');
  const body: Timesheet[] = await response.json();
  const durations: number[] = body.map(v => (
    v.end !== null
      ? v.duration
      : differenceInSeconds(new Date(), new Date(v.begin))));
  if (durations.length > 0) totalSeconds += durations.reduce((acc, item) => acc + item);

  return totalSeconds;
}

export async function GetCurrentTimesheet(this: KimaiSdk): Promise<Timesheet> {
  const response = await fetch(`${this.cfg.base_url}/timesheets/active`, {
    method: 'GET',
    headers: this.cfg.request_headers,
  });
  if (!response.ok) throw new Error('Server reported an error trying to get current timesheet');
  const body = await response.json();

  // NOTE: This assumes there will only ever be 1 or 0 timesheets running
  return (body.length === 0 ? null : body[0]);
}

/**
 * Get current status and statistics about time tracking
 * @param {GetStatusOpts} opts          - The request information
 */
export default async function GetStatus(this: KimaiSdk): Promise<Status> {
  const [dayTotal, weekTotal, fribWeekTotal, currentTimesheet] = await Promise.all([
    GetDayTotal.bind(this)({}), GetWeekTotal.bind(this)({}), GetWeekTotal.bind(this)({ customer: 1 }), GetCurrentTimesheet.bind(this)()]);
  const status = {
    status: {
      timesheetId: currentTimesheet !== null ? currentTimesheet.id : null,
      clockedIn: currentTimesheet !== null,
      jobName: currentTimesheet !== null ? (currentTimesheet.activity as Activity).name : null,
      start: currentTimesheet !== null ? new Date(currentTimesheet.begin) : null,
      end: currentTimesheet !== null && currentTimesheet.end !== null
        ? new Date(currentTimesheet.end) : null,
      shiftTime: currentTimesheet !== null
        ? this.secondsToHumanReadable(differenceInSeconds(new Date(), new Date(currentTimesheet.begin)))
        : null,
      shiftNotes: currentTimesheet !== null ? currentTimesheet.description : null,
    },
    totals: {
      day: this.secondsToHumanReadable(dayTotal),
      week: this.secondsToHumanReadable(weekTotal),
      fribWeek: this.secondsToHumanReadable(fribWeekTotal),
    },
  };

  return status;
}

export interface StatusStatus {
  timesheetId: number | null,
  clockedIn: boolean,
  jobName: string | null,
  start: Date | null,
  end: Date | null,
  shiftTime: string | null,
  shiftNotes: string | null,
}

export interface StatusTotals {
  day: string,
  week: string,
  fribWeek: string
}

export type Status = {
  status: StatusStatus,
  totals: StatusTotals,
}
