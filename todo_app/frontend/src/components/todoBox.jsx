import React from "react";

const TodoBox = ({ details }) => {
  console.log("todo component called");
  return <div>Todo: {details}</div>;
};

export default TodoBox;