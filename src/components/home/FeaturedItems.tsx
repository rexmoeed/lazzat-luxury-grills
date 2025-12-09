import { Link } from "react-router-dom";
import foodKabab from "@/assets/food-kabab.jpg";
import foodBiryani from "@/assets/food-biryani.jpg";
import foodSajji from "@/assets/food-sajji.jpg";
import foodDrinks from "@/assets/food-drinks.jpg";
import heroGrill from "@/assets/hero-grill.jpg";

const menuItems = [
  {
    id: 1,
    name: "BBQ & Tikka",
    description: "Flame-grilled perfection with signature marinades",
    image: heroGrill,
    category: "grill",
  },
  {
    id: 2,
    name: "Seekh Kabab",
    description: "Hand-minced, spiced, and charcoal-kissed",
    image: foodKabab,
    category: "kabab",
  },
  {
    id: 3,
    name: "Aromatic Biryani",
    description: "Layered rice with saffron and slow-cooked meats",
    image: foodBiryani,
    category: "rice",
  },
  {
    id: 4,
    name: "Full Sajji",
    description: "Whole roasted lamb, a traditional feast",
    image: foodSajji,
    category: "specialty",
  },
  {
    id: 5,
    name: "Fresh Juices & Shakes",
    description: "Refreshing blends and creamy indulgences",
    image: foodDrinks,
    category: "beverages",
  },
];

export const FeaturedItems = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
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
          {menuItems.slice(0, 3).map((item, index) => (
            <Link
              key={item.id}
              to="/menu"
              className="group relative aspect-[4/5] overflow-hidden rounded-lg"
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
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs font-sans text-primary uppercase tracking-widest mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
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
          {menuItems.slice(3).map((item, index) => (
            <Link
              key={item.id}
              to="/menu"
              className="group relative aspect-[16/9] overflow-hidden rounded-lg"
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
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs font-sans text-primary uppercase tracking-widest mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
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
