import axios from "axios";

export const transport = axios.create({
  withCredentials: true,
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://95.182.122.177:8080"
      : "http://localhost:8080",
});
