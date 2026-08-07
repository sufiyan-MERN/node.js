import React from "react";
import { useState, useEffect } from "react";

const useFetchTodo = () => {
  const [todoList, setTodoList] = useState(null);

  useEffect(() => {
    fetchTodo();
  }, []);

  async function fetchTodo() {
    const data = await fetch("http://localhost:8080/todo");
    const json = await data.json();
    setTodoList(json.data);
    console.log(json.data);
  }

  return todoList;
};

export default useFetchTodo;
