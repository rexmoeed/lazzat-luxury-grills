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

import { useMemo, useState, useRef } from "react";
import AllergenInfo from "@/components/shared/AllergenInfo";
import type { SauceItem } from "../lib/menu-types";
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



// Type guard helpers
function isMenuItem(item: any): item is MenuItem {
  return item && typeof item === 'object' && 'category' in item && 'heatLevel' in item;
}
function isSauceItem(item: any): item is SauceItem {
  return item && typeof item === 'object' && 'level' in item && !('category' in item);
}

export default function MenuPage() {
    const pageTitle = "Menu | Lazzat - Premium Grills, Biryani, Sajji & More";
    const pageDescription = "Explore Lazzat's full menu: BBQ, Tikka, Kabab, Biryani, Sajji, desserts, sides, shakes, and more. Fresh, halal, and luxurious dining.";
  // State declarations
  const [activeSidesTab, setActiveSidesTab] = useState<string>("carb");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("none");
  // Modal stack: allows back navigation
  const [modalStack, setModalStack] = useState<(MenuItem | SauceItem | null)[]>([]);
  const selectedItem = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  // Allergen Info modal state
  const [showAllergenModal, setShowAllergenModal] = useState(false);
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
  const sideRecommendations = isMenuItem(selectedItem) ? getSidePairings(selectedItem) : [];
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
// Note: Protein filters (chicken, lamb, etc.) are in the Filter Drawer, not here
const sortOptions = [
  { value: "none", label: "Default" },
  { value: "spice-low", label: "Spice: Low to High" },
  { value: "spice-high", label: "Spice: High to Low" },
  { value: "fruit-entremet", label: "Fruit Entremet" },
  { value: "cheesecakes", label: "Cheesecakes" },
  { value: "tiramisu", label: "Tiramisu" },
  { value: "brownies", label: "Brownies" },
  { value: "cinnamon-rolls", label: "Cinnamon Rolls" },
  { value: "cakes", label: "Cakes" },
  { value: "tres-leches", label: "Tres Leches" },
  { value: "shakes", label: "Shakes" },
  { value: "juices", label: "Juices" },
];



  /* MATCH FOOD TYPES */
  const matchesFoodType = (item: MenuItem, type: string) => {
    const t = slugify(type);
    const alt = t === "doner" ? "d-ner" : null;
    return (
      slugify(item.subCategory) === t ||
      (alt && slugify(item.subCategory) === alt) ||
      slugify(item.category) === t ||
      (alt && slugify(item.category) === alt) ||
      slugify(item.name).includes(t) ||
      (alt && slugify(item.name).includes(alt))
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
   * - Honors explicit item.dietary only (no inference).
   * - If explicit flags conflict with allergens, remove the conflicting flag.
   */
  const deriveDietary = (item: MenuItem): DietaryFlag[] => {
    const flags = new Set(item.dietary || []);

    if (flags.has("vegan")) {
      if (
        itemHasAllergen(item, "milk") ||
        itemHasAllergen(item, "eggs") ||
        itemHasAllergen(item, "fish") ||
        itemHasAllergen(item, "shellfish")
      ) {
        flags.delete("vegan");
      }
    }

    if (flags.has("gluten-free") && itemHasAllergen(item, "gluten")) {
      flags.delete("gluten-free");
    }

    if (flags.has("dairy-free") && itemHasAllergen(item, "milk")) {
      flags.delete("dairy-free");
    }

    if (
      flags.has("nut-free") &&
      (itemHasAllergen(item, "tree-nuts") || itemHasAllergen(item, "peanuts"))
    ) {
      flags.delete("nut-free");
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
   * 3. POSITIVE FILTERS - combines filter groups with AND across groups:
   *    - Quick filters: protein/type shortcuts (chicken, lamb, salmon, etc.) - OR within group
   *    - Dietary filters: vegan, vegetarian, gluten-free - AND within group (must match ALL)
   *    - Misc filters: spicy (heat level >= threshold) - AND within group
   *    - Groups combined: quickMatch AND dietMatch AND miscMatch
   * 4. SORT - applies ordering:
   *    - "spice-low" / "spice-high" - sorts by heat level
   *    - Food type filters - acts as secondary filter (displays only that type)
   */
  const filteredItems = useMemo(() => {
  let items = [...menuItemsFlat];

  /* Step 1: CATEGORY FILTER */
  if (activeCategory !== "All") {
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

  /* Step 3: POSITIVE FILTERS (AND across groups, OR within each group) */
  const positiveFilters = selected.filter(
    (f) => !excludedAllergens.includes(f as Allergen)
  );

  if (positiveFilters.length > 0) {
    const selectedQuick = positiveFilters.filter((f) =>
      quickFilters.some((q) => q.id === f)
    );
    const selectedDietary = positiveFilters.filter((f) =>
      dietaryFilters.some((d) => d.id === f)
    );
    const selectedMisc = positiveFilters.filter((f) =>
      miscFilters.some((m) => m.id === f)
    );

    items = items.filter((item) => {
      const quickMatch =
        selectedQuick.length === 0 ||
        selectedQuick.some((f) => matchesFoodType(item, f));

      const dietMatch =
        selectedDietary.length === 0 ||
        selectedDietary.every((f) => itemMatchesDiet(item, f));

      const miscMatch =
        selectedMisc.length === 0 ||
        selectedMisc.every((f) =>
          f === "spicy" ? (item.heatLevel ?? 0) >= SPICY_THRESHOLD : false
        );

      return quickMatch && dietMatch && miscMatch;
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

  // Subcategory sorts: filter to show only selected subcategory
  // Note: Main protein types (chicken, lamb, etc.) removed - use Filter Drawer instead
  const quickTypes = [
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
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-background/80"
            >
              <X size={18} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="overflow-y-auto max-h-[75vh] md:max-h-[60vh] px-4 py-4 space-y-6 scrollbar-gold">
            <div className="rounded-lg border border-primary/15 bg-background/70 p-3 text-xs text-muted-foreground">
              Dietary filters are guidance only. Please inform staff about allergies or dietary needs.
            </div>

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
          {/* ...existing code... */}
                {/* Allergen Info Modal (only show if product modal is open) */}
                {/* Allergen Info Modal rendered at root so it overlays the product modal */}
                {showAllergenModal && (
                  <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-2">
                    <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] sm:max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent hover:scrollbar-thumb-primary/50 mx-2 animate-zoom-in">
                      <button
                        aria-label="Close allergen info"
                        onClick={() => setShowAllergenModal(false)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 border border-primary/20 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <X size={20} />
                      </button>
                      <AllergenInfo />
                    </div>
                  </div>
                )}
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
                    {/* Grid for Sides or other single category */}
                    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                      {(activeCategory === "Sides"
                        ? filteredItems.filter((item) => item.sideType === activeSidesTab)
                        : filteredItems
                      ).map((item) => (
                        <div
                          key={item.id}
                          tabIndex={0}
                          role="button"
                          aria-label={`View details for ${item.name}`}
                          onClick={() => setModalStack([item])}
                          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModalStack([item])}
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
                    {filteredItems.length === 0 && (
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
                    {categories.filter(cat => cat !== "All").map((cat) => {
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
                                onClick={() => setModalStack([item])}
                                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModalStack([item])}
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
                  onClick={() => setModalStack([])}
                >
                  <div className="w-full h-full md:h-auto md:max-h-[75vh] flex items-center justify-center">
                    <div
                      className="relative w-full h-full md:h-auto md:max-w-4xl bg-background/95 backdrop-blur-md border-0 md:border md:border-primary/20 md:rounded-2xl overflow-hidden shadow-2xl animate-zoom-in"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Close Button */}
                      <button
                        aria-label="Close menu item details"
                        onClick={() => setModalStack([])}
                        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/90 backdrop-blur border border-primary/30 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <X size={20} />
                      </button>
                      {/* Back Button */}
                      {modalStack.length > 1 && (
                        <button
                          aria-label="Back to previous item"
                          onClick={() => setModalStack((stack) => stack.slice(0, -1))}
                          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-background/90 backdrop-blur border border-primary/30 flex items-center justify-center hover:bg-background/90 hover:border-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          &#8592;
                        </button>
                      )}
                      {/* ...existing code... */}
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 h-full md:h-auto md:max-h-[75vh]">
                        {/* Image Section with Allergen Info Button */}
                        <div className="lg:col-span-2 h-60 lg:h-full lg:max-h-[75vh] bg-black/80 flex flex-col items-center justify-center px-2 py-3 relative">
                          <div className="relative w-full h-full rounded-xl border border-primary/20 overflow-hidden bg-black flex items-center justify-center">
                            {selectedItem?.image && (
                              <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                className="w-full h-full object-contain"
                              />
                            )}
                            {/* Allergen Info Button - bottom center, floating, styled */}
                            <button
                              type="button"
                              aria-label="Show allergen info"
                              onClick={() => setShowAllergenModal(true)}
                              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full bg-primary/90 text-primary-foreground text-sm font-semibold shadow-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all border border-primary/30"
                            >
                              <span className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-white/80 border border-primary/40 flex items-center justify-center">
                                  <span className="text-primary text-xs font-bold">i</span>
                                </span>
                                Allergen Info
                              </span>
                            </button>
                          </div>
                        </div>
                        {/* Content Section */}
                        <div className="lg:col-span-3 flex flex-col h-[calc(100vh-19rem)] md:h-full md:max-h-[75vh]">
                          <div className="p-6 md:p-8 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent hover:scrollbar-thumb-primary/50">
                            {/* Header */}
                            <div className="mb-6">
                              <h2 id="modal-title" className="font-serif text-3xl md:text-4xl mb-3 text-foreground">
                                {selectedItem.name}
                              </h2>
                              <p id="modal-desc" className="text-muted-foreground leading-relaxed text-base">
                                {selectedItem.description}
                              </p>
                            </div>
                            {/* If MenuItem, show menu details */}
                            {isMenuItem(selectedItem) && (
                              <>
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
                                          <button
                                            key={name}
                                            className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-colors w-full text-left"
                                            onClick={() => setModalStack((stack) => [...stack, side])}
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
                                          </button>
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
                                          <button
                                            key={name}
                                            className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-colors w-full text-left"
                                            onClick={() => setModalStack((stack) => [...stack, sauce])}
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
                                          </button>
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
                                          <button
                                            key={seasoning.name}
                                            className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-colors w-full text-left"
                                            onClick={() => setModalStack((stack) => [...stack, seasoning])}
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
                                          </button>
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
                              </>
                            )}
                            {/* If SauceItem (sauce or seasoning), show details */}
                            {isSauceItem(selectedItem) && (
                              <>
                                {/* Heat Level Dots/Flames */}
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
                                      if (i === 0) color = i < selectedItem.level ? 'text-green-400' : 'text-gray-700';
                                      else if (i === 1) color = i < selectedItem.level ? 'text-yellow-300' : 'text-gray-700';
                                      else if (i >= 2 && i <= 5) color = i < selectedItem.level ? 'text-orange-400' : 'text-gray-700';
                                      else if (i === 6) color = i < selectedItem.level ? 'text-red-500' : 'text-gray-700';
                                      return (
                                        <Flame
                                          key={i}
                                          size={18}
                                          strokeWidth={1.5}
                                          className={color + (i < selectedItem.level ? '' : ' opacity-40')}
                                          fill={i < selectedItem.level ? 'currentColor' : 'none'}
                                        />
                                      );
                                    })}
                                  </div>
                                </div>
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
                              </>
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