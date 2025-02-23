import Heading from "@/components/reuseable/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

const SERVICES = [
  { id: 1, name: "Full Stack Development" },
  { id: 2, name: "Frontend Development" },
  { id: 3, name: "Backend Development" },
  { id: 4, name: "API Development" },
  { id: 5, name: "UI/UX Design" },
];

const Contact = () => {
  return (
    <>
      <Heading
        title={"Contact"}
        description={
          "Hnn G , MilNa hai ya whatsApp be Baat karo Ghyy Bas BakwassS Mat Karna Time Is ValueABle !!"
        }
      />

      <div className="mt-6 mx-auto max-w-[1010px]">
        <div className="grid lg:grid-cols-2 items-start gap-14 p-8 rounded-2xl  backdrop-blur-xl  border-zinc-200 dark:border-zinc-800">
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
                <a href=" muhammadsumair224@gmail.com" className="text-sm">
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
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  hover:bg-zinc-100 dark:hover:bg-zinc-700/50
                  focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400
                  border border-zinc-200 dark:border-zinc-700
                  text-zinc-700 dark:text-zinc-300"
                >
                  {service.name}
                </button>
              ))}
            </div>

            <form className="mt-8 dark:text-white text-black space-y-4">
              <Input
                type="text"
                placeholder="Name"
                className="bg-zinc-50 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700"
              />
              <Input
                type="email"
                placeholder="Email"
                className="bg-zinc-50 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700"
              />
              <Input
                type="text"
                placeholder="Subject"
                className="bg-zinc-50 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700"
              />
              <Textarea
                placeholder="Message"
                rows={6}
                className="bg-zinc-50 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700 resize-none"
              />
              <Button className="w-full py-1.5 bg-white/20 hover:text-white dark:bg-black  text-black border-2 border-zinc-600 dark:border-zinc-600 hover:bg-zinc-900  dark:hover:bg-zinc-900 dark:text-white">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
