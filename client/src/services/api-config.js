let backendHost;
const apiVersion = "v1";

const hostname = window && window.location && window.location.hostname;

if (hostname === "herokuapp.com") {
  backendHost = "https://movie-reviews.herokuapp.com";
} else {
  backendHost = "http://localhost:7777";
}

export const API_ROOT = `${backendHost}/${apiVersion}`;
