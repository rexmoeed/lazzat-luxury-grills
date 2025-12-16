import React, { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Flame, X, Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  menuItemsFlat,
  menuItemsGrouped,
} from "@/lib/menu-data";

import { sauces } from "@/lib/sauces-data";
import type { MenuItem, Allergen } from "@/lib/menu-types";

import {
  Milk,
  Egg,
  Wheat,
  Nut,
  Fish,
  Leaf,
} from "lucide-react";

/* ALLERGEN ICON MAP */
const allergenIconMap: Partial<Record<
  Allergen,
  { icon: any; label: string }
>> = {
  milk: { icon: Milk, label: "Milk" },
  eggs: { icon: Egg, label: "Eggs" },
  gluten: { icon: Wheat, label: "Gluten" },
  "tree-nuts": { icon: Nut, label: "Tree Nuts" },
  peanuts: { icon: Nut, label: "Peanuts" },
  soy: { icon: Leaf, label: "Soy" },
  sesame: { icon: Leaf, label: "Sesame" },
  shellfish: { icon: Fish, label: "Shellfish" },
};

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

/* --- NEW: multi-select filter definitions --- */
/* quickFilters are protein / type shortcuts (map to existing quick sorts) */
/* dietaryFilters: these ideally should be flags on your menuItems (vegan/vegetarian/gluten-free) — currently we use heuristics */
/* spiceFilter options are handled separately via sauce heat or item.heatLevel */
const quickFilters = [
  { id: "chicken", label: "Chicken" },
  { id: "lamb", label: "Lamb" },
  { id: "salmon", label: "Salmon" },
  { id: "seekh", label: "Seekh" },
  { id: "biryani", label: "Biryani" },
];

const dietaryFilters = [
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "allergen-free", label: "Allergen-free" },
];

const allergenFilters: { id: Allergen; label: string }[] = [
  { id: "milk", label: "Milk" },
  { id: "eggs", label: "Eggs" },
  { id: "gluten", label: "Gluten" },
  { id: "tree-nuts", label: "Tree Nuts" },
  { id: "peanuts", label: "Peanuts" },
  { id: "soy", label: "Soy" },
  { id: "sesame", label: "Sesame" },
  { id: "shellfish", label: "Shellfish" },
];


