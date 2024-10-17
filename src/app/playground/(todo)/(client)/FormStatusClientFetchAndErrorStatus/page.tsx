"use client";

import React, { PropsWithChildren, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { todoCreateSchema } from "@/app/playground/(todo)/todoSchema";
import { ZodIssue } from "zod";

const parseFormData = (formData: FormData) => {
  return todoCreateSchema.safeParse(Object.fromEntries(formData));
};

function PendingButton({ children }: PropsWithChildren) {
  return (
    <Button disabled>
      <SymbolIcon className="mr-2 h-4 animate-spin" /> {children}
    </Button>
  );
}

function Submit() {
  const status = useFormStatus();

  if (status.pending) {
    const { data } = parseFormData(status.data);

    if (data) {
      return (
        <PendingButton>Adding {data.title} to your todo list</PendingButton>
      );
    }

    return (
      <Button disabled>
        <SymbolIcon className="mr-2 h-4 animate-spin" /> Adding…
      </Button>
    );
  }

  return <Button>Submit</Button>;
}

type FormState =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    }
  | null;

export default function FormStatusClient() {
  const router = useRouter();
  const [state, action] = useActionState<FormState, FormData>(
    async (_, formData) => {
      await new Promise((resolve) => setTimeout(resolve, 1_000));
      const { data, error } = todoCreateSchema.safeParse(
        Object.fromEntries(formData),
      );
      if (error) {
        return {
          success: false,
          error: error.issues
            .map((issue: ZodIssue) => issue.message)
            .join(", "),
        };
      }

      await fetch("/json-server/todos", {
        method: "POST",
        body: JSON.stringify({ title: data.title, completed: false }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.refresh();

      return {
        success: true,
      };
    },
    null,
  );

  return (
    <form action={action}>
      <Input name="title" />
      <Submit />
      {state?.success === false && (
        <p className="text-red-600">{state.error}</p>
      )}
    </form>
  );
}
