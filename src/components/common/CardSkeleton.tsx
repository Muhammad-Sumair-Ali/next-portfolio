"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function ProjectCardSkeleton() {
  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group h-[500px] flex flex-col relative overflow-hidden rounded-xl border dark:border-zinc-800 bg-gradient-to-br from-white to-gray-200 dark:from-zinc-800 dark:to-zinc-900 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-200 via-white/90 to-transparent dark:from-zinc-900 dark:via-black/80 dark:to-transparent opacity-60" />

        {/* Card Image Skeleton */}
        <div className="relative aspect-video overflow-hidden">
          <Skeleton className="absolute inset-0 w-full h-full" />
        </div>

        <CardContent className="relative z-10 px-4 py-4 md:p-6 flex-grow overflow-hidden">
          {/* Title Skeleton */}
          <Skeleton className="h-8 w-3/4 mb-2" />

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>

        {/* Card Footer Skeleton */}
        <CardFooter className="relative z-10 flex justify-between gap-2 py-4 px-4 md:p-6 pt-0 mt-auto">
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
          <Skeleton className="h-9 w-20 rounded-md" />
        </CardFooter>
      </Card>
    </motion.div>
  );
}