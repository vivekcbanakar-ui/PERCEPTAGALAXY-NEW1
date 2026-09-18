import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Percepta Galaxy - Competitive Intelligence AI",
  description: "Real-time competitor tracking and AI-powered insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
