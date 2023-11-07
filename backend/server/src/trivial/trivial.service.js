
const Trivial = require('./trivial.model');

const getAllTrivial = () => {
    return Trivial.find().sort({ numQuestion: 1 }).lean().exec();
}

const getTrivial = (numQuestion) => {
    return Trivial.findOne({ numQuestion }).lean().exec();
}

const createTrivial = ({ numQuestion, question, difficulty, category, answers }) => {
    return Trivial.create({ numQuestion, question, difficulty, category, answers });
}

const deleteTrivial = (numQuestion) => {
    return Trivial.findOneAndDelete({ numQuestion }).lean().exec();
}

const getAllTrivialByCategory = (category) => {
    return Trivial.find({ category }).lean().exec();
}

const getAllTrivialByDifficulty = (difficulty) => {
    return Trivial.find({ difficulty }).lean().exec();
}

const getAllTrivialByCategoryAndDifficulty = (category, difficulty) => {
    if (category === "all") {
        return Trivial.find({ difficulty }).lean().exec();
    } else if (difficulty === "all") {
        return Trivial.find({ category }).lean().exec();
    } else {
        return Trivial.find({ $and: [{ category, difficulty }] }).lean().exec();
    }
}

const getTrivialByCategoryWithNumLimit = (category, num) => {
    return Trivial.find({ category }).limit(num).lean().exec();
}

const getTrivialByDifficultyWithNumLimit = (difficulty, num) => {
    return Trivial.find({ difficulty }).limit(num).lean().exec();
}



module.exports = { getAllTrivial, getTrivial, createTrivial, deleteTrivial, getAllTrivialByCategory, getAllTrivialByDifficulty, getAllTrivialByCategoryAndDifficulty, getTrivialByDifficultyWithNumLimit, getTrivialByCategoryWithNumLimit }