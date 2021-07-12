import express from "express";
import cors from "cors";

export const appWithCORS = (app = express()) => {
  // Paperpod will be called from wherever
  // Extensions, Applications, third party integrations etc.
  const origin = "*";
  return app.use(
    cors({
      origin,
    })
  );
};
