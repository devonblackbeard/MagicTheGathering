import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()
const api = process.env.API

const getCard = async (req: Request, res: Response) => {
    try {                
        let term = req.query.term
        const externalApiUrl = `${api}?q=${term}`        
        const response = await axios.get(externalApiUrl)
        
        const data = await response.data
        res.status(200).send(data)
    } catch (error) {
        console.error('Error making API call:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
};


export default { getCard }