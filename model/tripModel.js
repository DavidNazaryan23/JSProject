const { ObjectId } = require('bson')
const mongoose = require('mongoose')


const tripSchema = new mongoose.Schema({
    startDestionation: {
        type: String,
        required: true,
    },
    endDestination: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    cardId:{
        type:ObjectId,
        required:true
    }
})


module.exports = mongoose.model("Trip", tripSchema)
