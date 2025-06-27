import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
  title: "The Diplomatic Post",
  description: "The Diplomatic Post",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-fractul antialiased bg-white dark:bg-gray-900 text-black dark:text-white">
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
