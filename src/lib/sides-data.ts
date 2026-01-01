// src/lib/sides-data.ts
import { MenuItem } from "./menu-types";

/* IMAGE IMPORTS */
import imgColeslaw from "@/assets/COLESLAW.jpg";
import imgCornOnTheCob from "@/assets/CORN-ON-THE-CОВ.jpg";
import imgCrispyFries from "@/assets/CRISPY-FRIES.jpg";
import imgGarlicBread from "@/assets/GARLIC-BREAD.jpg";
import imgGrilledVegetables from "@/assets/GRILLED-VEGETABLES.jpg";
import imgSideSalad from "@/assets/SIDE-SALAD.jpg";

export const sidesItems: Record<string, MenuItem[]> = {
  Classic: [
    {
      id: 200,
      name: "Crispy Fries",
      description:
        "Golden, crispy fries served with a sprinkle of seasoning.",
      price: 3.99,
      image: imgCrispyFries,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Crispy"],
      allergens: [],
      dietary: ["vegetarian"],
    },

    {
      id: 201,
      name: "Garlic Bread",
      description:
        "Soft, buttery bread with a garlic infusion, perfect for dipping.",
      price: 4.49,
      image: imgGarlicBread,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Garlic", "Add Cheese"],
      allergens: ["milk", "gluten"],
      dietary: ["vegetarian"],
    },

    {
      id: 202,
      name: "Grilled Vegetables",
      description:
        "A mix of seasonal veggies grilled to perfection, lightly seasoned.",
      price: 4.99,
      image: imgGrilledVegetables,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Char"],
      allergens: [],
      dietary: ["vegetarian", "gluten-free"],
    },

    {
      id: 203,
      name: "Coleslaw",
      description:
        "Creamy, tangy coleslaw with shredded cabbage, carrots, and a hint of vinegar.",
      price: 3.49,
      image: imgColeslaw,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Dressing"],
      allergens: ["milk"],
      dietary: ["vegetarian"],
    },

    {
      id: 204,
      name: "Corn on the Cob",
      description:
        "Grilled corn with butter and a sprinkle of paprika.",
      price: 4.49,
      image: imgCornOnTheCob,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 1,
      saucePairings: [],
      customizations: ["Extra Butter", "Extra Paprika"],
      allergens: ["milk"],
      dietary: ["vegetarian", "gluten-free"],
    },

    {
      id: 205,
      name: "Side Salad",
      description:
        "Fresh, mixed greens with a light vinaigrette dressing.",
      price: 3.99,
      image: imgSideSalad,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Dressing", "Add Olives"],
      allergens: [],
      dietary: ["vegetarian", "gluten-free"],
    },
  ],
};
