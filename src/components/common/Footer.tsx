"use client";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8">
      {/* Gradient Background Effect */}
      <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 h-[350px] w-[550px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-orange-500 blur-3xl opacity-30 -z-10"></div>

      <footer className="w-full max-w-[990px] mx-auto bg-white/35  dark:bg-black/50 backdrop-blur-lg border-none  dark:border-zinc-700 mt-20 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-12 sm:px-10 lg:px-12">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* About Section */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-black dark:text-zinc-100">About Me</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">
                Passionate Full Stack Developer building modern, scalable, and user-friendly web applications.
              </p>
              <div className="mt-6">
                <h3 className="text-lg md:text-xl font-semibold text-black dark:text-zinc-100">Follow Me</h3>
                <div className="flex space-x-4 mt-3">
                  {[FaGithub, FaTwitter, FaLinkedin, FaInstagram].map((Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <Icon size={22} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="md:block hidden">
              <h3 className="text-xl font-semibold text-black dark:text-zinc-100">Stay Updated</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">
                Subscribe to get the latest updates on my projects. No spam, I promise!
              </p>
              <form className="flex flex-col sm:flex-row items-center gap-3 mt-5">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full sm:w-auto bg-zinc-100/50 px-4  dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white placeholder-zinc-500 focus:ring-0 focus:border-zinc-500 p-2 rounded-md"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-4 py-2 rounded-md transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-200 dark:border-zinc-700 mt-10" />

          {/* Copyright Section */}
          <div className="text-center text-zinc-600 dark:text-zinc-400 mt-6 text-sm">
            &copy; {new Date().getFullYear()} Muhammad Sumair | Full Stack Developer
          </div>
        </div>
      </footer>
    </div>
  );
}
