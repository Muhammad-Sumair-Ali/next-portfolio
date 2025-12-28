"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SERVICES_SECTION_LINKS } from "@/config/Link";
import { Service } from "@/hooks/useServiceRequest";
import { MessageCircle, Mail, Linkedin, ExternalLink } from "lucide-react";

export function WhatIOffer() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleOpenDialog = (service: Service): void => {
    setSelectedService(service);
    setOpen(true);
  };

  const contactOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/923194075607?text=Hi%20Muhammad%20Sumair,%20I'm%20interested%20in%20your%20" + (selectedService?.title || "services"),
      color: "bg-green-500 hover:bg-green-600",
      description: "Quick response via WhatsApp"
    },
    {
      name: "Email",
      icon: Mail,
      href: `mailto:muhammadsumair224@gmail.com?subject=Service Request: ${selectedService?.title || ''}&body=Hi Muhammad Sumair,%0D%0A%0D%0AI'm interested in your ${selectedService?.title || 'services'}.%0D%0A%0D%0APlease let me know the next steps.`,
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Send me a detailed email"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/muhammad-sumair-developer/",
      color: "bg-[#0A66C2] hover:bg-[#004182]",
      description: "Connect on LinkedIn"
    },
    {
      name: "Fiverr",
      icon: ExternalLink,
      href: "https://www.fiverr.com/muhammadsumair6",
      color: "bg-[#1DBF73] hover:bg-[#19A463]",
      description: "Order directly on Fiverr"
    }
  ];

  return (
    <section className="pb-12 pt-8 max-w-[1010px] m-auto relative">
      <div className="absolute top-28 -right-28 transform -translate-x-1/2 h-[230px] w-[690px] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 blur-3xl opacity-25 -ml-20 -z-10"></div>

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-semibold text-center mb-12 text-primary">
          What I Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {SERVICES_SECTION_LINKS.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <Card className="h-full bg-card relative overflow-hidden border border-neutral-800 hover:border-zinc-500 hover:shadow-[0px_0px_15px_1px_rgba(128,0,128,0.4)] transition-all duration-300 flex flex-col">
                {/* Image Section - Full Width at Top */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={service.thumbnail}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Icon Overlay on Image */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 shadow-lg">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>

                {/* Content Section */}
                <CardHeader className="pb-3 pt-5 px-5">
                  <CardTitle className="text-xl font-semibold text-primary">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow flex flex-col px-5 pt-0 pb-5">
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </CardDescription>
                  
                  <div className="mt-auto">
                    <Button
                      onClick={() => handleOpenDialog(service)}
                      className="w-full bg-primary hover:bg-primary/80 text-primary-foreground transition-colors duration-300"
                    >
                      Get Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Options Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Get {selectedService.title}</DialogTitle>
                <DialogDescription className="text-base pt-2">
                  Choose your preferred way to discuss this project. I'll respond within 24 hours.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-3 py-4">
                {contactOptions.map((option, index) => (
                  <Link
                    key={index}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className={`${option.color} rounded-lg p-4 transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-lg`}>
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 rounded-full p-3">
                          <option.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">
                            {option.name}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {option.description}
                          </p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground text-center">
                  💬 Response time: Within 24 hours • Available for remote projects worldwide
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}