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
  const dessertItem = desserts.length ? desserts[tick % desserts.length] : null;

  // Show 4 featured cards: Grills/Biryani/Sajji, Sauces, Juices/Shakes, and Desserts
  const cards = [
    grillItem && {
      title: "Grills · Biryani · Sajji",
      name: grillItem.name,
      image: grillItem.image,
      to: "/menu",
      accent: grillItem.category,
    },
    sauceItem && {
      title: "Signature Sauces",
      name: sauceItem.name,
      image: sauceItem.image,
      to: "/menu",
      accent: `Level ${sauceItem.level}`,
    },
    juiceItem && {
      title: "Juices & Shakes",
      name: juiceItem.name,
      image: juiceItem.image,
      to: "/menu",
      accent: juiceItem.category,
    },
    dessertItem && {
      title: "Desserts",
      name: dessertItem.name,
      image: dessertItem.image,
      to: "/menu",
      accent: dessertItem.category,
    },
  ].filter(Boolean) as {
    title: string;
    name: string;
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

        {/* Magazine-style grid layout for featured boxes */}
        <div
          className="grid grid-cols-4 grid-rows-2 gap-4 max-w-5xl mx-auto"
          style={{
            gridTemplateRows: 'repeat(2, 1fr)',
            gridAutoFlow: 'dense',
            alignItems: 'stretch',
            minHeight: '380px'
          }}>
          {/* Large left box (Grills/Biryani/Sajji) */}
          {cards[0] && (
            <Link
              key={cards[0].title}
              to={cards[0].to}
              className="group relative rounded-lg shadow-[0_8px_24px_-16px_rgba(0,0,0,0.45)] row-span-2 col-span-2 h-full min-h-[180px] flex overflow-hidden"
              style={{minHeight:'100%', height:'100%'}}
            >
              <img
                src={cards[0].image}
                alt={cards[0].name}
                className="absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-in-out group-hover:scale-105 featured-fade bg-black"
                loading="lazy"
                style={{animation: 'fadeScale 0.7s', background: '#111'}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-700 ease-in-out featured-fade" style={{animation: 'fadeScale 0.7s'}} />
              <div className="absolute inset-0 flex flex-col justify-end p-4 featured-fade" style={{animation: 'fadeScale 0.7s'}}>
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-all duration-700 ease-in-out">
                  {cards[0].accent && (
                    <span className="text-[11px] font-sans text-primary uppercase tracking-widest mb-1 block">
                      {cards[0].accent}
                    </span>
                  )}
                  <h3 className="font-serif text-lg md:text-xl text-foreground mb-1">
                    {cards[0].name}
                  </h3>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all duration-700 ease-in-out" />
            </Link>
          )}
          {/* Top-right two boxes: Sauces and Newly Added */}
          {cards[1] && (
            <Link
              key={cards[1].title}
              to={cards[1].to}
              className="group relative rounded-lg shadow-[0_8px_24px_-16px_rgba(0,0,0,0.45)] row-span-1 col-span-1 h-full min-h-[90px] flex overflow-hidden"
              style={{minHeight:'100%', height:'100%'}}
            >
              <img
                src={cards[1].image}
                alt={cards[1].name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 featured-fade"
                loading="lazy"
                style={{animation: 'fadeScale 0.7s'}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-700 ease-in-out featured-fade" style={{animation: 'fadeScale 0.7s'}} />
              <div className="absolute inset-0 flex flex-col justify-end p-4 featured-fade" style={{animation: 'fadeScale 0.7s'}}>
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-all duration-700 ease-in-out">
                  {cards[1].accent && (
                    <span className="text-[11px] font-sans text-primary uppercase tracking-widest mb-1 block">
                      {cards[1].accent}
                    </span>
                  )}
                  <h3 className="font-serif text-lg md:text-xl text-foreground mb-1">
                    {cards[1].name}
                  </h3>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all duration-700 ease-in-out" />
            </Link>
          )}

          {/* Newly Added Items box (top-right) */}
          {menuItemsFlat.find(i => i.isNew) && (
            <Link
              key="newly-added"
              to="/menu"
              className="group relative rounded-lg shadow-[0_8px_24px_-16px_rgba(0,0,0,0.45)] row-span-1 col-span-1 h-full min-h-[90px] flex overflow-hidden"
              style={{minHeight:'100%', height:'100%'}}
            >
              <img
                src={menuItemsFlat.find(i => i.isNew && i.image)?.image || cards[0]?.image}
                alt={menuItemsFlat.find(i => i.isNew)?.name || 'Newly Added'}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 featured-fade"
                loading="lazy"
                style={{animation: 'fadeScale 0.7s'}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-700 ease-in-out featured-fade" style={{animation: 'fadeScale 0.7s'}} />
              <div className="absolute inset-0 flex flex-col justify-end p-4 featured-fade" style={{animation: 'fadeScale 0.7s'}}>
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-all duration-700 ease-in-out">
                  <span className="text-[11px] font-sans text-primary uppercase tracking-widest mb-1 block">Newly Added</span>
                  <h3 className="font-serif text-lg md:text-xl text-foreground mb-1">
                    {menuItemsFlat.find(i => i.isNew)?.name || 'New Item'}
                  </h3>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all duration-700 ease-in-out" />
            </Link>
          )}
                  {/* Smooth fade/scale animation for menu item changes */}
                  <style>{`
                    @keyframes fadeScale {
                      0% { opacity: 0; transform: scale(0.96); }
                      100% { opacity: 1; transform: scale(1); }
                    }
                    .featured-fade {
                      animation: fadeScale 0.7s;
                    }
                  `}</style>
          {/* Bottom-right two boxes (Shakes/Juices and Desserts) */}
          {cards[2] && (
            <Link
              key={cards[2].title}
              to={cards[2].to}
              className="group relative rounded-lg shadow-[0_8px_24px_-16px_rgba(0,0,0,0.45)] row-span-1 col-span-1 h-full min-h-[90px] flex overflow-hidden"
              style={{minHeight:'100%', height:'100%'}}
            >
              <img
                src={cards[2].image}
                alt={cards[2].name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-700 ease-in-out" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-all duration-700 ease-in-out">
                  {cards[2].accent && (
                    <span className="text-[11px] font-sans text-primary uppercase tracking-widest mb-1 block">
                      {cards[2].accent}
                    </span>
                  )}
                  <h3 className="font-serif text-lg md:text-xl text-foreground mb-1">
                    {cards[2].name}
                  </h3>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all duration-700 ease-in-out" />
            </Link>
          )}
          {cards[3] && (
            <Link
              key={cards[3].title}
              to={cards[3].to}
              className="group relative rounded-lg shadow-[0_8px_24px_-16px_rgba(0,0,0,0.45)] row-span-1 col-span-1 h-full min-h-[90px] flex overflow-hidden"
              style={{minHeight:'100%', height:'100%'}}
            >
              <img
                src={cards[3].image}
                alt={cards[3].name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-700 ease-in-out" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-all duration-700 ease-in-out">
                  {cards[3].accent && (
                    <span className="text-[11px] font-sans text-primary uppercase tracking-widest mb-1 block">
                      {cards[3].accent}
                    </span>
                  )}
                  <h3 className="font-serif text-lg md:text-xl text-foreground mb-1">
                    {cards[3].name}
                  </h3>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all duration-700 ease-in-out" />
            </Link>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/menu" className="btn-gold inline-block">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};
