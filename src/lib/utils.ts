import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function avaUsername(username: string): string {
  if (username.length >= 2) {
      return username.substring(0, 2);
  } else {
      // Handle jika panjang username kurang dari 2 huruf
      return "Username terlalu pendek";
  }
}