import { useState } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

/* ✅ USE CENTRAL SAUCE DATA */
import { sauces } from "@/lib/sauces-data";

const filters = [
  { label: "All", value: "all" },
  { label: "Mild (1–3)", value: "mild" },
  { label: "Medium (4–6)", value: "medium" },
  { label: "Hot (7+)", value: "hot" },
];

const SignatureFlavors = () => {
  const [filter, setFilter] = useState("all");

  const filteredSauces = sauces.filter((s) => {
    if (filter === "all") return true;
    if (filter === "mild") return s.level <= 3;
    if (filter === "medium") return s.level >= 4 && s.level <= 6;
    if (filter === "hot") return s.level >= 7;
    return true;
  });

  return (
    <div className="w-full">

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "px-4 py-2 rounded-full border text-sm transition-all",
              filter === f.value
                ? "bg-primary text-black border-primary"
                : "text-muted-foreground border-muted hover:border-primary hover:text-primary"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* SAUCE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredSauces.map((sauce, index) => (
          <div
            key={sauce.name}
            className="card-luxury p-4 md:p-6 group cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            
            {/* ✅ IMAGE */}
{sauce.image && (
  <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-md">
    <img
      src={sauce.image}
      alt={sauce.name}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  </div>
)}

            <h3 className="font-serif text-lg text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
              {sauce.name}
            </h3>

            <p className="text-xs font-sans text-muted-foreground mb-4">
              {sauce.description}
            </p>

            <div className="flex items-center gap-1 pt-1">
              {Array.from({ length: Math.min(sauce.level, 5) }).map((_, i) => (
                <Flame
                  key={i}
                  size={16}
                  className={cn(
                    "transition-colors duration-300 group-hover:animate-pulse",
                    sauce.level <= 3
                      ? "text-primary"
                      : sauce.level <= 6
                      ? "text-orange-500"
                      : "text-red-500"
                  )}
                />
              ))}

              {sauce.level > 5 && (
                <span className="text-xs font-sans text-muted-foreground ml-1">
                  +{sauce.level - 5}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSauces.length === 0 && (
        <p className="text-center text-muted-foreground mt-6">
          No sauces match this filter.
        </p>
      )}
    </div>
  );
};

export default SignatureFlavors;
