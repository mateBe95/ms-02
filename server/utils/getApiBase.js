export function getApiBase() {
  return process.env.NODE_ENV === "production"
    ? "https://ms-02-api.netlify.app/api"
    : "http://localhost:8888/api";
}