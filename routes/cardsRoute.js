
const express = require('express')

const cardsController = require('../controllers/cardsController')

const router = express.Router();

router.patch('/addFunds', cardsController.addFunds)


module.exports = router