import aboutKitchen from "@/assets/about-kitchen.jpg";
import heroRestaurant from "@/assets/hero-restaurant.jpg";
import heroGrill from "@/assets/hero-grill.jpg";

export const AboutSection = () => {
  const images = [
    { src: heroRestaurant, alt: "Lazzat Restaurant Interior" },
    { src: aboutKitchen, alt: "Open Kitchen with Flames" },
    { src: heroGrill, alt: "Grilling Action" },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="gold-divider w-16 mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Where <span className="text-primary">Tradition</span> Meets{" "}
              <span className="text-primary">Innovation</span>
            </h2>
            <div className="space-y-4 text-muted-foreground font-sans leading-relaxed">
              <p>
                Born from a passion for authentic flavors and premium ingredients,
                Lazzat brings together the finest grilling traditions from around
                the world.
              </p>
              <p>
                Our open kitchen philosophy means you see every flame, every sizzle,
                every moment of culinary artistry. We believe in transparency,
                freshness, and the magic that happens when fire meets premium cuts.
              </p>
              <p>
                From the smoky depths of our charcoal grills to the aromatic spice
                blends passed down through generations, every dish is a celebration
                of flavor crafted with intention.
              </p>
            </div>

            
          </div>

          {/* Images Grid */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <div className="overflow-hidden rounded-lg gold-border">
                <img
                  src={images[0].src}
                  alt={images[0].alt}
                  className="w-full h-64 md:h-80 object-cover hover-zoom"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="overflow-hidden rounded-lg gold-border">
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="w-full h-40 md:h-48 object-cover hover-zoom"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg gold-border">
              <img
                src={images[2].src}
                alt={images[2].alt}
                className="w-full h-40 md:h-48 object-cover hover-zoom"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
