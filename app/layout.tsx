import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        <meta name="google-adsense-account" content="ca-pub-6566445911552828" />
      </head>
      <body className="font-fractul antialiased">
        <ThemeProvider>
          <UserProvider>
            <UserPreferencesProvider>
              <Header />
              {children}
              <div style={{ margin: "20px 0", textAlign: "center" }}>
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-6566445911552828"
                  data-ad-slot="1234567890" // ⚠️ remplace par ton vrai ad slot
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>

              {/* Initialisation du bloc */}
              <Script id="adsbygoogle-init" strategy="afterInteractive">
                {`(adsbygoogle = window.adsbygoogle || []).push({});`}
              </Script>

              {/* Script global AdSense */}
              <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6566445911552828"
                crossOrigin="anonymous"
                strategy="afterInteractive"
              />
              <Footer />
            </UserPreferencesProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
