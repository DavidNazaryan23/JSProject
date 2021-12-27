const mongoose = require('mongoose')


const cardSchema = new mongoose.Schema({

    balance: {
        type: Number,
        default: 0
    },
    spentOverall: {
        type: Number,
        default: 0,
        index: true
    },
    isCheckedIn:{
        type:Boolean,
        default: false
    },
    hasToPay:{
        type:Number,
        default: 0
    }


})


module.exports = mongoose.model("Card", cardSchema)