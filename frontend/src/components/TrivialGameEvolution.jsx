import React, { useEffect } from "react";

const TrivialGameEvolution = ({ list, numQuestions }) => {

    return (
        <div className="trivial-game-evolution">
            {list.map((question, index) => (
                <div className="trivial-game-evolution" key={index + "_div"}>
                    {question ? <button className="trivial-game-evolution-question" style={{ backgroundColor: "green" }} key={index}>{index + 1}</button>
                        : question === false ? <button className="trivial-game-evolution-question" style={{ backgroundColor: "red" }} key={index}>{index + 1}</button>
                            : <button className="trivial-game-evolution-question" style={{ backgroundColor: "black" }} key={index}>{index + 1}</button>
                    }
                </div>
            ))
            }
        </div>
    );

};

export default TrivialGameEvolution;
