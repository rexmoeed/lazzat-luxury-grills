import type { SauceItem } from "@/lib/menu-types";

export type FlavorSource = "sauce" | "spice";
export type HeatFilter = "all" | "mild" | "medium" | "hot";
export type TypeFilter = "all" | FlavorSource;
export type FlavorSort = "featured" | "heat-asc" | "heat-desc" | "name-asc";

export type FlavorEntry = SauceItem & { source: FlavorSource };

export const mergeFlavours = ({
  sauces,
  spices,
}: {
  sauces: SauceItem[];
  spices: SauceItem[];
}): FlavorEntry[] => [
  ...sauces.map((item) => ({ ...item, source: "sauce" as const })),
  ...spices.map((item) => ({ ...item, source: "spice" as const })),
];

export const filterFlavours = ({
  items,
  heatFilter,
  typeFilter,
}: {
  items: FlavorEntry[];
  heatFilter: HeatFilter;
  typeFilter: TypeFilter;
}): FlavorEntry[] => {
  return items.filter((item) => {
    if (heatFilter === "mild" && item.level > 3) return false;
    if (heatFilter === "medium" && (item.level < 4 || item.level > 6)) return false;
    if (heatFilter === "hot" && item.level < 7) return false;

    if (typeFilter !== "all" && item.source !== typeFilter) return false;

    return true;
  });
};

export const sortFlavours = ({
  items,
  sortBy,
}: {
  items: FlavorEntry[];
  sortBy: FlavorSort;
}): FlavorEntry[] => {
  return [...items].sort((left, right) => {
    switch (sortBy) {
      case "heat-asc":
        return left.level - right.level;
      case "heat-desc":
        return right.level - left.level;
      case "name-asc":
        return left.name.localeCompare(right.name);
      default:
        return 0;
    }
  });
};

export const computeFlavorCounts = ({
  items,
  typeFilter,
  sortBy,
}: {
  items: FlavorEntry[];
  typeFilter: TypeFilter;
  sortBy: FlavorSort;
}) => {
  const heatCounts: Record<HeatFilter, number> = {
    all: 0,
    mild: 0,
    medium: 0,
    hot: 0,
  };

  for (const heat of Object.keys(heatCounts) as HeatFilter[]) {
    const filtered = filterFlavours({ items, heatFilter: heat, typeFilter });
    heatCounts[heat] = sortFlavours({ items: filtered, sortBy }).length;
  }

  const typeCounts: Record<TypeFilter, number> = {
    all: 0,
    sauce: 0,
    spice: 0,
  };

  for (const type of Object.keys(typeCounts) as TypeFilter[]) {
    const filtered = filterFlavours({ items, heatFilter: "all", typeFilter: type });
    typeCounts[type] = sortFlavours({ items: filtered, sortBy }).length;
  }

  return { heatCounts, typeCounts };
};
