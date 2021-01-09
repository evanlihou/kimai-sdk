import KimaiSdk from '.';
import Timesheet from './@types/serverResponses/Timesheet';

/**
 * Clock out
 */
export default async function ClockOut(this: KimaiSdk, opts: ClockOutOpts): Promise<Timesheet> {
  const data: ClockOutData = {
    end: await this.getServerTime(),
  };
  if (opts.description !== undefined) {
    data.description = opts.description;
  }

  const response = await fetch(`${this.cfg.base_url}/timesheets/${opts.id}`, {
    method: 'PATCH',
    headers: this.cfg.request_headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Server reported an error trying to clock out');
  const body = await response.json();
  return body;
}

/**
 * Options for clocking out
 */
interface ClockOutOpts {
  id: number,
  description?: string
}

interface ClockOutData {
  end: string,
  description?: string
}
