import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import heroRestaurant from "@/assets/hero-restaurant.jpg";
import heroGrill from "@/assets/hero-grill.jpg";
// Example local video imports (adjust paths to your files)
import heroRestaurantVidMp4 from "@/assets/hero-restaurant.mp4";
import heroGrillVidMp4 from "@/assets/hero-grill.mp4";

const slides = [
  {
    // keep image as poster/fallback
    image: heroRestaurant,
    video: heroRestaurantVidMp4,
    poster: heroRestaurant, // optional poster image
    headline: "The Everything in One Place Grill",
    subhead: "Premium global grills crafted fresh daily.",
  },
  {
    image: heroGrill,
    video: heroGrillVidMp4,
    poster: heroGrill,
    headline: "Where every Bite is a Masterpiece",
    subhead: "Every dish tells a story of passion and flame.",
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const videoRefs = useRef([]); // holds refs for video elements

  // autoplay interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // ensure only current video's playing
  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === currentSlide) {
        // try to play; browsers allow play if muted/playsinline
        const playPromise = v.play?.();
        if (playPromise && playPromise.catch) {
          playPromise.catch(() => {
            /* ignore; some browsers block autoplay if not muted (we set muted) */
          });
        }
      } else {
        v.pause?.();
        // reset time to 0 if you want it to restart when it becomes active
        // v.currentTime = 0;
      }
    });
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-out",
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          aria-hidden={index !== currentSlide}
        >
          {/* If slide has a video, render video element; otherwise use background image */}
          {slide.video ? (
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="absolute inset-0 w-full h-full object-cover"
              src={slide.video}
              poster={slide.poster}
              loop
              muted
              playsInline
              preload="metadata"
              // autoplay is implied by play() in effect, but include attribute too
              autoPlay
              aria-label={slide.headline}
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label={slide.headline}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
              <div className="absolute inset-0 bg-background/30" />
            </div>
          )}

          {/* Overlay gradients (works for both video & image) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
            <div className="absolute inset-0 bg-background/30" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="w-16 h-0.5 bg-primary mx-auto mb-8 animate-fade-up" />

          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            {slides[currentSlide].headline}
          </h1>

          <p
            className="font-sans text-lg md:text-xl text-foreground/80 mb-10 tracking-wide animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            {slides[currentSlide].subhead}
          </p>

          <div
  className="flex flex-row items-center justify-center gap-4 animate-fade-up"
  style={{ animationDelay: "600ms" }}
>
  <Link
    to="/order"
    className="btn-gold pulse-gold w-full sm:w-auto text-center"
  >
    Order Now
  </Link>

  <Link
    to="/menu"
    className="btn-outline-white pulse-gold w-full sm:w-auto text-center"
    style={{ animationDelay: "1.2s" }}
  >
    Explore Menu
  </Link>
</div>

        </div>
      </div>

      {/* Navigation Arrows - Desktop */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-foreground/30 text-foreground/70 hover:border-primary hover:text-primary transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-foreground/30 text-foreground/70 hover:border-primary hover:text-primary transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 800);
              }
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-500",
              index === currentSlide ? "w-8 bg-primary" : "bg-foreground/40 hover:bg-foreground/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-foreground/50 animate-bounce">
        <span className="text-xs font-sans tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>
    </section>
  );
};
