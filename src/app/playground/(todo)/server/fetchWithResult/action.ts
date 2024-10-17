"use server";

import {
  todoCreateSchema,
  todoSchema,
} from "@/app/playground/(todo)/todoSchema";
import { revalidateTag } from "next/cache";
import { z, ZodIssue } from "zod";

export type FormState =
  | {
      success: true;
      data: z.infer<typeof todoSchema>;
    }
  | {
      success: false;
      error: string;
    }
  | null;

export const action = async (formData: FormData): Promise<FormState> => {
  await new Promise((resolve) => setTimeout(resolve, 1_000));

  const { data, error } = todoCreateSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (error) {
    return {
      success: false,
      error: error.issues.map((issue: ZodIssue) => issue.message).join(", "),
    };
  }

  const response = await fetch("http://localhost:3008/todos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidateTag("todos");

  return {
    success: true,
    data: await response.json(),
  };
};
