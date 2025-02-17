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
import { Code, Paintbrush, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const services = [
  {
    title: "Web Development",
    description:
      "Building robust and scalable web applications using modern technologies.",
    icon: Code,
  },
  {
    title: "Web Design",
    description:
      "Creating beautiful and intuitive user interfaces for exceptional user experiences.",
    icon: Paintbrush,
  },
  {
    title: "Website Maintenance",
    description:
      "Keeping your website up-to-date with the latest features and security patches.",
    icon: RefreshCw,
  },
];

export function WhatIOffer() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenDialog = (service) => {
    setSelectedService(service);
    setOpen(true);
  };

  return (
    <section className="pb-12 pt-6 max-w-[1010px] m-auto dark relative">
      <div className="absolute top-28 -right-28 transform -translate-x-1/2 h-[230px] w-[690px] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 blur-3xl opacity-25 -ml-20 -z-10"></div>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          What I Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
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
        <DialogContent className="sm:max-w-[425px] dark">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedService.title}</DialogTitle>
                <DialogDescription>
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input id="name" placeholder="Full Name" />
                <Input id="email" placeholder="Email Address" />
                <Input
                  id="service-type"
                  value={selectedService.title}
                  readOnly
                  placeholder="Service Type"
                />
                <Textarea id="message" placeholder="Message" />
              </div>
              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
