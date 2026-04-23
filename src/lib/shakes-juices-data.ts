// src/lib/shakes-juices-data.ts
import { MenuItem } from "./menu-types";

/* IMAGE IMPORTS — Signature Shakes */
import imgShakeMango from "@/assets/Mango-Shake.jpeg";
import imgShakeStrawberry from "@/assets/Strawberry-Shake.jpeg";
import imgShakeCoconut from "@/assets/Coconut-Shake.jpeg";
import imgShakeAllBerry from "@/assets/All-Berry-Shake.jpeg";
import imgShakeAlmondDate from "@/assets/Almond-Date-Shake.jpeg";

/* IMAGE IMPORTS — Popular Fruit Blends */
import imgBlendBlueLagoon from "@/assets/Blue-Lagoon.jpeg";
import imgBlendTropical from "@/assets/Tropical-Blend.jpeg";
import imgBlendBerryBurst from "@/assets/Berry-Burst-Blend.jpeg";
import imgBlendSunrise from "@/assets/Sunrise-Blend.jpeg";
import imgBlendWatermelon from "@/assets/Watermelon-Cooler.jpeg";
import imgBlendGreen from "@/assets/Green-Blend.jpeg";

export const shakesAndJuices: Record<string, MenuItem[]> = {
  "Signature Shakes": [
    {
      id: 201,
      name: "Mango Shake",
      description:
        "Real mango + milk + cream. 1 real fruit free: Pineapple or Coconut.",
      price: 6.99,
      image: imgShakeMango,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk"],
      dietary: ["vegetarian", "gluten-free"],
      isPopular: true,
    },
    {
      id: 202,
      name: "Strawberry Shake",
      description:
        "Real strawberry + milk + cream. 1 real fruit free: Banana or Mango.",
      price: 6.99,
      image: imgShakeStrawberry,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk"],
      dietary: ["vegetarian", "gluten-free"],
    },
    {
      id: 203,
      name: "Coconut Shake",
      description:
        "Real coconut + pineapple + milk. 1 real fruit free: Mango or Pineapple.",
      price: 6.99,
      image: imgShakeCoconut,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk"],
      dietary: ["vegetarian", "gluten-free"],
    },
    {
      id: 204,
      name: "All Berry Shake",
      description:
        "4 real berries + milk + cream. 1 real fruit free: Banana or Peach.",
      price: 7.99,
      image: imgShakeAllBerry,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk"],
      dietary: ["vegetarian", "gluten-free"],
    },
    {
      id: 205,
      name: "Almond Date Shake",
      description: "Dates + almonds + honey + milk. 1 real fruit free: Banana.",
      price: 6.99,
      image: imgShakeAlmondDate,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "tree-nuts"],
      dietary: ["vegetarian", "gluten-free"],
    },
  ],

  "Popular Fruit Blends": [
    {
      id: 301,
      name: "Blue Lagoon",
      description:
        "Pineapple + Mango + Banana + Blue Spirulina (Water Base)",
      price: 8.48,
      image: imgBlendBlueLagoon,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
    {
      id: 302,
      name: "Tropical Blend",
      description: "Mango + Pineapple + Coconut (Water Base)",
      price: 7.49,
      image: imgBlendTropical,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
    {
      id: 303,
      name: "Berry Burst Blend",
      description: "Strawberry + Blueberry + Raspberry (Water Base)",
      price: 7.49,
      image: imgBlendBerryBurst,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
    {
      id: 304,
      name: "Sunrise Blend",
      description: "Mango + Peach + Pineapple (Water Base)",
      price: 7.49,
      image: imgBlendSunrise,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
    {
      id: 305,
      name: "Watermelon Cooler",
      description: "Watermelon + Mint + Lime juice (Water Base)",
      price: 7.49,
      image: imgBlendWatermelon,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
    {
      id: 306,
      name: "Green Blend",
      description: "Spinach + Mango + Pineapple + Banana (Water Base)",
      price: 7.49,
      image: imgBlendGreen,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
  ],
};