import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

type Mode = "light" | "dark";

interface ThemeCtx {
  mode: Mode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  mode: "dark",
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(
    (localStorage.getItem("erp-theme") as Mode) || "light"
  );

  useEffect(() => {
    localStorage.setItem("erp-theme", mode);
    // Tailwind ke liye <html> par class lagao
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const toggleTheme = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#10b981" },
          background: {
            default: mode === "dark" ? "#090d16" : "#f1f5f9",
            paper: mode === "dark" ? "#111827" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#ffffff" : "#0f172a",
            secondary: mode === "dark" ? "#9ca3af" : "#475569",
          },
        },
        typography: { fontFamily: "Inter, system-ui, sans-serif" },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};