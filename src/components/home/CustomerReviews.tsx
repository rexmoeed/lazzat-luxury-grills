import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  {
    id: 1,
    name: "Sarah Ahmed",
    rating: 5,
    text: "The best BBQ I've had outside of Pakistan. The flavors are authentic, the ambiance is luxurious, and the service is impeccable.",
  },
  {
    id: 2,
    name: "James Wilson",
    rating: 5,
    text: "Lazzat has redefined what fast-casual dining can be. Premium quality without the pretentious wait times.",
  },
  {
    id: 3,
    name: "Fatima Khan",
    rating: 5,
    text: "The signature sauces are incredible! I love that you can customize the heat level. Level 7 is my sweet spot.",
  },
  {
    id: 4,
    name: "Michael Chen",
    rating: 5,
    text: "From the décor to the food presentation, everything screams luxury. And the biryani? Absolutely divine.",
  },
];

export const CustomerReviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="gold-divider w-16 mx-auto mb-5" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
            What Our <span className="text-primary">Guests</span> Say
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">Premium hospitality, verified by our diners.</p>
        </div>

        {/* Review Carousel */}
        <div
          className="relative rounded-2xl border border-foreground/5 bg-background/40 backdrop-blur-sm shadow-[0_14px_45px_-28px_rgba(0,0,0,0.6)] px-5 md:px-8 py-8"
        >
          {/* Quote Icon */}
          <Quote className="w-10 h-10 text-primary/40 mx-auto mb-6" />

          {/* Review */}
          <div className="text-center relative min-h-[220px]">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={cn(
                  "transition-all duration-500 ease-out", 
                  index === currentReview
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none absolute inset-0"
                )}
              >
                {/* Stars and meta */}
                <div className="flex items-center justify-center gap-1.5 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4.5 h-4.5 text-primary fill-primary"
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">5.0 · Verified Guests</span>
                </div>

                {/* Text */}
                <p className="font-serif text-lg md:text-xl text-foreground leading-relaxed mb-6">
                  {review.text}
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-3 text-sm uppercase tracking-[0.15em] text-primary">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[12px] text-primary font-semibold">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span>{review.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={prevReview}
              className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/70 hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentReview
                      ? "w-6 bg-primary"
                      : "bg-foreground/30 hover:bg-foreground/50"
                  )}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/70 hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
