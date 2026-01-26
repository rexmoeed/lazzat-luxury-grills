import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// Simple locations list for display only
const locations = [
  {
    id: 1,
    name: "Lazzat Grill & Shakes",
    address: "Lazzat Grill and Shakes 43/49 - 11685 Mcvean Dr Brampton ON L6P 4N5",
    phone: "+1 (212) 555-0100",
  },
  {
    id: 2,
    name: "Lazzat Grill & Shakes",
    address: "Lazzat Grill and Shakes 143 Clarence St, Unit 10 Brampton ON L6W 1T2",
    phone: "+1 (234) 567-8200",
  },
];



function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

const locationsWithCoords = [
  {
    ...locations[0],
    lat: 43.8065,
    lng: -79.6421,
  },
  {
    ...locations[1],
    lat: 43.6847,
    lng: -79.7599,
  },
];

function LocationsList() {
  const [nearestId, setNearestId] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        // Find nearest
        let minDist = Infinity;
        let minId = null;
        locationsWithCoords.forEach(loc => {
          const dist = getDistance(latitude, longitude, loc.lat, loc.lng);
          if (dist < minDist) {
            minDist = dist;
            minId = loc.id;
          }
        });
        setNearestId(minId);
        setLocationStatus('success');
      },
      () => setLocationStatus('error'),
      { timeout: 10000 }
    );
  }, []);

  return (
    <div className="container-luxury px-4 max-w-3xl mx-auto">
      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6 mt-10 text-center">Our Locations</h2>
      {locationStatus === 'loading' && (
        <div className="text-center text-sm text-muted-foreground mb-4">Detecting your location...</div>
      )}
      {locationStatus === 'error' && (
        <div className="text-center text-sm text-red-500 mb-4">Could not detect your location.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locationsWithCoords.map(loc => (
          <div
            key={loc.id}
            className={
              `rounded-lg border bg-background p-5 transition-shadow duration-500 ` +
              (nearestId === loc.id && userCoords
                ? 'border-primary shadow-[0_0_25px_rgba(218,170,67,0.4)] animate-pulse-glow scale-[1.02]'
                : 'border-primary/20')
            }
            style={nearestId === loc.id && userCoords ? { animation: 'pulse-glow 2s ease-in-out infinite' } : undefined}
          >
            <h3 className="font-serif text-lg text-primary mb-1">{loc.name}</h3>
            <div className="text-sm text-muted-foreground mb-1">{loc.address}</div>
            <div className="text-sm"><a href={`tel:${loc.phone}`} className="text-primary hover:underline">{loc.phone}</a></div>
            {nearestId === loc.id && userCoords && (
              <div className="mt-2 text-xs text-primary font-semibold">Nearest to you</div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0px rgba(218,170,67,0.2); }
          50% { box-shadow: 0 0 25px 8px rgba(218,170,67,0.4); }
          100% { box-shadow: 0 0 0px rgba(218,170,67,0.2); }
        }
      `}</style>
    </div>
  );
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "feedback",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "feedback",
        message: "",
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="text-center">
            <div className="gold-divider w-16 mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you. Reach out for feedback, franchise inquiries, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-16 bg-card">
        <div className="container-luxury px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl text-foreground mb-8">
                Get in <span className="text-primary">Touch</span>
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-1">
                      Visit Us
                    </h4>
                    <div className="mb-2 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <span className="font-semibold text-foreground">Location 1:</span><br />
                        <span className="font-sans text-sm text-muted-foreground">43/49 - 11685 Mcvean Dr<br />Brampton, ON L6P 4N5, Canada</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <span className="font-semibold text-foreground">Location 2:</span><br />
                        <span className="font-sans text-sm text-muted-foreground">143 Clarence St Unit #10<br />Brampton, ON L6W 1T2, Canada</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-1">
                      Call Us
                    </h4>
                    <a
                      href="tel:+12125550100"
                      className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      +1 (212) 555-0100
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-1">
                      Email Us
                    </h4>
                    <a
                      href="mailto:hello@lazzat.com"
                      className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      hello@lazzat.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block font-sans text-sm text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      aria-label="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-background border border-primary/30 rounded px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                      tabIndex={0}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block font-sans text-sm text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      aria-label="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-background border border-primary/30 rounded px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                      tabIndex={0}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-phone" className="block font-sans text-sm text-foreground mb-2">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      aria-label="Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-background border border-primary/30 rounded px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="+1 (555) 000-0000"
                      tabIndex={0}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block font-sans text-sm text-foreground mb-2">
                      Subject *
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      aria-required="true"
                      aria-label="Subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full bg-background border border-primary/30 rounded px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                      tabIndex={0}
                    >
                      <option value="feedback">General Feedback</option>
                      <option value="catering">Catering Inquiry</option>
                      <option value="franchise">Franchise Interest</option>
                      <option value="careers">Careers</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-sans text-sm text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    aria-required="true"
                    aria-label="Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-background border border-primary/30 rounded px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="How can we help you?"
                    tabIndex={0}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60"
                  disabled={loading}
                  aria-busy={loading}
                  aria-label="Send Message"
                  tabIndex={0}
                >
                  {loading && (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  )}
                  <Send size={18} />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Locations List (simple) */}
      <section className="pt-0 pb-12 md:pt-0 md:pb-16 bg-background">
        <LocationsList />
      </section>

      {/* View Menu Section */}
      <section className="py-10 bg-card text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Ready to Explore Our Menu?</h2>
        <p className="text-muted-foreground mb-6">Discover our full range of grills, desserts, shakes, and more.</p>
        <a
          href="/menu"
          className="btn-gold inline-block w-full max-w-xs mx-auto px-6 py-3 text-base md:text-lg font-semibold rounded-full shadow hover:scale-105 transition-transform"
          style={{ minWidth: '0' }}
        >
          View Menu
        </a>
      </section>
    </Layout>
  );
};

export default Contact;
