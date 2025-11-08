"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useAuthentication = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [role, setRole] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      toast.success("Login successful! Redirecting...");
      router.push("https://sumair-portfolio-admin.vercel.app/");
    } catch (error) {
      toast.error((error as any).response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/auth/signup", { name, email, password, role });
      toast.success("Signup successful!");
      //   router.push("/admin/dashboard")
    } catch (error) {
      toast.error((error as any).response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };


  return{
    name, setName,
    email,setEmail,
    password,setPassword,
    role,setRole,
    loading,
    handleLogin,
    handleSignup
  }



}