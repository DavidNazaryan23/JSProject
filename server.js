const mongoose = require('mongoose');
require('dotenv').config()


mongoose.connect(process.env.DB)
    .then(connection => { console.log("connected to db") })
    .catch(err => { console.log("couldn't connect") })

const app = require('./app')
const server = app.listen(3000, () => {
    console.log("server listening on port 3000")

})