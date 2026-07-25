import { useState } from "react";
import useFetchTodo from "./components/fetch";
import TodoBox from "./components/todoBox";

function App() {
  const [input, setInput] = useState("");
  const todoList = useFetchTodo();

  async function submit() {
    const response = await fetch("http://localhost:8081/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: input,
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <h2>todo application</h2>
      <input
        type="text"
        placeholder={"enter todo"}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          submit();
        }}
      >
        add todo
      </button>

      {/* {todoList.map((todo) => {
        <TodoBox details={todo} key={todo} />;
      })} */}
    </div>
  );
}

export default App;
