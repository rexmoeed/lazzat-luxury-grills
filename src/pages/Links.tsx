import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { MapPin, Navigation, ShoppingBag, Truck } from "lucide-react";
import { FaFacebookF, FaInstagram, FaPinterestP, FaTiktok } from "react-icons/fa";
import ubereats from "@/assets/ubereats.png";
import doordash from "@/assets/doordash.png";
import toasttab from "@/assets/toasttab.png";
import trans1 from "@/assets/trans-1.jpeg";
import trans2 from "@/assets/trans-2.jpeg";
import trans3 from "@/assets/trans-3.jpeg";
import trans4 from "@/assets/trans-4.jpeg";
import { branchLocations } from "@/lib/locations-data";
import { getMapsLink } from "@/lib/location-utils";

export default function LinksPage() {
  const TOASTTAB_URL = "https://order.toasttab.com/online/lazzat-mcvean?";
  const UBEREATS_URL = "https://www.ubereats.com/store-browse-uuid/48026b70-6654-5abe-9229-eb555f43b989?diningMode=DELIVERY";
  const DOORDASH_URL = "https://www.doordash.com/store/lazzat-grill-&-shakes-brampton-41884743/109121149/";
  const primaryLocationAddress = branchLocations[0]?.address ?? "Lazzat Grill and Shakes 43/49 - 11685 Mcvean Dr Brampton ON L6P 4N5";
  const primaryLocationMapsLink = getMapsLink(primaryLocationAddress);
  const primaryLocationEmbedLink = `https://www.google.com/maps?q=${encodeURIComponent(primaryLocationAddress)}&output=embed`;

  const transitions = [trans1, trans2, trans3, trans4];
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/lazzat.ca/",
      Icon: FaInstagram,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/lazzat.ca/",
      Icon: FaFacebookF,
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@lazzat.ca",
      Icon: FaTiktok,
    },
    {
      label: "Pinterest",
      href: "https://ca.pinterest.com/lazzatcanada/",
      Icon: FaPinterestP,
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % transitions.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [transitions.length]);

  return (
    <>
      <Helmet>
        <title>Links | Lazzat</title>
        <meta name="description" content="Quick access links for Lazzat." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://lazzat.ca/links" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
        <section className="relative isolate w-[min(96vw,620px)] aspect-[9/16] rounded-2xl border border-primary/30 shadow-2xl overflow-hidden text-center">
          <div className="absolute inset-0 z-0 pointer-events-none">
            {transitions.map((image, index) => (
              <img
                key={image}
                src={image}
                alt="Lazzat experience"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div
              className="absolute inset-0 transition-colors duration-300"
              style={{ backgroundColor: `rgba(0, 0, 0, ${0.35 + scrollProgress * 0.43})` }}
            />
          </div>

          <div
            onScroll={(e) => {
              const target = e.currentTarget;
              const maxScroll = target.scrollHeight - target.clientHeight;
              setScrollProgress(maxScroll > 0 ? target.scrollTop / maxScroll : 0);
            }}
            className="absolute inset-0 z-10 overflow-y-auto overscroll-contain scrollbar-hide"
          >
            <div
              className="min-h-[120%] flex flex-col items-center justify-center px-6 md:px-8 py-10 transition-transform duration-200"
              style={{ transform: `translateY(-${58 + scrollProgress * 28}px)` }}
            >
              <div className="gold-divider w-14 mx-auto mb-5" />
              <img
                src="/Lazzat logo 02.png"
                alt="Lazzat Grill & Shakes"
                className="h-20 md:h-24 w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)] mb-4"
              />
              <h1 className="font-serif text-3xl text-primary mb-2 text-center inline-block rounded-xl border border-primary/35 bg-black/35 backdrop-blur-sm px-5 py-2.5">
                Lazzat Grill & Shakes in Brampton
              </h1>
              <p className="text-sm text-white/85 mb-6 text-center">Follow us and stay connected</p>

              <div className="flex items-center justify-center gap-3 flex-nowrap overflow-x-auto pb-2 scrollbar-hide">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group w-12 h-12 rounded-full border border-primary/35 bg-black/35 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all shrink-0"
                  >
                    <Icon size={17} className="text-primary" />
                  </a>
                ))}
              </div>

              <a
                href="https://share.google/gYfPEChSjyrDaxPIm"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full max-w-sm rounded-xl border border-primary/35 bg-black/35 backdrop-blur-sm px-5 py-4 text-center hover:bg-primary/20 hover:border-primary transition-all"
                aria-label="Write a review on Google"
              >
                <p className="text-primary font-semibold">Write a Review</p>
                <p className="text-white/80 text-xs mt-1">Share your experience on Google</p>
              </a>

              <div className="mt-4 w-full max-w-sm space-y-3">
                <div className="w-full rounded-xl border border-primary/35 bg-black/35 backdrop-blur-sm px-4 py-3 hover:bg-primary/20 hover:border-primary transition-all">
                  <div className="flex items-center justify-center gap-2.5 mb-2">
                    <ShoppingBag size={16} className="text-primary" />
                    <span className="text-primary font-semibold text-sm">Online Order & Pickup</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <a
                      href={TOASTTAB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Order pickup on ToastTab"
                      className="w-11 h-11 rounded-full border border-primary/35 bg-black/35 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all"
                    >
                      <img src={toasttab} alt="ToastTab" className="w-6 h-6 object-contain" />
                    </a>
                  </div>
                </div>

                <div className="w-full rounded-xl border border-primary/35 bg-black/35 backdrop-blur-sm px-4 py-3 hover:bg-primary/20 hover:border-primary transition-all">
                  <div className="flex items-center justify-center gap-2.5 mb-2">
                    <Truck size={16} className="text-primary" />
                    <span className="text-primary font-semibold text-sm">Online Order & Delivery</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={UBEREATS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Order on Uber Eats"
                      className="w-11 h-11 rounded-full border border-primary/35 bg-black/35 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all"
                    >
                      <img src={ubereats} alt="Uber Eats" className="w-6 h-6 object-contain" />
                    </a>
                    <a
                      href={DOORDASH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Order on DoorDash"
                      className="w-11 h-11 rounded-full border border-primary/35 bg-black/35 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all"
                    >
                      <img src={doordash} alt="DoorDash" className="w-6 h-6 object-contain" />
                    </a>
                  </div>
                </div>

                <Link
                  to="/"
                  className="w-full rounded-xl border border-primary/35 bg-black/35 backdrop-blur-sm px-5 py-3.5 flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all"
                  aria-label="Visit Lazzat.ca"
                >
                  <span className="text-primary font-semibold text-sm">Visit Lazzat.ca</span>
                </Link>

                <Link
                  to="/menu"
                  className="w-full rounded-xl border border-primary/35 bg-black/35 backdrop-blur-sm px-5 py-3.5 flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all"
                  aria-label="Explore the menu"
                >
                  <span className="text-primary font-semibold text-sm">Explore the Menu</span>
                </Link>

                <div className="w-full rounded-xl border border-primary/35 bg-black/35 backdrop-blur-sm px-4 py-4 transition-all">
                  <div className="flex items-start gap-2.5 justify-center text-left">
                    <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-white/85 text-xs leading-relaxed">{primaryLocationAddress}</p>
                  </div>
                  <div className="mt-3 rounded-lg overflow-hidden border border-primary/30 bg-black/25">
                    <iframe
                      title="Lazzat location map"
                      src={primaryLocationEmbedLink}
                      className="w-full h-28"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <a
                    href={primaryLocationMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full rounded-lg border border-primary/35 bg-black/35 backdrop-blur-sm px-4 py-2.5 flex items-center justify-center gap-2 hover:bg-primary/20 hover:border-primary transition-all"
                    aria-label="Open Lazzat location in maps"
                  >
                    <Navigation size={15} className="text-primary" />
                    <span className="text-primary font-semibold text-xs">Get Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
