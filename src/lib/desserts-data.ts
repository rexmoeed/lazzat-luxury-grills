import { MenuItem } from "./menu-types";

// Dessert image imports
import imgCheesecakeOreo from "@/assets/dessert-cheesecake-oreo.jpeg";
import imgCheesecakeMango from "@/assets/dessert-cheesecake-mango.jpeg";
import imgPistachioCheesecake from "@/assets/pistachio-cheesecake.jpeg";
import imgTiramisuMango from "@/assets/dessert-tiramisu-mango.jpeg";
import imgBrowniePistachio from "@/assets/dessert-brownie-pistachio.jpeg";
import imgBiscoffTiramisu from "@/assets/biscoff-tiramisu.jpeg";
import imgCoconutTiramisu from "@/assets/coconut-tiramisu.jpeg";
import imgBlueberryTiramisu from "@/assets/blueberry-tiramisu.jpeg";
import imgClassicTiramisu from "@/assets/classic-tiramisu.jpeg";
import imgStrawberryCheesecake from "@/assets/strawberry-cheesecake.jpeg";

export const desserts: Record<string, MenuItem[]> = {
  // ============ CHEESECAKES ============
  Cheesecakes: [
    {
      id: 40,
      name: "Oreo Cheesecake",
      description:
        "Creamy cheesecake mixed with Oreo crumbs on a chocolate crust.",
      price: 5.99,
      image: imgCheesecakeOreo,
      category: "Desserts",
      subCategory: "Cheesecakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "soy"],
      dietary: ["vegetarian"],
    },
    {
      id: 41,
      name: "Mango Cheesecake",
      description:
        "Smooth cheesecake layered with luscious mango purée.",
      price: 5.99,
      image: imgCheesecakeMango,
      category: "Desserts",
      subCategory: "Cheesecakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 42,
      name: "Pistachio Cheesecake",
      description:
        "Rich cheesecake with pistachio flavor and a nutty crust.",
      price: 5.99,
      image: imgPistachioCheesecake,
      category: "Desserts",
      subCategory: "Cheesecakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "tree-nuts"],
      dietary: ["vegetarian"],
    },
    {
      id: 43,
      name: "Strawberry Cheesecake",
      description:
        "Cheesecake topped with strawberry. 133g. Contains milk, egg, gluten.",
      price: 5.99,
      image: imgStrawberryCheesecake,
      category: "Desserts",
      subCategory: "Cheesecakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
  ],

  // ============ TIRAMISU ============
  Tiramisu: [
    {
      id: 50,
      name: "Mango Tiramisu",
      description: "Mascarpone layered with mango-soaked ladyfingers.",
      price: 9.99,
      image: imgTiramisuMango,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 51,
      name: "Pistachio Tiramisu",
      description:
        "Decadent dark chocolate brownie layered with pistachio.",
      price: 9.99,
      image: imgBrowniePistachio,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "tree-nuts"],
      dietary: ["vegetarian"],
    },
    {
      id: 52,
      name: "Biscoff Tiramisu",
      description: "Classic tiramisu with a Biscoff twist.",
      price: 9.99,
      image: imgBiscoffTiramisu,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "soy"],
      dietary: ["vegetarian"],
    },
    {
      id: 53,
      name: "Coconut Tiramisu",
      description:
        "Layers of espresso-soaked ladyfingers, mascarpone, and toasted coconut. Cut in-house. Contains milk, egg, gluten.",
      price: 9.99,
      image: imgCoconutTiramisu,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian"],
    },
    {
      id: 54,
      name: "Blueberry Tiramisu",
      description:
        "Layered ladyfingers with mascarpone and blueberry compote, cut in-house.",
      price: 9.99,
      image: imgBlueberryTiramisu,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian"],
    },
    {
      id: 55,
      name: "Classic Tiramisu",
      description:
        "Layered ladyfingers with mascarpone and espresso, cut in-house. May contain milk, eggs, gluten, tree nuts.",
      price: 9.99,
      image: imgClassicTiramisu,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "tree-nuts"],
      dietary: ["vegetarian"],
    },
  ],
};