import model from "./trivial.model.js";
//const Trivial = require('./trivial.model');

const getAllTrivial = () => {
    return model.Trivial.find().sort({ numQuestion: 1 }).lean().exec();
}

const getTrivial = (numQuestion) => {
    return model.Trivial.findOne({ numQuestion }).lean().exec();
}

const createTrivial = ({ numQuestion, question, difficulty, category, answers }) => {
    return model.Trivial.create({ numQuestion, question, difficulty, category, answers });
}

const deleteTrivial = (numQuestion) => {
    return model.Trivial.findOneAndDelete({ numQuestion }).lean().exec();
}

const getAllTrivialByCategory = (category) => {
    return model.Trivial.find({ category }).lean().exec();
}

const getAllTrivialByDifficulty = (difficulty) => {
    return model.Trivial.find({ difficulty }).lean().exec();
}

const getAllTrivialByCategoryAndDifficulty = (category, difficulty) => {
    if (category === "all") {
        return model.Trivial.find({ difficulty }).lean().exec();
    } else if (difficulty === "all") {
        return model.Trivial.find({ category }).lean().exec();
    } else {
        return model.Trivial.find({ $and: [{ category, difficulty }] }).lean().exec();
    }
}

const getTrivialByCategoryWithNumLimit = (category, num) => {
    return model.Trivial.find({ category }).limit(num).lean().exec();
}

const getTrivialByDifficultyWithNumLimit = (difficulty, num) => {
    return model.Trivial.find({ difficulty }).limit(num).lean().exec();
}



//module.exports = { getAllTrivial, getTrivial, createTrivial, deleteTrivial, getAllTrivialByCategory, getAllTrivialByDifficulty, getAllTrivialByCategoryAndDifficulty, getTrivialByDifficultyWithNumLimit, getTrivialByCategoryWithNumLimit }
export default { getAllTrivial, getTrivial, createTrivial, deleteTrivial, getAllTrivialByCategory, getAllTrivialByDifficulty, getAllTrivialByCategoryAndDifficulty, getTrivialByDifficultyWithNumLimit, getTrivialByCategoryWithNumLimit }