import { MenuItem } from "./menu-types";
import imgChickenCombo from "@/assets/chicken-combo.jpeg";
import imgPremiumCombo from "@/assets/premium-combo.jpeg";
import imgKidsCombo from "@/assets/kids-combo.jpeg";

export const combosMenu: MenuItem[] = [
  {
    id: 401,
    name: "Chicken Combo",
    description: "Chicken bowl + milk shake + sides",
    price: 23.99,
    image: imgChickenCombo,
    category: "Combos",
    heatLevel: 0,
    isPopular: false,
    saucePairings: [],
    customizations: [],
    allergens: [],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: [],
  },
  {
    id: 402,
    name: "Premium Combo",
    description: "Lamb bowl + shake + sides",
    price: 26.99,
    image: imgPremiumCombo,
    category: "Combos",
    heatLevel: 0,
    isPopular: false,
    saucePairings: [],
    customizations: [],
    allergens: [],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: [],
  },
  {
    id: 404,
    name: "Kids Combo",
    description: "Kids Bowl (Chicken or Paneer Tikka)+10 Oz Drink (Any Flavor/ Shake/ Blend /Og)",
    price: 9.99,
    image: imgKidsCombo,
    category: "Combos",
    heatLevel: 0,
    isPopular: false,
    saucePairings: [],
    customizations: [],
    allergens: [],
    dietary: [],
    sidePairings: [],
  },
];
