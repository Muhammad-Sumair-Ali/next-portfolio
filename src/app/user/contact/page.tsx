'use client'

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import Heading from "@/components/reuseable/Heading";
import { SERVICES_CONTACT_FORM } from "@/config/Link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";


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

const Contact = () => {
  const {data:session} =  useSession();

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
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name as keyof ErrorsState]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleServiceToggle = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      if (res.ok) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "", services: [] });
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Network error!");
    }
    setLoading(false);
  };


  return (
    <>
      <Heading
        title={"Contact"}
        description={
          "Hnn G , MilNa hai ya whatsApp be Baat karo Ghyy Bas BakwassS Mat Karna Time Is ValueABle !!"
        }
      />

      <div className="mt-6 mx-auto max-w-[1010px]">
        <div className="grid md:grid-cols-2 items-start gap-14 p-8 rounded-2xl backdrop-blur-xl border-zinc-200 dark:border-zinc-800">
          <div className="pt-8">
            <h1 className="text-4xl font-bold bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
              Have a project in mind or need help with development? I'd love to
              hear about your project and provide expert assistance.
            </p>

            <ul className="mt-8 space-y-6">
              <li className="flex items-center space-x-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:muhammadsumair224@gmail.com" className="text-sm">
                  MuhammadSumair224@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:+923194075607" className="text-sm">
                  03194075607
                </a>
              </li>
              <li className="flex items-center space-x-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-sm">
                  Karachi Sindh, Pakistan
                </p>
              </li>
            </ul>

            <div className="flex items-center gap-4 mt-8">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 dark:bg-zinc-700 text-white hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-black/40 px-6 py-4 rounded-xl border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-xl">
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-200">
              I'm interested in...
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {SERVICES_CONTACT_FORM.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceToggle(service.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  border border-zinc-200 dark:border-zinc-700
                  ${
                    form.services.includes(service.name)
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
                      : "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {service.name}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-8 dark:text-white text-black space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={`bg-zinc-50 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`bg-zinc-50 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className={`bg-zinc-50 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700 ${
                    errors.subject ? "border-red-500" : ""
                  }`}
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              
              <div>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={6}
                  className={`bg-zinc-50 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700 resize-none ${
                    errors.message ? "border-red-500" : ""
                  }`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full py-1.5 bg-white/20 hover:text-white dark:bg-black text-black border-2 border-zinc-600 dark:border-zinc-600 hover:bg-zinc-900 dark:hover:bg-zinc-900 dark:text-white"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;