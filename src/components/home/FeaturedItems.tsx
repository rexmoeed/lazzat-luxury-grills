
import { useState } from "react";
import { cn } from "@/lib/utils";
import { menuItemsFlat } from "@/lib/menu-data";
import { sauces } from "@/lib/sauces-data";

export const FeaturedItems = () => {
  // Get first available from each category
  const grillsBiryaniSajji = menuItemsFlat.find((item) => ["Grills & Skewers", "Biryani", "Sajji"].includes(item.category));
  const sauce = sauces[0];
  const juice = menuItemsFlat.find((item) => item.category === "Shakes & Juices");
  const dessert = menuItemsFlat.find((item) => item.category === "Desserts");

  const cards = [
    grillsBiryaniSajji && {
      title: "Grills · Biryani · Sajji",
      name: grillsBiryaniSajji.name,
      image: grillsBiryaniSajji.image,
      accent: grillsBiryaniSajji.category,
      description: grillsBiryaniSajji.description,
    },
    sauce && {
      title: "Signature Sauces",
      name: sauce.name,
      image: sauce.image,
      accent: `Level ${sauce.level}`,
      description: sauce.description,
    },
    juice && {
      title: "Juices & Shakes",
      name: juice.name,
      image: juice.image,
      accent: juice.category,
      description: juice.description,
    },
    dessert && {
      title: "Desserts",
      name: dessert.name,
      image: dessert.image,
      accent: dessert.category,
      description: dessert.description,
    },
  ].filter(Boolean);

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
            Discover our most celebrated dishes, each crafted with passion and precision.
          </p>
        </div>

        {/* Gallery Grid (AmbienceGallery style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "group relative overflow-hidden rounded-lg aspect-square cursor-pointer shadow-[0_10px_30px_-22px_rgba(0,0,0,0.5)]",
                index === 0 && "md:col-span-2 md:row-span-2"
              )}
              aria-label={card.name}
            >
              <img
                src={card.image}
                alt={card.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[11px] font-sans text-foreground uppercase tracking-widest">
                  View
                </span>
              </div>
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all duration-500" />
            </button>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && cards[selectedImage] && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-3 md:p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full border border-foreground/30 flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors duration-300"
              aria-label="Close"
            >
              <span style={{fontSize:24, fontWeight:'bold'}}>×</span>
            </button>
            <img
              src={cards[selectedImage].image}
              alt={cards[selectedImage].name}
              className="max-w-full max-h-[75vh] object-contain rounded-lg animate-zoom-in"
            />
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
              <span className="font-serif text-lg md:text-2xl text-foreground mb-1">{cards[selectedImage].name}</span>
              <span className="text-xs md:text-base text-muted-foreground text-center max-w-md">{cards[selectedImage].description}</span>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/menu"
            className="btn-gold w-full md:w-auto inline-block max-w-xs md:max-w-none mx-auto py-4 px-6 text-base md:text-lg"
            style={{ display: 'inline-block', marginLeft: 'auto', marginRight: 'auto' }}
          >
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
};

