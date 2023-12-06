import express from 'express'
const router = express.Router()
import contactControllers from '../controllers/cardController'

const { getCard } = contactControllers

// Define routes
router.route("/").get(getCard)


export default router