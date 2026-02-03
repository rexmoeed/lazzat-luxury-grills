// Helper to find sauce details by name (case-insensitive)
import { sauces } from "@/lib/sauces-data";

export function findSauce(name: string) {
  return sauces.find((s) => s.name.toLowerCase() === name.toLowerCase());
}
