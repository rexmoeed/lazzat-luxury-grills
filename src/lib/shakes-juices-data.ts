// src/lib/shakes-juices-data.ts
import { MenuItem } from "./menu-types";

/* IMAGE IMPORTS */
import imgShakeMango from "@/assets/shake-mango.jpeg";
import imgJuiceMintLemonade from "@/assets/juice-mint-lemonade.jpeg";

export const shakesAndJuices: Record<string, MenuItem[]> = {
  Shakes: [
    {
      id: 100,
      name: "Mango Paradise Shake",
      description:
        "Fresh Alphonso mangoes blended with creamy milk and a hint of cardamom.",
      price: 6.99,
      image: imgShakeMango,
      category: "Shakes & Juices",
      subCategory: "Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Thick", "Less Sugar", "Add Ice Cream"],
      allergens: ["milk"], // milk + optional ice cream
    },
  ],

  Juices: [
    {
      id: 101,
      name: "Fresh Mint Lemonade",
      description:
        "Refreshing lemonade with fresh mint leaves and a touch of honey.",
      price: 4.99,
      image: imgJuiceMintLemonade,
      category: "Shakes & Juices",
      subCategory: "Juices",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Less Sweet", "Extra Mint", "Sparkling"],
      allergens: [], // no common allergens
    },
  ],
};
