import React from "react";
import { allergenIconMap } from "@/lib/menu-constants";

const allergenDescriptions: Record<string, string> = {
  milk: "Contains milk or dairy products.",
  eggs: "Contains eggs or egg products.",
  gluten: "Contains gluten (wheat, barley, rye, etc.).",
  "tree-nuts": "Contains tree nuts (almonds, walnuts, etc.).",
  peanuts: "Contains peanuts or peanut products.",
  soy: "Contains soy or soy products.",
  sesame: "Contains sesame seeds or oil.",
  shellfish: "Contains shellfish (shrimp, crab, etc.).",
  fish: "Contains fish or fish products.",
  mustard: "Contains mustard or mustard products."
};

export default function AllergenInfo() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="font-serif text-2xl mb-4 text-center">Allergen Icons Guide</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Object.entries(allergenIconMap).map(([key, { icon: Icon, label }]) => (
          <div key={key} className="flex flex-col items-center text-center p-2">
            <Icon size={32} className="mb-2 text-primary" />
            <span className="font-semibold text-sm mb-1">{label}</span>
            <span className="text-xs text-muted-foreground">
              {allergenDescriptions[key] || ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
