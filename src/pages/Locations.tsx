import { Layout } from "@/components/layout/Layout";
import { MapPin, Clock, Phone } from "lucide-react";

const locations = [
  {
    id: 1,
    name: "Downtown Flagship",
    address: "123 Grill Street, Downtown District",
    city: "New York, NY 10001",
    phone: "+1 (212) 555-0100",
    hours: {
      weekday: "11:00 AM - 11:00 PM",
      weekend: "11:00 AM - 12:00 AM",
      sunday: "12:00 PM - 10:00 PM",
    },
    mapUrl: "https://maps.google.com",
  },
  {
    id: 2,
    name: "Midtown Express",
    address: "456 Fire Avenue, Midtown",
    city: "New York, NY 10018",
    phone: "+1 (212) 555-0200",
    hours: {
      weekday: "10:00 AM - 10:00 PM",
      weekend: "10:00 AM - 11:00 PM",
      sunday: "11:00 AM - 9:00 PM",
    },
    mapUrl: "https://maps.google.com",
  }
];

const Locations = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="text-center">
            <div className="gold-divider w-16 mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Our <span className="text-primary">Locations</span>
            </h1>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              Find a Lazzat near you and experience premium grills crafted fresh daily.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="section-padding bg-card">
        <div className="container-luxury px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-background border border-primary/20 rounded-lg p-6 md:p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-gold"
              >
                <h3 className="font-serif text-2xl text-foreground mb-4">
                  {location.name}
                </h3>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-sm text-foreground">
                        {location.address}
                      </p>
                      <p className="font-sans text-sm text-muted-foreground">
                        {location.city}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <a
                      href={`tel:${location.phone}`}
                      className="font-sans text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="font-sans text-sm">
                      <div className="flex justify-between text-muted-foreground mb-1">
                        <span>Mon - Thu:</span>
                        <span className="text-foreground ml-4">{location.hours.weekday}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground mb-1">
                        <span>Fri - Sat:</span>
                        <span className="text-foreground ml-4">{location.hours.weekend}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Sunday:</span>
                        <span className="text-foreground ml-4">{location.hours.sunday}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-6 border-t border-primary/20 flex flex-col sm:flex-row gap-3">
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-white text-center text-sm py-2.5 flex-1"
                  >
                    Get Directions
                  </a>
                  <a
                    href="/order"
                    className="btn-gold text-center text-sm py-2.5 flex-1"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 bg-secondary flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
          <p className="font-sans text-muted-foreground">
            Interactive map coming soon
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
