
const mongoose = require('mongoose')
const Card = require('../model/cardModel')

const addFunds = async (req, res, next) => {

    const id = req.body.id;
    const amount = req.body.amount;




    try {

        if (amount <= 0) {
            throw new Error()
        }

        //find the card, update the balance, save it back
        const card = await Card.findById(id)
        const oldAmount = card.balance
        card.balance = oldAmount + amount
        card.save();

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(400)
    }

}






module.exports = { addFunds }