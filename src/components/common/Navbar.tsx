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
import {
  Menu,
  MessageCircle,
  BarChart3,
  Flame,
  User,
  Monitor,
  Languages,
} from "lucide-react";

import { motion } from "framer-motion";

import { ThemeToggle } from "../reuseable/ThemeToggle";
import { CommandMenu } from "../reuseable/CommandMenu";

const NAV_LINKS = [
  { href: "/guestbook", label: "Guestbook", icon: MessageCircle },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/projects", label: "Projects", icon: Flame },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Monitor },
];

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
              MS
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-600  hover:text-zinc-800  dark:text-zinc-400 dark:hover:bg-white/10  dark:hover:text-white"
                >
                  <Languages className="h-5 w-5" />
                </Button>
                <CommandMenu />
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center ">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-600  hover:text-zinc-800  dark:text-zinc-400 dark:hover:bg-white/10  dark:hover:text-white"
              >
                <Languages className="h-5 w-5" />
              </Button>
              <CommandMenu />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-600 hover:text-zinc-800  dark:text-zinc-400 dark:hover:bg-white/10  dark:hover:text-white"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[180px] bg-white/40 dark:bg-black/80 rounded-lg border-white/10 backdrop-blur-xl"
                >
                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <DropdownMenuItem
                        key={link.href}
                        asChild
                        className="focus:bg-black/10 text-zinc-800 dark:text-zinc-200 dark:focus:bg-white/10 focus:text-black dark:focus:text-white"
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center text-black/70 dark:text-white gap-2 px-2 py-1.5 text-md ${
                            pathname === link.href
                              ? "text-white"
                              : "text-white/70 hover:text-white transition-colors"
                          }`}
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
