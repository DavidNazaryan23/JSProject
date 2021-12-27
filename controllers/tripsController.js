const mongoose = require('mongoose')
const Trip = require('../model/tripModel')
const Card = require('../model/cardModel')


// keeps the stations with their numnbers 
const map = new Map()
map.set("Barekamutyun", 1)
map.set("Baghramyna", 2)
map.set("Eritasardakan", 3)
map.set("Hraparak", 4)

//

const checkIn = async(req,res,next)=>{

    const cardId = req.body.cardId;

    //  find the card by id and check it in
    try {

        const card = await Card.findById(cardId)
        if (!card) {
            throw new Error("No such card")
        }

        card.isCheckedIn = true;
        card.save()
    
        res.sendStatus(200)

    } catch (err) {
        res.sendStatus(400)
    }

}



const makeTrip = async (req, res, next) => {

    const startDestination = req.body.start
    const endDestination = req.body.end

    // calculate the fee by finding the number of the station using the map 
    const fee = Math.abs(map.get(startDestination) - map.get(endDestination)) * process.env.FEE_CONSTANT

    const cardId = req.body.cardId;


    let trip = {
        startDestination,
        endDestination,
        duration: req.body.duration,
        fee,
        cardId
    }


        // find the card by id, create a trip for it and save the amount to be payed later at checkout
    try {

        const card = await Card.findById(cardId)
        if (!card) {
            throw new Error("No such card")
        }

        if(!card.isCheckedIn){
            throw new Error("Not checked in")
        }


        const oldBalance = card.balance
        

        if (card.balance < trip.fee) {
            throw new Error("Not enough funds")
        }

        card.hasToPay = fee;
        
        await card.save()
        await trip.save()

        res.sendStatus(200)

    } catch (err) {
        res.sendStatus(400)
    }



}


const checkOut = async (req,res,next)=>{

    const cardId = req.body.cardId;

    
    try {

        const card = await Card.findById(cardId)
        if (!card) {
            throw new Error("No such card")
        }

        const hasToPay = card.hasToPay
        const oldBalance = card.balance
        const oldHistory = card.spentOverall

        card.balance = oldBalance - hasToPay
        card.spentOverall = oldHistory + hasToPay
        card.hasToPay = 0
        card.isCheckedIn = false
        
        card.save()
    
        res.sendStatus(200)

    } catch (err) {
        res.sendStatus(400)
    }

}

module.exports = { makeTrip , checkIn, checkOut}