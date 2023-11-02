import React, { useEffect, useState } from "react";
import * as api from "../api";

const TrivialList = () => {
  const [trivialList, setTrivialList] = useState(null);

  const loadTrivialList = async () => {
    const { trivialList } = await api.getTrivialList();
    if (trivialList!==null && trivialList!==undefined) {
      setTrivialList(trivialList.trivialList);
    } else {
      setTrivialList([]);
    }
  };

  useEffect(() => {
    loadTrivialList();
  }, []);

  if (trivialList === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="trivial-list">
        <h1>Mi lista de trivial</h1>
        <div>
          {trivialList.map((trivial) => (
            <div key={trivial._id} className="trivial-general">
              <p className="trivial-question"> {trivial.question} </p> 
              <div className="trivial-info">
                <p className="trivial-category">{trivial.category}</p>
                <p className="trivial-difficulty">{trivial.difficulty}</p>
              </div>
              <div>
                {trivial.answers.map((answer,index)=>(
                  <p key={trivial._id+"_"+index}>{answer.answer}: {answer.isCorrect.toString()}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default TrivialList;
