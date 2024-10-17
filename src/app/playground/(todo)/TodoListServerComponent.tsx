import { todosSchema } from "./todoSchema";
import React from "react";
import { TodoList } from "@/app/playground/(todo)/TodoList";

export const TodoListServerComponent = async () => {
  const todos = await fetch("http://localhost:3008/todos", {
    next: { tags: ["todos"] },
  })
    .then((res) => res.json())
    .then(todosSchema.parse);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Todo List</h2>
      <TodoList todos={todos} />
    </>
  );
};
