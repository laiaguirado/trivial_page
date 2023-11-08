import React, { useEffect, useState } from "react";
import * as api from "../api";
import { getRandomNum, getRandomNumAndSkipRepeat } from "../utils/math";
const MAX_NUMQUESTION = 5;

const TrivialQuestionGame = () => {
    const [trivialQuestion, setTrivialQuestion] = useState(null);
    const [numQuestion, setNumQuestion] = useState(getRandomNum(MAX_NUMQUESTION));
    const [numQuestionUsed, setNumQuestionUsed] = useState([]);
    const [error, setError] = useState("");

    const loadTrivial = async (num) => {
        const { trivial } = await api.getTrivial(num);
        if (trivial !== null) {
            setTrivialQuestion(trivial);
            { console.log(numQuestion) }
            setNumQuestionUsed(numQuestionUsed => [...numQuestionUsed, num])
            { console.log(numQuestionUsed) }
        } else {
            setTrivialQuestion([]);
        }
    };

    const changeQuestion = () => {
        let random = getRandomNumAndSkipRepeat(MAX_NUMQUESTION, numQuestionUsed);
        console.log("random" + random);
        if (random === 0) {
            setError("no more questions");
        } else {
            setNumQuestion(random);
        }
    }

    useEffect(() => {
        loadTrivial(numQuestion);
    }, [numQuestion]);

    if (trivialQuestion === null) {
        return <div>Loading...</div>;
    } else {

        return (
            <div className="trivial-questionGame">
                <p>{error}</p>
                <button className="trivial-questionGame-changeQuestion" onClick={changeQuestion}>Cambiar pregunta</button>
                <div className="trivial-questionGame-question">{trivialQuestion.question}</div>
                <div className="trivial-questionGame-answers">
                    {trivialQuestion.answers.map((answer, index) => (
                        <button className="trivial-questionGame-answer" key={trivialQuestion._id + "_" + index}>{answer.answer}</button>
                    ))}
                </div>
            </div >
        );
    }
};

export default TrivialQuestionGame;
