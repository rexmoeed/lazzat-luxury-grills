import { Layout } from "@/components/layout/Layout";
import heroRestaurant from "@/assets/hero-restaurant.jpg";
import aboutKitchen from "@/assets/about-kitchen.jpg";
import heroGrill from "@/assets/hero-grill.jpg";
import lazzatWall from "@/assets/Lazzat-wall-Design.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-background">
        <div className="container-luxury px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="gold-divider w-16 mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Our <span className="text-primary">Story</span>
            </h1>
            <p className="font-sans text-lg text-muted-foreground leading-relaxed">
              From humble beginnings to becoming a destination for premium grills,
              Lazzat's journey is one of passion, tradition, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Story Narrative – Museum / Heritage */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          {/*  EDIT: ambient wrapper */}
          <div className="story-ambient grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="story-glow-image p-3">
  <img
    src={lazzatWall}
    alt="Lazzat Wall Story Design"
    className="w-full rounded-lg gold-border relative z-10"
  />
</div>
            </div>

            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                A Story Told Through <span className="text-primary">Flavor</span>
              </h2>

              <div className="space-y-5 text-muted-foreground font-sans leading-relaxed">
                <p>
                  At Lazzat, food is more than what’s on the plate,it’s an experience
                  shaped by flavors from the world’s most vibrant kitchens.
                </p>
                <p>
                  Takeout doesn’t have to feel rushed or forgettable. Here, it’s
                  reimagined with fresh, high-quality ingredients and careful
                  preparation.
                </p>
                <p>
                  Food is more than fuel; it’s a bridge that connects us, celebrating
                  flavors that unite us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ EDIT: spacer to visually separate glow layers */}
      <div className="h-20 bg-background" />

      {/* Values – MOVED UP + GLOW */}
      <section className="section-padding bg-card">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <div className="gold-divider w-16 mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description:
                  "Premium ingredients, expert preparation, and uncompromising standards.",
              },
              {
                title: "Cultural Roots",
                description:
                  "Honoring global traditions while innovating for modern palates.",
              },
              {
                title: "Genuine Hospitality",
                description:
                  "Warm service, thoughtful spaces, and lasting impressions.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="text-center p-8 rounded-lg lazzat-glow-soft"
              >
                <h3 className="font-serif text-xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-sm font-sans text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where It All Began */}
      <section className="section-padding bg-card">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <img
                src={heroRestaurant}
                alt="Lazzat Restaurant"
                className="w-full rounded-lg gold-border"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Where It All <span className="text-primary">Began</span>
              </h2>
              <div className="space-y-4 text-muted-foreground font-sans leading-relaxed">
                <p>
                  Lazzat was born from a simple belief: premium quality grilled
                  cuisine should be accessible without compromise.
                </p>
                <p>
                  Inspired by South Asian and Mediterranean street food traditions,
                  what began as a single grill station became a destination.
                </p>
                <p>
                  Today, our open kitchen ensures transparency and freshness in
                  every dish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Kitchen */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                The <span className="text-primary">Open Kitchen</span> Philosophy
              </h2>
              <div className="space-y-4 text-muted-foreground font-sans leading-relaxed">
                <p>Every flame, every sizzle, every detail on display.</p>
                <p>
                  Traditional techniques meet modern precision, without shortcuts.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={aboutKitchen}
                alt="Open Kitchen"
                className="w-full rounded-lg gold-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-luxury text-center">
          <img
            src={heroGrill}
            alt="Grilling"
            className="w-full max-w-4xl mx-auto rounded-lg mb-12"
          />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            Experience the <span className="text-primary">Lazzat</span> Difference
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto mb-8">
            Great food isn’t just about eating it’s about enjoying the finer
            things in life, together.
          </p>
          <a href="/locations" className="btn-gold inline-block">
            Find a Location
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default About;
