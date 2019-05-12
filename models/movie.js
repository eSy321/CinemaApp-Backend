const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    number: Number,
    seance: {
        hour: Array,
        seats: Array
    }
})

const Movies = mongoose.model('Movies', movieSchema);

exports.movieSchema = movieSchema;
exports.Movies = Movies;