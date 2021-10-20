const express = require('express');
const Route = express.Router()
const Hotel = require('../Models/hotelsModel')

Route.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

Route.get('/:id', getHotelData, async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.send(hotel)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }

});

Route.post('/', async (req, res) => {
    const hotel = new Hotel({
        name: req.body.name,
        address: req.body.address,
        totalChamber: req.body.totalChamber
    })
    try {
        const newHotel = await hotel.save()
        res.status(201).json(newHotel)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

Route.patch('/:id', getHotelData, async (req, res) => {

    // confirmation message no reveived

    // const hotel = await Hotel.findById(req.params.id)
    if (req.body.name != null) {
        res.hotel.name = req.body.name

    }
    if (req.body.address != null) {
        res.hotel.address = req.body.address

    }
    if (req.body.totalChamber != null) {
        res.hotel.totalChamber = req.body.totalChamber
        
    }
    try {
        const updateHotel = await res.hotel.save()
        res.status(200).json(updateHotel)
    } catch (err) {
        res.status(401).json({ message: err.message })
    }


});

Route.delete('/:id', getHotelData, async (req, res) => {
    try {
        await res.hotel.remove()
        res.status(204).json({ message: 'hotel removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

async function getHotelData(req, res, next) {
  let hotel;
    try {
       hotel = await Hotel.findById(req.params.id)
        if (hotel === null) {
            res.status(404).json({ message: 'Cannot find hotel' })
        }
    } catch (err){
        res.status(500).json({ message: err.message })
    }
    res.hotel = hotel
    next()
}

module.exports = Route