import { useState } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

/*  USE CENTRAL SAUCE DATA */
import { sauces } from "@/lib/sauces-data";

const filters = [
  { label: "All", value: "all" },
  { label: "Mild (1–3)", value: "mild" },
  { label: "Medium (4–6)", value: "medium" },
  { label: "Hot (7+)", value: "hot" },
];

const SignatureFlavors = () => {
  const [filter, setFilter] = useState("all");
  const [selectedSauce, setSelectedSauce] = useState<any | null>(null);

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
            onClick={() => setSelectedSauce(sauce)}
            className="card-luxury p-4 md:p-6 group cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {sauce.image && (
              <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-md">
                <img
                  src={sauce.image}
                  alt={sauce.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            )}

            <h3 className="font-serif text-lg mb-1 group-hover:text-primary transition-colors">
              {sauce.name}
            </h3>

            <p className="text-xs text-muted-foreground mb-4">
              {sauce.description}
            </p>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(sauce.level, 5) }).map((_, i) => (
                <Flame
                  key={i}
                  size={16}
                  className={
                    sauce.level <= 3
                      ? "text-primary"
                      : sauce.level <= 6
                      ? "text-orange-500"
                      : "text-red-500"
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL – MENU STYLE (IMAGE LEFT, CONTENT RIGHT) */}
      {selectedSauce && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedSauce(null)}
        >
          <div
  className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-xl bg-background 
ring-1 ring-primary/40 
shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7),0_0_32px_rgba(218,170,67,0.22)]
grid grid-cols-1 md:grid-cols-2"
  onClick={(e) => e.stopPropagation()}
>
            {/* LEFT IMAGE */}
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-black">
  {selectedSauce.image && (
    <img
      src={selectedSauce.image}
      alt={selectedSauce.name}
      className="w-full h-full object-contain md:object-cover"
    />
  )}

  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
</div>

            {/* RIGHT CONTENT */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-primary mb-2">
                  Sauces • Signature
                </div>

                <h2 className="font-serif text-3xl mb-3">
                  {selectedSauce.name}
                </h2>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {selectedSauce.description}
                </p>

                <div className="flex items-center gap-1">
                  {Array.from({
                    length: Math.min(selectedSauce.level, 5),
                  }).map((_, i) => (
                    <Flame
                      key={i}
                      size={18}
                      className={
                        selectedSauce.level <= 3
                          ? "text-primary"
                          : selectedSauce.level <= 6
                          ? "text-orange-500"
                          : "text-red-500"
                      }
                    />
                  ))}
                </div>
              </div>

              <button className="mt-6 w-full rounded-md bg-primary py-3 font-semibold text-black hover:opacity-90 transition">
                Order Now
              </button>
            </div>

            {/* CLOSE */}
            <button
              onClick={() => setSelectedSauce(null)}
              className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white hover:bg-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {filteredSauces.length === 0 && (
        <p className="text-center text-muted-foreground mt-6">
          No sauces match this filter.
        </p>
      )}
    </div>
  );
};

export default SignatureFlavors;
