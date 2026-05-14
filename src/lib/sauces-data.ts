// src/lib/sauces-data.ts
import { SauceItem } from "./menu-types";

/* IMAGE IMPORTS */
// Removed unused image imports
import imgBBQ from "@/assets/bbq-sauce.jpeg";

export const sauces: SauceItem[] = [
  {
    name: "Twisted BBQ Sauce",
    level: 8,
    description:
      "Tomato Ketchup, Brown Sugar, Soya Sauce, Hot Sauce, Garlic Powder",
// ...existing code...
    image: imgBBQ,
    allergens: ["soy"], // soya sauce
  },
];
