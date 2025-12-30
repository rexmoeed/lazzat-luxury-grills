import heroRestaurant from "@/assets/hero-restaurant.jpg";
import heroGrill from "@/assets/hero-grill.jpg";
import lazzatWall from "@/assets/Lazzat-wall-Design.jpg";

export const AboutSection = () => {
  const images = [
    { src: heroRestaurant, alt: "Lazzat Restaurant Interior" },
    { src: heroGrill, alt: "Grilling Action" },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury space-y-24">

        {/* Story Wall – Museum Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <img
              src={lazzatWall}
              alt="Lazzat Story Wall"
              className="w-full rounded-lg gold-border shadow-xl lazzat-glow"
            />
          </div>

          <div>
            <div className="gold-divider w-16 mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              A Story Told Through <span className="text-primary">Flavor</span>
            </h2>

            <div className="space-y-5 text-muted-foreground font-sans leading-relaxed">
              <p>
                At Lazzat, food is more than what’s on the plate—it’s an experience
                shaped by flavors from the world’s most vibrant kitchens. Each
                creation is thoughtfully crafted to take you beyond the ordinary.
              </p>

              <p>
                Takeout doesn’t have to feel rushed or forgettable. Here, it’s
                reimagined with fresh, high-quality ingredients and careful
                preparation—balancing comfort with quality.
              </p>

              <p>
                Food is more than fuel; it’s a bridge that connects us. Every bite
                celebrates flavors that unite us, no matter where we’re from.
              </p>
            </div>
          </div>
        </div>

        {/* Existing About Content */}
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
                Our open kitchen philosophy means you see every flame, every
                sizzle, every moment of culinary artistry.
              </p>
              <p>
                From charcoal grills to aromatic spice blends passed down through
                generations, every dish is crafted with intention.
              </p>
            </div>
          </div>

          {/* Images Grid */}
          <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-lg gold-border"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover hover-zoom"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
