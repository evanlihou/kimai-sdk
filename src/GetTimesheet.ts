import KimaiSdk from '.';
import Timesheet from './@types/serverResponses/Timesheet';

/**
 * Get a timesheet
 * @param {number} id          - Timesheet ID
 */
export default async function GetTimesheet(this: KimaiSdk, id: number): Promise<Timesheet> {
  const response = await fetch(`${this.cfg.base_url}/timesheets/${id}`, {
    method: 'GET',
    headers: this.cfg.request_headers,
  });
  if (!response.ok) throw new Error('Server reported an error trying to get timesheet');
  const body = await response.json();
  if (body.begin !== null) body.begin = new Date(body.begin);
  if (body.end !== null) body.end = new Date(body.end);
  return body;
}
