'use client'

import { MessageCircle, Mail, Linkedin, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const selectedService = {
  title: "Web Development Service"
}

const contactOptions = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: `https://wa.me/923194075607?text=Hi%20Muhammad%20Sumair,%20I'm%20interested%20in%20your%20${encodeURIComponent(selectedService?.title || 'services')}`,
    color: "bg-green-500 hover:bg-green-600",
    description: "Quick response via WhatsApp"
  },
  {
    name: "Email",
    icon: Mail,
    href: `mailto:muhammadsumair224@gmail.com?subject=Service Request: ${encodeURIComponent(selectedService?.title || '')}&body=Hi Muhammad Sumair,%0D%0A%0D%0AI'm interested in your ${encodeURIComponent(selectedService?.title || 'services')}.%0D%0A%0D%0APlease let me know the next steps.`,
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
]

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[520px] rounded-2xl border border-zinc-200 mt-16 dark:border-zinc-800 p-6 sm:p-8 ">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            Let’s Discuss Your Project
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">
            Choose a preferred way to connect. Quick replies, no pressure.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid gap-3 mt-6">
          {contactOptions.map((option, index) => (
            <Link
              key={index}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className={`${option.color} rounded-xl p-4 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-lg">
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

        {/* Footer Trust Text */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 mt-6 pt-4 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            ⏱ 14-minute WhatsApp call • No spam • Remote projects worldwide
          </p>
        </div>

      </div>
    </div>
  )
}

export default Page
