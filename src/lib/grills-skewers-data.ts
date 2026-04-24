// src/lib/grills-skewers-data.ts
import { MenuItem } from "./menu-types";

/* IMAGE IMPORTS */
import imgChicken from "@/assets/chicken.jpeg";
import imgLamb from "@/assets/lamb.jpeg";
import imgGoat from "@/assets/goat-cubes.jpeg";
import imgPaneer from "@/assets/paneer.jpeg";
import imgSoya from "@/assets/soya-chaap.jpeg";

export const grillsAndSkewers: Record<string, MenuItem[]> = {
  "Protein Cube Skewer Platter": [
    {
      id: 1,
      name: "Chicken Cubes",
      description: "Served with Seasoned Rice and Salad.",
      image: imgChicken,
      category: "Protein Cube Skewer Platter",
      heatLevel: 2,
      isPopular: true,
      saucePairings: ["Mint sauce", "Maple Mustard", "Sweet and spicy", "Chipotle sauce"],
      customizations: ["Extra Char", "Boneless"],
      allergens: ["milk"],
      dietary: ["gluten-free", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
    {
      id: 2,
      name: "Lamb Cubes",
      description: "Served with Seasoned Rice and Salad.",
      image: imgLamb,
      category: "Protein Cube Skewer Platter",
      heatLevel: 3,
      isPopular: true,
      saucePairings: ["BBQ sauce", "Spicy tomato sauce", "Sweet and spicy"],
      customizations: ["Extra Herb", "Half Portion"],
      allergens: ["milk"],
      dietary: ["gluten-free", "dairy-free", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
    {
      id: 3,
      name: "Goat Cubes",
      description: "Served with Seasoned Rice and Salad.",
      image: imgGoat,
      category: "Protein Cube Skewer Platter",
      heatLevel: 3,
      isPopular: true,
      saucePairings: ["Mint sauce", "BBQ sauce", "Sweet and spicy"],
      customizations: ["Extra Herb", "Boneless"],
      allergens: ["milk"],
      dietary: ["gluten-free", "dairy-free", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
    {
      id: 4,
      name: "Paneer Cubes",
      description: "Served with Seasoned Rice and Salad.",
      image: imgPaneer,
      category: "Protein Cube Skewer Platter",
      heatLevel: 1,
      isPopular: true,
      saucePairings: ["Mint sauce", "Mushroom sauce", "Chipotle sauce", "Sweet and spicy"],
      customizations: ["Extra Char", "Extra Sauce"],
      allergens: ["milk"],
      dietary: ["vegetarian", "gluten-free", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
    {
      id: 5,
      name: "Soya Cubes",
      description: "Served with Seasoned Rice and Salad.",
      image: imgSoya,
      category: "Protein Cube Skewer Platter",
      heatLevel: 1,
      isPopular: true,
      saucePairings: ["Mint sauce", "Sweet and spicy", "Chipotle sauce"],
      customizations: ["Extra Char", "Extra Sauce"],
      allergens: ["soy"],
      dietary: ["vegan", "gluten-free", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
  ],

};
