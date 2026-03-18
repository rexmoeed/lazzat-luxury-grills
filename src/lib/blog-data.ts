export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Charcoal Grilling: Unlocking Authentic Flavors",
    excerpt: "Discover how charcoal grilling transforms simple ingredients into extraordinary dishes with deep, smoky flavors.",
    content: "Charcoal grilling is more than just cooking—it's an art form that has been perfected over centuries. At Lazzat, we believe that the heat from natural charcoal brings out flavors that simply cannot be replicated with other cooking methods.\n\nThe process begins with selecting the right charcoal. We use premium hardwood charcoal that burns hot and clean, allowing us to control the temperature precisely. This gives our chefs the ability to cook each dish to perfection.\n\nFrom our signature BBQ skewers to perfectly grilled proteins, every item is treated with care and expertise. The charcoal imparts a subtle smokiness that complements our signature spice blends beautifully.\n\nWhen you taste that distinctive char and smoke in every bite, you're experiencing centuries of culinary tradition meeting modern technique.",
    author: "Chef Hassan",
    date: "March 15, 2026",
    category: "Cooking Techniques",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561e1d?w=800&h=500&fit=crop",
  },
  {
    id: "2",
    title: "From Spice Routes to Your Plate: Our Global Flavors",
    excerpt: "Explore how ancient spice routes inspire Lazzat's menu and bring the world to Brampton.",
    content: "The spice routes that once connected continents weren't just about commerce—they were about cultural exchange and culinary innovation. At Lazzat, we celebrate that same spirit of global exploration.\n\nOur menu is a tribute to the rich culinary traditions of South Asia, the Mediterranean, and beyond. Each sauce, each spice blend, and each cooking technique tells a story of generations of chefs perfecting their craft.\n\nTake our signature Peri Peri sauce, for example. It's inspired by the vibrant spice markets of Morocco and Portugal, but executed with a modern Canadian sensibility. The result is a perfect balance of heat, flavor, and sophistication.\n\nEvery dish at Lazzat carries this philosophy: respect tradition, embrace quality, and deliver something truly special.",
    author: "Chef Amara",
    date: "March 10, 2026",
    category: "Culinary Culture",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1596040227000-c02d9c5f48fa?w=800&h=500&fit=crop",
  },
  {
    id: "3",
    title: "Why Fresh Ingredients Matter: Our Sourcing Philosophy",
    excerpt: "Learn about Lazzat's commitment to freshness and quality, from farm to table.",
    content: "There's a fundamental difference between food that's prepared fresh and food that's been sitting around. At Lazzat, we believe freshness is non-negotiable.\n\nWe work directly with local suppliers and farmers to ensure that every ingredient meets our high standards. Our produce is selected daily, our proteins are sourced from trusted suppliers, and our sauces are prepared fresh throughout the day.\n\nThis commitment to freshness isn't just about taste—it's about nutrition, health, and respecting both our customers and our ingredients. When you order from Lazzat, you're getting food that was prepared with care, using ingredients that were carefully selected.\n\nOur open kitchen concept reinforces this commitment. You can see our chefs preparing your meal fresh, with quality ingredients, right in front of you.",
    author: "Chef Ravi",
    date: "March 5, 2026",
    category: "Sustainability",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop",
  },
  {
    id: "4",
    title: "Health Meets Flavor: The Lazzat Balance",
    excerpt: "Discover how you don't have to compromise between healthy eating and delicious food.",
    content: "One of the most common questions we get is: 'How can food that tastes this good be healthy?'\n\nThe answer is simple: with the right techniques and ingredients. At Lazzat, we've mastered the balance between indulgence and nutrition.\n\nOur grilling method uses minimal oil while maximizing flavor. Our proteins are lean and high-quality. Our side salads are fresh and vibrant. And our spices are naturally packed with nutrients and antioxidants.\n\nYou don't have to choose between tasting great and feeling great. That's the Lazzat promise.\n\nWhether you're looking for a quick protein-packed meal or a full dining experience, our menu is designed to satisfy both your taste buds and your wellness goals.",
    author: "Chef Sara",
    date: "February 28, 2026",
    category: "Health & Wellness",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop",
  },
  {
    id: "5",
    title: "Behind the Counter: A Day in Lazzat's Kitchen",
    excerpt: "Get an exclusive look at the fast-paced, passionate world of Lazzat's kitchen team.",
    content: "It's 10 AM on a Wednesday, and the Lazzat kitchen is already buzzing with activity. Our head chef is reviewing the day's fresh ingredient deliveries, our prep team is organized and ready, and the charcoal grills are warming up.\n\nBy lunch, orders flow in and our team moves with synchronized precision. Every plate that leaves the kitchen reflects hours of training, careful planning, and an obsession with quality.\n\nOur chefs come from diverse backgrounds, bringing unique perspectives and techniques to our kitchen. This diversity is our strength, allowing us to create dishes that are both authentic and innovative.\n\nWhat makes Lazzat's kitchen special isn't just the equipment or the recipes—it's the people. Our team believes in what they're doing, and that passion shines through in every meal.",
    author: "Chef Mohammad",
    date: "February 20, 2026",
    category: "Stories",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=500&fit=crop",
  },
];
