import React, { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Flame, X, Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

/* Optional fallback */
import imgDessertFallback from "@/assets/dessert-fallback.jpeg";

/* TYPES */
interface MenuItem {
  id: number;
  name: string;
  description: string;
  // price intentionally kept in data but NOT shown or used in UI
  price?: number;
  image: string;
  category: string;
  subCategory?: string;
  heatLevel: number;
  isNew?: boolean;
  isPopular?: boolean;
  saucePairings: string[];
  customizations: string[];
}

/* CATEGORIES (order requested) */
const categories = [
  "All",
  "Grills & Skewers",
  "Sauces",
  "Desserts",
  "Shakes & Juices",
  "Biryani",
];

/*  REFINED SORT / FILTER OPTIONS
   Removed: Most Popular, New Arrivals, Price (both UI and logic)
   Kept: explicit food-type quick filters + spice sorting
*/
const sortOptions = [
  { value: "none", label: "Default" },

  // Grill & Skewers quick filters
  { value: "chicken", label: "Chicken" },
  { value: "lamb", label: "Lamb" },
  { value: "salmon", label: "Salmon" },
  { value: "seekh", label: "Seekh" },
  { value: "biryani", label: "Biryani" },

  // Desserts
  { value: "fruit-entremet", label: "Fruit Entremet" },
  { value: "cheesecakes", label: "Cheesecakes" },
  { value: "tiramisu", label: "Tiramisu" },
  { value: "brownies", label: "Brownies" },
  { value: "cinnamon-rolls", label: "Cinnamon Rolls" },
  { value: "cakes", label: "Cakes" },
  { value: "tres-leches", label: "Tres Leches" },

  // Drinks
  { value: "shakes", label: "Shakes" },
  { value: "juices", label: "Juices" },

  // Spice sorts
  { value: "spice-low", label: "Spice: Low to High" },
  { value: "spice-high", label: "Spice: High to Low" },
];

/* Sauces (from PDF) */
const sauces = [
  { name: "Maple Mustard", level: 1, description: "Mayo, cream, mustard, maple syrup" },
  { name: "Mushroom sauce", level: 2, description: "Cream, Milk, Mushrooms, Black Pepper, Salt, Chicken Powder" },
  { name: "Mint sauce", level: 3, description: "Mint, Coriander, Salt, Yogurt, Green Chilli" },
  { name: "Chipotle sauce", level: 4, description: "Mayo, Chipotle Sauce" },
  { name: "Sweet and spicy", level: 5, description: "Sriracha Sauce, Sweet Chili Sauce, Tabasco Sauce, Bell Peppers Chopped, Jalapeno and Maple Syrup" },
  { name: "Spicy tomato sauce", level: 6, description: "Tomato Fresh, Thai Green Chilli, Tabasco Hot Sauce, Onion" },
  { name: "Jalapeno chipotle sauce", level: 7, description: "Chipotle Sauce, Jalapeno, Fresh Garlic, Sriracha Sauce" },
  { name: "BBQ sauce", level: 8, description: "Tomato Ketchup, Brown Sugar, Soya Sauce, Hot Sauce, Garlic Powder" },
];

/* Build full menu (data kept intact, UI will not show price) */
const menuItems: MenuItem[] = [
  // Grills & Skewers
  {
    id: 1,
    name: "Chicken Skewers",
    description: "Tender chicken skewers marinated with house spices and grilled over charcoal.",
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
    id: 2,
    name: "Lamb Skewers",
    description: "Minced lamb skewers seasoned with traditional spices and charred to perfection.",
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
    id: 3,
    name: "Salmon Tikka",
    description: "Chunks of salmon marinated in delicate spices and grilled for a smoky finish.",
    price: 17.99,
    image: imgSalmonTikka,
    category: "Grills & Skewers",
    subCategory: "Salmon",
    heatLevel: 2,
    saucePairings: ["Lemon Herb", "Mint sauce"],
    customizations: ["Extra Lemon"],
  },
  {
    id: 4,
    name: "Chicken Seekh Kabab",
    description: "Hand-pressed chicken seekh seasoned with aromatic spices and grilled.",
    price: 13.99,
    image: imgChickenSeekh,
    category: "Grills & Skewers",
    subCategory: "Seekh",
    heatLevel: 4,
    saucePairings: ["Mint sauce", "Classic Mild"],
    customizations: ["Add Cheese", "Boneless"],
  },
  {
    id: 5,
    name: "Lamb Seekh Kabab",
    description: "Juicy lamb seekh infused with spices and charred over coals.",
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
    description: "Premium lamb chops marinated and grilled to medium-rare perfection.",
    price: 22.99,
    image: imgLambChops,
    category: "Grills & Skewers",
    subCategory: "Lamb Chops",
    heatLevel: 3,
    saucePairings: ["Chimichurri", "Classic Mild"],
    customizations: ["Extra Lemon", "Crispy Edges"],
  },

  // Biryani
  {
    id: 20,
    name: "Royal Lamb Biryani",
    description: "Aromatic basmati rice layered with slow-cooked lamb, saffron and caramelized onions.",
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

  // Desserts — Fruit Entremet
  {
    id: 30,
    name: "Strawberry Fruit Entremet",
    description: "Silky strawberry mousse, compote center, almond sponge and glossy glaze.",
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
    description: "Coconut panna cotta inside a crisp chocolate shell with coconut shards.",
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
    description: "Ripe mango mousse with tangy compote and delicate sponge layers.",
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
    description: "Coffee mousse with dark ganache and coffee sponge layers.",
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
    description: "Zesty orange mousse with almond sponge and a citrus glaze.",
    price: 7.5,
    image: imgFruitOrange,
    category: "Desserts",
    subCategory: "Fruit Entremet",
    heatLevel: 0,
    saucePairings: [],
    customizations: [],
  },

  // Cheesecakes
  { id: 40, name: "Oreo & Cream Cheesecake", description: "Creamy cheesecake mixed with Oreo crumbs on a chocolate crust.", price: 6.5, image: imgCheesecakeOreo, category: "Desserts", subCategory: "Cheesecakes", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 41, name: "Blueberry Swirl Cheesecake", description: "Classic cheesecake swirled with fresh blueberry compote.", price: 6.5, image: imgCheesecakeBlueberry, category: "Desserts", subCategory: "Cheesecakes", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 42, name: "Mango Cheesecake", description: "Smooth cheesecake layered with luscious mango purée.", price: 6.5, image: imgCheesecakeMango, category: "Desserts", subCategory: "Cheesecakes", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 43, name: "Strawberry Cheesecake", description: "Rich cheesecake crowned with fresh strawberry compote.", price: 6.5, image: imgCheesecakeStrawberry, category: "Desserts", subCategory: "Cheesecakes", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 44, name: "Biscoff Cheesecake", description: "Caramel-spiced cheesecake on a Biscoff cookie crust.", price: 6.5, image: imgCheesecakeBiscoff, category: "Desserts", subCategory: "Cheesecakes", heatLevel: 0, saucePairings: [], customizations: [] },

  // Tiramisu
  { id: 50, name: "Mango Tiramisu", description: "Mascarpone layered with mango-soaked ladyfingers.", price: 6.99, image: imgTiramisuMango, category: "Desserts", subCategory: "Tiramisu", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 51, name: "Chocolate Tiramisu", description: "Chocolate-soaked ladyfingers with creamy mascarpone.", price: 6.99, image: imgTiramisuChocolate, category: "Desserts", subCategory: "Tiramisu", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 52, name: "Coffee Tiramisu", description: "Classic espresso-soaked ladyfingers with mascarpone layers.", price: 6.99, image: imgTiramisuCoffee, category: "Desserts", subCategory: "Tiramisu", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 53, name: "Blueberry Tiramisu", description: "Berry-soaked ladyfingers with mascarpone and blueberry compote.", price: 6.99, image: imgTiramisuBlueberry, category: "Desserts", subCategory: "Tiramisu", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 54, name: "Grape Tiramisu", description: "A delicate twist on classic tiramisu with grape compote.", price: 6.99, image: imgTiramisuGrape, category: "Desserts", subCategory: "Tiramisu", heatLevel: 0, saucePairings: [], customizations: [] },

  // Brownie
  { id: 60, name: "Pistachio Dark Chocolate Brownie", description: "Decadent dark chocolate brownie layered with pistachio.", price: 5.99, image: imgBrowniePistachio, category: "Desserts", subCategory: "Brownies", heatLevel: 0, saucePairings: [], customizations: [] },

  // Cinnamon Rolls
  { id: 70, name: "Original Cinnamon Roll", description: "Classic cinnamon roll with vanilla glaze.", price: 4.5, image: imgCinnamonOriginal, category: "Desserts", subCategory: "Cinnamon Rolls", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 71, name: "Blueberry Cinnamon Roll", description: "Cinnamon roll filled with blueberry compote.", price: 4.75, image: imgCinnamonBlueberry, category: "Desserts", subCategory: "Cinnamon Rolls", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 72, name: "Nutella Cinnamon Roll", description: "Cinnamon roll with creamy Nutella swirl.", price: 5.0, image: imgCinnamonNutella, category: "Desserts", subCategory: "Cinnamon Rolls", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 73, name: "Biscoff Cinnamon Roll", description: "Cinnamon roll infused with Biscoff spread.", price: 5.0, image: imgCinnamonBiscoff, category: "Desserts", subCategory: "Cinnamon Rolls", heatLevel: 0, saucePairings: [], customizations: [] },

  // 4x4 Cakes
  { id: 80, name: "Vanilla 4x4 Cake", description: "Moist vanilla cake portion (4x4)", price: 6.0, image: imgCakeVanilla, category: "Desserts", subCategory: "Cakes", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 81, name: "Chocolate 4x4 Cake", description: "Rich chocolate cake portion (4x4)", price: 6.0, image: imgCakeChocolate, category: "Desserts", subCategory: "Cakes", heatLevel: 0, saucePairings: [], customizations: [] },

  // Tres Leches
  { id: 90, name: "Pistachio Tres Leches", description: "Milk-soaked sponge with pistachio and cream.", price: 6.5, image: imgTresLechesPistachio, category: "Desserts", subCategory: "Tres Leches", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 91, name: "Coconut Tres Leches", description: "Coconut tres leches with toasted coconut.", price: 6.5, image: imgTresLechesCoconut, category: "Desserts", subCategory: "Tres Leches", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 92, name: "Pineapple Tres Leches", description: "Pineapple-infused tres leches for a tropical twist.", price: 6.5, image: imgTresLechesPineapple, category: "Desserts", subCategory: "Tres Leches", heatLevel: 0, saucePairings: [], customizations: [] },
  { id: 93, name: "Mango Tres Leches", description: "Mango tres leches layered with fresh mango.", price: 6.5, image: imgTresLechesMango, category: "Desserts", subCategory: "Tres Leches", heatLevel: 0, saucePairings: [], customizations: [] },

  // Shakes & Juices
  { id: 100, name: "Mango Paradise Shake", description: "Fresh Alphonso mangoes blended with creamy milk and a hint of cardamom.", price: 6.99, image: imgShakeMango, category: "Shakes & Juices", subCategory: "Shakes", heatLevel: 0, saucePairings: [], customizations: ["Extra Thick", "Less Sugar", "Add Ice Cream"] },
  { id: 101, name: "Fresh Mint Lemonade", description: "Refreshing lemonade with fresh mint leaves and a touch of honey.", price: 4.99, image: imgJuiceMintLemonade, category: "Shakes & Juices", subCategory: "Juices", heatLevel: 0, saucePairings: [], customizations: ["Less Sweet", "Extra Mint", "Sparkling"] },
];

/* Utility: slugify strings for reliable matching between sort values and item subCategory/name */
const slugify = (s?: string) => (s || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

/* Component */
const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("none");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const [sauceFilter, setSauceFilter] = useState<"all" | "low" | "mid" | "high">("all");

  const filteredSauces = useMemo(() => {
    switch (sauceFilter) {
      case "low":
        return sauces.filter((s) => s.level <= 3);
      case "mid":
        return sauces.filter((s) => s.level >= 4 && s.level <= 6);
      case "high":
        return sauces.filter((s) => s.level >= 7);
      default:
        return sauces;
    }
  }, [sauceFilter]);

  /*  FOOD TYPE MATCH LOGIC (slug-safe) */
  const matchesFoodType = (item: MenuItem, type: string) => {
    const t = slugify(type);
    return (
      slugify(item.subCategory) === t ||
      slugify(item.category) === t ||
      slugify(item.name).includes(t)
    );
  };

  /*  UPDATED filteredItems LOGIC */
  const filteredItems = useMemo(() => {
    if (activeCategory === "Sauces") return [];

    let items = menuItems.slice();

    // category filtering
    if (activeCategory !== "All") {
      items = items.filter(
        (item) => item.category === activeCategory || item.subCategory === activeCategory
      );
    }

    // food-type quick filters (if selected)
    const foodTypes = [
      "chicken",
      "lamb",
      "salmon",
      "seekh",
      "biryani",
      "fruit-entremet",
      "cheesecakes",
      "tiramisu",
      "brownies",
      "cinnamon-rolls",
      "cakes",
      "tres-leches",
      "shakes",
      "juices",
    ];

    if (foodTypes.includes(sortBy)) {
      return items.filter((item) => matchesFoodType(item, sortBy));
    }

    // spice sorts
    switch (sortBy) {
      case "spice-low":
        return items.sort((a, b) => a.heatLevel - b.heatLevel);
      case "spice-high":
        return items.sort((a, b) => b.heatLevel - a.heatLevel);
      default:
        // default ordering: keep original order (or you can keep isPopular/new badges visible)
        return items;
    }
  }, [activeCategory, sortBy]);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="text-center">
            <div className="gold-divider w-16 mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Our <span className="text-primary">Menu</span>
            </h1>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              Explore our premium selection of grills, sauces, desserts, shakes, juices and biryani. All new menu.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-md border-b border-primary/20 py-4">
        <div className="container-luxury px-4">
          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <Filter size={18} />
              Filters
              <ChevronDown
                size={16}
                className={cn(
                  "transition-transform duration-300",
                  showFilters && "rotate-180"
                )}
              />
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-secondary text-foreground text-sm px-3 py-2 rounded border border-primary/30 focus:outline-none focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filters */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 md:block",
              showFilters ? "max-h-40" : "max-h-0 md:max-h-none"
            )}
          >
            <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-2 md:gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "px-4 py-2 text-sm font-sans uppercase tracking-wider rounded-full transition-all duration-300",
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/20"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Desktop Sort */}
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-secondary text-foreground text-sm px-4 py-2 rounded border border-primary/30 focus:outline-none focus:border-primary cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Grid or Sauces */}
      <section className="section-padding bg-background">
        <div className="container-luxury px-4">
          {activeCategory === "Sauces" ? (
            /* Sauces grid with spice filter */
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-3xl text-foreground">Signature <span className="text-primary">Sauces</span></h2>
                  <p className="text-sm text-muted-foreground">Filter sauces by spice level.</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={sauceFilter}
                    onChange={(e) => setSauceFilter(e.target.value as any)}
                    className="bg-secondary text-foreground text-sm px-3 py-2 rounded border border-primary/30"
                  >
                    <option value="all">All Levels</option>
                    <option value="low">Level 1–3</option>
                    <option value="mid">Level 4–6</option>
                    <option value="high">Level 7+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredSauces.map((sauce, i) => (
                  <div key={sauce.name} className="card-luxury p-4 md:p-6 group">
                    <div className="flex items-center gap-2 mb-3">
                      {Array.from({ length: Math.min(sauce.level, 5) }).map((_, idx) => (
                        <Flame key={idx} size={14} className={cn(
                          sauce.level <= 3 ? "text-primary" : sauce.level <= 6 ? "text-orange-500" : "text-red-500",
                          "group-hover:animate-pulse"
                        )} />
                      ))}
                      {sauce.level > 5 && <span className="text-xs text-muted-foreground ml-1">+{sauce.level - 5}</span>}
                    </div>
                    <h3 className="font-serif text-lg mb-1 group-hover:text-primary transition-colors duration-300">{sauce.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-4">{sauce.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={cn("text-xs font-sans uppercase tracking-widest", sauce.level <= 3 ? "text-primary" : sauce.level <= 6 ? "text-orange-500" : "text-red-500")}>Level {sauce.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Regular menu grid */
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="card-luxury cursor-pointer group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={item.image || imgDessertFallback} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                      <div className="absolute top-4 left-4 flex gap-2">
                        {item.isNew && <span className="bg-primary text-primary-foreground text-xs font-sans uppercase tracking-wider px-3 py-1 rounded">New</span>}
                        {item.isPopular && <span className="bg-foreground text-background text-xs font-sans uppercase tracking-wider px-3 py-1 rounded">Popular</span>}
                      </div>

                      {item.heatLevel > 0 && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
                          {Array.from({ length: Math.min(item.heatLevel, 5) }).map((_, i) => (
                            <Flame key={i} size={12} className={cn(item.heatLevel <= 3 ? "text-primary" : item.heatLevel <= 6 ? "text-orange-500" : "text-red-500")} />
                          ))}
                          {item.heatLevel > 5 && <span className="text-xs text-muted-foreground">+{item.heatLevel - 5}</span>}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300">{item.name}</h3>
                        {/* PRICE REMOVED FROM CARD */}
                      </div>
                      <p className="text-sm font-sans text-muted-foreground line-clamp-2">{item.description}</p>
                      <div className="mt-4 text-xs font-sans text-primary uppercase tracking-wider">{item.category}{item.subCategory ? ` • ${item.subCategory}` : ""}</div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-16">
                  <p className="font-sans text-muted-foreground">No items found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg overflow-y-auto" onClick={() => setSelectedItem(null)}>
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-card border border-primary/30 rounded-lg overflow-hidden animate-zoom-in" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300" aria-label="Close">
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto">
                  <img src={selectedItem.image || imgDessertFallback} alt={selectedItem.name} className="w-full h-full object-cover" />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-sans text-primary uppercase tracking-widest">{selectedItem.category}{selectedItem.subCategory ? ` / ${selectedItem.subCategory}` : ""}</span>
                    {selectedItem.heatLevel > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground mr-1">Heat Level {selectedItem.heatLevel}</span>
                        {Array.from({ length: Math.min(selectedItem.heatLevel, 5) }).map((_, i) => (
                          <Flame key={i} size={14} className={cn(selectedItem.heatLevel <= 3 ? "text-primary" : selectedItem.heatLevel <= 6 ? "text-orange-500" : "text-red-500")} />
                        ))}
                      </div>
                    )}
                  </div>

                  <h2 className="font-serif text-3xl text-foreground mb-2">{selectedItem.name}</h2>

                  {/* PRICE REMOVED FROM MODAL */}

                  <p className="font-sans text-muted-foreground mb-8 leading-relaxed">{selectedItem.description}</p>

                  {selectedItem.saucePairings.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-serif text-sm text-foreground mb-3 uppercase tracking-wider">Recommended Sauce Pairings</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.saucePairings.map((s) => (
                          <span key={s} className="text-xs font-sans bg-secondary text-foreground px-3 py-1.5 rounded-full border border-primary/20">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedItem.customizations.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-serif text-sm text-foreground mb-3 uppercase tracking-wider">Customizations</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.customizations.map((c) => (
                          <span key={c} className="text-xs font-sans bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/30">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button className="btn-gold w-full">Add to Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MenuPage;
