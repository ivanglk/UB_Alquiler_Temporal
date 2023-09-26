const mongoose = require('mongoose');
const placeSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'usuario'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extrainfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number,

});

const PlaceModel = mongoose.model('Place', placeSchema);
module.exports = PlaceModel;