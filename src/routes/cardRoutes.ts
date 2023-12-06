import express from 'express'
const router = express.Router()
import contactControllers from '../controllers/cardController.ts'

const { getCard } = contactControllers

// Define routes
router.route("/").get(getCard)


export default router