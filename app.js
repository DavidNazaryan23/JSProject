const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))


//Routes
const cardsRouter = require('./routes/cardsRoute')
const tripsRouter = require('./routes/tripsRoute')
const statsRouter = require('./routes/statsRoute')

app.use('/cards', cardsRouter)
app.use('/trips', tripsRouter)
app.use('/stats', statsRouter)

module.exports = app;