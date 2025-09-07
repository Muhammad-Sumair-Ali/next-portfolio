"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AlertTriangle, Home } from "lucide-react";
import Heading from "./reuseable/Heading";

export default function ProjectNotFound() {
  return (
    <>
      <Heading title={"Not Found"} description="Project Not Found !" />

      <div className="m-auto ">
        <div className="m-auto relative  max-w-[1020px] mb-12 mt-4  mx-auto py-4 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Image Section */}
            <Card className="overflow-hidden w-full sm:w-3/4 m-auto">
              <CardContent className="p-0">
                <div className="relative h-64 sm:h-72 bg-gradient-to-br from-slate-950 to-slate-900 rounded-lg overflow-hidden">
                  <Image
                    width={200}
                    height={200}
                    unoptimized
                    priority
                    src="/not-found-light.png"
                    alt="Not Found"
                    className=" dark:hidden block w-full h-full object-cover "
                  />
                  <Image
                    width={200}
                    height={200}
                    unoptimized
                    priority
                    src="/not-found-dark.jpg"
                    alt="Not Found"
                    className="w-full h-full object-cover hidden dark:block"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Info Section */}
            <div className="space-y-6 text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl font-semibold text-zinc-900 dark:text-zinc-200">
                Project Not Found
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
                Sorry, the project you are looking for doesn’t exist or has been
                removed.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
                <Link href="/">
                  <Button 
                   size="sm"
                className="bg-zinc-800 text-zinc-200 hover:bg-zinc-400 hover:text-zinc-900"
             >
                    <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                      size="sm"
                className="bg-zinc-800 text-zinc-200 hover:bg-zinc-400 hover:text-zinc-900"
               variant="outline"
                  >
                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Browse Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
