import React, { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Flame, X, Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  menuItemsFlat,
  menuItemsGrouped,
} from "@/lib/menu-data";

import { sauces } from "@/lib/sauces-data";
import type { MenuItem } from "@/lib/menu-types";

/* Utility */
const slugify = (s?: string) =>
  (s || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const categories = [
  "All",
  "Grills & Skewers",
  "Sauces",
  "Desserts",
  "Shakes & Juices",
  "Biryani",
];

const sortOptions = [
  { value: "none", label: "Default" },

  { value: "chicken", label: "Chicken" },
  { value: "lamb", label: "Lamb" },
  { value: "salmon", label: "Salmon" },
  { value: "seekh", label: "Seekh" },
  { value: "biryani", label: "Biryani" },

  { value: "fruit-entremet", label: "Fruit Entremet" },
  { value: "cheesecakes", label: "Cheesecakes" },
  { value: "tiramisu", label: "Tiramisu" },
  { value: "brownies", label: "Brownies" },
  { value: "cinnamon-rolls", label: "Cinnamon Rolls" },
  { value: "cakes", label: "Cakes" },
  { value: "tres-leches", label: "Tres Leches" },

  { value: "shakes", label: "Shakes" },
  { value: "juices", label: "Juices" },

  { value: "spice-low", label: "Spice: Low to High" },
  { value: "spice-high", label: "Spice: High to Low" },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("none");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const [sauceFilter, setSauceFilter] = useState<
    "all" | "low" | "mid" | "high"
  >("all");

  /* FILTER SAUCES */
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

  /* MATCH FOOD TYPES */
  const matchesFoodType = (item: MenuItem, type: string) => {
    const t = slugify(type);
    return (
      slugify(item.subCategory) === t ||
      slugify(item.category) === t ||
      slugify(item.name).includes(t)
    );
  };

  /* FILTER MENU ITEMS */
  const filteredItems = useMemo(() => {
    let items = [...menuItemsFlat];

    // category filter
    if (activeCategory !== "All" && activeCategory !== "Sauces") {
      items = items.filter(
        (item) =>
          item.category === activeCategory ||
          item.subCategory === activeCategory
      );
    }

    // food type quick sort
    const quickTypes = [
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

    if (quickTypes.includes(sortBy)) {
      return items.filter((i) => matchesFoodType(i, sortBy));
    }

    // spice sorts
    if (sortBy === "spice-low") {
      return items.sort((a, b) => a.heatLevel - b.heatLevel);
    }
    if (sortBy === "spice-high") {
      return items.sort((a, b) => b.heatLevel - a.heatLevel);
    }

    return items;
  }, [activeCategory, sortBy]);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-background">
        <div className="container-luxury px-4 text-center">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
            Our <span className="text-primary">Menu</span>
          </h1>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Explore our premium selection of grills, sauces, desserts, shakes,
            juices and biryani. All new menu.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-md border-b border-primary/20 py-4">
        <div className="container-luxury px-4">
          {/* Mobile Toggle */}
          <div className="flex items-center justify-between md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm"
            >
              <Filter size={18} />
              Filters
              <ChevronDown
                size={16}
                className={cn(
                  "transition-transform",
                  showFilters && "rotate-180"
                )}
              />
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-secondary text-sm px-3 py-2 rounded border border-primary/30"
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
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
                      "px-4 py-2 text-sm uppercase tracking-wider rounded-full transition-all",
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-primary/20"
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
                  className="bg-secondary px-4 py-2 text-sm rounded border border-primary/30"
                >
                  {sortOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-padding bg-background">
        <div className="container-luxury px-4">
          {/* Sauces View */}
          {activeCategory === "Sauces" ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-3xl">
                    Signature <span className="text-primary">Sauces</span>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Filter sauces by spice level.
                  </p>
                </div>

                <select
                  value={sauceFilter}
                  onChange={(e) =>
                    setSauceFilter(e.target.value as any)
                  }
                  className="bg-secondary text-sm px-3 py-2 rounded border border-primary/30"
                >
                  <option value="all">All Levels</option>
                  <option value="low">Level 1–3</option>
                  <option value="mid">Level 4–6</option>
                  <option value="high">Level 7+</option>
                </select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredSauces.map((sauce) => (
                  <div
                    key={sauce.name}
                    className="card-luxury p-4 md:p-6 group flex flex-col justify-between"
                  >
                    <h3 className="font-serif text-lg mb-2 group-hover:text-primary">
                      {sauce.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-4">
                      {sauce.description}
                    </p>

                    <div className="flex items-center gap-1 mt-auto">
                      {Array.from({
                        length: Math.min(sauce.level, 5),
                      }).map((_, i) => (
                        <Flame
                          key={i}
                          size={14}
                          className={
                            sauce.level <= 3
                              ? "text-primary"
                              : sauce.level <= 6
                              ? "text-orange-500"
                              : "text-red-500"
                          }
                        />
                      ))}
                      {sauce.level > 5 && (
                        <span className="text-xs ml-1 text-muted-foreground">
                          +{sauce.level - 5}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* MAIN MENU GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="card-luxury cursor-pointer group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                      <div className="absolute top-4 left-4 flex gap-2">
                        {item.isNew && (
                          <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded">
                            New
                          </span>
                        )}
                        {item.isPopular && (
                          <span className="bg-foreground text-background text-xs px-3 py-1 rounded">
                            Popular
                          </span>
                        )}
                      </div>

                      {item.heatLevel > 0 && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/80 px-2 py-1 rounded">
                          {Array.from({
                            length: Math.min(item.heatLevel, 5),
                          }).map((_, i) => (
                            <Flame
                              key={i}
                              size={12}
                              className={
                                item.heatLevel <= 3
                                  ? "text-primary"
                                  : item.heatLevel <= 6
                                  ? "text-orange-500"
                                  : "text-red-500"
                              }
                            />
                          ))}
                          {item.heatLevel > 5 && (
                            <span className="text-xs text-muted-foreground">
                              +{item.heatLevel - 5}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-serif text-xl group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {item.description}
                      </p>
                      <div className="mt-3 text-xs text-primary uppercase tracking-wider">
                        {item.category}
                        {item.subCategory ? ` • ${item.subCategory}` : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No items found in this category.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* PRODUCT MODAL */}
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
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:text-primary"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-primary uppercase tracking-widest">
                      {selectedItem.category}
                      {selectedItem.subCategory
                        ? ` / ${selectedItem.subCategory}`
                        : ""}
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
                            className={
                              selectedItem.heatLevel <= 3
                                ? "text-primary"
                                : selectedItem.heatLevel <= 6
                                ? "text-orange-500"
                                : "text-red-500"
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <h2 className="font-serif text-3xl mb-2">
                    {selectedItem.name}
                  </h2>

                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  {selectedItem.saucePairings.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-serif text-sm mb-3 uppercase tracking-wider">
                        Recommended Sauce Pairings
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.saucePairings.map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-secondary px-3 py-1.5 rounded-full border border-primary/20"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedItem.customizations.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-serif text-sm mb-3 uppercase tracking-wider">
                        Customizations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.customizations.map((c) => (
                          <span
                            key={c}
                            className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/30"
                          >
                            {c}
                          </span>
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
}
