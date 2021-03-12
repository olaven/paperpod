import dotenv from "dotenv";
import express from "express";

export const appWithEnvironment = (app = express()) => {
  dotenv.config();
  return app;
};
