import { OptimisticTodo } from "./todoSchema";

interface Props {
  todos: OptimisticTodo[];
}

export const TodoList = ({ todos }: Props) => {
  return (
    <>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center space-x-2  ${todo.pending ? "opacity-20" : ""}`}
          >
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              readOnly
              checked={todo.completed}
            />

            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
