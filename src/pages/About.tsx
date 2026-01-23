import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import heroRestaurant from "@/assets/hero-restaurant.jpg";
import aboutKitchen from "@/assets/about-kitchen.jpg";
import heroGrill from "@/assets/hero-grill.jpg";
import lazzatWall from "@/assets/Lazzat-wall-Design.jpg";
import { menuItemsFlat } from "@/lib/menu-data";
import type { MenuItem } from "@/lib/menu-types";

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const previewItems = useMemo<MenuItem[]>(() => {
    const popular = menuItemsFlat.filter((item) => item.isPopular).slice(0, 3);
    if (popular.length === 3) return popular;
    // fallback: first three items if popular not enough
    return menuItemsFlat.slice(0, 3);
  }, []);

  const navTabs = [
    { label: 'Story', id: 'story' },
    { label: 'Menu', id: 'menu' },
    { label: 'Values', id: 'values' },
    { label: 'Open Kitchen', id: 'open-kitchen' },
    { label: 'Visit', id: 'visit' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 bg-background">
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

      {/* Section Navigation Tabs */}
      <section className="sticky top-20 z-30 bg-background/95 backdrop-blur border-b border-primary/10 py-3 md:py-4">
        <div className="container-luxury px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 overflow-x-auto md:overflow-visible">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-background border border-primary'
                    : 'border border-primary/20 text-foreground hover:border-primary hover:text-primary hover:bg-primary/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      {activeTab === 'story' && (
      <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 bg-background">
        <div className="container-luxury">
          {/*  EDIT: ambient wrapper */}
          <div className="story-ambient grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="story-glow-image p-3">
  <img
    src={lazzatWall}
    alt="Lazzat brand story wall art"
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
      )}

      {/* Explore Menu (subtle preview) */}
      {activeTab === 'menu' && (
      <section className="pt-8 pb-12 md:pt-10 md:pb-14 bg-background">
        <div className="container-luxury">
          <div className="text-center mb-8">
            <div className="gold-divider w-16 mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
              Explore Our <span className="text-primary">Menu</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              A few guest favorites—crafted for takeaway that still feels premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {previewItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-primary/10 bg-card/60 overflow-hidden backdrop-blur-sm hover:border-primary/40 transition-colors"
              >
                {item.image && (
                  <div className="relative w-full h-28 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                )}
                <div className="text-[11px] uppercase tracking-widest text-primary px-4 pt-3">
                  {item.category}
                  {item.subCategory ? ` • ${item.subCategory}` : ""}
                </div>
                <div className="px-4 pb-4 pt-1">
                  <h3 className="font-serif text-lg text-foreground mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/menu" className="btn-outline-white inline-block">
              View Full Menu
            </a>
          </div>
        </div>
      </section>
      )}

      {/* Values – MOVED UP + GLOW */}
      {activeTab === 'values' && (
      <section className="pt-10 pb-14 md:pt-12 md:pb-16 bg-card">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <div className="gold-divider w-16 mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Why choose us? Premium ingredients, transparent open-kitchen cooking, and takeaway crafted to feel elevated—not rushed.
            </p>
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
                className="relative text-center p-8 rounded-lg lazzat-glow-soft border border-primary/10 hover:border-primary/30 transition-all shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]"
              >
                <div className="absolute inset-x-6 top-0 h-1 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30 rounded-b-full" />
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
      )}

      {/* Open Kitchen */}
      {activeTab === 'open-kitchen' && (
      <section className="pt-10 pb-14 md:pt-12 md:pb-16 bg-background">
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
                alt="Chefs grilling in Lazzat open kitchen"
                className="w-full h-64 md:h-80 object-cover rounded-lg gold-border"
              />
            </div>
          </div>
        </div>
      </section>
      )}

      {/* CTA */}
      {activeTab === 'visit' && (
      <section className="pt-12 pb-14 md:pt-14 md:pb-16 bg-gradient-to-b from-background via-background to-black/40 relative overflow-hidden">
        <div className="container-luxury text-center">
          <img
            src={heroGrill}
            alt="Close-up of Lazzat grill with skewers"
            className="w-full max-w-4xl h-64 md:h-80 object-cover mx-auto rounded-lg mb-8"
          />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            Experience the <span className="text-primary">Lazzat</span> Difference
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto mb-8">
            Great food isn’t just about eating it’s about enjoying the finer
            things in life, together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/locations" className="btn-gold inline-block">
              Find a Location
            </a>
            <a href="/menu" className="btn-outline-white inline-block">
              View Menu
            </a>
          </div>
        </div>
      </section>
      )}
    </Layout>
  );
};

export default About;
