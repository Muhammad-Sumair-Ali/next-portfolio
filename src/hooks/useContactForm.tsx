"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  services: string[];
}

interface ErrorsState {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const useContactForm = () => {
  const { data: session } = useSession();

  const [form, setForm] = useState<FormState>({ 
    name: session?.user?.name || "", 
    email: session?.user?.email || "", 
    subject: "", 
    message: "", 
    services: [] 
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsState>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ErrorsState]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorsState = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(form.email)) newErrors.email = "Please enter a valid email";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await axios.post("/api/contact", form, {
        headers: { "Content-Type": "application/json" }
      });
      
      toast.success("Message sent successfully!");
      // Reset form after successful submission
      setForm({ 
        name: session?.user?.name || "", 
        email: session?.user?.email || "", 
        subject: "", 
        message: "", 
        services: [] 
      });
      // Clear any previous errors
      setErrors({});
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Something went wrong!");
      } else {
        toast.error("Network error!");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ 
      name: session?.user?.name || "", 
      email: session?.user?.email || "", 
      subject: "", 
      message: "", 
      services: [] 
    });
    setErrors({});
  };

  return {
    form,
    errors,
    loading,
    handleChange,
    handleServiceToggle,
    handleSubmit,
    resetForm
  };
};