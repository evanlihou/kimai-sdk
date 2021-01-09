import formatGetParams from './FormatGetParams';
import GetTimesheetsData from './@types/GetTimesheetsData';
import Timesheet from './@types/serverResponses/Timesheet';
import KimaiSdk from '.';

/**
 * Get the timesheets that fit the given parameters
 * @param {GetTimesheetsOpts} opts          - The request information
 */
export default async function GetTimesheets(this: KimaiSdk, opts: GetTimesheetsOpts): Promise<Timesheet[]> {
  const data: GetTimesheetsData = {
    full: true,
  };
  if (opts.start !== undefined) {
    data.begin = opts.start.toISOString();
  }
  if (opts.end !== undefined) {
    data.end = opts.end.toISOString();
  }
  if (opts.customerId !== undefined) {
    data.customers = opts.customerId;
  }

  const response = await fetch(`${this.cfg.base_url}/timesheets${formatGetParams(data)}`, {
    method: 'GET',
    headers: this.cfg.request_headers,
  });
  if (!response.ok) throw new Error('Server reported an error trying to get timesheets');
  const body = await response.json();
  return body;
}

/**
 * Options for getting timesheets
 * @typedef {Object} GetTimesheetsOpts
 * @property {date} start
 * @property {date} end
 * @property {int?} customerId
 */

interface GetTimesheetsOpts {
  start?: Date,
  end?: Date,
  customerId?: number
}
