import {
  quickFilters,
  dietaryFilters,
  allergenFilters,
  miscFilters,
  SPICY_THRESHOLD,
  allergenIconMap,
  sidesTabs,
  slugify,
  hashCode,
} from "@/lib/menu-constants";

import React, { useMemo, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Layout } from "@/components/layout/Layout";
import { Flame, X, Filter, ChevronDown, ChevronLeft, ChevronRight, Milk, Egg, Wheat, Nut, Fish, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  menuItemsFlat,
  menuItemsGrouped,
} from "@/lib/menu-data";
// ...removed sauces import
import type { MenuItem, Allergen, DietaryFlag } from "@/lib/menu-types";
import { findSauce } from "@/lib/find-sauce";
import { spices } from "@/lib/spices-data";



export default function MenuPage() {
    const pageTitle = "Menu | Lazzat - Premium Grills, Biryani, Sajji & More";
    const pageDescription = "Explore Lazzat's full menu: BBQ, Tikka, Kabab, Biryani, Sajji, desserts, sides, shakes, and more. Fresh, halal, and luxurious dining.";
  // State declarations
  const [activeSidesTab, setActiveSidesTab] = useState<string>("carb");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("none");
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [filterMode, setFilterMode] = useState<"OR" | "AND">("OR");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());
  // ...removed sauceFilter state

  // Helper to clear filters
  const clearFilters = () => setSelectedFilters(new Set());

  // ...removed filteredSauces helper

  // Helper component to render category heading
  function CategoryHeading({ category }: { category: string }) {
    if (!categoryHeadings[category]) return null;
    return (
      <div className="mb-6">
        <h2 className="font-serif text-3xl">{categoryHeadings[category].title}</h2>
        <p className="text-sm text-muted-foreground">{categoryHeadings[category].subtitle}</p>
      </div>
    );
  }

  // (Removed duplicate state declarations)



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

  // Filter logic for multi-select filters
  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

// ...removed findSauce helper

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
    Biryani: [
      "Side Salad",
      "Coleslaw",
      "Grilled Vegetables",
      "Corn on the Cob"
    ],
    Sajji: [
      "Side Salad",
      "Coleslaw",
      "Grilled Vegetables",
      "Corn on the Cob"
    ],
  };

  const getSidePairings = (item: MenuItem): string[] => {
    const explicit = item.sidePairings || [];
    if (explicit.length > 0) return explicit;
    return defaultSidePairingsByCategory[item.category] || [];
  };

  // Now that getSidePairings is defined, compute sideRecommendations
  const sideRecommendations = selectedItem ? getSidePairings(selectedItem) : [];
const categories = [
  "All",
  "Grills & Skewers",
  "Döner",
  "Wraps",
  "Biryani",
  "Sajji",
  "Desserts",
  "Sides",
  "Shakes & Juices",
];

// Category headings for display
const categoryHeadings: Record<string, { title: string; subtitle: string }> = {
  "Grills & Skewers": {
    title: "Grills & Skewers",
    subtitle: "Charcoal grilled meats and skewers."
  },
  "Döner": {
    title: "Döner",
    subtitle: "Classic döner kebabs and wraps."
  },
  "Wraps": {
    title: "Wraps",
    subtitle: "Freshly made wraps with premium fillings."
  },
  "Biryani": {
    title: "Biryani",
    subtitle: "Aromatic rice dishes with spices."
  },
  "Desserts": {
    title: "Desserts",
    subtitle: "Sweet treats and indulgent delights."
  },
  "Sajji": {
    title: "Sajji",
    subtitle: "Traditional Sajji specialties."
  },
  "Sides": {
    title: "Sides",
    subtitle: "Perfect accompaniments for your meal."
  },
  // ...removed Sauces heading
  "Shakes & Juices": {
    title: "Shakes & Juices",
    subtitle: "Refreshing shakes and juices."
  },
};

// Sort options for the sort bar
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


