import { action } from "./action";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./SubmitButton";

export default function FormStatusClient() {
  return (
    <form action={action}>
      <Input name="title" />
      <SubmitButton />
    </form>
  );
}
