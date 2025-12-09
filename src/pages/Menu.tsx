import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Flame, X, Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import foodKabab from "@/assets/food-kabab.jpg";
import foodBiryani from "@/assets/food-biryani.jpg";
import foodSajji from "@/assets/food-sajji.jpg";
import foodDrinks from "@/assets/food-drinks.jpg";
import heroGrill from "@/assets/hero-grill.jpg";

const categories = [
  "All",
  "BBQ",
  "Tikka",
  "Kabab",
  "Grills",
  "Biryani",
  "Sajji",
  "Sides",
  "Juices",
  "Shakes",
];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "new", label: "New Arrivals" },
  { value: "spice-low", label: "Spice: Low to High" },
  { value: "spice-high", label: "Spice: High to Low" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  heatLevel: number;
  isNew?: boolean;
  isPopular?: boolean;
  saucePairings: string[];
  customizations: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Signature Chicken Tikka",
    description: "Tender chicken marinated in our secret spice blend, charcoal grilled to perfection with a smoky finish.",
    price: 14.99,
    image: heroGrill,
    category: "Tikka",
    heatLevel: 4,
    isPopular: true,
    saucePairings: ["Chimichurri", "Peri Peri", "BBQ Original"],
    customizations: ["Extra Char", "Boneless", "Add Cheese"],
  },
  {
    id: 2,
    name: "Seekh Kabab Platter",
    description: "Hand-minced lamb and beef kababs with fresh herbs and traditional spices, served with mint chutney.",
    price: 16.99,
    image: foodKabab,
    category: "Kabab",
    heatLevel: 5,
    isPopular: true,
    saucePairings: ["Garlic Supreme", "Chimichurri", "Classic Mild"],
    customizations: ["Lamb Only", "Beef Only", "Mixed"],
  },
  {
    id: 3,
    name: "Royal Lamb Biryani",
    description: "Aromatic basmati rice layered with slow-cooked lamb, saffron, and caramelized onions.",
    price: 19.99,
    image: foodBiryani,
    category: "Biryani",
    heatLevel: 3,
    isNew: true,
    saucePairings: ["Raita", "Mirchi Ka Salan"],
    customizations: ["Extra Rice", "Extra Meat", "Boneless"],
  },
  {
    id: 4,
    name: "Full Lamb Sajji",
    description: "Whole roasted lamb marinated with rock salt and spices, served with traditional rice.",
    price: 89.99,
    image: foodSajji,
    category: "Sajji",
    heatLevel: 2,
    saucePairings: ["Classic Mild", "Garlic Supreme"],
    customizations: ["Half Portion", "Extra Crispy"],
  },
  {
    id: 5,
    name: "Mango Paradise Shake",
    description: "Fresh Alphonso mangoes blended with creamy milk and a hint of cardamom.",
    price: 6.99,
    image: foodDrinks,
    category: "Shakes",
    heatLevel: 0,
    isNew: true,
    saucePairings: [],
    customizations: ["Extra Thick", "Less Sugar", "Add Ice Cream"],
  },
  {
    id: 6,
    name: "Habanero Wings",
    description: "Crispy chicken wings tossed in our legendary Habanero Blaze sauce.",
    price: 12.99,
    image: heroGrill,
    category: "BBQ",
    heatLevel: 8,
    isPopular: true,
    saucePairings: ["Ranch Cooling", "Blue Cheese"],
    customizations: ["Extra Sauce", "Boneless Bites"],
  },
  {
    id: 7,
    name: "Chicken Malai Tikka",
    description: "Creamy, mildly spiced chicken tikka with a luscious cream and cheese marinade.",
    price: 15.99,
    image: heroGrill,
    category: "Tikka",
    heatLevel: 1,
    saucePairings: ["Classic Mild", "Honey Glaze"],
    customizations: ["Extra Cream", "Cheese Drizzle"],
  },
  {
    id: 8,
    name: "Fresh Mint Lemonade",
    description: "Refreshing lemonade with fresh mint leaves and a touch of honey.",
    price: 4.99,
    image: foodDrinks,
    category: "Juices",
    heatLevel: 0,
    saucePairings: [],
    customizations: ["Less Sweet", "Extra Mint", "Sparkling"],
  },
];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = menuItems
    .filter(
      (item) =>
        activeCategory === "All" || item.category === activeCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "new":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case "spice-low":
          return a.heatLevel - b.heatLevel;
        case "spice-high":
          return b.heatLevel - a.heatLevel;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
    });

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
              Explore our premium selection of grills, kababs, biryanis, and more.
              Each dish crafted with passion and precision.
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

      {/* Menu Grid */}
      <section className="section-padding bg-background">
        <div className="container-luxury px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="card-luxury cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {item.isNew && (
                      <span className="bg-primary text-primary-foreground text-xs font-sans uppercase tracking-wider px-3 py-1 rounded">
                        New
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="bg-foreground text-background text-xs font-sans uppercase tracking-wider px-3 py-1 rounded">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Heat Level */}
                  {item.heatLevel > 0 && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
                      {Array.from({ length: Math.min(item.heatLevel, 5) }).map(
                        (_, i) => (
                          <Flame
                            key={i}
                            size={12}
                            className={cn(
                              item.heatLevel <= 3
                                ? "text-primary"
                                : item.heatLevel <= 6
                                ? "text-orange-500"
                                : "text-red-500"
                            )}
                          />
                        )
                      )}
                      {item.heatLevel > 5 && (
                        <span className="text-xs text-muted-foreground">
                          +{item.heatLevel - 5}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="font-serif text-xl text-primary">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm font-sans text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-4 text-xs font-sans text-primary uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="font-sans text-muted-foreground">
                No items found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div className="min-h-screen flex items-center justify-center p-4">
            <div
              className="relative w-full max-w-4xl bg-card border border-primary/30 rounded-lg overflow-hidden animate-zoom-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-square md:aspect-auto">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Category & Heat */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-sans text-primary uppercase tracking-widest">
                      {selectedItem.category}
                    </span>
                    {selectedItem.heatLevel > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground mr-1">
                          Heat Level {selectedItem.heatLevel}
                        </span>
                        {Array.from({
                          length: Math.min(selectedItem.heatLevel, 5),
                        }).map((_, i) => (
                          <Flame
                            key={i}
                            size={14}
                            className={cn(
                              selectedItem.heatLevel <= 3
                                ? "text-primary"
                                : selectedItem.heatLevel <= 6
                                ? "text-orange-500"
                                : "text-red-500"
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Name & Price */}
                  <h2 className="font-serif text-3xl text-foreground mb-2">
                    {selectedItem.name}
                  </h2>
                  <p className="font-serif text-2xl text-primary mb-6">
                    ${selectedItem.price.toFixed(2)}
                  </p>

                  {/* Description */}
                  <p className="font-sans text-muted-foreground mb-8 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  {/* Sauce Pairings */}
                  {selectedItem.saucePairings.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-serif text-sm text-foreground mb-3 uppercase tracking-wider">
                        Recommended Sauce Pairings
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.saucePairings.map((sauce) => (
                          <span
                            key={sauce}
                            className="text-xs font-sans bg-secondary text-foreground px-3 py-1.5 rounded-full border border-primary/20"
                          >
                            {sauce}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Customizations */}
                  {selectedItem.customizations.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-serif text-sm text-foreground mb-3 uppercase tracking-wider">
                        Customizations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.customizations.map((custom) => (
                          <span
                            key={custom}
                            className="text-xs font-sans bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/30"
                          >
                            {custom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add to Order */}
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
