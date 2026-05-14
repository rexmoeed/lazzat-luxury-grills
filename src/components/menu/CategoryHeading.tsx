// Simple heading component for menu categories
import React from "react";

export function CategoryHeading({ category }: { category: string }) {
  return (
    <h2 className="text-2xl font-serif font-bold mb-4 text-primary">
      {category}
    </h2>
  );
}
