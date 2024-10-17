import React from "react";
import { TodoListServerComponent } from "@/app/playground/(todo)/TodoListServerComponent";

export const revalidate = 0;

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-4 border-r border-t border-gray-200">
        {children}
      </main>
      <aside className="w-1/4 p-4">
        <TodoListServerComponent />
      </aside>
    </div>
  );
}
