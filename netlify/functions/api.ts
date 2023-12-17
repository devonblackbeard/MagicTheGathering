import express, { Handler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from "serverless-http";

const app = express();
dotenv.config();
app.use(cors());

const router = express.Router();

// Define your routes here, similar to what you have in index.ts
router.get('/search', (req, res) => {
  // Handle the search route
  res.json({ message: 'Search endpoint' });
});

app.use('/.netlify/functions/api', router);

export const handler: Handler = serverless(app);


