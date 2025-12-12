// src/lib/menu-data.ts
import {
  MenuItem
} from "./menu-types";

/* IMAGE IMPORTS */
import heroGrill from "@/assets/hero-grill.jpeg";
import imgChickenSkewers from "@/assets/chicken-skewers.jpeg";
import imgLambSkewers from "@/assets/lamb-skewers.jpeg";
import imgSalmonTikka from "@/assets/salmon-tikka.jpeg";
import imgChickenSeekh from "@/assets/chicken-seekh.jpeg";
import imgLambSeekh from "@/assets/lamb-seekh.jpeg";
import imgLambChops from "@/assets/lamb-chops.jpeg";
import imgBiryaniClassic from "@/assets/biryani-classic.jpeg";

/* Desserts */
import imgFruitStrawberry from "@/assets/dessert-strawberry-fruit.jpeg";
import imgFruitCoconut from "@/assets/dessert-coconut-shell.jpeg";
import imgFruitMango from "@/assets/dessert-mango-marvelous.jpeg";
import imgFruitCoffee from "@/assets/dessert-coffee-bean-delight.jpeg";
import imgFruitOrange from "@/assets/dessert-orange-delight.jpeg";

import imgCheesecakeOreo from "@/assets/dessert-cheesecake-oreo.jpeg";
import imgCheesecakeBlueberry from "@/assets/dessert-cheesecake-blueberry.jpeg";
import imgCheesecakeMango from "@/assets/dessert-cheesecake-mango.jpeg";
import imgCheesecakeStrawberry from "@/assets/dessert-cheesecake-strawberry.jpeg";
import imgCheesecakeBiscoff from "@/assets/dessert-cheesecake-biscoff.jpeg";

import imgTiramisuMango from "@/assets/dessert-tiramisu-mango.jpeg";
import imgTiramisuChocolate from "@/assets/dessert-tiramisu-chocolate.jpeg";
import imgTiramisuCoffee from "@/assets/dessert-tiramisu-coffee.jpeg";
import imgTiramisuBlueberry from "@/assets/dessert-tiramisu-blueberry.jpeg";
import imgTiramisuGrape from "@/assets/dessert-tiramisu-grape.jpeg";

import imgBrowniePistachio from "@/assets/dessert-brownie-pistachio.jpeg";

import imgCinnamonOriginal from "@/assets/dessert-cinnamon-original.jpeg";
import imgCinnamonBlueberry from "@/assets/dessert-cinnamon-blueberry.jpeg";
import imgCinnamonNutella from "@/assets/dessert-cinnamon-nutella.jpeg";
import imgCinnamonBiscoff from "@/assets/dessert-cinnamon-biscoff.jpeg";

import imgCakeVanilla from "@/assets/dessert-cake-vanilla.jpeg";
import imgCakeChocolate from "@/assets/dessert-cake-chocolate.jpeg";

import imgTresLechesPistachio from "@/assets/dessert-tresleches-pistachio.jpeg";
import imgTresLechesCoconut from "@/assets/dessert-tresleches-coconut.jpeg";
import imgTresLechesPineapple from "@/assets/dessert-tresleches-pineapple.jpeg";
import imgTresLechesMango from "@/assets/dessert-tresleches-mango.jpeg";

/* Drinks */
import imgShakeMango from "@/assets/shake-mango.jpeg";
import imgJuiceMintLemonade from "@/assets/juice-mint-lemonade.jpeg";

/* FALLBACK */
import imgDessertFallback from "@/assets/dessert-fallback.jpeg";

