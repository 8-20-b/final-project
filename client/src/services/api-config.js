let backendHost;
const apiVersion = "v1";

const hostname = window && window.location && window.location.hostname;

if (hostname === "movie-reviews.herokuapp.com") {
  backendHost = window.location.origin;
} else {
  backendHost = "http://localhost:7777";
}

export const API_ROOT = `${backendHost}/${apiVersion}`;
