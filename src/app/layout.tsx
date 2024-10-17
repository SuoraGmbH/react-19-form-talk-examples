import type { Metadata } from "next";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "React 19 Forms",
  description: "React 19 Form examples by Suora",
};

export const dynamic = "force-dynamic";

const menu = {
  "FormStatus: Client": {
    Fetch: "/playground/FormStatusClientFetch",
    "Fetch And Error Status": "/playground/FormStatusClientFetchAndErrorStatus",
    Error: "/playground/FormStatusClientWithError",
  },
  "FormStatus: Server": {
    Action: "/playground/server/action",
    "With Fetch": "/playground/server/fetch",
    "Fetch With Result": "/playground/server/fetchWithResult",
    useOptimistic: "/playground/server/useOptimistic",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href="/playground/traditional"
                className={navigationMenuTriggerStyle()}
              >
                Traditional
              </Link>
            </NavigationMenuItem>
            {Object.entries(menu).map(([key, value]) => (
              <NavigationMenuItem key={key}>
                <NavigationMenuTrigger>{key}</NavigationMenuTrigger>
                <NavigationMenuContent className="space-y-2 p-2 ">
                  {Object.entries(value).map(([key, value]) => (
                    <Link
                      key={key}
                      href={value}
                      className={navigationMenuTriggerStyle()}
                    >
                      {key}
                    </Link>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {children}
      </body>
    </html>
  );
}
