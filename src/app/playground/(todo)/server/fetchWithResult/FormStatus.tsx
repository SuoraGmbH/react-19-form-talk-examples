import { FormState } from "./action";

export const FormStatus = ({ state }: { state: FormState }) => {
  if (state === null) {
    return null;
  }

  if (state.success) {
    return (
      <p className="text-green-600">
        Successfully added todo{" "}
        <em className="font-semibold">{state.data.title}</em> to your list.
      </p>
    );
  }

  return <p className="text-red-600">{state.error}</p>;
};
