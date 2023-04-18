
const mongoose = require('mongoose');

const trivialSchema = mongoose.Schema({
    numQuestion: {
        type: Number,
        unique: true
    },
    question: {
        type: String,
        trim: true,
    },
    answer1: new mongoose.Schema({
        answer: {
            type: String,
            required: true,
        },
        correct: {
            type: Boolean
        },
    }),
    answer2: new mongoose.Schema({
        answer: {
            type: String,
            required: true,
        },
        correct: {
            type: Boolean
        },
    }),
    answer3: new mongoose.Schema({
        answer: {
            type: String,
            required: true,
        },
        correct: {
            type: Boolean
        },
    }),
    answer4: new mongoose.Schema({
        answer: {
            type: String,
            required: true,
        },
        correct: {
            type: Boolean
        },
    })

});

const Trivial = mongoose.model('trivial', trivialSchema);

module.exports = Trivial;