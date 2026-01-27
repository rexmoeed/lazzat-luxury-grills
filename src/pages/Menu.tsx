import React, { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Flame, X, Filter, ChevronDown } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

import {
  menuItemsFlat,
  menuItemsGrouped,
} from "@/lib/menu-data";

import { sauces } from "@/lib/sauces-data";
import type { MenuItem, Allergen, DietaryFlag } from "@/lib/menu-types";

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
  milk: { icon: Milk, label: "Dairy" },
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

const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

// Find sauce details by name (case-insensitive)
const findSauce = (name: string) =>
  sauces.find((s) => s.name.toLowerCase() === name.toLowerCase());

// Side catalog pulled from existing menu items
const sidesCatalog = menuItemsFlat.filter((item) => item.category === "Sides");

// Find side details by name (case-insensitive)
const findSide = (name: string) =>
  sidesCatalog.find((s) => s.name.toLowerCase() === name.toLowerCase());

// Fallback side pairings by category when an item does not define its own
const defaultSidePairingsByCategory: Record<string, string[]> = {
  "Grills & Skewers": [
    "Crispy Fries",
    "Side Salad",
    "Classic Butter Naan",
    "Cheese Stuffed Naan",
    "Garlic & Herb Naan",
  ],
  Biryani: ["Side Salad", "Classic Butter Naan"],
  Sajji: ["Butter Garlic Rice", "Crispy Fries"],
};

const getSidePairings = (item: MenuItem): string[] => {
  const explicit = item.sidePairings || [];
  if (explicit.length > 0) return explicit;
  return defaultSidePairingsByCategory[item.category] || [];
};
const categories = [
  "All",
  "Grills & Skewers",
  "Döner",
  "Wraps",
  "Sides",
  "Sauces",
  "Desserts",
  "Shakes & Juices",
  "Biryani",
  "Sajji",
];
const categoryHeadings: Record<string, { title: string; subtitle?: string }> = {
    "Döner": {
      title: "Döner",
      subtitle: "Turkish-style döner wraps, bold flavors, and fresh toppings.",
    },
  "Grills & Skewers": {
    title: "Grills & Skewers",
    subtitle: "Flame-grilled perfection, served fresh.",
  },
  Sides: {
    title: "Sides",
    subtitle: "Perfect companions to complete your meal.",
  },
  Desserts: {
    title: "Desserts",
    subtitle: "Sweet endings made to indulge.",
  },
  "Shakes & Juices": {
    title: "Shakes & Juices",
    subtitle: "Chilled, refreshing & handcrafted.",
  },
  Biryani: {
    title: "Biryani",
    subtitle: "Slow-cooked rice with aromatic spices.",
  },
  Sajji: {
  title: "Sajji",
  subtitle: "Authentic Balochi slow-roasted flavor.",
},
};


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
  { id: "doner", label: "Döner" },
  { id: "biryani", label: "Biryani" },
  { id: "sajji", label: "Sajji" },
];

const dietaryFilters = [
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "gluten-free", label: "Gluten-free" },
];

const allergenFilters: { id: Allergen; label: string }[] = [
  { id: "milk", label: "Dairy" },
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

/* Configuration */
const SPICY_THRESHOLD = 4; // items with heatLevel >= this are considered "spicy"
const MEAT_KEYWORDS = [
  "chicken",
  "lamb",
  "beef",
  "salmon",
  "fish",
  "seekh",
  "meat",
  "sajji",
  "doner",
];


export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("none");
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [filterMode, setFilterMode] = useState<"OR" | "AND">("OR");

  const sideRecommendations = selectedItem ? getSidePairings(selectedItem) : [];

    // Scroll ref for Sort buttons (inside Filter Drawer)
  const sortScrollRef = useRef<HTMLDivElement>(null);

  const scrollSort = (dir: "left" | "right") => {
    if (!sortScrollRef.current) return;

    sortScrollRef.current.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  // Scroll ref for CATEGORY buttons (mobile)
const categoryScrollRef = useRef<HTMLDivElement>(null);

const scrollCategories = (dir: "left" | "right") => {
  if (!categoryScrollRef.current) return;

  categoryScrollRef.current.scrollBy({
    left: dir === "left" ? -200 : 200,
    behavior: "smooth",
  });
};



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
  let result = sauces;

  // Heat filter
  if (sauceFilter === "low") {
    result = result.filter((s) => s.level <= 3);
  } else if (sauceFilter === "mid") {
    result = result.filter((s) => s.level >= 4 && s.level <= 6);
  } else if (sauceFilter === "high") {
    result = result.filter((s) => s.level >= 7);
  }

  // Exclude allergens selected in drawer
  const excludedAllergens = Array.from(selectedFilters).filter(
    (f): f is Allergen =>
      allergenFilters.some((a) => a.id === f)
  );

  if (excludedAllergens.length === 0) {
    return result;
  }

  return result.filter((sauce) => {
    if (!sauce.allergens || sauce.allergens.length === 0) {
      return true;
    }

    return !excludedAllergens.some((a) =>
      sauce.allergens.includes(a)
    );
  });
}, [sauceFilter, selectedFilters]);



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
     IMPORTANT: Prefer explicit dietary flags on menu items. We derive defaults safely when missing.
  */
