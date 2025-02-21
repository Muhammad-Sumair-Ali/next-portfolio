"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

type Theme = "dark" | "light" | "system"

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("system")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      updateTheme(savedTheme);
    }
    setMounted(true);
  }, []);
  

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (theme === "system") {
        updateTheme("system")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  const updateTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.remove("dark", "light"); // Pehle purani classes hatao
      root.classList.add(systemTheme); // Fir systemTheme add karo
    } else {
      root.classList.remove("dark", "light"); // Pehle purani classes hatao
      root.classList.add(newTheme); // Fir newTheme apply karo
    }
  };
  
  

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    updateTheme(newTheme)
  }

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative inline-flex h-7 w-16 items-center justify-center rounded-full bg-gradient-to-b from-zinc-50 to-zinc-200 shadow-md transition-all hover:shadow-lg dark:from-zinc-900 dark:to-zinc-800 dark:shadow-zinc-900/50"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {/* Track */}
      <div
        className="absolute inset-1 rounded-full bg-gradient-to-b from-zinc-200 to-zinc-300 transition-colors dark:from-zinc-800 dark:to-zinc-900"
        aria-hidden="true"
      />

      {/* Thumb */}
      <div
        className={`absolute left-1 flex h-5 w-5 origin-center transform-gpu items-center justify-center rounded-full bg-gradient-to-b from-white to-zinc-100 shadow-sm ring-2 ring-zinc-200/50 transition-all duration-300 ease-spring dark:from-zinc-900 dark:to-zinc-800 dark:ring-zinc-800/70
          ${theme === "dark" ? "translate-x-8" : "translate-x-0"}
          group-hover:scale-105 group-active:scale-95`}
        aria-hidden="true"
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4 text-zinc-400 transition-colors dark:text-zinc-200" />
        ) : (
          <Sun className="h-4 w-4 text-amber-500 transition-colors" />
        )}
      </div>

      {/* Focus ring */}
      <div
        className="absolute inset-0 rounded-full ring-2 ring-offset-1 ring-offset-white ring-zinc-950/10 transition-opacity opacity-0 focus-visible:opacity-100 dark:ring-zinc-50/20 dark:ring-offset-zinc-950"
        aria-hidden="true"
      />
    </button>
  )
}
