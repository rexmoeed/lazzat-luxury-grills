import { Link } from "react-router-dom";
import {
  quickFilters,
  dietaryFilters,
  allergenFilters,
  allFilterIds,
  type FilterId,
  allergenIconMap,
  sidesTabs,
} from "@/lib/menu-constants";

import { useMemo, useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AllergenInfo from "@/components/shared/AllergenInfo";
import { Helmet } from "react-helmet";
import { Layout } from "@/components/layout/Layout";
import { Flame, X, Filter, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  menuItemsFlat,
} from "@/lib/menu-data";
import { sauces } from "@/lib/sauces-data";
import type { MenuItem } from "@/lib/menu-types";
import { findSauce } from "@/lib/find-sauce";

import {
  filterMenuItems,
  hasSelectedDietaryFilter,
} from "@/lib/menu-filter-engine";
import { BuildYourShake } from "@/components/menu/BuildYourShake";
import { CategoryHeading } from "@/components/menu/CategoryHeading";
// Optional Seasonings removed: no longer used

const isSideTab = (value: string): value is "carb" | "green" =>
  value === "carb" || value === "green";

// Helper to parse initial category from URL
function parseInitialCategory(search: string): string {
  const value = new URLSearchParams(search).get("category");
  if (!value) return "All";
  if (value === "Family Platters") return "Slow Roasted Chicken";
  // categories is defined later, so hardcode here for initial parse
  const validCategories = [
    "All",
    "Signature Protein Platters",
    "Slow Roasted Chicken",
    "Combos",
    "Kids Menu",
    "Salads",
    "Desserts",
    "Drinks",
    "Sauces",
  ];
  return validCategories.includes(value) ? value : "All";
}

const parseInitialSideTab = (search: string): "carb" | "green" => {
  const value = new URLSearchParams(search).get("side");
  return value && isSideTab(value) ? value : "carb";
};

const parseInitialSelectedFilters = (search: string): Set<FilterId> => {
  const value = new URLSearchParams(search).get("filters") || "";
  const ids = value
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry): entry is FilterId => allFilterIds.includes(entry as FilterId));
  return new Set(ids);
};