const itemHasAllergen = (item: MenuItem, allergen: Allergen) => {
  if (!item.allergens || item.allergens.length === 0) return false;
  return item.allergens.includes(allergen);
};


  /**
   * Deterministic dietary matching:
   * - Honors explicit item.dietary when present.
   * - Derives a safe default: vegetarian if no meat keywords; vegan if vegetarian AND no milk/eggs.
   * - Gluten-free is only honored when explicitly provided (avoid accidental false-positives).
   */
  const deriveDietary = (item: MenuItem): DietaryFlag[] => {
    const derived = new Set<DietaryFlag>(item.dietary || []);
    const fullText = `${item.name} ${item.category} ${item.subCategory || ""}`.toLowerCase();

    const hasMeat = MEAT_KEYWORDS.some((kw) => fullText.includes(kw));

    // Vegetarian if no meat keywords
    if (!hasMeat) {
      derived.add("vegetarian");

      // Vegan only when vegetarian AND no dairy/egg allergens
      if (!itemHasAllergen(item, "milk") && !itemHasAllergen(item, "eggs")) {
        derived.add("vegan");
      }
    }

    // Gluten-free is only trusted if explicitly provided in data
    // (to avoid mislabeling items that may contain hidden gluten).

    return Array.from(derived);
  };

  const itemMatchesDiet = (item: MenuItem, dietId: string) => {
    return deriveDietary(item).includes(dietId as DietaryFlag);
  };

  


  /**
   * FILTER MENU ITEMS
   * 
   * Filter Pipeline:
   * 1. Category filter (All vs specific category)
   * 2. Allergen EXCLUSIONS - removes items with selected allergens (hard rule)
   * 3. POSITIVE FILTERS - includes items matching ANY selected filter (OR logic)
   *    - Quick filters: protein/type shortcuts (chicken, lamb, salmon, etc.)
   *    - Dietary filters: vegan, vegetarian, gluten-free
   *    - Misc filters: spicy (heat level >= threshold)
   * 4. SORT - applies ordering:
   *    - "spice-low" / "spice-high" - sorts by heat level
   *    - Food type filters - acts as secondary filter (displays only that type)
   */
  const filteredItems = useMemo(() => {
  let items = [...menuItemsFlat];

  /* Step 1: CATEGORY FILTER */
  if (activeCategory !== "All" && activeCategory !== "Sauces") {
    items = items.filter(
      (item) => item.category === activeCategory
    );
  }

  const selected = Array.from(selectedFilters);

  /* Step 2: ALLERGEN EXCLUSIONS (HARD RULE - removes items containing selected allergens) */
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

  /* Step 3: POSITIVE FILTERS (OR SEMANTICS - includes item if ANY filter matches) */
  const positiveFilters = selected.filter(
    (f) => !excludedAllergens.includes(f as Allergen)
  );

  if (positiveFilters.length > 0) {
    items = items.filter((item) => {
      // Quick filters: match food type/protein
      const quickMatch = positiveFilters.some((f) =>
        quickFilters.some(
          (q) => q.id === f && matchesFoodType(item, f)
        )
      );

      // Dietary filters: vegan, vegetarian, gluten-free
      const dietMatch = positiveFilters.some((f) =>
        dietaryFilters.some((d) => d.id === f && itemMatchesDiet(item, f))
      );

      // Misc filters: spicy, etc.
      const miscMatch = positiveFilters.some((f) => {
        if (f === "spicy") return item.heatLevel >= SPICY_THRESHOLD;
        return false;
      });

      return quickMatch || dietMatch || miscMatch;
    });
  }

  /* Step 4: SORTING */
  // Sort by heat level (ascending or descending)
  if (sortBy === "spice-low") {
    return [...items].sort((a, b) => a.heatLevel - b.heatLevel);
  }

  if (sortBy === "spice-high") {
    return [...items].sort((a, b) => b.heatLevel - a.heatLevel);
  }

  // Food type shortcuts: filter to show only selected type
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

  // Default: return all filtered items in original order
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

  <div className="relative -mx-4 px-4">
  {/* LEFT ARROW */}
  <button
    type="button"
    onClick={() => scrollSort("left")}
    className="absolute left-1 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 border border-primary/20 rounded-full shadow"
  >
    <ChevronLeft size={16} />
  </button>

  {/* SCROLLABLE SORT BUTTONS */}
  <div
    ref={sortScrollRef}
    className="flex items-center gap-2 overflow-x-auto whitespace-nowrap h-12 px-10 scrollbar-hide"
  >
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

  {/* RIGHT ARROW */}
  <button
    type="button"
    onClick={() => scrollSort("right")}
    className="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 border border-primary/20 rounded-full shadow"
  >
    <ChevronRight size={16} />
  </button>
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
         

          {/* Category Filters */}
          <div className="overflow-hidden md:block max-h-none">
            <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-between">
              <div className="w-full md:w-auto">

  {/* SLIDER ROW (arrows aligned to this only) */}
  <div className="relative">

    {/* LEFT ARROW — mobile only */}
    <button
      type="button"
      onClick={() => scrollCategories("left")}
      className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 border border-primary/20 rounded-full shadow"
    >
      <ChevronLeft size={16} />
    </button>

    {/* SCROLLABLE CATEGORY PILLS */}
    <div
      ref={categoryScrollRef}
      className="flex gap-2 md:gap-3 px-0 overflow-x-auto whitespace-nowrap scrollbar-hide"
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={cn(
            "px-4 py-2 text-sm uppercase tracking-wider rounded-full transition-all shrink-0",
            activeCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-primary/20"
          )}
        >
          {category}
        </button>
      ))}
    </div>

    {/* RIGHT ARROW — mobile only */}
    <button
      type="button"
      onClick={() => scrollCategories("right")}
      className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 border border-primary/20 rounded-full shadow"
    >
      <ChevronRight size={16} />
    </button>
  </div>

  {/* MOBILE Sort & Filters — BELOW slider (not inside arrow container) */}
  <div className="md:hidden mt-3 flex justify-center w-full">
    <button
      onClick={() => setDrawerOpen(true)}
      className="
        flex items-center gap-2
        bg-secondary/80 backdrop-blur
        px-5 py-2.5
        text-sm font-medium
        rounded-full
        border border-primary/30
        hover:border-primary
        hover:bg-primary/10
        transition-all
      "
    >
      <Filter size={16} className="text-primary" />
      Sort & Filters
    </button>
  </div>

