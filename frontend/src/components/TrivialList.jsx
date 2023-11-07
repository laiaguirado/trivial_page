import React, { useEffect, useState } from "react";
import * as api from "../api";
import Trivial from "./Trivial";

const TrivialList = ({ trivialList }) => {

  if (trivialList === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="trivial-list">
        {trivialList.map((trivial) => (
          <Trivial key={trivial._id} trivial={trivial} />
        ))}
      </div>
    );
  }
};

export default TrivialList;
