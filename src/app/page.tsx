"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const Hero = dynamic(() => import("@/components/reuseable/Hero"));
const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const WhatIOffer = dynamic(() =>
  import("@/components/Services").then((mod) => mod.WhatIOffer)
);
const AskQuestions = dynamic(() => import("@/components/AskQuestion"));

export default function Home() {
  const path = usePathname();

  return (
    <>
      {path === "/" ? <Navbar /> : null}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full sm:max-w-5xl mx-auto overflow-hidden"
      >
        <Hero />
        <ProjectsSection />
        <AboutSection />
        <WhatIOffer />
        <AskQuestions />
      </motion.div>
      {path === "/" ? <Footer /> : null}
    </>
  );
}
