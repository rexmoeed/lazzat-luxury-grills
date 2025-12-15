import { MenuItem } from "./menu-types";
import imgBiryaniClassic from "@/assets/biryani-classic.jpeg";

export const biryaniItems: Record<string, MenuItem[]> = {
  Classic: [
    {
      id: 20,
      name: "Royal Lamb Biryani",
      description:
        "Aromatic basmati rice layered with slow-cooked lamb, saffron and caramelized onions.",
      price: 19.99,
      image: imgBiryaniClassic,
      category: "Biryani",
      subCategory: "Classic",
      heatLevel: 3,
      isNew: true,
      isPopular: true,

      // Sauce Pairings sauces-data.ts
      saucePairings: [
        "Mint sauce",
        "Mushroom sauce",
        "Sweet and spicy",
        "Spicy tomato sauce",
      ],

      customizations: ["Extra Rice", "Extra Meat", "Boneless"],
      allergens: ["milk"], // ghee / yogurt-based preparation
    },
  ],
};
