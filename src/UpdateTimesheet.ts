import KimaiSdk from '.';
import Timesheet from './@types/serverResponses/Timesheet';

export default async function UpdateTimesheet(this: KimaiSdk, opts: UpdateTimesheetOpts): Promise<Timesheet> {
  const data: UpdateTimesheetData = {
    description: opts.description,
  };

  if (opts.begin !== undefined) {
    data.begin = this.toLocalTime(opts.begin) ?? undefined;
  }
  if (opts.end !== undefined) {
    data.end = this.toLocalTime(opts.end) ?? undefined;
  }
  if (opts.projectId !== undefined) {
    data.project = opts.projectId;
  }
  if (opts.activityId !== undefined) {
    data.activity = opts.activityId;
  }

  const response = await fetch(`${this.cfg.base_url}/timesheets/${opts.id}`, {
    method: 'PATCH',
    headers: this.cfg.request_headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Server reported an error trying to update timesheets');
  const body = await response.json();
  return body;
}

interface UpdateTimesheetOpts {
  id: number,
  description: string,
  projectId?: number,
  activityId?: number,
  begin?: Date,
  end?: Date
}

interface UpdateTimesheetData {
  description: string,
  project?: number,
  activity?: number,
  begin?: string,
  end?: string
}
