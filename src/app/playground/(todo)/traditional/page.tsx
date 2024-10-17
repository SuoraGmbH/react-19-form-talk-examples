"use client";

import { Button } from "@/components/ui/button";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { todoCreateSchema } from "@/app/playground/(todo)/todoSchema";
import React from "react";

export default function FormStatusClient() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    setIsSubmitting(true);
    event.preventDefault();

    const formData = new FormData(form);
    const data = todoCreateSchema.parse(Object.fromEntries(formData));

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await fetch("/json-server/todos", {
      method: "POST",
      body: JSON.stringify({ title: data.title, completed: false }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.refresh();
    setIsSubmitting(false);

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="title" />
      <Button type="submit">
        {isSubmitting ? (
          <>
            <SymbolIcon className="mr-2 h-4 animate-spin" /> Submitting…
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
