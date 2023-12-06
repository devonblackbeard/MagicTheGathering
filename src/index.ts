import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv'
import router from './routes/cardRoutes';


const app = express();
dotenv.config()
app.use(cors()); 

const port = process.env.PORT

app.use("/api/search", router)


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}.`);
});
