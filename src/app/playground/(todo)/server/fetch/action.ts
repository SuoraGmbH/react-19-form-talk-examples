"use server";

import { todoCreateSchema } from "@/app/playground/(todo)/todoSchema";
import { revalidateTag } from "next/cache";

export const action = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = todoCreateSchema.parse(Object.fromEntries(formData));
  await fetch("http://localhost:3008/todos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidateTag("todos");
};
