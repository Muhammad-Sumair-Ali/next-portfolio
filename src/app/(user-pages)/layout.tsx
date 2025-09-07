"use client"
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
