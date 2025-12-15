// src/lib/grills-skewers-data.ts
import { MenuItem } from "./menu-types";

/* IMAGE IMPORTS */
import imgChickenSkewers from "@/assets/chicken-skewers.jpeg";
import imgLambSkewers from "@/assets/lamb-skewers.jpeg";
import imgSalmonTikka from "@/assets/salmon-tikka.jpeg";
import imgChickenSeekh from "@/assets/chicken-seekh.jpeg";
import imgLambSeekh from "@/assets/lamb-seekh.jpeg";
import imgLambChops from "@/assets/lamb-chops.jpeg";

export const grillsAndSkewers: Record<string, MenuItem[]> = {
  Chicken: [
    {
      id: 1,
      name: "Chicken Skewers",
      description:
        "Tender chicken skewers marinated with house spices and grilled over charcoal.",
      price: 12.99,
      image: imgChickenSkewers,
      category: "Grills & Skewers",
      subCategory: "Chicken",
      heatLevel: 3,
      isPopular: true,
      saucePairings: ["Mint sauce", "Maple Mustard"],
      customizations: ["Extra Char", "Boneless"],
      allergens: ["milk"], // yogurt / cream-based marinade
    },
    {
      id: 4,
      name: "Chicken Seekh Kabab",
      description:
        "Hand-pressed chicken seekh seasoned with aromatic spices and grilled.",
      price: 13.99,
      image: imgChickenSeekh,
      category: "Grills & Skewers",
      subCategory: "Seekh",
      heatLevel: 4,
      saucePairings: ["Mint sauce", "Classic Mild"],
      customizations: ["Add Cheese", "Boneless"],
      allergens: ["milk"], // dairy binding / optional cheese
    },
  ],

  Lamb: [
    {
      id: 2,
      name: "Lamb Skewers",
      description:
        "Minced lamb skewers seasoned with traditional spices and charred to perfection.",
      price: 15.99,
      image: imgLambSkewers,
      category: "Grills & Skewers",
      subCategory: "Lamb",
      heatLevel: 4,
      isPopular: true,
      saucePairings: ["Chimichurri", "Garlic Supreme"],
      customizations: ["Extra Herb", "Half Portion"],
      allergens: [], // no major allergens in base preparation
    },
    {
      id: 5,
      name: "Lamb Seekh Kabab",
      description:
        "Juicy lamb seekh infused with spices and charred over coals.",
      price: 15.99,
      image: imgLambSeekh,
      category: "Grills & Skewers",
      subCategory: "Seekh",
      heatLevel: 5,
      saucePairings: ["Garlic Supreme", "Chimichurri"],
      customizations: ["Extra Spice", "Boneless"],
      allergens: [], // spice-based, no dairy by default
    },
    {
      id: 6,
      name: "Lamb Chops",
      description:
        "Premium lamb chops marinated and grilled to medium-rare perfection.",
      price: 22.99,
      image: imgLambChops,
      category: "Grills & Skewers",
      subCategory: "Lamb Chops",
      heatLevel: 3,
      saucePairings: ["Chimichurri", "Classic Mild"],
      customizations: ["Extra Lemon", "Crispy Edges"],
      allergens: [], // herb & oil marinade
    },
  ],

  Salmon: [
    {
      id: 3,
      name: "Salmon Tikka",
      description:
        "Chunks of salmon marinated in delicate spices and grilled for a smoky finish.",
      price: 17.99,
      image: imgSalmonTikka,
      category: "Grills & Skewers",
      subCategory: "Salmon",
      heatLevel: 2,
      saucePairings: ["Lemon Herb", "Mint sauce"],
      customizations: ["Extra Lemon"],
      allergens: ["fish", "milk"], // salmon + yogurt-based tikka marinade
    },
  ],
};
