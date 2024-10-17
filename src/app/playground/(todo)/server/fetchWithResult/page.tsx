"use client";

import { action, FormState } from "./action";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./SubmitButton";
import { useActionState } from "react";
import { FormStatus } from "@/app/playground/(todo)/server/fetchWithResult/FormStatus";

export default function FormStatusClient() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    (_, formData: FormData) => {
      return action(formData);
    },
    null,
    "/playground/server/fetchWithResult",
  );

  return (
    <form action={formAction}>
      {!isPending && <FormStatus state={state} />}
      <Input name="title" />
      <SubmitButton />
    </form>
  );
}
