import React, { useEffect, useState } from "react";
import * as api from "../api";
import { getRandomNum, getRandomNumAndSkipRepeat } from "../utils/math";
import { backdropClasses } from "@mui/material";
import TrivialGameEvolution from "./TrivialGameEvolution";
const MAX_NUMQUESTION = 5;

const TrivialQuestionGame = () => {
    const [trivialQuestion, setTrivialQuestion] = useState(null);
    const [numQuestion, setNumQuestion] = useState(getRandomNum(MAX_NUMQUESTION)); //per quina pregunta anem (numQuestion)
    const [num, setNum] = useState(0);
    const [numQuestionUsed, setNumQuestionUsed] = useState([]); //preguntes utilizades (numQuestion)
    const [modeCheck, setModeCheck] = useState(false); //mode comprobar resposta
    const [modeMark, setModeMark] = useState(false); //mode marcar pregunta
    const [markAnswer, setMarkAnswer] = useState(null); //pregunta marcada (numQuestion)
    const [correct, setCorrect] = useState(null); //es correcte o no
    const [correctQuestionList, setCorrectQuestionList] = useState([]);
    const [correctQuestionListView, setCorrectQuestionListView] = useState([]);
    const [error, setError] = useState("");

    const loadTrivial = async (numQ) => {
        const { trivial } = await api.getTrivial(numQ);
        console.log("Pregunta: " + (num + 1));
        if (trivial !== null) {
            setTrivialQuestion(trivial);
            setNumQuestionUsed(numQuestionUsed => [...numQuestionUsed, numQ])

            while (correctQuestionListView.length < MAX_NUMQUESTION) {
                correctQuestionListView.push(null);
            }
            setCorrectQuestionListView(correctQuestionListView);
        } else {
            setTrivialQuestion([]);
        }
    };

    const changeQuestion = () => {
        console.log("cambiando pregunta...")
        let random = getRandomNumAndSkipRepeat(MAX_NUMQUESTION, numQuestionUsed);
        if (random === 0) {
            setError("no more questions");
        } else {
            setNumQuestion(random);
            setMarkAnswer(null);
            setModeMark(false);
        }
    }

    const nextQuestion = () => {
        console.log("siguiente pregunta...")
        let random = getRandomNumAndSkipRepeat(MAX_NUMQUESTION, numQuestionUsed);
        if (random === 0) {
            setError("no more questions");
        } else {
            setNumQuestion(random);
        }
        setModeCheck(false);
        setMarkAnswer(null);
        setNum(num + 1);
    }

    const checkAnswerFunction = () => {
        setModeCheck(true);
        setModeMark(false);
        console.log("comprobando respuesta: " + markAnswer);
        if (trivialQuestion.answers[markAnswer].isCorrect) {
            console.log("correcto");
            setCorrect(true);
            setCorrectQuestionList(correctTrivialQuestion => [...correctTrivialQuestion, true])

            let list = [].concat([...correctQuestionList, true]);
            while (list.length < MAX_NUMQUESTION) {
                list.push(null);
            }
            setCorrectQuestionListView(list);
        } else {
            console.log("error");
            setCorrect(false)
            setCorrectQuestionList(correctTrivialQuestion => [...correctTrivialQuestion, false])

            let list = [].concat([...correctQuestionList, false]);
            while (list.length < MAX_NUMQUESTION) {
                list.push(null);
            }
            setCorrectQuestionListView(list)
        }
    }

    const markAnswerFunction = (e) => {
        setModeMark(true);
        let checked = e.target.id;
        console.log("marcando respuesta: " + checked)
        setMarkAnswer(parseInt(checked));
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
                <TrivialGameEvolution list={correctQuestionListView} numQuestions={MAX_NUMQUESTION} />
                {modeCheck === false ? <button className="trivial-questionGame-changeQuestion" onClick={changeQuestion}>Cambiar pregunta</button> : <div></div>}
                <div className="trivial-questionGame-question">{trivialQuestion.question}</div>
                <div className="trivial-questionGame-answers">
                    {trivialQuestion.answers.map((answer, index) => (
                        <div className="trivial-questionGame-answerDiv" key={trivialQuestion._id + "_" + index + "_div"}>
                            {!modeCheck ?
                                markAnswer === index ?
                                    <button style={{ backgroundColor: "#c7a1ed" }} className="trivial-questionGame-answer" id={index} onClick={(e) => markAnswerFunction(e)} key={trivialQuestion._id + "_" + index}>{answer.answer}</button> :
                                    <button className="trivial-questionGame-answer" id={index} onClick={(e) => markAnswerFunction(e)} key={trivialQuestion._id + "_" + index}>{answer.answer}</button>
                                :
                                correct && index === markAnswer ? <button style={{ backgroundColor: "#228B22" }} className="trivial-questionGame-answer-check" key={trivialQuestion._id + "_" + index}>{answer.answer}</button>
                                    : !correct && index === markAnswer ? <button style={{ backgroundColor: "#DC143C" }} className="trivial-questionGame-answer-check" key={trivialQuestion._id + "_" + index}>{answer.answer}</button>
                                        : !correct && answer.isCorrect ? <button style={{ backgroundColor: "#228B22" }} className="trivial-questionGame-answer-check" key={trivialQuestion._id + "_" + index}>{answer.answer}</button>
                                            : <button className="trivial-questionGame-answer-check" id={index} key={trivialQuestion._id + "_" + index}>{answer.answer}</button>
                            }
                        </div>
                    ))}
                </div>
                {modeMark ? <button className="trivial-questionGame-checkAnswer" onClick={checkAnswerFunction}>Comprobar respuesta</button> : <div></div>}
                {modeCheck ? <button className="trivial-questionGame-nextQuestion" onClick={nextQuestion}>Siguiente pregunta</button> : <div></div>}

            </div >
        );
    }
};

export default TrivialQuestionGame;
