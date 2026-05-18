// src/lib/sauces-data.ts
import { SauceItem } from "./menu-types";

/* IMAGE IMPORTS */
import imgBBQ from "@/assets/bbq-sauce.jpeg";
import imgMango from "@/assets/mango-sauce.jpg";
import imgSecret from "@/assets/lazzat-secret-sauce.jpg";

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
  {
    name: "Mango Sauce",
    level: 2,
    description: "Fresh mango puree, mild spices, a touch of sweetness. Pairs well with grilled chicken and rice.",
    image: imgMango,
    allergens: [],
  },
  {
    name: "Lazzat Secret Sauce",
    level: 4,
    description: "A house-made creamy sauce with a blend of spices. Perfect with any platter. (Ingredients secret)",
    image: imgSecret,
    allergens: [],
  },
];
