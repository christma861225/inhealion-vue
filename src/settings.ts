export const settings = {
  // apiUrl: "http://localhost:8080"
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "https://inhealion.gr/session/api"
      : "http://localhost:8080"
};
