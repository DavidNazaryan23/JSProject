const express = require('express')

const statsController = require('../controllers/statsController')

const router = express.Router();

router.get("/averageTime", statsController.getAverageTime)
router.get("/topTenSpent", statsController.getTenMostSpent)

module.exports = router