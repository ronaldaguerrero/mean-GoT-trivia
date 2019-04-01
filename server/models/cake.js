// model
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rating: {type: Number},
    cmt: {type: String, default: ""},
}, {timestamps:true});

const userSchema = new mongoose.Schema({
    name: {type: String, default: "", required: [true, "Name is required"]},
    img: {type: String, default: ""},
    score: {type: Number, default: 0},
    ratings: [ratingSchema]
}, {timestamps:true});

const User = mongoose.model('users', userSchema);
const Rating = mongoose.model('ratings', ratingSchema);

