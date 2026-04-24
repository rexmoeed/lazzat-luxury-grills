// src/lib/sides-data.ts
import { MenuItem } from "./menu-types";

/* IMAGE IMPORTS */
import imgCucumberTomato from "@/assets/cucumber-tomato.jpeg";
import imgRedCabbageSlaw from "@/assets/red-cabbage-slaw.jpeg";
import imgPickledOnion from "@/assets/pickled-onion.jpeg";
import imgSweetCorn from "@/assets/sweet-corn.jpeg";
import imgLazzatBeanSalad from "@/assets/lazzat-bean-salad.jpeg";

export const sidesItems: Record<string, MenuItem[]> = {
  Salads: [
    {
      id: 301,
      name: "Cucumber Tomato",
      description: "Fresh diced cucumber & tomato with red onion, cilantro, lime-cumin dressing",
      image: imgCucumberTomato,
      category: "Salads",
      subCategory: "Salads",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
    },
    {
      id: 302,
      name: "Red Cabbage Slaw",
      description: "Shredded red cabbage & carrot, lime-cumin vinaigrette with toasted cumin seeds",
      image: imgRedCabbageSlaw,
      category: "Salads",
      subCategory: "Salads",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
    },
    {
      id: 303,
      name: "Pickled Onion",
      description: "Tangy pickled red onion with peppercorns and bay (Bouchon brine)",
      image: imgPickledOnion,
      category: "Salads",
      subCategory: "Salads",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
    },
    {
      id: 304,
      name: "Sweet Corn & Pepper",
      description: "⭐ SIGNATURE — Sweet corn, red pepper, tamarind-lime glaze with smoky paprika",
      image: imgSweetCorn,
      category: "Salads",
      subCategory: "Salads",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
      isPopular: true,
    },
    {
      id: 306,
      name: "Lazzat Bean Salad",
      description: "4-bean blend (kidney + black + navy + chickpea), apple, raisins, cranberries, citrus-maple dressing",
      image: imgLazzatBeanSalad,
      category: "Salads",
      subCategory: "Salads",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
      isPopular: true,
    },
  ],
};
