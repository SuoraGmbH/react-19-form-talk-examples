"use client";

import { action, FormState } from "./action";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./SubmitButton";
import { useState } from "react";
import { FormStatus } from "@/app/playground/(todo)/server/fetchWithResult/FormStatus";

export default function FormStatusClient() {
  const [state, setState] = useState<FormState>(null);

  const formAction = async (formData: FormData) => {
    setState(await action(formData));
  };

  return (
    <form action={formAction}>
      <FormStatus state={state} />
      <Input name="title" />
      <SubmitButton />
    </form>
  );
}
