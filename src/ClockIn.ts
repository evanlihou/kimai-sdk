import KimaiSdk from '.';
import Timesheet from './@types/serverResponses/Timesheet';

/**
 * Clock in
 * @param {ClockInOpts} opts          - The request information
 */
export default async function ClockIn(this: KimaiSdk, opts: ClockInOpts): Promise<Timesheet> {
  const data: ClockInData = {
    project: opts.project,
    activity: opts.activity,
    begin: await this.getServerTime(),
  };
  if (opts.description !== undefined) {
    data.description = opts.description;
  }

  const response = await fetch(`${this.cfg.base_url}/timesheets`, {
    method: 'POST',
    headers: this.cfg.request_headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Server reported an error trying to clock in');
  const body = await response.json();
  return body;
}

/**
 * Options for clocking in
 */
interface ClockInOpts {
  project: number,
  activity: number,
  description?: string
}

interface ClockInData {
  project: number,
  activity: number,
  begin: string,
  description?: string
}
