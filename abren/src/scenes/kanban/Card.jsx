import React from "react";

const Card = ({ task }) => {
  return <div className="card bg-success">{task.content}</div>;
};

export default Card;
