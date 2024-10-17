"use server";

export const action = async () => {
  console.log("I am on the server!");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("I am still on the server!");
};
