// take-home-full-stack/netlify/functions/api.ts

import express, { Router } from "express"
import serverless from "serverless-http"

console.log("In netlify functions file");

const api = express()

const router = Router()

api.use("/api/search", router)



export const handler = serverless(api)
