const trivial = require("./trivial.service");

const getAllTrivial = async (req, res) => {
    try {
        const result = await trivial.getAllTrivial();
        res.status(200).send({ trivialList: result });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server error' });
    }

}

const getTrivial = async (req, res) => {
    try {
        const { numQuestion } = req.params;
        const result = await trivial.getTrivial(numQuestion);
        res.status(200).send(result);

    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server error' });
    }
}

const createTrivial = async (req, res) => {
    try {
        const { numQuestion, question, difficulty, category, answers } = req.body;
        const created = await trivial.createTrivial({ numQuestion, question, difficulty, category, answers });
        res.status(201).send(created);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server error' });
    }
};

const deleteTrivial = async (req, res) => {
    try {
        const { numQuestion } = req.params;
        const deleted = await trivial.deleteTrivial(numQuestion);
        if (deleted === null) {
            return res.status(404).send({ error: `Trivial with numQuestion ${numQuestion} not found` });
        }
        res.status(201).send({ deletedTrivial: deleted });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server error' });
    }
};

const getAllTrivialByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const result = await trivial.getAllTrivialByCategory(category);
        res.status(200).send({ trivialList: result });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server error' });
    }

}

const getAllTrivialByDifficulty = async (req, res) => {
    try {
        const { difficulty } = req.params;
        const result = await trivial.getAllTrivialByDifficulty(difficulty);
        res.status(200).send({ trivialList: result });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server error' });
    }

}

const getAllTrivialByCategoryAndDifficulty = async (req, res) => {
    try {
        const { category, difficulty } = req.params;
        const result = await trivial.getAllTrivialByCategoryAndDifficulty(category, difficulty);
        res.status(200).send({ trivialList: result });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server error' });
    }

}

const getTrivialByCategoryWithNumLimit = async (req, res) => {
    try {
        const { category, num } = req.params;
        const result = await trivial.getTrivialByCategoryWithNumLimit(category, num);
        res.status(200).send({ trivialList: result });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server error' });
    }

}

const getTrivialByDifficultyWithNumLimit = async (req, res) => {
    try {
        const { difficulty, num } = req.params;
        const result = await trivial.getTrivialByDifficultyWithNumLimit(difficulty, num);
        res.status(200).send({ trivialList: result });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server error' });
    }

}

const addRoutesTo = (app) => {
    app.get("/trivials", getAllTrivial);
    app.get("/trivial/:numQuestion", getTrivial);
    app.post("/trivial", createTrivial);
    app.delete("/trivial/:numQuestion", deleteTrivial);
    app.get("/trivials/category/:category", getAllTrivialByCategory);
    app.get("/trivials/difficulty/:difficulty", getAllTrivialByDifficulty);
    app.get("/trivials/category/:category/difficulty/:difficulty", getAllTrivialByCategoryAndDifficulty);
    app.get("/trivials/category/:category/:num", getTrivialByCategoryWithNumLimit);
    app.get("/trivials/difficulty/:difficulty/:num", getTrivialByDifficultyWithNumLimit);
};

module.exports = {
    addRoutesTo,
};