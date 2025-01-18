// export const BackendUrl = "https://dev-meet123.vercel.app";
// export const BackendUrl = "http://localhost:5000";

export const BackendUrl = location.hostname === "localhost" ? "http://localhost:5000" :"";
