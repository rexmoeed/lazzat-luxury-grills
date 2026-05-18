import { MenuItem } from "./menu-types";
import imgWholeChicken from "@/assets/whole-chicken.jpeg";
import imgCutChicken from "@/assets/cut-chicken.jpeg";
import imgQuarterChicken from "@/assets/quarter-chicken.jpeg";
// ...existing code...

export const slowRoastedChicken: MenuItem[] = [
  {
    id: 101,
    name: "Whole Slow-Roasted Chicken",
    description: "A whole chicken slow-roasted, served with rice and three salads.",
    price: 34.99,
    image: imgWholeChicken,
    category: "Slow Roasted Chicken",
    heatLevel: 1,
    isPopular: false,
    saucePairings: [],
    customizations: [
      "Extra Sauce: $0.29",
      "Water Bottle: $1.89"
    ],
    allergens: [],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: [
      "Cucumber Tomato",
      "Red Cabbage Slaw",
      "Pickled Onion",
      "Sweet Corn & Pepper",
      "Lazzat Bean Salad",
    ],
  },
  {
    id: 102,
    name: "½ Slow-Roasted Chicken (Half)",
    description: "A half slow-roasted chicken, served with rice and three salads.",
    price: 34.99,
    image: imgCutChicken,
    category: "Slow Roasted Chicken",
    heatLevel: 1,
    isPopular: false,
    saucePairings: [],
    customizations: [
      "Extra Sauce: $0.29",
      "Water Bottle: $1.89"
    ],
    allergens: [],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: [
      "Cucumber Tomato",
      "Red Cabbage Slaw",
      "Pickled Onion",
      "Sweet Corn & Pepper",
      "Lazzat Bean Salad",
    ],
  },
  {
    id: 103,
    name: "¼ Slow-Roasted Chicken (Quarter)",
    description: "A quarter of slow-roasted chicken, served with rice and three salads.",
    price: 34.99,
    image: imgQuarterChicken,
    category: "Slow Roasted Chicken",
    heatLevel: 1,
    isPopular: false,
    saucePairings: [],
    customizations: [
      "Extra Sauce: $0.29",
      "Water Bottle: $1.89"
    ],
    allergens: [],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: [
      "Cucumber Tomato",
      "Red Cabbage Slaw",
      "Pickled Onion",
      "Sweet Corn & Pepper",
      "Lazzat Bean Salad",
    ],
  },
  // ...existing code...
];