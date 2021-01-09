export interface KimaiConfiguration {
  /** A friendly URL to the Kimai interface, used to provide a link to the user */
  friendly_url?: string,
  /** The base API endpoint for Kimai, including the `/api` but not including a `/` at the end */
  base_url: string,
  /** The username of the user authenticating with the API */
  user: string,
  /** The API token of the user authenticating with the API (not their password) */
  token: string,
  /** The headers to be passed into `fetch`. These will be overwritten by the constructor */
  request_headers?: Headers
}