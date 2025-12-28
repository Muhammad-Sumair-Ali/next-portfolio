"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Languages } from "lucide-react";

import { motion } from "framer-motion";

import { ThemeToggle } from "../reuseable/ThemeToggle";
import { CommandMenu } from "../reuseable/CommandMenu";
import { NAV_LINKS } from "@/config/Link";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <div className="absolute -top-48 left-2/4 -z-10 h-[380px] w-[50vw] md:w-[570px] -translate-x-1/2 transform bg-gradient-to-r from-purple-700 via-pink-900 to-orange-500 opacity-40 dark:opacity-25 blur-3xl -ml-20"></div>

      <div className="fixed inset-x-0 top-4 z-50 mx-auto flex justify-center px-4">
        <header className="relative w-full max-w-[950px] rounded-full bg-white/35 dark:bg-white/5 px-6 shadow-lg backdrop-blur-sm">
          <nav className="flex items-center justify-between py-3 text-black dark:text-white">
            {/* Left - Logo */}
            <Link
              href="/"
              className="text-xl font-mono font-semibold tracking-widest"
            >
              <span style={{ fontFamily: "cursive" }}>MS</span>
            </Link>

            {/* Right - Links (Desktop) */}
            <div className="hidden md:flex items-center gap-5 gap-x-6 text-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-zinc-500 font-medium dark:text-zinc-400 dark:hover:text-white hover:text-black transition-all duration-300 ${
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
                <ThemeToggle />
   
                <CommandMenu />
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center gap-x-3">
              <ThemeToggle />
           
              <CommandMenu />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-[200px] bg-white/40 dark:bg-black/70 rounded-lg shadow-md border border-white/10 backdrop-blur-xl flex flex-col gap-1 p-2"
                >
                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link
                          href={link.href}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                        >
                          <Icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}
