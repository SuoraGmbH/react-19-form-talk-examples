"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { SymbolIcon } from "@radix-ui/react-icons";

const action = async () => {
  throw new Error("Error");
};

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

function WithUseActionState() {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}

export default WithUseActionState;
