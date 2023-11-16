import React, { useEffect, useState } from "react";
const MAX_NUMQUESTION = 5;

const TrivialGameEvolution = ({ list, num }) => {
    const [listView, setListView] = useState([]);

    const updateList = (list) => {
        let listView = [].concat(list)
        while (listView.length < MAX_NUMQUESTION) {
            listView.push(null);
        }
        setListView(listView)
    }

    useEffect(() => {
        updateList(list);
    }, [list]);

    return (
        <div className="trivial-game-evolution">
            {listView.map((question, index) => (
                <div className="trivial-game-evolution" key={index + "_div"}>
                    {question === true ? <button className="trivial-game-evolution-question" style={{ backgroundColor: "green" }} key={index}>{index + 1}</button>
                        : question === false ? <button className="trivial-game-evolution-question" style={{ backgroundColor: "red" }} key={index}>{index + 1}</button>
                            : num === index ? <button className="trivial-game-evolution-question" style={{ backgroundColor: "#c7a1ed" }} key={index}>{index + 1}</button>
                                : <button className="trivial-game-evolution-question" style={{ backgroundColor: "black" }} key={index}>{index + 1}</button>
                    }
                </div>
            ))
            }
        </div>
    );

};

export default TrivialGameEvolution;