/* -----------------------------------------------------
   GROUPED DATA (STRUCTURE B)
----------------------------------------------------- */
export const menuItemsGrouped = {
  "Grills & Skewers": {
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
      },
    ],
  },

  Biryani: {
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
        saucePairings: ["Raita", "Mirchi Ka Salan"],
        customizations: ["Extra Rice", "Extra Meat", "Boneless"],
      },
    ],
  },

  Desserts: {
    "Fruit Entremet": [
      {
        id: 30,
        name: "Strawberry Fruit Entremet",
        description:
          "Silky strawberry mousse, compote center, almond sponge and glossy glaze.",
        price: 7.5,
        image: imgFruitStrawberry,
        category: "Desserts",
        subCategory: "Fruit Entremet",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 31,
        name: "Coconut Shell Entremet",
        description:
          "Coconut panna cotta inside a crisp chocolate shell with coconut shards.",
        price: 7.5,
        image: imgFruitCoconut,
        category: "Desserts",
        subCategory: "Fruit Entremet",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 32,
        name: "Mango Marvelous Entremet",
        description:
          "Ripe mango mousse with tangy compote and delicate sponge layers.",
        price: 7.5,
        image: imgFruitMango,
        category: "Desserts",
        subCategory: "Fruit Entremet",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 33,
        name: "Coffee Bean Delight Entremet",
        description:
          "Coffee mousse with dark ganache and coffee sponge layers.",
        price: 7.5,
        image: imgFruitCoffee,
        category: "Desserts",
        subCategory: "Fruit Entremet",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 34,
        name: "Orange Delight Entremet",
        description:
          "Zesty orange mousse with almond sponge and a citrus glaze.",
        price: 7.5,
        image: imgFruitOrange,
        category: "Desserts",
        subCategory: "Fruit Entremet",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
    ],

    Cheesecakes: [
      {
        id: 40,
        name: "Oreo & Cream Cheesecake",
        description:
          "Creamy cheesecake mixed with Oreo crumbs on a chocolate crust.",
        price: 6.5,
        image: imgCheesecakeOreo,
        category: "Desserts",
        subCategory: "Cheesecakes",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 41,
        name: "Blueberry Swirl Cheesecake",
        description:
          "Classic cheesecake swirled with fresh blueberry compote.",
        price: 6.5,
        image: imgCheesecakeBlueberry,
        category: "Desserts",
        subCategory: "Cheesecakes",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 42,
        name: "Mango Cheesecake",
        description:
          "Smooth cheesecake layered with luscious mango purée.",
        price: 6.5,
        image: imgCheesecakeMango,
        category: "Desserts",
        subCategory: "Cheesecakes",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 43,
        name: "Strawberry Cheesecake",
        description:
          "Rich cheesecake crowned with fresh strawberry compote.",
        price: 6.5,
        image: imgCheesecakeStrawberry,
        category: "Desserts",
        subCategory: "Cheesecakes",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 44,
        name: "Biscoff Cheesecake",
        description:
          "Caramel-spiced cheesecake on a Biscoff cookie crust.",
        price: 6.5,
        image: imgCheesecakeBiscoff,
        category: "Desserts",
        subCategory: "Cheesecakes",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
    ],

    Tiramisu: [
      {
        id: 50,
        name: "Mango Tiramisu",
        description:
          "Mascarpone layered with mango-soaked ladyfingers.",
        price: 6.99,
        image: imgTiramisuMango,
        category: "Desserts",
        subCategory: "Tiramisu",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 51,
        name: "Chocolate Tiramisu",
        description:
          "Chocolate-soaked ladyfingers with creamy mascarpone.",
        price: 6.99,
        image: imgTiramisuChocolate,
        category: "Desserts",
        subCategory: "Tiramisu",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 52,
        name: "Coffee Tiramisu",
        description:
          "Classic espresso-soaked ladyfingers with mascarpone layers.",
        price: 6.99,
        image: imgTiramisuCoffee,
        category: "Desserts",
        subCategory: "Tiramisu",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 53,
        name: "Blueberry Tiramisu",
        description:
          "Berry-soaked ladyfingers with mascarpone and blueberry compote.",
        price: 6.99,
        image: imgTiramisuBlueberry,
        category: "Desserts",
        subCategory: "Tiramisu",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 54,
        name: "Grape Tiramisu",
        description: "A delicate twist on classic tiramisu with grape compote.",
        price: 6.99,
        image: imgTiramisuGrape,
        category: "Desserts",
        subCategory: "Tiramisu",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
    ],

    Brownies: [
      {
        id: 60,
        name: "Pistachio Dark Chocolate Brownie",
        description:
          "Decadent dark chocolate brownie layered with pistachio.",
        price: 5.99,
        image: imgBrowniePistachio,
        category: "Desserts",
        subCategory: "Brownies",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
    ],

    "Cinnamon Rolls": [
      {
        id: 70,
        name: "Original Cinnamon Roll",
        description: "Classic cinnamon roll with vanilla glaze.",
        price: 4.5,
        image: imgCinnamonOriginal,
        category: "Desserts",
        subCategory: "Cinnamon Rolls",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 71,
        name: "Blueberry Cinnamon Roll",
        description: "Cinnamon roll filled with blueberry compote.",
        price: 4.75,
        image: imgCinnamonBlueberry,
        category: "Desserts",
        subCategory: "Cinnamon Rolls",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 72,
        name: "Nutella Cinnamon Roll",
        description: "Cinnamon roll with creamy Nutella swirl.",
        price: 5.0,
        image: imgCinnamonNutella,
        category: "Desserts",
        subCategory: "Cinnamon Rolls",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 73,
        name: "Biscoff Cinnamon Roll",
        description: "Cinnamon roll infused with Biscoff spread.",
        price: 5.0,
        image: imgCinnamonBiscoff,
        category: "Desserts",
        subCategory: "Cinnamon Rolls",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
    ],

    Cakes: [
      {
        id: 80,
        name: "Vanilla 4x4 Cake",
        description: "Moist vanilla cake portion (4x4)",
        price: 6.0,
        image: imgCakeVanilla,
        category: "Desserts",
        subCategory: "Cakes",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 81,
        name: "Chocolate 4x4 Cake",
        description: "Rich chocolate cake portion (4x4)",
        price: 6.0,
        image: imgCakeChocolate,
        category: "Desserts",
        subCategory: "Cakes",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
    ],

    "Tres Leches": [
      {
        id: 90,
        name: "Pistachio Tres Leches",
        description:
          "Milk-soaked sponge with pistachio and cream.",
        price: 6.5,
        image: imgTresLechesPistachio,
        category: "Desserts",
        subCategory: "Tres Leches",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 91,
        name: "Coconut Tres Leches",
        description: "Coconut tres leches with toasted coconut.",
        price: 6.5,
        image: imgTresLechesCoconut,
        category: "Desserts",
        subCategory: "Tres Leches",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 92,
        name: "Pineapple Tres Leches",
        description:
          "Pineapple-infused tres leches for a tropical twist.",
        price: 6.5,
        image: imgTresLechesPineapple,
        category: "Desserts",
        subCategory: "Tres Leches",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
      {
        id: 93,
        name: "Mango Tres Leches",
        description:
          "Mango tres leches layered with fresh mango.",
        price: 6.5,
        image: imgTresLechesMango,
        category: "Desserts",
        subCategory: "Tres Leches",
        heatLevel: 0,
        saucePairings: [],
        customizations: [],
      },
    ],
  },

  "Shakes & Juices": {
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
      },
    ],
  },
};

/* -----------------------------------------------------
   FLAT EXPORT (for easy searching/filtering)
----------------------------------------------------- */
export const menuItemsFlat: MenuItem[] = Object.values(menuItemsGrouped)
  .flatMap((cat: any) =>
    Object.values(cat).flatMap((sub: any) => sub)
  );
