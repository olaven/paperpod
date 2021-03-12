import express from "express";

export const appWithBodyParser = (app = express()) =>
  app.use(express.json()).use(express.urlencoded({ extended: true }));
