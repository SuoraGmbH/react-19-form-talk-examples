"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { todoCreateSchema } from "@/app/playground/(todo)/todoSchema";

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

export default function FormStatusClient() {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const data = todoCreateSchema.parse(Object.fromEntries(formData));
        await fetch("/json-server/todos", {
          method: "POST",
          body: JSON.stringify({ title: data.title, completed: false }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        router.refresh();
      }}
    >
      <Input name="title" />
      <Submit />
    </form>
  );
}
