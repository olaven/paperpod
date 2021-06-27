export const APPLICATION_URL =
  process.env.NODE_ENV !== "production"
    ? "localhost:8080"
    : `https://paperpod.fm`; //TODO: more elegant dev-variation
