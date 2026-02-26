import { describe, it, expect } from "vitest";
import {
  mergeFlavours,
  filterFlavours,
  sortFlavours,
  computeFlavorCounts,
  type FlavorEntry,
} from "@/lib/flavours-filter-engine";
import type { SauceItem } from "@/lib/menu-types";

const saucesMock: SauceItem[] = [
  { name: "Mild Sauce", level: 2, description: "", allergens: [] },
  { name: "Hot Sauce", level: 7, description: "", allergens: [] },
];

const spicesMock: SauceItem[] = [
  { name: "Medium Spice", level: 5, description: "", allergens: [] },
  { name: "Mild Spice", level: 1, description: "", allergens: [] },
];

const all = mergeFlavours({ sauces: saucesMock, spices: spicesMock });

describe("flavours-filter-engine", () => {
  it("merges sauces and spices with source tags", () => {
    expect(all).toHaveLength(4);
    expect(all.some((i) => i.source === "sauce")).toBe(true);
    expect(all.some((i) => i.source === "spice")).toBe(true);
  });

  it("filters by heat ranges correctly", () => {
    expect(filterFlavours({ items: all, heatFilter: "mild", typeFilter: "all" }).every((i) => i.level <= 3)).toBe(true);
    expect(filterFlavours({ items: all, heatFilter: "medium", typeFilter: "all" }).every((i) => i.level >= 4 && i.level <= 6)).toBe(true);
    expect(filterFlavours({ items: all, heatFilter: "hot", typeFilter: "all" }).every((i) => i.level >= 7)).toBe(true);
  });

  it("filters by type correctly", () => {
    const onlySauces = filterFlavours({ items: all, heatFilter: "all", typeFilter: "sauce" });
    const onlySpices = filterFlavours({ items: all, heatFilter: "all", typeFilter: "spice" });

    expect(onlySauces.every((i) => i.source === "sauce")).toBe(true);
    expect(onlySpices.every((i) => i.source === "spice")).toBe(true);
  });

  it("sorts flavours by heat and name", () => {
    const heatAsc = sortFlavours({ items: all, sortBy: "heat-asc" });
    const heatDesc = sortFlavours({ items: all, sortBy: "heat-desc" });
    const nameAsc = sortFlavours({ items: all, sortBy: "name-asc" });

    expect(heatAsc[0].level).toBeLessThanOrEqual(heatAsc[heatAsc.length - 1].level);
    expect(heatDesc[0].level).toBeGreaterThanOrEqual(heatDesc[heatDesc.length - 1].level);
    expect(nameAsc.map((i) => i.name)).toEqual([...nameAsc.map((i) => i.name)].sort((a, b) => a.localeCompare(b)));
  });

  it("computes heat and type counts", () => {
    const counts = computeFlavorCounts({ items: all, typeFilter: "all", sortBy: "featured" });

    expect(counts.heatCounts.all).toBe(4);
    expect(counts.typeCounts.all).toBe(4);
    expect(counts.typeCounts.sauce).toBe(2);
    expect(counts.typeCounts.spice).toBe(2);
  });
});
