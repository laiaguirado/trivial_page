import React, { useEffect, useState } from "react";
import * as api from "../api";

//modificar per posar cada button en un component i pasar la trivialList al component TrivialList
const TrivialButtons = () => {
    const [trivialList, setTrivialList] = useState(null);

    const loadTrivialList = async () => {
        const { trivialList } = await api.getTrivialList();
        if (trivialList!==null) {
          setTrivialList(trivialList.trivialList);
        } else {
          setTrivialList([]);
        }
    };

    useEffect(() => {
        loadTrivialList();
      }, []);
  
    return <div>TrivialButtons</div>;
};

export default TrivialButtons;