</div>


              {/* Desktop Sort -> open drawer */}
<div className="hidden md:flex items-center gap-4">
  <span className="text-sm text-muted-foreground tracking-wide">
    Sort & Filters
  </span>

  <button
    onClick={() => setDrawerOpen(true)}
    className="
      flex items-center gap-2
      bg-secondary/80 backdrop-blur
      px-5 py-2.5
      text-sm font-medium
      rounded-full
      border border-primary/30
      hover:border-primary
      hover:bg-primary/10
      transition-all
    "
  >
    <Filter size={16} className="text-primary" />
    Open Panel
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {filteredSauces.map((sauce) => (
    <div
    key={sauce.name}
    onClick={() =>
      setSelectedItem({
        id: hashCode(sauce.name),
        name: sauce.name,
        description: sauce.description,
        image: sauce.image,
        category: "Sauces",
        subCategory: "Signature Sauce",
        heatLevel: sauce.level,
        allergens: sauce.allergens || [],
        saucePairings: [],
        customizations: [],
        isNew: false,
        isPopular: false,
      })
    }
    className="card-luxury p-4 md:p-6 group flex flex-col cursor-pointer"
  >
      {/* Sauce Image */}
      {sauce.image && (
        <div className="mb-3 overflow-hidden rounded-md aspect-[4/3]">
  <img
    src={sauce.image}
    alt={sauce.name}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
</div>
      )}

      <h3 className="font-serif text-lg mb-2 group-hover:text-primary">
        {sauce.name}
      </h3>

      <p className="text-xs text-muted-foreground mb-4 line-clamp-4">
        {sauce.description}
      </p>

      {/* Bottom row: Allergens (LEFT) + Heat (RIGHT) */}
      <div className="mt-auto flex items-center justify-between min-h-[20px]">
        {/* Allergens */}
        {sauce.allergens && sauce.allergens.length > 0 ? (
          <div className="flex items-center gap-2">
            {sauce.allergens.map((a) => {
              const Icon = allergenIconMap[a]?.icon;
              const label = allergenIconMap[a]?.label;
              if (!Icon) return null;

              return (
                <div key={a} className="group relative">
                  <Icon
                    size={14}
                    className="text-muted-foreground group-hover:text-primary transition"
                  />
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-background border px-2 py-1 text-xs opacity-0 group-hover:opacity-100 pointer-events-none shadow">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <span className="w-6" />
        )}

        {/* Heat */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(sauce.level, 5) }).map((_, i) => (
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
    </div>
  ))}
</div>


            </>
          ) : (
            <>
              {/* CATEGORY HEADING (except Sauces & All) */}
  {activeCategory !== "All" &&
    activeCategory !== "Sauces" &&
    categoryHeadings[activeCategory] && (
      <div className="mb-6">
        <h2 className="font-serif text-3xl">
          {categoryHeadings[activeCategory].title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {categoryHeadings[activeCategory].subtitle}
        </p>
      </div>
    )}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredItems.map((item, index) => {
    const showDessertHeading =
      item.category === "Desserts" &&
      (index === 0 ||
        filteredItems[index - 1]?.subCategory !== item.subCategory);

    return (
      <React.Fragment key={item.id}>
        {/* DESSERT SUBCATEGORY HEADING */}
        {showDessertHeading && (
          <div className="col-span-full">
            <h3 className="font-serif text-2xl mb-4 border-b border-primary/20 pb-2">
              {item.subCategory}
            </h3>
          </div>
        )}

        <div
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
                  {Array.from({ length: Math.min(item.heatLevel, 5) }).map(
                    (_, i) => (
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
                    )
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
                      <div key={a} className="group relative">
                        <Icon
                          size={14}
                          className="text-muted-foreground group-hover:text-primary transition"
                        />
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
      </React.Fragment>
    );
  })}
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

      {/* PRODUCT MODAL - ELEGANT DESIGN */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl overflow-hidden flex items-center justify-center p-0 md:p-6"
          onClick={() => setSelectedItem(null)}
        >
          <div className="w-full h-full md:h-auto md:max-h-[75vh] flex items-center justify-center">
            <div
              className="relative w-full h-full md:h-auto md:max-w-4xl bg-background/95 backdrop-blur-md border-0 md:border md:border-primary/20 md:rounded-2xl overflow-hidden shadow-2xl animate-zoom-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/90 backdrop-blur border border-primary/30 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 h-full md:h-auto md:max-h-[75vh]">
                {/* Image Section - boxed to show full image */}
                <div className="lg:col-span-2 h-60 lg:h-full lg:max-h-[75vh] bg-black/80 flex items-center justify-center px-2 py-3">
                  <div className="relative w-full h-full rounded-xl border border-primary/20 overflow-hidden bg-black">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    {/* Category Badge on Image */}
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-4 py-1.5 bg-primary/90 backdrop-blur text-primary-foreground text-xs font-medium uppercase tracking-wider rounded-full">
                        {selectedItem.category}
                        {selectedItem.subCategory && ` • ${selectedItem.subCategory}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section - Takes 3 columns */}
                <div className="lg:col-span-3 flex flex-col h-[calc(100vh-19rem)] md:h-full md:max-h-[75vh]">
                  <div className="p-6 md:p-8 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent hover:scrollbar-thumb-primary/50">
                    {/* Header */}
                    <div className="mb-6">
                      <h2 className="font-serif text-3xl md:text-4xl mb-3 text-foreground">
                        {selectedItem.name}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {selectedItem.description}
                      </p>
                    </div>

                    {/* Heat Level Badge */}
                    {selectedItem.heatLevel > 0 && (
                      <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg">
                        <Flame size={18} className="text-orange-500" />
                        <span className="text-sm font-medium">Heat Level {selectedItem.heatLevel}</span>
                        <div className="flex items-center gap-0.5 ml-2">
                          {Array.from({ length: Math.min(selectedItem.heatLevel, 5) }).map((_, i) => (
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
                      </div>
                    )}

                    {/* Allergens Section */}
                    {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                      <div className="mb-6 pb-6 border-b border-primary/10">
                        <h4 className="font-serif text-sm mb-3 uppercase tracking-wider text-muted-foreground">
                          Allergen Information
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.allergens.map((a) => {
                            const Icon = allergenIconMap[a]?.icon;
                            const label = allergenIconMap[a]?.label;
                            if (!Icon) return null;

                            return (
                              <div
                                key={a}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/30 text-sm"
                              >
                                <Icon size={16} className="text-destructive" />
                                <span className="font-medium">{label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Sauce Pairings Section */}
                    {selectedItem.saucePairings.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-serif text-sm mb-4 uppercase tracking-wider text-muted-foreground">
                          Recommended Sauce Pairings
                        </h4>
                        <div className="space-y-3">
                          {selectedItem.saucePairings.map((name) => {
                            const sauce = findSauce(name);

                            if (!sauce) {
                              return (
                                <span
                                  key={name}
                                  className="inline-block text-xs bg-secondary px-3 py-1.5 rounded-full border border-primary/20"
                                >
                                  {name}
                                </span>
                              );
                            }

                            return (
                              <div
                                key={name}
                                className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-colors"
                              >
                                {sauce.image && (
                                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-background shadow-sm">
                                    <img
                                      src={sauce.image}
                                      alt={sauce.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-sm font-semibold truncate">{sauce.name}</span>
                                    <div className="flex items-center gap-0.5 flex-shrink-0">
                                      {Array.from({ length: Math.min(sauce.level, 3) }).map((_, i) => (
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
                                      {sauce.level > 3 && (
                                        <span className="text-xs text-muted-foreground ml-1">
                                          +{sauce.level - 3}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {sauce.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Side Pairings Section */}
                    {sideRecommendations.length > 0 && selectedItem.category === "Grills & Skewers" && (
                      <div className="mb-6">
                        <h4 className="font-serif text-sm mb-4 uppercase tracking-wider text-muted-foreground">
                          Recommended Sides
                        </h4>
                        <div className="space-y-3">
                          {sideRecommendations.map((name) => {
                            const side = findSide(name);

                            if (!side) {
                              return (
                                <span
                                  key={name}
                                  className="inline-block text-xs bg-secondary px-3 py-1.5 rounded-full border border-primary/20"
                                >
                                  {name}
                                </span>
                              );
                            }

                            return (
                              <div
                                key={name}
                                className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-colors"
                              >
                                {side.image && (
                                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-background shadow-sm">
                                    <img
                                      src={side.image}
                                      alt={side.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-sm font-semibold truncate">{side.name}</span>
                                    {typeof side.price === "number" && (
                                      <span className="text-xs font-semibold text-primary">
                                        ${side.price.toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {side.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Customizations Section */}
                    {selectedItem.customizations.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-serif text-sm mb-3 uppercase tracking-wider text-muted-foreground">
                          Available Customizations
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.customizations.map((c) => (
                            <span
                              key={c}
                              className="text-xs bg-primary/10 text-primary px-3 py-2 rounded-lg border border-primary/30 font-medium"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer with CTA */}
                  <div className="p-6 md:p-8 pt-4 border-t border-primary/10 bg-secondary/30">
                    <button className="btn-gold w-full py-3 text-base font-semibold">
                      Order Now
                    </button>
                  </div>
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