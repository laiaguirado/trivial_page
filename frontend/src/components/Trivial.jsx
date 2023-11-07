import React from "react";

const Trivial = ({ trivial }) => {
    return (
        <div key={trivial._id} className="trivial-general">
            <p className="trivial-question"> {trivial.question} </p>
            <div className="trivial-info">
                <p className="trivial-category">{trivial.category}</p>
                <p className="trivial-difficulty">{trivial.difficulty}</p>
            </div>
            <div className="trivial-answers">
                {trivial.answers.map((answer, index) => (
                    <p key={trivial._id + "_" + index}>{answer.answer}: {answer.isCorrect.toString()}</p>
                ))}
            </div>
        </div>
    );
};

export default Trivial;
