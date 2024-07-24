'use client'
import { TaskProvider } from "@/context";
import "./globals.css";

export default function RootLayout({
  children,
}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <title>Test Technique</title>
        <meta name='description' content='Test Technique pour Seedext' />
      </head>
      <body>
        <TaskProvider>
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
