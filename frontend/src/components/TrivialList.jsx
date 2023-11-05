import React, { useEffect, useState } from "react";
import * as api from "../api";

const TrivialList = () => {
  const [trivialList, setTrivialList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const loadTrivialList = async () => {
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    const { trivialList } = await api.getTrivialList();
    if (trivialList!==null) {
      setTrivialList(trivialList.trivialList);
    } else {
      setTrivialList([]);
    }
  };

  const loadTrivialListByCategory = async (category) => {
    setSelectedCategory(category);
    const { trivialList } = await api.getTrivialListByCategory(category);
    if (trivialList!==null) {
      setTrivialList(trivialList.trivialList);
    } else {
      setTrivialList([]);
    }
  }

  const loadTrivialListByDifficulty = async (difficulty) => {
    setSelectedDifficulty(difficulty);
    const { trivialList } = await api.getTrivialListByDifficulty(difficulty);
    if (trivialList!==null) {
      setTrivialList(trivialList.trivialList);
    } else {
      setTrivialList([]);
    }
  }
  const getTrivialListByCategoryAndDifficulty = async (category, difficulty) => {
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);
    const { trivialList } = await api.getTrivialListByCategoryAndDifficulty(category,difficulty);
    if (trivialList!==null) {
      setTrivialList(trivialList.trivialList);
    } else {
      setTrivialList([]);
    }
  }

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
          <select value={selectedCategory} onChange={ (e)=> {
            if(e.target.value !== "all" && selectedDifficulty==="all") loadTrivialListByCategory(e.target.value) 
            else if(e.target.value !== "all" && selectedDifficulty!== "all") getTrivialListByCategoryAndDifficulty(e.target.value, selectedDifficulty)
            else if(e.target.value==="all" && selectedDifficulty!=="all"){ setSelectedCategory("all"); loadTrivialListByDifficulty(selectedDifficulty) }
            else loadTrivialList()
          }}> 
            <option value="all"> Select a category</option>
            <option value="geography" >Geography</option>
            <option value="history">History</option>
          </select>
          <select value={selectedDifficulty} onChange={ (e)=> {
            if(e.target.value !== "all" && selectedCategory==="all") loadTrivialListByDifficulty(e.target.value) 
            else if(e.target.value !== "all" && selectedCategory!== "all") getTrivialListByCategoryAndDifficulty(selectedCategory, e.target.value)
            else if(e.target.value==="all" && selectedCategory!=="all"){ setSelectedDifficulty("all"); loadTrivialListByCategory(selectedCategory) }
            else loadTrivialList()
          }}> 
            <option value="all"> Select a difficulty</option>
            <option value="easy" >Easy</option>
            <option value="medium">Medium</option>
          </select>
        </div>
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
