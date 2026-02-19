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
        After years of running kitchens across <span className="text-primary">Canada</span>, our team saw the same problem everywhere: if food was quick, it lacked depth; if it had flavor, it was greasy or slow. We built <span className="text-primary">Lazzat</span> to change that.
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
              Why Choose <span className="text-primary">Lazzat</span> ?
            </h2>

            <div className="space-y-2 text-muted-foreground font-sans leading-relaxed">
              <p>
                Because you shouldn’t have to choose between:
              </p>
              <p>
                <span className="text-primary">Speed</span> and <span className="text-primary">Flavor</span>
              </p>
              <p>
                <span className="text-primary">Healthy</span> and <span className="text-primary">Hearty</span>
              </p>
              <p>
                <span className="text-primary">Traditional Spices</span> and <span className="text-primary">Modern balance</span>
              </p>
              <p>
                At <span className="text-primary">Lazzat</span>, you get it all - real spices, fresh grills and signature sauces that celebrate <span className="text-primary">Canada’s multicultural spirit.</span>
              </p>
            </div>
          </div>

          {/* Images Grid */}
          <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="story-glow-image aspect-[4/3] overflow-hidden rounded-lg gold-border"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover hover-zoom relative z-10"
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
