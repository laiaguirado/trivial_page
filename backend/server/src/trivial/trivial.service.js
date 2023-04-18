
const Trivial = require('./trivial.model');

const getAllTrivial = () => {
    return Trivial.find().lean().exec();
}

const getTrivial = (numQuestion) => {
    return Trivial.findOne({ numQuestion }).lean().exec();
}

const createTrivial = ({ numQuestion, question, difficulty, category, answers }) => {
    return Trivial.create({ numQuestion, question, difficulty, category, answers });
}

module.exports = { getAllTrivial, getTrivial, createTrivial }