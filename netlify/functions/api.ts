// take-home-full-stack/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();

api.use("/.netlify/functions/api", router);



export const handler = serverless(api);
