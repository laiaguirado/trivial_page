
const mongoose = require('mongoose');

const trivialSchema = mongoose.Schema({
    numQuestion: {
        type: Number,
        unique: true,
        required: true,
    },
    question: {
        type: String,
        trim: true,
        required: true,
    },
    difficulty: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    answers: [
        new mongoose.Schema({
            answer: {
                type: String,
                required: [true, "Answer is required"],
            },
            isCorrect: {
                type: Boolean
            },
        }),
    ]
});

const Trivial = mongoose.model('trivial', trivialSchema);

module.exports = Trivial;