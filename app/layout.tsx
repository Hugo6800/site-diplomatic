import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { UserPreferencesProvider } from "./context/UserPreferencesContext";
import { UserProvider } from "./context/UserContext";

export const metadata: Metadata = {
  title: "The Diplomatic Post",
  description: "The Diplomatic Post, journal en ligne gratuit proposant des articles et des podcasts pour s’informer autrement, découvrir des analyses et explorer l’actualité en profondeur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-fractul antialiased">
        <ThemeProvider>
          <UserProvider>
            <UserPreferencesProvider>
              <Header />
              {children}
              <Footer />
            </UserPreferencesProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
