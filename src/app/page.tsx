"use client"; 

import AboutSection from "@/components/AboutSection";
import AskQuestions from "@/components/AskQuestion";
import ProjectsSection from "@/components/ProjectsSection";
import Hero from "@/components/reuseable/Hero";
import { WhatIOffer } from "@/components/Services";
// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  // const router = useRouter();


  useEffect(() => {
  if(session){
    console.log("LoggedIn User=>",session )
    console.log("LoggedIn User status =>",status )
  }
  }, [])
  // if (status === "loading") return <p>Loading...</p>;

  // if (!session) {
  //   router.push("/login");
  //   return null;
  // }

  return (
    <>
      <div className="max-w-6xl mx-auto overflow-hidden">
        <Hero />
        <ProjectsSection />
        <AboutSection />
        <WhatIOffer />
        <AskQuestions />
      </div>
    </>
  );
}
