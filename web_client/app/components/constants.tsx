const TIMEOUT = 3;  // time in seconds till it is considered "not connected"
const MAXPOINTS = 30; // number of points to store in a graph
const API_URL = "http://localhost:2000/api/sensors";  // base url for the rest api
const exports = { TIMEOUT, MAXPOINTS, API_URL }

export default exports;