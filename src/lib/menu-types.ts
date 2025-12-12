// src/lib/menu-types.ts

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price?: number;
  image: string;
  category: string;
  subCategory?: string;
  heatLevel: number;
  isNew?: boolean;
  isPopular?: boolean;
  saucePairings: string[];
  customizations: string[];
}

export interface SauceItem {
  name: string;
  level: number;
  description: string;
}
