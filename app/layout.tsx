import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

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
    <html lang="en">
      <body className="font-fractul antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
