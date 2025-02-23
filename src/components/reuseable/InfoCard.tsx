"use client"

import { useState } from "react"
import { Info, X } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export default function InfoCard() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Card className="w-full max-w-lg bg-primary/5 border-none shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div className="flex-1 space-y-1">
            <p className="font-medium leading-none">Your account has been verified</p>
            <p className="text-sm text-muted-foreground">
              You now have access to all features and can start using the platform.
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="shrink-0 rounded-md p-1 hover:bg-primary/10 transition-colors"
            aria-label="Dismiss message"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

