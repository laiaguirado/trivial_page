
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

//añadir get de una question de cada category

//añadir get de una question de cada difficulty

//añadir get de una question con una category y difficulty

//añadir get de num questions de cada category

//añadir get de num questions de cada difficulty



module.exports = { getAllTrivial, getTrivial, createTrivial }