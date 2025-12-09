import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const sauces = [
  { name: "Maple Mustard", level: 1, description: " Mayo, cream, mustard, maple syrup" },
  { name: "Mushroom sauce", level: 2, description: "Cream, Milk, Mushrooms, Black Pepper, Salt, Chicken Powder" },
  { name: "Mint sauce", level: 3, description: "Mint, Coriander, Salt, Yogurt, Green Chilli" },
  { name: "Chipotle sauce", level: 4, description: "Mayo, Chipotle Sauce" },
  { name: "Sweet and spicy", level: 5, description: "Sriracha Sauce, Sweet Chili Sauce, Tabasco Sauce, Bell Peppers Chopped, Jalapeno and Maple Syrup" },
  { name: "Spicy tomato sauce", level: 6, description: "Tomato Fresh, Thai Green Chilli, Tabasco Hot Sauce, Onion" },
  { name: "Jalapeno chipotle sauce", level: 7, description: "Chipotle Sauce, Jalapeno, Fresh Garlic, Sriracha Sauce" },
  { name: "BBQ sauce", level: 8, description: " Tomato Ketchup, Brown Sugar, Soya Sauce, Hot Sauce, Garlic Powder" },
  //{ name: "Habanero Blaze", level: 8, description: "Caribbean intensity" },
  //{ name: "Ghost Pepper", level: 9, description: "For the brave souls" },
  //{ name: "Inferno X", level: 11, description: "Extreme challenge only" },
];

export const SignatureFlavors = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Signature <span className="text-primary">Flavors</span>
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            11 levels of heat. Global inspirations. Your choice of intensity.
          </p>
        </div>

        {/* Sauces Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sauces.map((sauce, index) => (
            <div
              key={sauce.name}
              className={cn(
                "card-luxury p-4 md:p-6 group cursor-pointer",
                sauce.level >= 9 && "border-destructive/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Heat Level */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: Math.min(sauce.level, 5) }).map((_, i) => (
                  <Flame
                    key={i}
                    size={14}
                    className={cn(
                      "transition-colors duration-300",
                      sauce.level <= 3
                        ? "text-primary"
                        : sauce.level <= 6
                        ? "text-orange-500"
                        : "text-red-500",
                      "group-hover:animate-pulse"
                    )}
                  />
                ))}
                {sauce.level > 5 && (
                  <span className="text-xs font-sans text-muted-foreground ml-1">
                    +{sauce.level - 5}
                  </span>
                )}
              </div>

              {/* Sauce Name */}
              <h3 className="font-serif text-lg text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                {sauce.name}
              </h3>

              {/* Description */}
              <p className="text-xs font-sans text-muted-foreground">
                {sauce.description}
              </p>

              {/* Level Badge */}
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={cn(
                    "text-xs font-sans uppercase tracking-widest",
                    sauce.level <= 3
                      ? "text-primary"
                      : sauce.level <= 6
                      ? "text-orange-500"
                      : "text-red-500"
                  )}
                >
                  Level {sauce.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
