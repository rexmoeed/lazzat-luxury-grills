import openKitchen from "@/assets/lazzat-open-kitchen.jpeg";

export const HowItWorks = () => (
  <section className="section-padding bg-background px-2 sm:px-0">
    <div className="container-luxury">
      <div className="gold-divider w-16 mb-6 mx-auto" />
      <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 sm:mb-12 text-center tracking-tight">
        How It Works
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 flex justify-center items-center mb-6 md:mb-0 md:mr-6">
          <div className="story-glow-image w-full max-w-xs sm:max-w-md md:max-w-[600px] h-48 sm:h-64 md:h-[400px]">
            <img
              src={openKitchen}
              alt="Lazzat Open Kitchen"
              className="w-full h-full object-cover rounded-xl gold-border shadow-md border-[0.5px] border-gold/30 bg-white/40 relative z-10"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center md:items-start">
          <p className="text-base md:text-lg text-muted-foreground mb-4 text-center md:text-left">
            We designed Lazzat for today’s pace - without sacrificing flavor.<br />
            <span className="text-primary">Speed Through Design. Freshness First. Balanced & Clean</span>
          </p>
          <ol className="list-decimal list-inside space-y-3 text-white text-left font-sans">
            <li>Order in Seconds - Online or In-Store</li>
            <li>Cooked Fresh, Served Fast - No pre-made shortcuts.</li>
            <li>Enjoy Real Flavor - Spices and sauces from around the world</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
);
