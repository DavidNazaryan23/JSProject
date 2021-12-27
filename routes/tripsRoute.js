const express = require('express')
const tripsController = require('../controllers/tripsController')

const router = express.Router();

router.put('/checkIn', tripsController.checkIn)
router.post("/makeTrip", tripsController.makeTrip)
router.put("/checkOut", tripsController.checkOut)

module.exports = router