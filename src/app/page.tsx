import AboutSection from "@/components/AboutSection";
import AskQuestions from "@/components/AskQuestion";
import Footer from "@/components/common/Footer";
import ProjectsSection from "@/components/ProjectsSection";
import Hero from "@/components/reuseable/Hero";
import { WhatIOffer } from "@/components/Services";


export default function Home() {
  return (
    <div className="max-w-6xl mx-auto overflow-hidden">
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <WhatIOffer/>
      <AskQuestions />
      <Footer />
    </div>
  );
}
