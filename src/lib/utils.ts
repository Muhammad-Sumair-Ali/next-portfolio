import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function trimDescription(desc: string, limit = 150) {
  if (!desc) return "Project details page";
  return desc.length > limit ? desc.slice(0, limit).trim() + "..." : desc;
}