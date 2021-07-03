import express from "express";
import cookieParser from "cookie-parser";

export const appWithCookieParser = (app = express()) => app.use(cookieParser());
