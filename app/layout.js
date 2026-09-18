import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata = {
  title: "Percepta Galaxy - Competitive Intelligence AI",
  description: "Real-time competitor tracking and AI-powered insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
