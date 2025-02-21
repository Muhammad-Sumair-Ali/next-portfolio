"use client";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="relative">
      <div className="absolute -bottom-28 left-2/4 transform -translate-x-1/2 h-[380px] w-[550px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-orange-500 blur-3xl opacity-25 -ml-20 -z-10"></div>

      <footer className="max-w-[1010px] m-auto bg-white dark:bg-black/50 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800/50 mt-24 rounded-xl">
        <div className="mx-auto px-4 sm:px-12 lg:px-14 py-16">
          {/* Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            {/* About Section */}
            <div className="mb-5 -mt-6">
              <h3 className="text-lg font-semibold text-black dark:text-zinc-100">About Us</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                We are a team of developers passionate about building modern,
                scalable, and user-friendly applications.
              </p>
              <div className="space-y-3 mt-6">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-100">Follow Us</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors"
                  >
                    <FaGithub size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors"
                  >
                    <FaTwitter size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors"
                  >
                    <FaInstagram size={20} />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black dark:text-zinc-100">Subscribe</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Stay updated with our latest news and projects. No spam, we promise!
              </p>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700/50 text-black dark:text-zinc-100 placeholder-zinc-500 focus:ring-0 focus:border-zinc-500 p-2 rounded-md"
                />
                <button
                  type="submit"
                  className="bg-zinc-200 dark:bg-zinc-800/50 hover:bg-zinc-300 dark:hover:bg-zinc-700/50 text-black dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700/50 p-2 rounded-md"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-200 dark:border-zinc-800/50" />

          {/* Copyright Section */}
          <div className="text-center text-zinc-600 dark:text-zinc-400 mt-5 text-sm">
            &copy; {new Date().getFullYear()} Muhammad Sumair | Full Stack Developer
          </div>
        </div>
      </footer>
    </div>
  );
}
