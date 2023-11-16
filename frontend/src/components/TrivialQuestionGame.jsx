import React, { useEffect, useState } from "react";
import * as api from "../api";
import { getRandomNum, getRandomNumAndSkipRepeat } from "../utils/math";
import { backdropClasses } from "@mui/material";
import TrivialGameEvolution from "./TrivialGameEvolution";
const MAX_NUMQUESTION = 6;
const NUMQUESTION_TRIVIAL = 5;

const TrivialQuestionGame = () => {
    const [trivialQuestion, setTrivialQuestion] = useState(null);
    const [idQuestion, setIdQuestion] = useState(getRandomNum(MAX_NUMQUESTION)); //num de pregunta a la base de dades
    const [numQuestion, setNumQuestion] = useState(0); //per quina pregunta anem
    const [idQuestionUsedList, setIdQuestionUsedList] = useState([]); //llista de preguntes utilizades (numQuestion)
    const [correctQuestionList, setCorrectQuestionList] = useState([]); //llista de correctes i incorrectes [true, true, false,...]
    const [modeCheck, setModeCheck] = useState(false); //mode comprobar resposta
    const [modeMark, setModeMark] = useState(false); //mode marcar pregunta
    const [markAnswer, setMarkAnswer] = useState(null); //resposta marcada
    const [correct, setCorrect] = useState(null); //es correcte o no
    const [end, setEnd] = useState(false);
    const [error, setError] = useState(null);

    const loadTrivial = async () => {
        const { trivial } = await api.getTrivial(idQuestion);
        if (trivial !== null) {
            setTrivialQuestion(trivial);
            setIdQuestionUsedList(idQuestionUsedList => [...idQuestionUsedList, idQuestion]);
            console.log("Pregunta " + (numQuestion + 1));
            console.log(trivial);
            console.log([...idQuestionUsedList, idQuestion]);
            console.log(correctQuestionList);
        } else {
            setTrivialQuestion([]);
        }
    };

    const changeQuestion = () => {
        console.log("cambiando pregunta...")
        let random = getRandomNumAndSkipRepeat(MAX_NUMQUESTION, idQuestionUsedList);
        if (random === 0) {
            setError("no more questions");
        } else {
            setIdQuestion(random);
        }
        setMarkAnswer(false);
        setModeMark(false);
    }

    const nextQuestion = () => {
        console.log("siguiente pregunta...")
        let random = getRandomNumAndSkipRepeat(MAX_NUMQUESTION, idQuestionUsedList);
        if (random === 0) {
            setError("no more questions");
        } else {
            setIdQuestion(random);
            setNumQuestion(numQuestion + 1);
        }
        setMarkAnswer(false);
        setModeCheck(false);
    }

    const checkAnswerFunction = () => {
        console.log("comprobando pregunta: " + (numQuestion + 1) + " con respuesta: " + markAnswer);
        if (trivialQuestion.answers[markAnswer].isCorrect) {
            setCorrect(true);
            console.log("correcto: " + true);
            setCorrectQuestionList(correctQuestionList => [...correctQuestionList, true])
        } else {
            setCorrect(false)
            console.log("correcto: " + false);
            setCorrectQuestionList(correctQuestionList => [...correctQuestionList, false])
        }
        if (idQuestionUsedList.length >= NUMQUESTION_TRIVIAL) {
            setEnd(true);
            console.log("final")
        }
        setModeCheck(true);
        setModeMark(false);
    }

    const markAnswerFunction = (e) => {
        setModeMark(true);
        let checked = e.target.id;
        setMarkAnswer(parseInt(checked));
        console.log("marcando respuesta: " + checked)
    }

    useEffect(() => {
        loadTrivial();
    }, [idQuestion]);

    if (trivialQuestion === null) {
        return <div>Loading...</div>;
    } else {

        return (
            <div className="trivial-questionGame">
                <TrivialGameEvolution list={correctQuestionList} num={numQuestion} />
                {error !== null ? <p>{error}</p> :
                    <div>
                        {modeCheck === false ? <button className="trivial-questionGame-changeQuestion" onClick={changeQuestion}>Cambiar pregunta</button> : <div></div>}
                        <div className="trivial-questionGame-question">{trivialQuestion.question}</div>
                        <div className="trivial-questionGame-answers">
                            {trivialQuestion.answers.map((answer, index) => (
                                <div className="trivial-questionGame-answerDiv" key={trivialQuestion._id + "_" + index + "_div"}>
                                    {!modeCheck ?
                                        markAnswer === index ?
                                            <button style={{ backgroundColor: "#c7a1ed" }} className="trivial-questionGame-answer" id={index} onClick={(e) => markAnswerFunction(e)} key={trivialQuestion._id + "_" + index}>{answer.answer}</button> //pink marcable
                                            : <button className="trivial-questionGame-answer" id={index} onClick={(e) => markAnswerFunction(e)} key={trivialQuestion._id + "_" + index}>{answer.answer}</button> //no color marcable
                                        :
                                        correct && index === markAnswer ? <button style={{ backgroundColor: "#228B22" }} className="trivial-questionGame-answer-check" key={trivialQuestion._id + "_" + index}>{answer.answer}</button> //green
                                            : !correct && index === markAnswer ? <button style={{ backgroundColor: "#DC143C" }} className="trivial-questionGame-answer-check" key={trivialQuestion._id + "_" + index}>{answer.answer}</button> //red
                                                : !correct && answer.isCorrect ? <button style={{ backgroundColor: "#228B22" }} className="trivial-questionGame-answer-check" key={trivialQuestion._id + "_" + index}>{answer.answer}</button> //green
                                                    : <button className="trivial-questionGame-answer-check" id={index} key={trivialQuestion._id + "_" + index}>{answer.answer}</button>
                                    }
                                </div>
                            ))}
                        </div>
                        {modeMark ? <button className="trivial-questionGame-checkAnswer" onClick={checkAnswerFunction}>Comprobar respuesta</button> : <div></div>}
                        {(modeCheck && end === false) ? <button className="trivial-questionGame-nextQuestion" onClick={nextQuestion}>Siguiente pregunta</button>
                            : <div></div>
                        }
                    </div>}
            </div >
        );
    }
};

export default TrivialQuestionGame;
