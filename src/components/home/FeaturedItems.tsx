import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { menuItemsFlat } from "@/lib/menu-data";
import { sauces } from "@/lib/sauces-data";

export const FeaturedItems = () => {
  const grillsBiryaniSajji = menuItemsFlat.filter((item) =>
    ["Grills & Skewers", "Biryani", "Sajji"].includes(item.category)
  );
  const shakesJuices = menuItemsFlat.filter((item) => item.category === "Shakes & Juices");
  const sides = menuItemsFlat.filter((item) => item.category === "Sides");
  const desserts = menuItemsFlat.filter((item) => item.category === "Desserts");

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const grillItem = grillsBiryaniSajji.length
    ? grillsBiryaniSajji[tick % grillsBiryaniSajji.length]
    : null;
  const sauceItem = sauces.length ? sauces[tick % sauces.length] : null;
  const juiceItem = shakesJuices.length ? shakesJuices[tick % shakesJuices.length] : null;
  const sideItem = sides.length ? sides[tick % sides.length] : null;
  const dessertItem = desserts.length ? desserts[tick % desserts.length] : null;

  const cards = [
    grillItem && {
      title: "Grills · Biryani · Sajji",
      name: grillItem.name,
      description: grillItem.description,
      image: grillItem.image,
      to: "/menu",
      accent: grillItem.category,
    },
    sauceItem && {
      title: "Signature Sauces",
      name: sauceItem.name,
      description: sauceItem.description,
      image: sauceItem.image,
      to: "/menu",
      accent: `Level ${sauceItem.level}`,
    },
    juiceItem && {
      title: "Juices & Shakes",
      name: juiceItem.name,
      description: juiceItem.description,
      image: juiceItem.image,
      to: "/menu",
      accent: juiceItem.category,
    },
    sideItem && {
      title: "Sides",
      name: sideItem.name,
      description: sideItem.description,
      image: sideItem.image,
      to: "/menu",
      accent: sideItem.category,
    },
    dessertItem && {
      title: "Desserts",
      name: dessertItem.name,
      description: dessertItem.description,
      image: dessertItem.image,
      to: "/menu",
      accent: dessertItem.category,
    },
  ].filter(Boolean) as {
    title: string;
    name: string;
    description: string;
    image: string;
    to: string;
    accent?: string;
  }[];

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Featured <span className="text-primary">Creations</span>
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Discover our most celebrated dishes, each crafted with passion and
            precision.
          </p>
        </div>

        {/* Five rotating boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto">
          {cards.map((card, idx) => (
            <Link
              key={`${card.title}-${idx}`}
              to={card.to}
              className="group relative aspect-[5/6] overflow-hidden rounded-lg shadow-[0_12px_38px_-28px_rgba(0,0,0,0.55)]"
            >
              <img
                src={card.image}
                alt={card.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-700 ease-in-out" />
              <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur text-[10px] font-semibold uppercase tracking-wide text-white">
                {card.title}
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-3.5 md:p-4">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-all duration-700 ease-in-out">
                  {card.accent && (
                    <span className="text-[10px] font-sans text-primary uppercase tracking-widest mb-1 block">
                      {card.accent}
                    </span>
                  )}
                  <h3 className="font-serif text-base md:text-lg text-foreground mb-1">
                    {card.name}
                  </h3>
                  <p className="text-[11px] md:text-sm font-sans text-foreground/75 line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all duration-700 ease-in-out" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/menu" className="btn-outline-white inline-block">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};
