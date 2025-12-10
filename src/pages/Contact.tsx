import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "feedback",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <section className="section-padding bg-card">
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
                    <p className="font-sans text-sm text-muted-foreground">
                      143 Clarence St Unit #10
                      <br />
                      Brampton, ON L6W 1T2, Canada
                    </p>
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

              {/* Franchise CTA */}
              <div className="p-6 border border-primary/30 rounded-lg bg-background">
                <h4 className="font-serif text-xl text-foreground mb-3">
                  Franchise Opportunities
                </h4>
                <p className="font-sans text-sm text-muted-foreground mb-4">
                  Interested in bringing Lazzat to your city? We're expanding and looking for passionate partners.
                </p>
                <a
                  href="mailto:franchise@lazzat.com"
                  className="text-sm font-sans text-primary hover:underline"
                >
                  franchise@lazzat.com
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-background border border-primary/30 rounded px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-background border border-primary/30 rounded px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-background border border-primary/30 rounded px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full bg-background border border-primary/30 rounded px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
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
                  <label className="block font-sans text-sm text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-background border border-primary/30 rounded px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
