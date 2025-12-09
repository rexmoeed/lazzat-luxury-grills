import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import heroRestaurant from "@/assets/hero-restaurant.jpg";
import ambienceFlowers from "@/assets/ambience-flowers.jpg";
import aboutKitchen from "@/assets/about-kitchen.jpg";
import heroGrill from "@/assets/hero-grill.jpg";

const galleryImages = [
  { src: heroRestaurant, alt: "Elegant dining room", category: "interior" },
  { src: ambienceFlowers, alt: "Flower arrangements", category: "decor" },
  { src: aboutKitchen, alt: "Open kitchen action", category: "kitchen" },
  { src: heroGrill, alt: "Grill flames", category: "kitchen" },
];

export const AmbienceGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="section-padding bg-card">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Ambience & <span className="text-primary">Décor</span>
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Step into a world where luxury meets comfort, designed for an
            unforgettable dining experience.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "group relative overflow-hidden rounded-lg aspect-square cursor-pointer",
                index === 0 && "md:col-span-2 md:row-span-2"
              )}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-xs font-sans text-foreground uppercase tracking-widest">
                  View
                </span>
              </div>
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all duration-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full border border-foreground/30 flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors duration-300"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <img
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg animate-zoom-in"
          />
        </div>
      )}
    </section>
  );
};
