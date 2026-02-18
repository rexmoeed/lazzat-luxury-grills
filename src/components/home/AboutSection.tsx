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
    {/* GLOW WRAPPER */}
    <div className="story-glow-image">
      <img
        src={lazzatWall}
        alt="Lazzat Story Wall"
        className="w-full rounded-lg gold-border relative z-10"
      />
    </div>
  </div>

  <div>
    <div className="gold-divider w-16 mb-6" />
    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
      Our Story
    </h2>

    <div className="space-y-5 text-muted-foreground font-sans leading-relaxed">
      <p>
        At Lazzat, we started with a simple question: Why does fresh, flavorful food take so long, and why does fast food so often feel flavorless?
      </p>
      <p>
        After years of running kitchens across Canada, our team saw the same problem everywhere: if food was quick, it lacked depth; if it had flavor, it was greasy or slow. We built Lazzat to change that.
      </p>
      <p>
        Here, you get the best sauces, <span className="text-primary">grills and spices - all under one roof</span>.
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