// Remove duplicate export default and keep only one MenuPage definition (the one at the top of the file)



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
    // Only trust explicit dietary flags for vegan, vegetarian, gluten-free
    let flags = new Set(item.dietary || []);
    // Remove vegan/vegetarian if item contains eggs
    if (itemHasAllergen(item, "eggs")) {
      flags.delete("vegan");
      flags.delete("vegetarian");
    }
    return Array.from(flags);
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

      // Dietary filters: vegan, vegetarian, gluten-free (AND logic)
      const selectedDietary = positiveFilters.filter((f) =>
        dietaryFilters.some((d) => d.id === f)
      );
      let dietMatch = false;
      if (selectedDietary.length > 0) {
        dietMatch = selectedDietary.every((f) => itemMatchesDiet(item, f));
      }

      // Misc filters: spicy, etc.
      const miscMatch = positiveFilters.some((f) => {
        if (f === "spicy") return (item.heatLevel ?? 0) >= SPICY_THRESHOLD;
        return false;
      });

      // If any dietary filter is selected, require AND match for all selected dietary filters
      if (selectedDietary.length > 0) {
        return dietMatch;
      }
      return quickMatch || miscMatch;
    });
  }

  /* Step 4: SORTING */
  // Sort by heat level (ascending or descending)
  if (sortBy === "spice-low") {
    return [...items].sort((a, b) => (a.heatLevel ?? 0) - (b.heatLevel ?? 0));
  }

  if (sortBy === "spice-high") {
    return [...items].sort((a, b) => (b.heatLevel ?? 0) - (a.heatLevel ?? 0));
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
      {Icon && <Icon size={14} className="text-red-400" />}
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
      <>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://lazzat.ca/menu" />
          <meta property="og:image" content="https://lazzat.ca/Lazzat%20logo%2002.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <meta name="twitter:image" content="https://lazzat.ca/Lazzat%20logo%2002.png" />
          <link rel="canonical" href="https://lazzat.ca/menu" />
        </Helmet>
        <Layout>
        <main id="main-content" tabIndex={-1} aria-label="Menu page main content">
          <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-background" aria-labelledby="menu-hero-title">
            <div className="container-luxury px-4 text-center">
              <div className="gold-divider w-16 mx-auto mb-6" />
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
                <span id="menu-hero-title">Our <span className="text-primary">Menu</span></span>
              </h1>
              <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
                Explore our premium selection of grills, sauces, desserts, shakes,
                juices and biryani. All new menu.
              </p>
            </div>
          </section>
          <nav className="sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-md border-b border-primary/20 py-4" aria-label="Menu category navigation">
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
                        className="flex items-center gap-2 bg-secondary/80 backdrop-blur px-5 py-2.5 text-sm font-medium rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
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
                      className="flex items-center gap-2 bg-secondary/80 backdrop-blur px-5 py-2.5 text-sm font-medium rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
                    >
                      <Filter size={16} className="text-primary" />
                      Open Panel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <section className="section-padding bg-background" aria-label="Menu items">
            <div className="container-luxury px-4">
              {/* --- Main Content Logic: Wrap all in a single parent fragment --- */}
              <>
                {/* Unified category rendering for all categories */}
                {activeCategory !== "All" && (
                  <>
                    <CategoryHeading category={activeCategory} />
                    {/* Sides Tabs and Filtering */}
                    {activeCategory === "Sides" && (
                      <div className="flex gap-2 mb-6">
                        {sidesTabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveSidesTab(tab.id)}
                            className={cn(
                              "px-4 py-2 rounded-full text-sm font-semibold transition",
                              activeSidesTab === tab.id
                                ? "bg-primary text-primary-foreground shadow"
                                : "bg-secondary/80 text-muted-foreground hover:bg-secondary/60"
                            )}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    )}
                    {/* ...removed Sauces Filter Dropdown */}
                    {/* Grid for Sides, Sauces, or other single category */}
                    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                      {(activeCategory === "Sides"
                        ? filteredItems.filter((item) => item.category === "Sides" && item.sideType === activeSidesTab)
                        : filteredItems.filter((item) => item.category === activeCategory)
                      ).map((item) => (
                        <div
                          key={item.id}
                          tabIndex={0}
                          role="button"
                          aria-label={`View details for ${item.name}`}
                          onClick={() => setSelectedItem(item)}
                          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setSelectedItem(item)}
                          className="card-luxury cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          {item.image && (
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                              <div className="absolute top-4 left-4 flex gap-2">
                                {item.isNew && (
                                  <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded">New</span>
                                )}
                                {item.isPopular && (
                                  <span className="bg-foreground text-background text-xs px-3 py-1 rounded">Popular</span>
                                )}
                              </div>
                            </div>
                          )}
                          <div className="p-6">
                            <h3 className="font-serif text-xl group-hover:text-primary transition-colors">{item.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                            <div className="mt-3 text-xs text-primary uppercase tracking-wider">
                              {item.category}
                              {item.subCategory ? ` • ${item.subCategory}` : ""}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* No items found */}
                    {filteredItems.filter((item) => item.category === activeCategory).length === 0 && (
                      <div className="text-center py-16">
                        <p className="text-muted-foreground">
                          No items found in this category.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {activeCategory === "All" && (
                  <>
                    {categories.filter(cat => cat !== "All" && cat !== "Sides").map((cat) => {
                      const items = filteredItems.filter(item => item.category === cat);
                      if (items.length === 0) return null;
                      return (
                        <div key={cat} className="mb-12">
                          <CategoryHeading category={cat} />
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                              <div
                                key={item.id}
                                tabIndex={0}
                                role="button"
                                aria-label={`View details for ${item.name}`}
                                onClick={() => setSelectedItem(item)}
                                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setSelectedItem(item)}
                                className="card-luxury cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary"
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
                                      <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded">New</span>
                                    )}
                                    {item.isPopular && (
                                      <span className="bg-foreground text-background text-xs px-3 py-1 rounded">Popular</span>
                                    )}
                                  </div>
                                </div>
                                <div className="p-6">
                                  <h3 className="font-serif text-xl group-hover:text-primary transition-colors">{item.name}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                                  <div className="mt-3 text-xs text-primary uppercase tracking-wider">
                                    {item.category}
                                    {item.subCategory ? ` • ${item.subCategory}` : ""}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
              {/* PRODUCT MODAL - ELEGANT DESIGN */}
              {selectedItem && (
                <div
                  className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl overflow-hidden flex items-center justify-center p-0 md:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  tabIndex={-1}
                  onClick={() => setSelectedItem(null)}
                >
                  <div className="w-full h-full md:h-auto md:max-h-[75vh] flex items-center justify-center">
                    <div
                      className="relative w-full h-full md:h-auto md:max-w-4xl bg-background/95 backdrop-blur-md border-0 md:border md:border-primary/20 md:rounded-2xl overflow-hidden shadow-2xl animate-zoom-in"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Close Button */}
                      <button
                        aria-label="Close menu item details"
                        onClick={() => setSelectedItem(null)}
                        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/90 backdrop-blur border border-primary/30 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
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
                            {/* Heat Level Dots/Flames */}
                            {selectedItem.heatLevel > 0 && (
                              <div className="mb-6">
                                <div
                                  className="flex items-center rounded-xl border border-[#3a2a1a] px-3 py-1.5 gap-2 shadow-inner"
                                  style={{
                                    background: 'linear-gradient(90deg, #1a2c16 0%, #23180f 10%, #23180f 90%, #3a1a1a 100%)',
                                    boxShadow: '0 1px 8px 0 #1a1a1a inset',
                                    width: '260px',
                                    minWidth: '260px',
                                    maxWidth: '260px',
                                  }}
                                >
                                  <span className="text-xs font-semibold text-white mr-2">Spice</span>
                                  {Array.from({ length: 7 }).map((_, i) => {
                                    let color = 'text-gray-300';
                                    if (i === 0) color = i < selectedItem.heatLevel ? 'text-green-400' : 'text-gray-700';
                                    else if (i === 1) color = i < selectedItem.heatLevel ? 'text-yellow-300' : 'text-gray-700';
                                    else if (i >= 2 && i <= 5) color = i < selectedItem.heatLevel ? 'text-orange-400' : 'text-gray-700';
                                    else if (i === 6) color = i < selectedItem.heatLevel ? 'text-red-500' : 'text-gray-700';
                                    return (
                                      <Flame
                                        key={i}
                                        size={18}
                                        strokeWidth={1.5}
                                        className={color + (i < selectedItem.heatLevel ? '' : ' opacity-40')}
                                        fill={i < selectedItem.heatLevel ? 'currentColor' : 'none'}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                            {/* Allergens Section */}
                            {Array.isArray(selectedItem.allergens) && selectedItem.allergens.length > 0 && (
                              <div className="mb-6 pb-6 border-b border-primary/10">
                                <div
                                  className="flex items-center rounded-xl border border-[#3a2a1a] px-3 py-1.5 gap-2 shadow-inner"
                                  style={{
                                    background: 'rgba(35, 24, 15, 0.35)',
                                    width: '260px',
                                    minWidth: '260px',
                                    maxWidth: '260px',
                                  }}
                                >
                                  <span className="text-xs font-semibold text-white mr-2">
                                    {selectedItem.allergens.length === 1 ? 'Allergen' : 'Allergens'}
                                  </span>
                                  {selectedItem.allergens.map((a) => {
                                    const Icon = allergenIconMap[a]?.icon;
                                    if (!Icon) return null;
                                    return (
                                      <span key={a} className="flex items-center text-xs">
                                        <Icon size={18} className="text-red-500" />
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                            {/* Side Pairings Section */}
                            {sideRecommendations.length > 0 && ["Grills & Skewers", "Döner", "Wraps", "Biryani", "Sajji"].includes(selectedItem.category) && (
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
                            {/* Sauce Pairings Section */}
                            {Array.isArray(selectedItem.saucePairings) && selectedItem.saucePairings.length > 0 && ["Grills & Skewers", "Döner", "Wraps", "Biryani", "Sajji"].includes(selectedItem.category) && (
                              <div className="mb-6">
                                <h4 className="font-serif text-sm mb-4 uppercase tracking-wider text-muted-foreground">
                                  Recommended Sauces
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
                            {/* Seasonings Section */}
                            {spices && spices.length > 0 && selectedItem && (() => {
                              // Show for Sides (not rice/naan), Grills & Skewers, Döner, Wraps
                              const cat = selectedItem.category;
                              const name = selectedItem.name.toLowerCase();
                              const isRice = name.includes("rice");
                              const isNaan = name.includes("naan");
                              const isColeslaw = name.includes("coleslaw");
                              // Show for all menu items that can support spices (not rice, naan, desserts, shakes)
                              const excludedCategories = ["Desserts", "Shakes & Juices", "Biryani", "Sajji"];
                              const showSeasonings =
                                !excludedCategories.includes(cat) &&
                                !isRice &&
                                !isNaan;
                              if (!showSeasonings) return null;
                              let selectedSeasonings = [];
                              if (isColeslaw) {
                                // Only mild, fresh seasonings for coleslaw
                                selectedSeasonings = spices.filter(s => ["Dried Parsley", "Dried Lemon Peel", "Lemon Zest"].includes(s.name));
                              } else if (cat === "Sides") {
                                // Sides: avoid spicy for salad/veg, allow both spicy and mild for fries/corn
                                if (name.includes("fries")) {
                                  selectedSeasonings = spices.filter(s => [
                                    "Crushed Red Chilli", "Smoked Paprika", "Cracked Black Pepper", "Mustard Powder", "Dried Parsley"
                                  ].includes(s.name));
                                } else if (name.includes("corn")) {
                                  selectedSeasonings = spices.filter(s => [
                                    "Crushed Red Chilli", "Smoked Paprika", "Dried Parsley", "Lemon Zest"
                                  ].includes(s.name));
                                } else if (name.includes("salad") || name.includes("vegetable")) {
                                  selectedSeasonings = spices.filter(s => ["Dried Parsley", "Lemon Zest", "Dried Lemon Peel"].includes(s.name));
                                } else {
                                  // Default: offer a mix of mild and moderate
                                  selectedSeasonings = spices.filter(s => s.level <= 3).slice(0, 3);
                                }
                              } else if (cat === "Grills & Skewers") {
                                // Grills: support both high and low spice
                                selectedSeasonings = spices.filter(s => [
                                  "Crushed Red Chilli", "Korean Chilli Flakes", "Smoked Paprika", "Coriander Seed Powder", "Toasted Cumin", "Dried Parsley"
                                ].includes(s.name));
                              } else if (cat === "Döner") {
                                // Döner: support both high and low spice
                                selectedSeasonings = spices.filter(s => [
                                  "Crushed Red Chilli", "Smoked Paprika", "Coriander Seed Powder", "Dried Parsley", "Mustard Powder"
                                ].includes(s.name));
                              } else if (cat === "Wraps") {
                                // Wraps: support both high and low spice
                                selectedSeasonings = spices.filter(s => [
                                  "Crushed Red Chilli", "Smoked Paprika", "Dried Parsley", "Mustard Powder", "Cracked Black Pepper"
                                ].includes(s.name));
                              } else if (cat === "Grills & Skewers" || cat === "Döner" || cat === "Wraps" || cat === "Sides") {
                                // fallback for any other item in these categories
                                selectedSeasonings = spices.filter(s => s.level <= 7 && s.level >= 0).slice(0, 4);
                              } else {
                                // For other categories (e.g. main dishes that can support spices)
                                selectedSeasonings = spices.filter(s => s.level >= 2 && s.level <= 6).slice(0, 3);
                              }
                              if (selectedSeasonings.length === 0) return null;
                              return (
                                <div className="mb-6">
                                  <h4 className="font-serif text-sm mb-4 uppercase tracking-wider text-muted-foreground">
                                    Seasonings
                                  </h4>
                                  <div className="space-y-3">
                                    {selectedSeasonings.map((seasoning) => (
                                      <div
                                        key={seasoning.name}
                                        className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-colors"
                                      >
                                        {seasoning.image && (
                                          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-background shadow-sm">
                                            <img
                                              src={seasoning.image}
                                              alt={seasoning.name}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="text-sm font-semibold truncate">{seasoning.name}</span>
                                          </div>
                                          <p className="text-xs text-muted-foreground line-clamp-2">
                                            {seasoning.description}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })()}
                            {/* Customizations Section */}
                            {Array.isArray(selectedItem.customizations) && selectedItem.customizations.length > 0 && (
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
            </div>
          </section>
        </main>
      </Layout>
    </>
    );
}