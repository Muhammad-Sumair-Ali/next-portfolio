"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, Languages, AppWindow } from "lucide-react"
import { FaHome, FaProjectDiagram, FaBook, FaUser } from "react-icons/fa"
import { ThemeToggle } from "../reuseable/ThemeToggle"



const NAV_LINKS = [
  { href: "/", label: "Home", icon: FaHome },
  { href: "/projects", label: "Projects", icon: FaProjectDiagram },
  { href: "/guestbook", label: "Guestbook", icon: FaBook },
  { href: "/about", label: "About", icon: FaUser },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // Add your dark mode logic here
  }

  return (
    <>
      <div className="absolute -top-48 left-2/4 -z-10 h-[380px] w-[50vw] md:w-[570px] -translate-x-1/2 transform bg-gradient-to-r from-purple-700 via-pink-900 to-orange-500 opacity-40 dark:opacity-25 blur-3xl -ml-20"></div>

      <div className="fixed inset-x-0 top-4 z-50 mx-auto flex justify-center px-4">
        <header className="relative w-full max-w-[950px] rounded-full bg-white/35 dark:bg-white/5 px-6 shadow-lg backdrop-blur-sm">
          <nav className="flex items-center justify-between py-3 text-black dark:text-white">
            {/* Left - Logo */}
            <Link href="/" className="text-xl font-mono font-semibold  tracking-widest">
              MS
            </Link>

            {/* Right - Links (Desktop) */}
            <div className="hidden md:flex items-center gap-5 gap-x-6 text-sm">
            
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-zinc-500 font-medium dark:text-zinc-400  dark:hover:text-white hover:text-black transition-all duration-300 ${
                    pathname === link.href ? "text-white" : ""
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 shadow-md shadow-red-500/50"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Link>
              ))}

              <div className="flex items-center gap-x-3 border-l border-gray-700">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white transition-all">
                  <Languages className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white transition-all mr-2">
                  <AppWindow className="h-5 w-5" />
                </Button>
              <ThemeToggle/>
              </div>
            </div>

            {/* Mobile Menu */}
            
          </nav>
        </header>
      </div>
    </>
  )
}

