import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  completed: z.boolean().default(false),
});

export const optimisticTodoSchema = todoSchema.extend({
  pending: z.boolean().default(false),
});

export const todosSchema = z.array(todoSchema);

export const todoCreateSchema = todoSchema.omit({ id: true }).extend({
  id: z.string().optional(),
});

export type Todo = z.infer<typeof todoSchema>;
export type OptimisticTodo = z.input<typeof optimisticTodoSchema>;
