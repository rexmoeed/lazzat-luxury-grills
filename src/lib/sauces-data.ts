// src/lib/sauces-data.ts
import { SauceItem } from "./menu-types";

export const sauces: SauceItem[] = [
  {
    name: "Maple Mustard",
    level: 1,
    description: "Mayo, cream, mustard, maple syrup",
    allergens: ["milk", "eggs"], // mayo + cream
  },
  {
    name: "Mushroom sauce",
    level: 2,
    description:
      "Cream, Milk, Mushrooms, Black Pepper, Salt, Chicken Powder",
    allergens: ["milk"], // cream & milk
  },
  {
    name: "Mint sauce",
    level: 3,
    description: "Mint, Coriander, Salt, Yogurt, Green Chilli",
    allergens: ["milk"], // yogurt
  },
  {
    name: "Chipotle sauce",
    level: 4,
    description: "Mayo, Chipotle Sauce",
    allergens: ["eggs"], // mayo
  },
  {
    name: "Sweet and spicy",
    level: 5,
    description:
      "Sriracha, Sweet Chili, Tabasco, Bell Peppers, Jalapeno, Maple Syrup",
    allergens: [], // no common allergens
  },
  {
    name: "Spicy tomato sauce",
    level: 6,
    description:
      "Tomato Fresh, Thai Green Chilli, Tabasco Hot Sauce, Onion",
    allergens: [], // tomato-based
  },
  {
    name: "Jalapeno chipotle sauce",
    level: 7,
    description:
      "Chipotle, Jalapeno, Fresh Garlic, Sriracha",
    allergens: [], // chili-based
  },
  {
    name: "BBQ sauce",
    level: 8,
    description:
      "Tomato Ketchup, Brown Sugar, Soya Sauce, Hot Sauce, Garlic Powder",
    allergens: ["soy"], // soya sauce
  },
];
