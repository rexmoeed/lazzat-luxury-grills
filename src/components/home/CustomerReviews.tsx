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
    }, 5000);
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
        <div className="text-center mb-12">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            What Our <span className="text-primary">Guests</span> Say
          </h2>
        </div>

        {/* Review Carousel */}
        <div className="relative">
          {/* Quote Icon */}
          <Quote className="w-12 h-12 text-primary/30 mx-auto mb-8" />

          {/* Review */}
          <div className="text-center">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={cn(
                  "transition-all duration-500",
                  index === currentReview
                    ? "opacity-100"
                    : "opacity-0 absolute inset-0"
                )}
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-primary fill-primary"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="font-serif text-xl md:text-2xl text-foreground/90 italic mb-8 leading-relaxed">
                  "{review.text}"
                </p>

                {/* Author */}
                <p className="font-sans text-sm text-primary uppercase tracking-widest">
                  {review.name}
                </p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prevReview}
              className="w-10 h-10 rounded-full border border-foreground/30 flex items-center justify-center text-foreground/70 hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
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
              className="w-10 h-10 rounded-full border border-foreground/30 flex items-center justify-center text-foreground/70 hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
