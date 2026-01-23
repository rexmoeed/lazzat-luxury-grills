import { Link } from "react-router-dom";
import { menuItemsFlat } from "@/lib/menu-data";

export const FeaturedItems = () => {
  const popularOrNew = menuItemsFlat.filter((item) => item.isPopular || item.isNew);

  let featuredItems = popularOrNew.slice(0, 5);

  if (featuredItems.length < 5) {
    const remaining = menuItemsFlat
      .filter((item) => !featuredItems.some((f) => f.id === item.id))
      .slice(0, 5 - featuredItems.length);
    featuredItems = [...featuredItems, ...remaining];
  }

  const firstRow = featuredItems.slice(0, 3);
  const secondRow = featuredItems.slice(3, 5);

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Featured <span className="text-primary">Creations</span>
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Discover our most celebrated dishes, each crafted with passion and
            precision.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {firstRow.map((item, index) => (
            <Link
              key={item.id}
              to="/menu"
              className="group relative aspect-[5/4] overflow-hidden rounded-lg shadow-[0_10px_35px_-24px_rgba(0,0,0,0.45)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[11px] font-sans text-primary uppercase tracking-widest mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm font-sans text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Gold Border on Hover */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all duration-500" />
            </Link>
          ))}
        </div>

        {/* Second Row - 2 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {secondRow.map((item, index) => (
            <Link
              key={item.id}
              to="/menu"
              className="group relative aspect-[5/3] overflow-hidden rounded-lg shadow-[0_10px_35px_-24px_rgba(0,0,0,0.45)]"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[11px] font-sans text-primary uppercase tracking-widest mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm font-sans text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Gold Border on Hover */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all duration-500" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/menu"
            className="btn-outline-white inline-block"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};
