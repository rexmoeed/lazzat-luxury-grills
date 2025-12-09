import { Flame, Leaf, Droplets, ShieldCheck } from "lucide-react";

const promises = [
  {
    icon: Leaf,
    title: "Fresh Daily",
    description: "Ingredients sourced and prepared fresh every single day",
  },
  {
    icon: Flame,
    title: "Charcoal Grilled",
    description: "Authentic flame-cooking for unmatched smoky flavors",
  },
  {
    icon: Droplets,
    title: "Low Oil",
    description: "Healthy cooking methods without compromising taste",
  },
  {
    icon: ShieldCheck,
    title: "No Preservatives",
    description: "Pure, natural ingredients with zero artificial additives",
  },
];

export const HealthyPromise = () => {
  return (
    <section className="section-padding bg-foreground">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-background to-transparent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-background mb-4">
            Our <span className="text-primary">Promise</span>
          </h2>
          <p className="font-sans text-background/70 max-w-2xl mx-auto">
            Quality you can taste. Standards you can trust.
          </p>
        </div>

        {/* Promises Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {promises.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <div
                key={promise.title}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full border-2 border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-gold transition-all duration-500">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="font-serif text-lg md:text-xl text-background mb-2">
                  {promise.title}
                </h3>
                <p className="text-sm font-sans text-background/60">
                  {promise.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