const miscFilters = [
  { id: "spicy", label: "Spicy" }, // heuristic: heatLevel >= 4
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("none");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [filterMode, setFilterMode] = useState<"OR" | "AND">("OR");


  const [sauceFilter, setSauceFilter] = useState<
    "all" | "low" | "mid" | "high"
  >("all");

  /* Drawer open */
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* selected multi-filters (OR semantics) */
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearFilters = () => setSelectedFilters(new Set());

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

  /* Heuristics for dietary filters.
     IMPORTANT: These are heuristics because your menu data doesn't currently include explicit `diet` fields.
     - Ideally: add { diet: ["vegan","vegetarian","gluten-free"] } to menu item objects and replace heuristics below.
  */
const itemHasAllergen = (item: MenuItem, allergen: Allergen) => {
  if (!item.allergens || item.allergens.length === 0) return false;
  return item.allergens.includes(allergen);
};



  const heuristicsMatchDiet = (item: MenuItem, dietId: string) => {
    const name = item.name.toLowerCase();
    const cat = (item.category || "").toLowerCase();
    const sub = (item.subCategory || "").toLowerCase();

    if (dietId === "vegan") {
      // heuristic: desserts that are fruit-based OR items with "coconut", "mango" etc. Not perfect.
      return (
        item.heatLevel === 0 &&
        (cat.includes("dessert") || /coconut|mango|fruit|vegan/.test(name + sub + cat))
      );
    }
    if (dietId === "vegetarian") {
      return (
        item.heatLevel === 0 ||
        /cheese|cheesecake|paneer|vegetarian|veggie/.test(name + sub + cat)
      );
    }
    if (dietId === "contains-nuts") {
      return /pistachio|almond|nut|biscoff|pecan/.test(name + sub + cat);
    }
    if (dietId === "gluten-free") {
      // heuristic: biryani and shakes likely gluten-free; desserts rarely
      return /biryani|shake|parfait|panna cotta|entremet|tres leches/.test(name + sub + cat);
    }
    if (dietId === "allergen-free") {
  // true if item has NO allergens or empty allergens array
  return !item.allergens || item.allergens.length === 0;
}
    return false;
  };

  


  /* FILTER MENU ITEMS
     We implement OR semantics: if no selectedFilters -> behave like earlier
     If filters selected -> include an item if ANY selected filter matches it (quickFilters/diet/misc)
  */
  const filteredItems = useMemo(() => {
  let items = [...menuItemsFlat];

  /* CATEGORY FILTER (unchanged) */
  if (activeCategory !== "All" && activeCategory !== "Sauces") {
    items = items.filter(
      (item) => item.category === activeCategory
    );
  }

  const selected = Array.from(selectedFilters);

  /* -------------------------------
     ALLERGEN EXCLUSIONS (HARD RULE)
     ------------------------------- */
  const excludedAllergens = selected.filter(
    (f): f is Allergen =>
      allergenFilters.some((a) => a.id === f)
  );

  if (excludedAllergens.length > 0) {
    items = items.filter(
      (item) =>
        !excludedAllergens.some((a) =>
          itemHasAllergen(item, a)
        )
    );
  }

  /* ---------------------------------
     POSITIVE FILTERS (OR SEMANTICS)
     --------------------------------- */
  const positiveFilters = selected.filter(
    (f) => !excludedAllergens.includes(f as Allergen)
  );

  if (positiveFilters.length > 0) {
    items = items.filter((item) => {
      const quickMatch = positiveFilters.some((f) =>
        quickFilters.some(
          (q) => q.id === f && matchesFoodType(item, f)
        )
      );

      const dietMatch = positiveFilters.some((f) =>
        dietaryFilters.some(
          (d) => d.id === f && heuristicsMatchDiet(item, f)
        )
      );

      const miscMatch = positiveFilters.some((f) => {
        if (f === "spicy") return item.heatLevel >= 4;
        return false;
      });

      return quickMatch || dietMatch || miscMatch;
    });
  }

  /* -------------------------------
     SORTING (unchanged)
     ------------------------------- */
  if (sortBy === "spice-low") {
    return [...items].sort((a, b) => a.heatLevel - b.heatLevel);
  }

  if (sortBy === "spice-high") {
    return [...items].sort((a, b) => b.heatLevel - a.heatLevel);
  }

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

  return items;
}, [activeCategory, sortBy, selectedFilters]);


  /* --- Right-side glass drawer component (embedded) --- */
const FilterDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-xl transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* PANEL CONTAINER */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 md:p-8 transition-all",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-modal="true"
        role="dialog"
      >
        {/* PANEL */}
        <div
          className={cn(
            "w-full",
            "md:max-w-2xl md:rounded-2xl md:border md:border-primary/20 md:bg-background/70 md:backdrop-blur-2xl md:shadow-2xl",
            "bg-background h-full md:h-auto",
            "transform transition-transform duration-300",
            open
              ? "md:scale-100 md:translate-y-0"
              : "md:scale-90 md:translate-y-4"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10">
            <div>
              <h3 className="font-serif text-lg">Filters & Sort</h3>
              <p className="text-xs text-muted-foreground">
                Select multiple — results are combined (OR)
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-background/80"
            >
              <X size={18} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="overflow-y-auto max-h-[75vh] md:max-h-[60vh] px-4 py-4 space-y-6">

            {/* QUICK FILTERS */}
            <div>
              <h4 className="text-sm font-medium mb-2">Quick Filters</h4>
              <div className="flex flex-wrap gap-2">
                {quickFilters.map((q) => {
                  const active = selectedFilters.has(q.id);
                  return (
                    <button
                      type="button"
                      key={q.id}
                      onClick={() => toggleFilter(q.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition",
                        active
                          ? "bg-primary text-primary-foreground shadow"
                          : "bg-secondary/80 text-muted-foreground hover:bg-secondary/60"
                      )}
                    >
                      {q.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DIETARY */}
           <div>
  <h4 className="text-sm font-medium mb-2">Dietary</h4>
  <div className="flex flex-wrap gap-2">
  {dietaryFilters.map((d) => {
    const active = selectedFilters.has(d.id);
    return (
      <button
      type="button"
        key={d.id}
        onClick={() => toggleFilter(d.id)}
        className={cn(
          "px-3 py-1.5 rounded-full text-sm transition",
          active
            ? "bg-primary text-primary-foreground shadow"
            : "bg-secondary/80 text-muted-foreground hover:bg-secondary/60"
        )}
      >
        {d.label}
      </button>
    );
  })}
</div>
</div>

{/* ALLERGEN EXCLUSIONS */}
<div>
  <h4 className="text-sm font-medium mb-2">Exclude Allergens</h4>
  <div className="flex flex-wrap gap-2">
 {allergenFilters.map((a) => {
  const active = selectedFilters.has(a.id);
  const Icon = allergenIconMap[a.id]?.icon;

  return (
    <button
    type="button"
      key={a.id}
      onClick={() => toggleFilter(a.id)}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition border",
        active
          ? "bg-destructive text-destructive-foreground border-destructive"
          : "bg-secondary/80 text-muted-foreground hover:bg-secondary/60"
      )}
    >
      {Icon && <Icon size={14} />}
      <span>{a.label}</span>
    </button>
  );
})}

</div>
</div>


            {/* MISC */}
            <div>
              <h4 className="text-sm font-medium mb-2">Other</h4>
              <div className="flex flex-wrap gap-2">
  {miscFilters.map((m) => {
    const active = selectedFilters.has(m.id);
    return (
      <button
      type="button"
        key={m.id}
        onClick={() => toggleFilter(m.id)}
        className={cn(
          "px-3 py-1.5 rounded-full text-sm transition",
          active
            ? "bg-orange-500 text-white shadow"
            : "bg-secondary/80 text-muted-foreground hover:bg-secondary/60"
        )}
      >
        {m.label}
      </button>
    );
  })}
</div>
            </div>

            {/* SORT */}
            <div>
  <h4 className="text-sm font-medium mb-2">Sort</h4>

  <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2 -mx-4 px-4 scrollbar-hide">
    {sortOptions.map((s) => (
      <button
        key={s.value}
        onClick={() => setSortBy(s.value)}
        className={cn(
          "px-3 py-1.5 rounded-full text-sm transition shrink-0",
          sortBy === s.value
            ? "bg-primary text-primary-foreground shadow"
            : "bg-secondary/80 text-muted-foreground hover:bg-secondary/60"
        )}
      >
        {s.label}
      </button>
    ))}
  </div>
</div>

          </div>

          {/* FOOTER */}
          <div className="px-4 py-3 border-t border-primary/10 flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded bg-secondary text-sm"
            >
              Close
            </button>

            <button
              onClick={() => {
                clearFilters();
                setSortBy("none");
              }}
              className="px-4 py-2 rounded border border-primary/20 text-sm"
            >
              Reset
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded btn-gold text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


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

            {/* OPEN DRAWER INSTEAD OF SELECT */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="bg-secondary text-sm px-3 py-2 rounded border border-primary/30 flex items-center gap-2"
            >
              Sort / Filters
            </button>
          </div>

          {/* Category Filters */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 md:block",
              showFilters ? "max-h-40" : "max-h-0 md:max-h-none"
            )}
          >
            <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-between">
              <div className="overflow-x-auto w-full md:w-auto">
                {/* Make category tabs horizontally scrollable on small screens */}
                <div className="flex gap-2 md:gap-3 px-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "px-4 py-2 text-sm uppercase tracking-wider rounded-full transition-all whitespace-nowrap",
                        activeCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:bg-primary/20"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Sort -> open drawer */}
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Sort / Filters:</span>
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="bg-secondary px-4 py-2 text-sm rounded border border-primary/30"
                >
                  Open
                </button>
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
                      {/* Bottom meta row */}
<div className="mt-4 flex items-center justify-between gap-3">
  {/* Heat */}
  {item.heatLevel > 0 && (
    <div className="flex items-center gap-1">
      {Array.from({ length: Math.min(item.heatLevel, 5) }).map((_, i) => (
        <Flame
          key={i}
          size={14}
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
        <span className="text-xs text-muted-foreground ml-1">
          +{item.heatLevel - 5}
        </span>
      )}
    </div>
  )}
  {/* Allergens */}
{item.allergens && item.allergens.length > 0 && (
  <div className="flex items-center gap-2">
    {item.allergens.map((a) => {
      const Icon = allergenIconMap[a]?.icon;
      const label = allergenIconMap[a]?.label;
      if (!Icon) return null;

      return (
        <div
          key={a}
          className="group relative"
        >
          <Icon
            size={14}
            className="text-muted-foreground group-hover:text-primary transition"
          />

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-background border px-2 py-1 text-xs opacity-0 group-hover:opacity-100 pointer-events-none shadow">
            {label}
          </div>
        </div>
      );
    })}
  </div>
)}

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
                  {/* Allergens */}
{selectedItem.allergens && selectedItem.allergens.length > 0 && (
  <div className="mb-6">
    <h4 className="font-serif text-sm mb-2 uppercase tracking-wider">
      Contains Allergens
    </h4>

    <div className="flex flex-wrap gap-3">
      {selectedItem.allergens.map((a) => {
        const Icon = allergenIconMap[a]?.icon;
        const label = allergenIconMap[a]?.label;
        if (!Icon) return null;

        return (
          <div
            key={a}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-primary/20 text-xs"
          >
            <Icon size={14} />
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  </div>
)}


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

      {/* Filter Drawer - render at root of page so it's above everything */}
      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </Layout>
  );
}
