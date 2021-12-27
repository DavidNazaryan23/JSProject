const mongoose = require('mongoose')
const Trip = require('../model/tripModel')
const Card = require('../model/cardModel')

const redisScan = require('redisscan');
import { createClient } from 'redis';

const client = null;
(async () => {
    client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

})();

const getAverageTime = async (req, res, next) => {

    try {

        //gets an array of durations, given start and end destinations
        const neededDurations = await Trip.find(
            {
                startDestination: req.body.start,
                endDestination: req.body.end
            },
            {
                _id: 0,
                duration: 1
            }
        )

        // gets the average duration from the array
        const average = neededDurations.reduce((a, b) => { a + b }) / neededDurations.length
        res.json({
            average
        })

    } catch (error) {
        res.sendStatus(400)

    }
}

const getTenMostSpent = async (req, res, next) => {

    try {

        const topTen = []

        //get ids from redis or find from mongo and update redis
        await client.get('card_ids', (error, card_ids) => {
            if (error) {
                // no ids in redis, get it from mongo, store in redis
                const topTenFromMongo = await Card.find().sort({ spentOverall: -1 }).limit(10).select({ id: 1 })
                client.setex("client_ids", process.env.DEFAULT_REDIS_EXP, JSON.stringify(topTen))
                topTen = topTenFromMongo
            } else {

                topTen = card_ids
            }
        })

        res.json(topTen)

    } catch (error) {
        res.sendStatus(400)

    }
}




module.exports = { getAverageTime, getTenMostSpent }