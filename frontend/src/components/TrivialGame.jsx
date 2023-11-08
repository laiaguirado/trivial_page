import React, { useEffect, useState } from "react";
import TrivialQuestionGame from "./TrivialQuestionGame";
import TrivialStartGame from "./TrivialStartGame";

const TrivialGame = () => {
    const [startedGame, setStartedGame] = useState(false);
    return (
        <div className="trivial-game">
            <div>Trival Game</div>
            {startedGame === false ? <TrivialStartGame /> : <TrivialQuestionGame startedGame={startedGame} />}
            <button className="trivial-game-button" onClick={() => setStartedGame(!startedGame)}>
                {startedGame === false ? <p>Start Game</p> : <p>End Game</p>}
            </button>
        </div>
    );
};

export default TrivialGame;
