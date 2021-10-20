const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        require : true
    },
    address: {
        type: String,
        require: true,
        
    },
    totalChamber: {
        type: Number,
        require: true,
        default: 'N/C'
    }
})

module.exports = mongoose.model('hotels', hotelSchema)