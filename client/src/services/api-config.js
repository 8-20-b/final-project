let backendHost;
const apiVersion = "v1";

window.location.hostname === "localhost"
  ? (backendHost = "http://localhost:7777")
  : (backendHost = window.location.origin);

export const API_ROOT = `${backendHost}/${apiVersion}`;
