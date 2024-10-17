"use client";

import { useState, useEffect } from "react";
import { Todo, todosSchema } from "./todoSchema";
import { TodoList } from "@/app/playground/(todo)/TodoList";

export const TodoListClientState = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/json-server/todos", {
      next: { tags: ["todos"] },
    })
      .then((res) => res.json())
      .then(todosSchema.parse)
      .then(setTodos);
  }, []);

  return <TodoList todos={todos} />;
};
