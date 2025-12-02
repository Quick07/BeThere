"use client";

import { useEffect, type ReactNode } from "react";
import { useUIStore } from "@/store";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useUIStore();

  useEffect(() => {
    // Apply theme class to html element
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme);

    // Also apply to body for initial load
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}

