import GroupedActivities from './@types/GroupedActivities';
import Project from './@types/serverResponses/Project';
import Activity from './@types/serverResponses/Activity';
import KimaiSdk from '.';

export default async function GetActivities(this: KimaiSdk): Promise<GroupedActivities> {
  const activitiesByProject: GroupedActivities = {};
  const projects = await fetch(`${this.cfg.base_url}/projects`, {
    method: 'GET',
    headers: this.cfg.request_headers,
  });
  if (!projects.ok) throw new Error('Server reported an error trying to get projects');
  const projectsResponse = await projects.json();
  projectsResponse.forEach((element: Project) => {
    activitiesByProject[element.id] = {
      projectId: element.id,
      name: `${element.name} (${element.parentTitle})`,
      activities: [],
    };
  });
  const activities = await fetch(`${this.cfg.base_url}/activities`, {
    method: 'GET',
    headers: this.cfg.request_headers,
  });
  if (!activities.ok) throw new Error('Server reported an error trying to get activities');
  const activitiesResponse = await activities.json();
  activitiesResponse.forEach((element: Activity) => {
    if (element.project !== null) {
      activitiesByProject[element.project].activities.push({
        activityId: element.id,
        color: element.color,
        name: element.name,
      });
    } else {
      Object.keys(activitiesByProject).forEach((proj) => {
        activitiesByProject[Number(proj)].activities.push({
          activityId: element.id,
          color: element.color,
          name: element.name,
        });
      });
    }
  });

  return activitiesByProject;
}
