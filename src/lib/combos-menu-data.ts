import { MenuItem } from "./menu-types";
import imgChickenCombo from "@/assets/chicken-combo.jpeg";
import imgPremiumCombo from "@/assets/premium-combo.jpeg";

export const combosMenu: MenuItem[] = [
  {
    id: 401,
    name: "Chicken Combo",
    description: "Chicken bowl + milk shake + sides",
    price: 18.99,
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
    price: 20.99,
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
];
