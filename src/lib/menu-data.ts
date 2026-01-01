// src/lib/menu-data.ts
import { MenuItem } from "./menu-types";

import { grillsAndSkewers } from "./grills-skewers-data";
import { biryaniItems } from "./biryani-data";
import { desserts } from "./desserts-data";
import { shakesAndJuices } from "./shakes-juices-data";
import { sidesItems } from "./sides-data"; 

/* Grouped Menu data */
export const menuItemsGrouped: Record<
  string,
  Record<string, MenuItem[]>
> = {
  "Grills & Skewers": grillsAndSkewers,
  Biryani: biryaniItems,
  Desserts: desserts,
  "Shakes & Juices": shakesAndJuices,
  Sides: sidesItems, // Sides
};

/* Flat Export for Filter sort */
export const menuItemsFlat: MenuItem[] = Object.values(menuItemsGrouped)
  .flatMap((category) =>
    Object.values(category).flat()
  );
