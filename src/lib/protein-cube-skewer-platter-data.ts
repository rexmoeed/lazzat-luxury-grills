import { MenuItem } from "./menu-types";
import imgChicken from "@/assets/chicken.jpeg";
import imgLamb from "@/assets/lamb.jpeg";
import imgPaneer from "@/assets/paneer.jpeg";
import imgGoat from "@/assets/goat-cubes.jpeg";
import imgSoya from "@/assets/soya-chaap.jpeg";

export const proteinCubeSkewerPlatters: MenuItem[] = [
  {
    id: 1,
    name: "Chicken Cubes",
    description: "Served with Seasoned Rice and Salad.",
    image: imgChicken,
    category: "Protein Cube Skewer Platter",
    heatLevel: 2,
    isPopular: true,
    saucePairings: ["Mint sauce", "Maple Mustard", "Sweet and spicy", "Chipotle sauce"],
    customizations: [
      "Regular $15.99",
      "Large $18.99",
      "Extra Skewer Chicken: $4.99",
      "Extra Sauce: $0.29",
      "Water Bottle: $1.89"
    ],
    allergens: ["milk"],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: ["Cucumber Tomato", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    price: 15.99,
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
    customizations: [
      "Regular $17.99",
      "Large $20.99",
      "Extra Skewer Lamb: $6.99",
      "Extra Sauce: $0.29",
      "Water Bottle: $1.89"
    ],
    allergens: ["milk"],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: ["Cucumber Tomato", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    price: 17.99,
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
    customizations: [
      "Regular $17.99",
      "Large $20.99",
      "Extra Skewer Goat: $6.99",
      "Extra Sauce: $0.29",
      "Water Bottle: $1.89"
    ],
    allergens: ["milk"],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: ["Cucumber Tomato", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    price: 17.99,
  },
  {
    id: 4,
    name: "Paneer Cubes",
    description: "Indian cottage cheese cubes served with Seasoned Rice and Salad.",
    image: imgPaneer,
    category: "Protein Cube Skewer Platter",
    heatLevel: 1,
    isPopular: false,
    saucePairings: ["Mint sauce", "Sweet and spicy", "Chipotle sauce"],
    customizations: [
      "Regular $13.99",
      "Large $16.99",
      "Extra Skewer Paneer: $5.99",
      "Extra Sauce: $0.29",
      "Water Bottle: $1.89"
    ],
    allergens: ["milk"],
    dietary: ["vegetarian", "gluten-free", "nut-free"],
    sidePairings: ["Cucumber Tomato", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    price: 13.99,
  },
  {
    id: 5,
    name: "Soya Cubes",
    description: "Marinated soya cubes served with Seasoned Rice and Salad.",
    image: imgSoya,
    category: "Protein Cube Skewer Platter",
    heatLevel: 2,
    isPopular: false,
    saucePairings: ["Mint sauce", "Sweet and spicy", "Chipotle sauce"],
    customizations: [
      "Regular $13.99",
      "Large $16.99",
      "Extra Skewer Soya: $5.99",
      "Extra Sauce: $0.29",
      "Water Bottle: $1.89"
    ],
    allergens: ["soy"],
    dietary: ["vegan", "gluten-free", "nut-free"],
    sidePairings: ["Cucumber Tomato", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    price: 13.99,
  },
];
