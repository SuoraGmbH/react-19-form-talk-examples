"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { SymbolIcon } from "@radix-ui/react-icons";
import { action } from "./action";

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
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}
