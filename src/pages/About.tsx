import { Layout } from "@/components/layout/Layout";
import heroRestaurant from "@/assets/hero-restaurant.jpg";
import aboutKitchen from "@/assets/about-kitchen.jpg";
import heroGrill from "@/assets/hero-grill.jpg";

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

      {/* Story Section */}
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
                  Lazzat was born from a simple belief: that everyone deserves
                  access to premium-quality grilled cuisine without the pretense
                  or the wait. Our founder, inspired by the street food traditions
                  of South Asia and the Mediterranean, envisioned a space where
                  luxury meets accessibility.
                </p>
                <p>
                  The name "Lazzat" means "flavor" in Urdu—a testament to our
                  commitment to bringing authentic, bold tastes to every plate.
                  What started as a single grill station has grown into a
                  celebrated dining destination.
                </p>
                <p>
                  Today, we continue that legacy with our open kitchen concept,
                  where guests can watch their meals being prepared over live
                  flames, ensuring transparency and freshness in every dish.
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
                <p>
                  At Lazzat, we believe in complete transparency. Our open kitchen
                  isn't just a design choice—it's a promise. When you dine with us,
                  you see every flame, every sizzle, every moment of culinary
                  artistry.
                </p>
                <p>
                  Our chefs are trained in traditional grilling techniques from
                  around the world, blending time-honored methods with modern
                  precision. From the smoky depths of charcoal to the aromatic
                  spice rubs, every element is crafted with intention.
                </p>
                <p>
                  This philosophy extends to our ingredients. We source fresh,
                  never frozen meats, seasonal vegetables, and house-made marinades
                  daily. No preservatives, no shortcuts—just pure, honest flavor.
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

      {/* Values */}
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
                  "Premium ingredients, expert preparation, and uncompromising standards in everything we serve.",
              },
              {
                title: "Cultural Roots",
                description:
                  "Honoring the diverse culinary traditions that inspire our menu while innovating for modern palates.",
              },
              {
                title: "Genuine Hospitality",
                description:
                  "Creating memorable experiences through warm service, beautiful spaces, and attention to detail.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="text-center p-8 border border-primary/20 rounded-lg hover:border-primary/50 transition-colors duration-500"
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
            Come taste what sets us apart. From our first spark to your last bite,
            we're dedicated to delivering an extraordinary dining experience.
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