// FilterDrawer component moved outside to avoid recreation on every render
const FilterDrawer = ({
  open,
  onClose,
  selectedFilters,
  toggleFilter,
  clearAll,
  filterCounts,
}: {
  open: boolean;
  onClose: () => void;
  selectedFilters: Set<FilterId>;
  toggleFilter: (id: FilterId) => void;
  clearAll: () => void;
  filterCounts: Partial<Record<FilterId, number>>;
}) => {
  const pillClass = (active: boolean) =>
    cn(
      "px-3 py-1.5 text-xs uppercase tracking-wide rounded-full border transition-all",
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-secondary text-muted-foreground border-primary/20 hover:bg-primary/10 hover:border-primary/40"
    );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[60] bg-black/50 backdrop-blur-xl transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
      />

      {/* Popup Panel */}
      <div
        className={cn(
          "fixed left-1/2 top-1/2 z-[70] w-[95vw] md:w-[min(90vw,760px)] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-background/95 backdrop-blur-xl border border-primary/20 shadow-2xl overflow-hidden transition-all duration-300",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="border-b border-primary/20 px-5 py-4 flex items-center justify-between">
          <h3 className="font-serif text-xl">Filters</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg"
            aria-label="Close filter panel"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto max-h-[calc(85vh-132px)] space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Quick Filters</p>
            <div className="flex flex-wrap gap-2">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={pillClass(selectedFilters.has(filter.id))}
                >
                  {filter.label} ({filterCounts[filter.id] ?? 0})
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Dietary</p>
            <div className="flex flex-wrap gap-2">
              {dietaryFilters.map((filter) => {
                const isActive = selectedFilters.has(filter.id);
                return (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={cn(
                      pillClass(isActive),
                      isActive && "border-orange-500 bg-orange-500/15 text-orange-400"
                    )}
                  >
                    {filter.label} ({filterCounts[filter.id] ?? 0})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Exclude Allergens</p>
            <div className="flex flex-wrap gap-2">
              {allergenFilters.map((filter) => {
                const Icon = allergenIconMap[filter.id]?.icon;
                const isActive = selectedFilters.has(filter.id);
                return (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={cn(
                      pillClass(isActive),
                      "inline-flex items-center gap-1.5",
                      isActive && "border-red-500 bg-red-500/15 text-red-400"
                    )}
                  >
                    {Icon && <Icon size={14} className={isActive ? "text-red-400" : ""} />}
                    <span>{filter.label} ({filterCounts[filter.id] ?? 0})</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        <div className="border-t border-primary/20 px-5 py-4 flex items-center gap-3">
          <button
            onClick={clearAll}
            className="flex-1 px-4 py-2 rounded-lg border border-primary/30 text-sm hover:bg-primary/10 transition-all"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 btn-gold text-sm py-2"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

// Type guard for MenuItem
function isMenuItem(item: any): item is MenuItem {
  return item && typeof item === "object" && "name" in item && "category" in item;
}

export default function MenuPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Google Tag Manager: Menu Page View Conversion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'menu_view' });
    }
  }, []);
    const pageTitle = "Menu | Lazzat - Premium Grills, Biryani, Sajji & More";
    const pageDescription = "A flame-grilled bowl and real-fruit shake restaurant on McVean Drive, Brampton — where one menu welcomes every appetite. Pull up a chair.";
  const [runtimeMenuItems, setRuntimeMenuItems] = useState<MenuItem[] | null>(null);
  // State declarations
    // No tabs for salads
    const [activeCategory, setActiveCategory] = useState<string>(() => parseInitialCategory(location.search));
  // Modal stack: allows back navigation
  const [modalStack, setModalStack] = useState<(MenuItem | null)[]>([]);

  const selectedItem = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  // Allergen Info modal state
  const [showAllergenModal, setShowAllergenModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Set<FilterId>>(() => parseInitialSelectedFilters(location.search));
  // ...removed sauceFilter state

  useEffect(() => {
    const controller = new AbortController();

    const loadMenuFromApi = async () => {
      try {
        const response = await fetch("/api/menu", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        if (!Array.isArray(payload.data)) {
          return;
        }
        setRuntimeMenuItems(payload.data);
      } catch {
        // Keep local bundled data when API fetch fails.
      }
    };

    void loadMenuFromApi();

    return () => {
      controller.abort();
    };
  }, []);

  const effectiveMenuItems = useMemo(() => runtimeMenuItems ?? menuItemsFlat, [runtimeMenuItems]);

  // Helper to clear filters
  const clearFilters = () => setSelectedFilters(new Set());

  // ...removed filteredSauces helper
  // (Removed duplicate state declarations)



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
  const toggleFilter = (id: FilterId) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Side catalog pulled from existing menu items
  const sidesCatalog = effectiveMenuItems.filter((item) => item.category === "Salads");

  // Find side details by name (case-insensitive)
  const findSide = (name: string) =>
    sidesCatalog.find((s) => s.name.toLowerCase() === name.toLowerCase());

  // Fallback side pairings by category when an item does not define its own
  const defaultSidePairingsByCategory: Record<string, string[]> = {
    "Signature Protein Platters": [
      "Crispy Fries",
      "Side Salad",
      "Classic Butter Naan",
      "Cheese Stuffed Naan",
      "Garlic & Herb Naan",
    ],
    Biryani: ["Side Salad", "Coleslaw", "Grilled Vegetables", "Corn on the Cob"],
    Sajji: ["Side Salad", "Coleslaw", "Grilled Vegetables", "Corn on the Cob"],
  };

  const getSidePairings = (item: MenuItem): string[] => {
    const explicit = item.sidePairings || [];
    if (explicit.length > 0) return explicit;
    return defaultSidePairingsByCategory[item.category] || [];
  };

  const sauceToMenuItem = (sauce: (typeof sauces)[number], idx: number): MenuItem => ({
    id: 1000 + idx,
    name: sauce.name,
    description: sauce.description,
    image: sauce.image || "/placeholder.svg",
    category: "Sauces",
    heatLevel: sauce.level,
    allergens: sauce.allergens,
  });

  const sideRecommendations = isMenuItem(selectedItem)
    ? getSidePairings(selectedItem)
    : [];

  const categories = [
    "All",
    "Signature Protein Platters",
    "Slow Roasted Chicken",
    "Combos",
    "Kids Menu",
    "Salads",
    "Desserts",
    "Drinks",
    "Sauces",
  ];

  const clearAllFilters = () => {
    clearFilters();
  };

  const hasDietarySelection = hasSelectedDietaryFilter(selectedFilters);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (selectedFilters.size > 0) {
      params.set("filters", Array.from(selectedFilters).join(","));
    } else {
      params.delete("filters");
    }

    if (activeCategory !== "All") {
      params.set("category", activeCategory);
    } else {
      params.delete("category");
    }

    // No side tab param for salads

    const nextSearch = params.toString();
    const currentSearch = location.search.replace(/^\?/, "");
    if (nextSearch !== currentSearch) {
      navigate(
        {
          pathname: location.pathname,
          search: nextSearch ? `?${nextSearch}` : "",
        },
        { replace: true }
      );
    }
  }, [selectedFilters, activeCategory, location.pathname, location.search, navigate]);

  const filterCounts = useMemo(() => {
    const categoryItems =
      activeCategory === "All"
        ? effectiveMenuItems
        : effectiveMenuItems.filter((item) => item.category === activeCategory);

    const counts: Partial<Record<FilterId, number>> = {};
    for (const id of allFilterIds) {
      const scopedFilters = new Set<FilterId>(selectedFilters);
      scopedFilters.delete(id);
      scopedFilters.add(id);
      counts[id] = filterMenuItems({
        items: categoryItems,
        activeCategory: "All",
        selectedFilters: scopedFilters,
      }).length;
    }
    return counts;
  }, [activeCategory, selectedFilters, effectiveMenuItems]);


  const filteredItems = useMemo(() => {
    return filterMenuItems({
      items: effectiveMenuItems,
      activeCategory,
      selectedFilters,
    });
  }, [activeCategory, selectedFilters, effectiveMenuItems]);




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
          <section className="pt-36 pb-12 md:pt-44 md:pb-16 bg-background" aria-labelledby="menu-hero-title">
            <div className="container-luxury px-4 text-center">
              <div className="gold-divider w-16 mx-auto mb-6" />
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
                <span id="menu-hero-title">Our <span className="text-primary">Menu</span></span>
              </h1>
              <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
                Experience the art of lava stone grilling—no artificial flavors, no shortcuts. Our menu features real ingredients, house-made sauces, and desserts, all crafted without artificial colors or preservatives. Taste the difference in every bite.
              </p>
            </div>
          </section>
          <nav className="sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-md border-b border-primary/20 py-4" aria-label="Menu category navigation">
            <div className="container-luxury px-4">
              {/* Category Filters */}
              <div className="overflow-hidden md:block max-h-none">
                <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-between">
                  <div className="w-full md:flex-1 md:min-w-0">
                    {/* SLIDER ROW (arrows aligned to this only) */}
                    <div className="relative">
                      {/* LEFT ARROW */}
                      <button
                        type="button"
                        onClick={() => scrollCategories("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 border border-primary/20 rounded-full shadow"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      {/* SCROLLABLE CATEGORY PILLS */}
                      <div
                        ref={categoryScrollRef}
                        className="flex gap-2 md:gap-3 px-10 overflow-x-auto whitespace-nowrap scrollbar-hide"
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
                      {/* RIGHT ARROW */}
                      <button
                        type="button"
                        onClick={() => scrollCategories("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 border border-primary/20 rounded-full shadow"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                    {/* MOBILE Filters — BELOW slider (not inside arrow container) */}
                    <div className="md:hidden mt-3 flex justify-center w-full">
                      <button
                        onClick={() => setDrawerOpen(true)}
                        className="flex items-center gap-2 bg-secondary/80 backdrop-blur px-5 py-2.5 text-sm font-medium rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
                      >
                        <Filter size={16} className="text-primary" />
                        Filters
                      </button>
                    </div>
                  </div>
                  {/* Desktop Filters -> open drawer */}
                  <div className="hidden md:flex items-center gap-4">
                    <span className="text-sm text-muted-foreground tracking-wide">
                      Filters
                    </span>
                    <button
                      onClick={() => setDrawerOpen(true)}
                      className="flex items-center gap-2 bg-secondary/80 backdrop-blur px-5 py-2.5 text-sm font-medium rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
                    >
                      <Filter size={16} className="text-primary" />
                      Open Panel
                    </button>
                    <a
                      href="/allergenguide"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-secondary/80 backdrop-blur px-5 py-2.5 text-sm font-medium rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
                    >
                      <Info size={16} className="text-primary" />
                      Allergen Guide
                    </a>
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
                    {/* No tabs for salads */}
                    {/* Sauces tab custom rendering */}
                    {activeCategory === "Sauces" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sauces.map((sauce, idx) => (
                          <div
                            key={sauce.name}
                            tabIndex={0}
                            role="button"
                            aria-label={`View details for ${sauce.name}`}
                            onClick={() => setModalStack([sauceToMenuItem(sauce, idx)])}
                            onKeyDown={(e) =>
                              (e.key === "Enter" || e.key === " ") &&
                              setModalStack([sauceToMenuItem(sauce, idx)])
                            }
                            className="card-luxury cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            {sauce.image && (
                              <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                  src={sauce.image}
                                  alt={sauce.name}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                              </div>
                            )}
                            <div className="p-6">
                              <h3 className="font-serif text-xl group-hover:text-primary transition-colors">{sauce.name}</h3>
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{sauce.description}</p>
                              <div className="mt-3 text-xs text-primary uppercase tracking-wider">
                                Heat Level: {sauce.level}
                              </div>
                              {Array.isArray(sauce.allergens) && sauce.allergens.length > 0 && (
                                <div className="mt-2 text-xs text-red-500">
                                  Contains: {sauce.allergens.join(", ")}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : activeCategory === "Drinks" ? (
  (() => {
    const shakeCard = (item: MenuItem) => (
      <div
        key={item.id}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${item.name}`}
        onClick={() => setModalStack([item])}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setModalStack([item])}
        className="card-luxury cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {item.image && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2">
              {item.isNew && <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded">New</span>}
              {item.isPopular && <span className="bg-foreground text-background text-xs px-3 py-1 rounded">Popular</span>}
            </div>
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl group-hover:text-primary transition-colors">{item.name}</h3>
            {/* Price hidden intentionally */}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
          <div className="mt-3 text-xs text-primary uppercase tracking-wider">{item.subCategory}</div>
        </div>
      </div>
    );

    const signatureItems = filteredItems.filter(item => item.subCategory === "Signature Shakes");
    const blendItems = filteredItems.filter(item => item.subCategory === "Popular Fruit Blends");

    return (
      <div className="space-y-12">
        {/* Signature Shakes */}
        {signatureItems.length > 0 && (
          <div>
            <div className="mb-6">
              <h3 className="font-serif text-2xl text-foreground">Signature Shakes</h3>
              <div className="gold-divider w-10 mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {signatureItems.map(shakeCard)}
            </div>
          </div>
        )}

        {/* Build Your Own Shake/Blend popup disabled as requested */}

        {/* Popular Fruit Blends */}
        {blendItems.length > 0 && (
          <div>
            <div className="mb-6">
              <h3 className="font-serif text-2xl text-foreground">Popular Fruit Blends</h3>
              <div className="gold-divider w-10 mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blendItems.map(shakeCard)}
            </div>
          </div>
        )}
      </div>
    );
  })()
) : (
<div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
  {(filteredItems).map((item) => (
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
                            <div>
                              <h3 className="font-serif text-xl group-hover:text-primary transition-colors">{item.name}</h3>
                              {item.category === "Signature Protein Platters" ? (
                                <div className="font-semibold text-gold text-left text-xs mt-1 whitespace-nowrap">
                                  {(() => {
                                    const match = item.description.match(/(1-Skewer[^/]+\/ 2-Skewers[^/]+\/ 3 Skewers[^\n]+)/);
                                    return match ? match[1] : null;
                                  })()}
                                </div>
                              ) : item.category === "Salads" ? (
                                <div className="font-semibold text-gold text-left text-xs mt-1">
                                  {(() => {
                                    const match = item.description.match(/(70G per Scoop Price:\s*5\.99)/);
                                    return match ? match[1] : null;
                                  })()}
                                </div>
                              ) : ((item.category === "Drinks" && (item.subCategory === "Signature Shakes" || item.subCategory === "Popular Fruit Blends")) ? (
                                <div className="font-semibold text-gold text-left text-xs mt-1 whitespace-pre-line">
                                  {(() => {
                                    const match = item.description.match(/Standard Price [0-9.]+\s*500 ml Combo Price [0-9.]+/);
                                    return match ? match[0] : null;
                                  })()}
                                </div>
                              ) : (
                                null // Price hidden intentionally
                              ))}
                            </div>
                            {/* Show a short description for all menu items */}
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {(() => {
                                // Show only the first line or up to 80 chars
                                const desc = item.description || "";
                                const firstLine = desc.split(/\r?\n/)[0];
                                return firstLine.length > 80 ? firstLine.slice(0, 77) + "..." : firstLine;
                              })()}
                            </p>
                            <div className="mt-3 text-xs text-primary uppercase tracking-wider">
                              {item.category}
                              {item.subCategory ? ` • ${item.subCategory}` : ""}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    )}
                    {/* No items found */}
                    {activeCategory !== "Sauces" && filteredItems.length === 0 && (
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
                                  <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-serif text-xl group-hover:text-primary transition-colors">{item.name}</h3>
                                    {/* Price hidden intentionally */}
                                  </div>
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
                                      className="flex flex-col gap-1 rounded-xl border border-[#3a2a1a] px-3 py-2 shadow-inner"
                                      style={{
                                        background: 'rgba(35, 24, 15, 0.35)',
                                        width: '260px',
                                        minWidth: '260px',
                                        maxWidth: '260px',
                                      }}
                                    >
                                      <span className="text-xs font-semibold text-white mb-1">
                                        {selectedItem.allergens.length === 1 ? 'This menu item contains:' : 'This menu item contains:'}
                                      </span>
                                      <div className="flex flex-wrap gap-2">
                                        {selectedItem.allergens.map((a) => {
                                          const Icon = allergenIconMap[a]?.icon;
                                          if (!Icon) return null;
                                          return (
                                            <span key={a} className="flex items-center text-xs gap-1">
                                              <Icon size={18} className="text-red-500" />
                                              <span>{allergenIconMap[a]?.label}</span>
                                            </span>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Dietary flags for menu item */}
                                {Array.isArray(selectedItem.dietary) && selectedItem.dietary.length > 0 && (
                                  <div className="mb-6 pb-6 border-b border-primary/10">
                                    <div
                                      className="flex flex-col gap-1 rounded-xl border border-[#1a3a1a] px-3 py-2 shadow-inner"
                                      style={{
                                        background: 'rgba(24, 35, 15, 0.25)',
                                        width: '260px',
                                        minWidth: '260px',
                                        maxWidth: '260px',
                                      }}
                                    >
                                      <span className="text-xs font-semibold text-white mb-1">
                                        Dietary:
                                      </span>
                                      <div className="flex flex-wrap gap-2">
                                        {selectedItem.dietary.map((d) => {
                                          const filter = dietaryFilters.find(f => f.id === d);
                                          if (!filter) return null;
                                          let iconColor = "text-primary";
                                          if (d === "vegan" || d === "vegetarian") iconColor = "text-green-500";
                                          return (
                                            <span key={d} className="flex items-center text-xs gap-1">
                                              <span className={iconColor + " font-bold"}>{filter.label}</span>
                                            </span>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {/* Side Pairings Section */}
                                {sideRecommendations.length > 0 && ["Signature Protein Platters"].includes(selectedItem.category) && (
                                  <div className="mb-6">
                                    <h4 className="font-serif text-sm mb-4 uppercase tracking-wider text-muted-foreground">
                                      Recommended Salads
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
                                {Array.isArray(selectedItem.saucePairings) && selectedItem.saucePairings.length > 0 && ["Signature Protein Platters"].includes(selectedItem.category) && (
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
                                            // onClick removed: only MenuItem can be pushed to modalStack
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
                                {/* Seasonings/Spices logic removed */}
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
                                          {c.replace(/\$/g, "")}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                            {/* If SauceItem (sauce or seasoning), show details */}
                            {/* isSauceItem and level logic removed */}
                          </div>
                          {/* Footer with CTA */}
                          <div className="p-6 md:p-8 pt-4 border-t border-primary/10 bg-secondary/30">
                            <Link
                              className="btn-gold w-full py-3 text-base font-semibold"
                              to="/order"
                            >
                              Order Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Filter Drawer - render at root of page so it's above everything */}
              <FilterDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                clearAll={clearAllFilters}
                filterCounts={filterCounts}
              />
            </div>
          </section>
        </main>
      </Layout>
    </>
    );
}