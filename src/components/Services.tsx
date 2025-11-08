"use client";
import { useState } from "react";
import { motion } from "framer-motion";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SERVICES_SECTION_LINKS } from "@/config/Link";
import useServiceRequest, { Service } from "@/hooks/useServiceRequest";

export function WhatIOffer() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const {
    formData,
    isSubmitting,
    handleInputChange,
    prepareFormData,
    submitServiceRequest
  } = useServiceRequest();

  const handleOpenDialog = (service: Service): void => {
    prepareFormData(service);
    setSelectedService(service);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitServiceRequest();
    if (success) {
      setOpen(false);
    }
  };

  return (
    <section className="pb-12 pt-6 max-w-[1010px] m-auto relative">
      <div className="absolute top-28 -right-28 transform -translate-x-1/2 h-[230px] w-[690px] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 blur-3xl opacity-25 -ml-20 -z-10"></div>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12 text-primary">
          What I Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
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
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-primary">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <CardDescription className="text-muted-foreground mb-4">
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedService && (
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{selectedService.title}</DialogTitle>
                <DialogDescription>
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input 
                  id="name" 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input 
                  id="email" 
                  type="email"
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  readOnly
                  placeholder="Service Type"
                  required
                />
                <Textarea 
                  id="message" 
                  placeholder="Message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}