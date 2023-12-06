import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';



const app = express();
const port = 3001; // move to config

app.use(cors()); // doc this


app.get('/api/search', async (req: Request, res: Response) => {
  try {
    //https://api.scryfall.com/cards/search?q=mace
    let api = "https://api.scryfall.com/cards/search"
    // console.log('req is', req);
    let term = req.query.term
    const externalApiUrl = `${api}?q=${term}`; // TODO: env
    console.log('url', externalApiUrl);

    const response = await axios.get(externalApiUrl);
    
    // const externalApiUrl = `https://scryfall.com/search?q=${req}`; // Replace with the actual API endpoint
    // const response = await fetch(externalApiUrl);

    // if (!response.) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    // NEED THIS DATA: image(s), name, set name, number, and rarity

    const data = await response.data
    console.log('data', typeof(data));
    
    //res.status(200).send({message: `Get Results for term: ${term}`})
    res.status(200).send(data)
  } catch (error) {
    console.error('Error making API call:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//https://scryfall.com/search?q=w
//UTF-8 character encoding for all responses



app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}.`);
});
