const trivial = require("./trivial.service");

const getAllTrivial = async (req, res) => {
    try {
        const result = await trivial.getAllTrivial();
        res.status(200).send(result);
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
        const { numQuestion, question, answer1, answer2, answer3, answer4 } = req.body;
        const created = await trivial.createTrivial({ numQuestion, question, answer1, answer2, answer3, answer4 });
        res.status(201).send(created);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server error' });
    }
};

const addRoutesTo = (app) => {
    app.get("/trivials", getAllTrivial);
    app.get("/trivial/:numQuestion", getTrivial);
    app.post("/trivial", createTrivial);
};

module.exports = {
    addRoutesTo,
};