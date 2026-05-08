// import saltCounter from "@/assets/salt-counter.jpeg";
// import lazzatLoc from "@/assets/Lazzat loc.jpeg";
import lazzatWall from "@/assets/Lazzat-wall-Design.jpg";
import saltCounter from "@/assets/salt-counter.jpeg";
import lazzatLoc from "@/assets/Lazzat loc.jpeg";

export const AboutSection = () => {
  const images = [
    { src: saltCounter, alt: "Himalayan salt counter at Lazzat" },
    { src: lazzatLoc, alt: "Lazzat restaurant location in Brampton" },
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

    {/* Removed salt-counter and lazzatLoc images from About section as requested */}
  </div>

  <div>
    <div className="gold-divider w-16 mb-6" />
    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
      What is <span className="text-primary">Lazzat?</span>
    </h2>


    <div className="space-y-5 text-muted-foreground font-sans leading-relaxed">
      <p>
        <span className="text-primary">Lazzat</span> is what happens when a team of chefs with decades in Canadian<br />
        kitchens decides to stop taking shortcuts.
      </p>
      <p>
        The menu is fire-grilled skewers, chef-built salads over basmati or fresh<br />
        greens, and shakes blended from whole fruit the moment you order — no<br />
        syrups, no powders, no pre-mixed bases. Every recipe is signed off by a chef<br />
        currently teaching at George Brown and Sheridan.
      </p>
      <p>
        The counter is carved from real <span className="text-primary">Himalayan Pink Salt</span> — eight hundred million<br />
        years old, mined in Pakistan for twenty-five centuries, eighty-four natural<br />
        minerals in every brick. The pendants above it are the same salt, lit from<br />
        within. <span className="text-primary">Touch the counter when you order. It's real.</span>
      </p>
      <p>
        One menu welcomes every appetite, with dairy-free, gluten-free, nut-free, and<br />
        egg-free paths on every page. The kitchen is open. The blender runs when<br />
        you order. The fire is always lit.
      </p>
      <p>
        <span className="text-primary">McVean Drive, Brampton. Pull up a chair.</span>
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
                At <span className="text-primary">Lazzat</span>, we believe food can unite cultures. While most restaurants focus on only a few items, we offer a
variety of thoughtfully prepared dishes that respect different dietary traditions, giving you
inclusive options without compromising on taste or experience.
              </p>
              
              <p className="pt-2">
                Because you shouldn't have to choose between:
              </p>
              <p>
                <span className="text-primary">• Speed</span> and <span className="text-primary">Flavor</span>
              </p>
              <p>
                <span className="text-primary">• Healthy</span> and <span className="text-primary">Hearty</span>
              </p>
              <p>
                <span className="text-primary">• Traditional Spices</span> and <span className="text-primary">Modern Balance</span>
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
                  className="absolute inset-0 w-full h-full object-cover hover-zoom z-10"
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
