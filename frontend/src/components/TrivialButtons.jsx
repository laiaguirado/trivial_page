import React, { useEffect, useState } from "react";
import * as api from "../api";
import TrivialList from './TrivialList';

const TrivialButtons = () => {
  const [trivialList, setTrivialList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const loadTrivialList = async () => {
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    const { trivialList } = await api.getTrivialList();
    if (trivialList !== null) {
      setTrivialList(trivialList.trivialList);
    } else {
      setTrivialList([]);
    }
  };

  const getTrivialListByCategoryAndDifficulty = async (category, difficulty) => {
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);
    const { trivialList } = await api.getTrivialListByCategoryAndDifficulty(category, difficulty);
    if (trivialList !== null) {
      setTrivialList(trivialList.trivialList);
    } else {
      setTrivialList([]);
    }
  }

  useEffect(() => {
    loadTrivialList();
  }, []);

  return (
    <div>
      <h1>Mi lista de trivial</h1>
      <select value={selectedCategory} onChange={(e) => {
        (e.target.value === "all" && selectedDifficulty === "all") ? loadTrivialList() : getTrivialListByCategoryAndDifficulty(e.target.value, selectedDifficulty)
      }}>
        <option value="all"> Selecciona una categoria</option>
        <option value="geography" >Geografía</option>
        <option value="history">Historia</option>
        <option value="sports">Deportes</option>
        <option value="music">Música</option>
        <option value="videogames">Videojuegos</option>
      </select>
      <select value={selectedDifficulty} onChange={(e) => {
        (e.target.value === "all" && selectedCategory === "all") ? loadTrivialList() : getTrivialListByCategoryAndDifficulty(selectedCategory, e.target.value)
      }}>
        <option value="all"> Selecciona una dificultad</option>
        <option value="easy" >Fácil</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
      {trivialList === null ? <div>Loading...</div> : <TrivialList trivialList={trivialList} />}

    </div>
  );
};

export default TrivialButtons;





