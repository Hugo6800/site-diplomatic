"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (value: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 🔹 Fonction commune pour appliquer un thème (seulement côté client)
  const applyTheme = (value: Theme) => {
    if (typeof window === 'undefined') return;
    
    if (value === "light") {
      localStorage.setItem("theme", "light");
      setTheme("light");
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else if (value === "dark") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.removeItem("theme");
      setTheme("system");
      if (typeof window !== 'undefined') {
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(systemDark);
        document.documentElement.classList.toggle("dark", systemDark);
      }
    }
  };

  // 🔹 Initialisation au montage (seulement côté client)
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme === "light" || savedTheme === "dark") {
      applyTheme(savedTheme);
    } else {
      applyTheme("system");
    }

    // 🔹 Écoute les changements du système
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // 🔹 Toggle simple clair ↔ sombre
  const toggleTheme = () => {
    if (theme === "light") {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  };

  // Provide a safe default value during server-side rendering
  // and only use the real theme state after client-side hydration
  const safeTheme = mounted ? theme : "system";
  const safeIsDark = mounted ? isDark : false;

  return (
    <ThemeContext.Provider value={{ 
      theme: safeTheme as Theme, 
      isDark: safeIsDark, 
      toggleTheme, 
      setThemeMode: applyTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
