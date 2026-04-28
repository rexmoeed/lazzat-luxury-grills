import { MenuItem } from "./menu-types";
import imgKidsMiniBowl from "@/assets/kids-mini-bowl.jpeg";
import imgFrenchFries from "@/assets/french-fries.jpeg";

export const kidsMenu: MenuItem[] = [
  {
    id: 301,
    name: "Kids Mini Bowl",
    description: "100gm chicken + rice + sides + drink",
    price: 13.99,
    image: imgKidsMiniBowl,
    category: "Kids Menu",
    heatLevel: 0,
    isPopular: false,
    saucePairings: [],
    customizations: [],
    allergens: [],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: [],
  },
  {
    id: 302,
    name: "French Fries",
    description: "Crispy golden fries. Available in regular or large size.",
    price: 3.99,
    image: imgFrenchFries,
    category: "Kids Menu",
    heatLevel: 0,
    isPopular: false,
    saucePairings: [],
    customizations: [
      "Regular: $3.99",
      "Large: $4.99"
    ],
    allergens: [],
    dietary: ["vegan", "gluten-free", "nut-free"],
    sidePairings: [],
  },
];
