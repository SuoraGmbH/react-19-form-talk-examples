"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { SymbolIcon } from "@radix-ui/react-icons";
import { action } from "../fetchWithResult/action";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useOptimistic, useState } from "react";
import {
  OptimisticTodo,
  optimisticTodoSchema,
  Todo,
  todosSchema,
} from "@/app/playground/(todo)/todoSchema";
import { TodoList } from "@/app/playground/(todo)/TodoList";

function Submit() {
  const status = useFormStatus();

  if (status.pending) {
    return (
      <Button disabled>
        <SymbolIcon className="mr-2 h-4 animate-spin" /> Submitting…
      </Button>
    );
  }

  return <Button>Submit</Button>;
}

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = () => {
    fetch("/json-server/todos", {
      next: { tags: ["todos"] },
    })
      .then((res) => res.json())
      .then(todosSchema.parse)
      .then(setTodos);
  };

  const [optimisticTodos, addOptimisticTodo] = useOptimistic<
    OptimisticTodo[],
    OptimisticTodo
  >(todos, (state, action) => {
    if (state.find((todo) => todo.id === action.id)) {
      return state;
    }

    return [...state, { ...action, pending: true }];
  });

  useEffect(fetchTodos, []);

  return (
    <>
      <form
        action={async (formData) => {
          formData.set("id", crypto.randomUUID());

          const { data } = optimisticTodoSchema.safeParse(
            Object.fromEntries(formData),
          );

          if (data) {
            addOptimisticTodo(data);
          }

          const actionResult = await action(formData);

          if (actionResult && actionResult.success) {
            setTodos((todos) => [...todos, actionResult.data]);
          }

          return actionResult;
        }}
      >
        <Input name="title" />
        <Submit />
      </form>
      <Card className="mt-4 w-96 mx-auto">
        <CardHeader>
          <CardTitle>Todo List with Client State</CardTitle>
          <CardDescription>
            This has a local client state using useState and useEffect.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TodoList todos={optimisticTodos} />
        </CardContent>
      </Card>
    </>
  );
}
