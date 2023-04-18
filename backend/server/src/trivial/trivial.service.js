
const Trivial = require('./trivial.model');

const getAllTrivial = () => {
    return Trivial.find().lean().exec();
}

const getTrivial = (numQuestion) => {
    return Trivial.findOne({ numQuestion }).lean().exec();
}

const createTrivial = ({ numQuestion, question, answer1, answer2, answer3, answer4 }) => {
    return Trivial.create({ numQuestion, question, answer1, answer2, answer3, answer4 });
}

module.exports = { getAllTrivial, getTrivial, createTrivial }