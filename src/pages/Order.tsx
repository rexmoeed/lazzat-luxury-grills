import { Layout } from "@/components/layout/Layout";
import { ShoppingBag, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Order = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="text-center">
            <div className="gold-divider w-16 mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Order <span className="text-primary">Now</span>
            </h1>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              Premium grills delivered fresh to your door or ready for pickup.
            </p>
          </div>
        </div>
      </section>

      {/* Order Options */}
      <section className="section-padding bg-card">
        <div className="container-luxury px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Delivery */}
            <div className="bg-background border border-primary/20 rounded-lg p-8 text-center hover:border-primary/50 transition-all duration-500 hover:shadow-gold group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-gold transition-all duration-500">
                <ShoppingBag className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3">
                Delivery
              </h3>
              <p className="font-sans text-sm text-muted-foreground mb-6">
                Fresh from our kitchen to your door. Hot, fast, and perfectly packaged.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-primary mb-6">
                <Clock size={16} />
                <span>30-45 min delivery</span>
              </div>
              <button className="btn-gold w-full">Order Delivery</button>
            </div>

            {/* Pickup */}
            <div className="bg-background border border-primary/20 rounded-lg p-8 text-center hover:border-primary/50 transition-all duration-500 hover:shadow-gold group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-gold transition-all duration-500">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3">
                Pickup
              </h3>
              <p className="font-sans text-sm text-muted-foreground mb-6">
                Skip the line. Order ahead and pick up at your convenience.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-primary mb-6">
                <Clock size={16} />
                <span>15-20 min ready</span>
              </div>
              <button className="btn-gold w-full">Order Pickup</button>
            </div>
          </div>

          {/* Browse Menu Link */}
          <div className="text-center mt-12">
            <p className="font-sans text-muted-foreground mb-4">
              Not sure what to order?
            </p>
            <Link
              to="/menu"
              className="btn-outline-white inline-block"
            >
              Browse Our Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 bg-background border-t border-primary/20">
        <div className="container-luxury px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="font-serif text-lg text-foreground mb-2">
                Free Delivery
              </h4>
              <p className="text-sm font-sans text-muted-foreground">
                On orders over $50
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg text-foreground mb-2">
                Freshness Guarantee
              </h4>
              <p className="text-sm font-sans text-muted-foreground">
                Satisfaction or your money back
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg text-foreground mb-2">
                Loyalty Rewards
              </h4>
              <p className="text-sm font-sans text-muted-foreground">
                Earn points on every order
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Order;
