// --- Begin 3-step order form (from Catering.tsx, genericized) ---
import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useLocation } from "react-router-dom";
import { branchLocations } from "@/lib/locations-data";
import { menuItemsFlat } from "@/lib/menu-data";
import { desserts } from "@/lib/desserts-data";
import { sauces } from "@/lib/sauces-data";
import type { MenuItem } from "@/lib/menu-types";
import { toast } from "sonner";
// import { useLocation } from "react-router-dom";

interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  selectedItems: string[];
  instructions: string;
}

interface SelectableOrderItem {
  key: string;
  name: string;
  category: string;
  price?: number;
  image?: string;
  description?: string;
  source: "menu" | "sauce";
}

type MenuApiResponse = {
  ok?: boolean;
  data?: unknown;
  count?: unknown;
};

const isMenuItemArray = (value: unknown): value is MenuItem[] => {
  if (!Array.isArray(value)) return false;
  return value.every((item) => {
    if (!item || typeof item !== "object") return false;
    const candidate = item as Partial<MenuItem>;
    return (
      typeof candidate.id === "number" &&
      typeof candidate.name === "string" &&
      typeof candidate.category === "string" &&
      typeof candidate.description === "string" &&
      typeof candidate.image === "string" &&
      Array.isArray(candidate.saucePairings) &&
      Array.isArray(candidate.customizations)
    );
  });
};


// --- Customization Types ---
type ItemCustomization = {
  [itemKey: string]: {
    [customKey: string]: string | number | boolean;
  };
};

type BuildYourOwnForm = {
  type: 'shake' | 'fruit';
  base: string;
  flavors: string[];
  addIns: string[];
  notes: string;
};

export default function Order() {
    // Per-item customizations
    const [customizations, setCustomizations] = useState<ItemCustomization>({});
    // Build Your Own Shake/Fruit Blend
    const [showBuildYourOwn, setShowBuildYourOwn] = useState<null | 'shake' | 'fruit'>(null);
    const [buildYourOwnForm, setBuildYourOwnForm] = useState<BuildYourOwnForm>({
      type: 'shake',
      base: '',
      flavors: [],
      addIns: [],
      notes: '',
    });
    // List of custom shakes/fruits added
    const [customBuilds, setCustomBuilds] = useState<BuildYourOwnForm[]>([]);
  const location = useLocation();
  const [runtimeMenuItems, setRuntimeMenuItems] = useState<MenuItem[] | null>(null);
  const effectiveMenuItems = useMemo(() => runtimeMenuItems ?? menuItemsFlat, [runtimeMenuItems]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    email: "",
    phone: "",
    selectedItems: [],
    instructions: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Find the pre-selected menu item (if any)
  const selectedMenuItemObj = useMemo(() => {
    if (formData.selectedItems.length > 0) {
      const key = formData.selectedItems[0];
      if (key.startsWith("menu-")) {
        const id = Number(key.replace("menu-", ""));
        return effectiveMenuItems.find((item) => item.id === id);
      }
    }
    return null;
  }, [formData.selectedItems, effectiveMenuItems]);

  // --- Drinks toggle state ---
  const [drinkType, setDrinkType] = useState<'milkshake' | 'fruit blend'>('milkshake');

  // Get drinks by type (use subCategory for correct filtering)
  const milkshakes = useMemo(
    () =>
      effectiveMenuItems.filter(
        (item) =>
          item.category.toLowerCase().includes('shake') &&
          (item.subCategory?.toLowerCase().includes('signature shake') ||
            item.subCategory?.toLowerCase().includes('milkshake'))
      ),
    [effectiveMenuItems]
  );
  const fruitBlends = useMemo(
    () =>
      effectiveMenuItems.filter(
        (item) =>
          item.category.toLowerCase().includes('shake') &&
          (item.subCategory?.toLowerCase().includes('fruit blend') ||
            item.subCategory?.toLowerCase().includes('juice'))
      ),
    [effectiveMenuItems]
  );

  // Selected drink objects
  const selectedDrinkObjs = useMemo(() => {
    return formData.selectedItems
      .filter(key => key.startsWith('menu-'))
      .map(key => {
        const id = Number(key.replace('menu-', ''));
        return effectiveMenuItems.find(item => item.id === id);
      })
      .filter(Boolean)
      .filter(item => item && (item.category.toLowerCase().includes('milkshake') || item.category.toLowerCase().includes('fruit blend') || item.category.toLowerCase().includes('juice')));
  }, [formData.selectedItems, effectiveMenuItems]);

  // Pre-select menu item if passed in query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const itemKey = params.get("item");
    if (itemKey && !formData.selectedItems.includes(itemKey)) {
      setFormData((prev) => ({
        ...prev,
        selectedItems: [itemKey],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    const controller = new AbortController();

    const loadMenuFromApi = async () => {
      try {
        const response = await fetch("/api/menu", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as MenuApiResponse;
        if (!isMenuItemArray(payload.data)) {
          return;
        }

        setRuntimeMenuItems(payload.data);
      } catch {
        // Keep local bundled data when API fetch fails.
      }
    };

    void loadMenuFromApi();

    return () => {
      controller.abort();
    };
  }, []);

  const getSauceKey = (name: string) => `sauce-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const categorizedSelectionItems = useMemo(() => {
    const grouped: Record<string, SelectableOrderItem[]> = {};

    effectiveMenuItems.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }

      grouped[item.category].push({
        key: `menu-${item.id}`,
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
        description: item.description,
        source: "menu",
      });
    });

    // Add Build Your Own as a pseudo-menu item in Shakes & Juices
    if (!grouped["Shakes & Juices"]) grouped["Shakes & Juices"] = [];
    grouped["Shakes & Juices"].push({
      key: "build-your-own-shake",
      name: "Build Your Own Shake or Fruit Blend",
      category: "Shakes & Juices",
      price: 7.99,
      image: undefined,
      description: "Customize your own shake or fruit blend!",
      source: "menu",
    });

    grouped.Sauces = sauces.map((sauce) => ({
      key: getSauceKey(sauce.name),
      name: sauce.name,
      category: "Sauces",
      image: sauce.image,
      description: sauce.description,
      source: "sauce",
    }));

    return grouped;
  }, [effectiveMenuItems]);



  // Validation for Step 1
  const isStep1Valid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?1?\s?(?:\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
    
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid Canadian phone number");
      return false;
    }
    return true;
  };

  // Validation for Step 2 (no date/time/guests dependency)
  const isStep2Valid = () => {
    if (formData.selectedItems.length === 0) {
      toast.error("Please select at least one menu item");
      return false;
    }
    return true;
  };

  // Validation for Step 3 (no pickup location dependency)
  const isStep3Valid = () => {
    if (formData.selectedItems.length === 0) {
      toast.error("Please select at least one menu item");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && isStep1Valid()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Valid()) {
      setCurrentStep(3);
    } else if (currentStep === 3 && isStep3Valid()) {
      setCurrentStep(4);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!isStep3Valid()) return;

    // Log the order request
    console.log("Order Request Submitted:", formData);
    // Get selected items details
    const selectedMenuItems = effectiveMenuItems.filter((item) =>
      formData.selectedItems.includes(`menu-${item.id}`)
    );
    const selectedSauces = sauces.filter((sauce) =>
      formData.selectedItems.includes(getSauceKey(sauce.name))
    );
    // Removed pickup location
    console.log("Selected Menu Items:", selectedMenuItems);
    console.log("Selected Sauces:", selectedSauces);
    toast.success(
      `Order request submitted! We'll contact you at ${formData.email} to confirm.`
    );
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      selectedItems: [],
      instructions: "",
    });
    setCurrentStep(1);
  };

  const toggleMenuItem = (itemKey: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(itemKey)
        ? prev.selectedItems.filter((id) => id !== itemKey)
        : [...prev.selectedItems, itemKey],
    }));
  };

  // --- UI remains unchanged below ---
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-28 pb-8 md:pt-44 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="text-center">
            <div className="gold-divider w-16 mx-auto mb-4 md:mb-6" />
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 md:mb-4">
              Place Your <span className="text-primary">Order</span>
            </h1>
            <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Enjoy Lazzat at home, work, or your next event. Select your items and details below.
            </p>
          </div>
        </div>
      </section>
      {/* Form Section */}
      <section className="py-8 md:py-16 bg-card">
        <div className="container-luxury px-3 sm:px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Form - Equal width */}
          <div className="flex flex-col">
          {/* Form Card */}
          <Card className="bg-background border-primary/20 p-4 sm:p-6 md:p-8 flex flex-col flex-1">
            {/* STEP 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">
                    Your Contact Information
                  </h2>
                </div>
                <div>
                  <Label htmlFor="name" className="text-foreground font-semibold mb-2 block">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="bg-card border-primary/20 text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground font-semibold mb-2 block">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="bg-card border-primary/20 text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground font-semibold mb-2 block">
                    Canadian Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (123) 456-7890"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="bg-card border-primary/20 text-foreground"
                  />
                </div>
              </div>
            )}
            {/* STEP 2: Order Details */}
            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">
                    Add-ons & Customization
                  </h2>
                </div>
                {/* Salads Add-on (from menu) */}
                <div>
                  <Label className="text-foreground font-semibold mb-2 block">
                    Add Salads (optional)
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {effectiveMenuItems.filter(item => item.category.toLowerCase().includes("salad")).map((item) => {
                      const key = `menu-${item.id}`;
                      const selected = formData.selectedItems.includes(key);
                      return (
                        <Button
                          key={item.id}
                          type="button"
                          variant={selected ? "default" : "outline"}
                          className="border-primary/30 flex items-center gap-2"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              selectedItems: selected
                                ? prev.selectedItems.filter((i) => i !== key)
                                : [...prev.selectedItems, key],
                            }));
                          }}
                        >
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover border border-primary/20" />
                          )}
                          {item.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                {/* Sauces Add-on */}
                <div>
                  <Label className="text-foreground font-semibold mb-2 block">
                    Add Sauces (optional)
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {sauces.map((sauce) => (
                      <Button
                        key={sauce.name}
                        type="button"
                        variant={formData.selectedItems.includes(`sauce-${sauce.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`) ? "default" : "outline"}
                        className="border-primary/30"
                        onClick={() => {
                          const key = `sauce-${sauce.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                          setFormData((prev) => ({
                            ...prev,
                            selectedItems: prev.selectedItems.includes(key)
                              ? prev.selectedItems.filter((i) => i !== key)
                              : [...prev.selectedItems, key],
                          }));
                        }}
                      >
                        {sauce.name}
                      </Button>
                    ))}
                  </div>
                </div>
                {/* Drinks Add-on (toggle between Milkshakes and Fruit Blends) */}
                <div>
                  <Label className="text-foreground font-semibold mb-2 block">
                    Add Drinks (optional)
                  </Label>
                  <div className="flex gap-2 mb-3">
                    <Button
                      type="button"
                      variant={drinkType === 'milkshake' ? 'default' : 'outline'}
                      className="border-primary/30 px-4"
                      onClick={() => setDrinkType('milkshake')}
                    >
                      Milkshakes
                    </Button>
                    <Button
                      type="button"
                      variant={drinkType === 'fruit blend' ? 'default' : 'outline'}
                      className="border-primary/30 px-4"
                      onClick={() => setDrinkType('fruit blend')}
                    >
                      Fruit Blends
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(drinkType === 'milkshake' ? milkshakes : fruitBlends).map((item) => {
                      const key = `menu-${item.id}`;
                      const selected = formData.selectedItems.includes(key);
                      return (
                        <Button
                          key={item.id}
                          type="button"
                          variant={selected ? "default" : "outline"}
                          className="border-primary/30 flex items-center gap-2"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              selectedItems: selected
                                ? prev.selectedItems.filter((i) => i !== key)
                                : [...prev.selectedItems, key],
                            }));
                          }}
                        >
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover border border-primary/20" />
                          )}
                          {item.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {/* STEP 3: More Items */}
            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">
                    More Items
                  </h2>
                </div>
                {/* Menu Items Selection */}
                <div>
                  <Label className="text-foreground font-semibold mb-3 block">
                    Menu Items *
                  </Label>
                  {/* Category Tabs */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3">
                    {Object.keys(categorizedSelectionItems)
                      .filter(cat => !["Biryani", "Sajji", "Doner", "Döner", "Wraps"].includes(cat))
                      .map((cat) => {
                        const isActive = selectedCategory === cat;
                        const selCount = categorizedSelectionItems[cat].filter((i) =>
                          formData.selectedItems.includes(i.key)
                        ).length;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(isActive ? null : cat)}
                            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold border transition-all duration-200 ${
                              isActive
                                ? "bg-primary text-background border-primary"
                                : "bg-card border-primary/30 text-muted-foreground hover:border-primary/70 hover:text-foreground"
                            }`}
                          >
                            {cat}
                            {selCount > 0 && (
                              <span className={`ml-1 text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded-full ${isActive ? "bg-background/30 text-background" : "bg-primary/20 text-primary"}`}>
                                {selCount}
                              </span>
                            )}
                          </button>
                        );
                      })}
                  </div>
                  {/* Items Grid */}
                  <div className="max-h-[22rem] sm:max-h-[26rem] overflow-y-auto pr-1 sm:pr-2 mb-4 sm:mb-6 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
                    {Object.entries(categorizedSelectionItems)
                      .filter(([category]) =>
                        (selectedCategory === null || category === selectedCategory) &&
                        !["Biryani", "Sajji", "Doner", "Döner", "Wraps"].includes(category)
                      )
                      .map(([category, items]) => (
                        <div key={category}>
                          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-primary mb-2 sm:mb-3 border-b border-primary/20 pb-2">
                            {category}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {items.map((item) => {
                              const isChecked = formData.selectedItems.includes(item.key);
                              return (
                                <button
                                  type="button"
                                  key={item.key}
                                  className={`w-full rounded-2xl border transition-all duration-300 flex flex-col items-center justify-between shadow-md focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 bg-card p-0 ${{
                                    true: "border-primary/60 shadow-[0_0_20px_hsl(43_56%_52%_/_0.15)]",
                                    false: "border-primary/20 hover:border-primary/50",
                                  }[String(isChecked) as "true" | "false"]}`}
                                  onClick={() => toggleMenuItem(item.key)}
                                >
                                  <div className="flex flex-col items-center gap-2 w-full p-3 pb-0">
                                    {item.image ? (
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-primary/20 flex-shrink-0 mb-1"
                                      />
                                    ) : (
                                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-muted border border-primary/20 flex-shrink-0 mb-1" />
                                    )}
                                    <div className="flex flex-col items-center w-full">
                                      <p className="font-semibold text-foreground leading-tight text-center text-base sm:text-lg">{item.name}</p>
                                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 text-center">
                                        {item.description || item.category}
                                      </p>
                                      <p className="text-xs text-primary/90 mt-1 font-medium text-center">
                                        {item.category}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-full px-3 pb-3 pt-2">
                                    <button
                                      type="button"
                                      className="hide-mobile-select-btn w-full bg-primary text-primary-foreground font-semibold rounded-xl py-2 text-base shadow hover:bg-primary/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2"
                                      onClick={e => {
                                        e.stopPropagation();
                                        toggleMenuItem(item.key);
                                      }}
                                    >
                                      {isChecked ? "Selected" : "Select"}
                                    </button>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                  </div>
                  <p className="text-sm text-primary font-semibold">
                    Selected: {formData.selectedItems.length} item(s)
                  </p>
                </div>
                {/* Instructions */}
                <div>
                  <Label
                    htmlFor="instructions"
                    className="text-foreground font-semibold mb-2 block"
                  >
                    Special Instructions (Optional)
                  </Label>
                  <Textarea
                    id="instructions"
                    placeholder="Any dietary preferences, allergies, or special requests..."
                    value={formData.instructions}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        instructions: e.target.value,
                      }))
                    }
                    className="bg-card border-primary/20 text-foreground min-h-24 resize-none"
                  />
                </div>
                {/* Removed Pickup Location UI */}
              </div>
            )}
            {/* STEP 4: Order Summary / Receipt */}
            {currentStep === 4 && (() => {
              const selectedMenuItems = effectiveMenuItems.filter((item) =>
                formData.selectedItems.includes(`menu-${item.id}`)
              );
              const selectedSauces = sauces.filter((sauce) =>
                formData.selectedItems.includes(getSauceKey(sauce.name))
              );
              // Removed pickup location summary
              return (
                <div className="space-y-4 sm:space-y-5 animate-fade-in">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-1">
                      Order Summary
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Review your order before submitting
                    </p>
                  </div>
                  {/* Receipt Card */}
                  <div className="border border-primary/30 rounded-lg overflow-hidden bg-card max-h-[20rem] sm:max-h-[26rem] md:max-h-[30rem] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
                    {/* Receipt Header */}
                    <div className="bg-primary/10 border-b border-primary/30 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between sticky top-0 z-10">
                      <span className="font-serif text-primary font-semibold text-sm sm:text-base">Lazzat Order</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                        {new Date().toLocaleDateString("en-CA")}
                      </span>
                    </div>
                    {/* Contact */}
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-primary/10">
                      <p className="text-[10px] uppercase tracking-widest text-primary/70 font-semibold mb-2">Contact</p>
                      <div className="space-y-1">
                        <div className="flex justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="text-muted-foreground flex-shrink-0">Name</span>
                          <span className="text-foreground font-medium text-right">{formData.name}</span>
                        </div>
                        <div className="flex justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="text-muted-foreground flex-shrink-0">Email</span>
                          <span className="text-foreground font-medium text-right break-all">{formData.email}</span>
                        </div>
                        <div className="flex justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="text-muted-foreground flex-shrink-0">Phone</span>
                          <span className="text-foreground font-medium text-right">{formData.phone}</span>
                        </div>
                      </div>
                    </div>
                    {/* Removed event details (date, time, guests) */}
                    {/* Selected Items */}
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-primary/10">
                      <p className="text-[10px] uppercase tracking-widest text-primary/70 font-semibold mb-2 sm:mb-3">
                          Selected Items ({formData.selectedItems.length})
                        </p>
                      <div className="space-y-2">
                        {selectedMenuItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-2 sm:gap-3">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover border border-primary/20 flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm text-foreground font-medium leading-tight">{item.name}</p>
                              <p className="text-[10px] sm:text-xs text-muted-foreground">{item.category}</p>
                            </div>
                          </div>
                        ))}
                        {selectedSauces.map((sauce) => (
                          <div key={sauce.name} className="flex items-center gap-2 sm:gap-3">
                            {sauce.image && (
                              <img
                                src={sauce.image}
                                alt={sauce.name}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover border border-primary/20 flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm text-foreground font-medium leading-tight">{sauce.name}</p>
                              <p className="text-[10px] sm:text-xs text-muted-foreground">Sauce</p>
                            </div>
                          </div>
                        ))}
                        {formData.selectedItems.length === 0 && (
                          <p className="text-xs sm:text-sm text-muted-foreground italic">No items selected</p>
                        )}
                      </div>
                    </div>
                    {/* Special Instructions */}
                    {formData.instructions && (
                      <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-primary/10">
                        <p className="text-[10px] uppercase tracking-widest text-primary/70 font-semibold mb-1">Special Instructions</p>
                        <p className="text-xs sm:text-sm text-foreground">{formData.instructions}</p>
                      </div>
                    )}
                    {/* Removed Pickup Location summary */}
                  </div>
                    <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to be contacted by our team to confirm your order.
                  </p>
                </div>
              );
            })()}
            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-2 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary/20">
              <Button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="border-primary/20 text-foreground hover:border-primary text-sm px-3 sm:px-4"
              >
                <ChevronLeft size={16} className="mr-1 sm:mr-2" />
                <span>Previous</span>
              </Button>
              {currentStep < 4 ? (
                <Button
                  onClick={handleNextStep}
                  className="btn-gold text-sm px-3 sm:px-4"
                >
                  {currentStep === 3 ? "Review Order" : "Next"}
                  <ChevronRight size={16} className="ml-1 sm:ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="btn-gold text-sm px-3 sm:px-4"
                >
                  <span className="hidden sm:inline">Confirm & Submit Request</span>
                  <span className="sm:hidden">Confirm & Submit</span>
                </Button>
              )}
            </div>
          </Card>
          {/* Step Indicator */}
          <div className="mt-6 px-2">
            <div className="flex items-center justify-between gap-2">
                {[
                  { step: 1, label: "Contact Info" },
                  { step: 2, label: "Order Details" },
                  { step: 3, label: "More Items" },
                  { step: 4, label: "Review" },
                ].map((item, idx) => (
                <div key={item.step} className="flex-1 flex items-center">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                        item.step <= currentStep
                          ? "bg-primary text-background shadow-gold"
                          : item.step === currentStep + 1
                          ? "bg-primary/40 text-foreground border-2 border-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.step}
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 text-center px-0.5 leading-tight max-w-[60px] sm:max-w-none truncate sm:whitespace-nowrap">
                      {item.label}
                    </p>
                  </div>
                  {/* Progress Line */}
                  {idx < 3 && (
                    <div className="flex-1 h-0.5 mx-1 relative top-0 mb-2">
                      <div
                        className={`h-full transition-all duration-500 ${
                          item.step < currentStep ? "bg-gradient-to-r from-primary to-primary/60" : "bg-muted"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          </div>
          {/* Right Column: Images - Equal width */}
          <div className="flex flex-col h-full">
            <div className="space-y-6 flex-1">
              <div>
                {/* Show selected menu item image if on step 1 and a menu item is pre-selected */}
                {selectedMenuItemObj ? (
                  <div className="flex flex-col items-center">
                    {selectedMenuItemObj.image && (
                      <img
                        src={selectedMenuItemObj.image}
                        alt={selectedMenuItemObj.name}
                        className="rounded-lg object-cover w-64 h-64 max-w-full max-h-80 border border-primary/20 mb-3"
                      />
                    )}
                    <div className="text-lg font-semibold text-foreground text-center">
                      {selectedMenuItemObj.name}
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      {selectedMenuItemObj.category}
                    </div>
                    {selectedMenuItemObj.description && (
                      <div className="text-sm text-muted-foreground text-center mt-2">
                        {selectedMenuItemObj.description}
                      </div>
                    )}
                    {/* --- Customizations & Build Your Own UI --- */}
                    {/* Show customizations for selected main item (parsed from description if needed) */}
                    {selectedMenuItemObj && (() => {
                      // Skewer logic: parse from description if category is Protein Cube Skewer Platter
                      let skewerOptions: number[] = [];
                      if (selectedMenuItemObj.category === "Protein Cube Skewer Platter" && selectedMenuItemObj.description) {
                        // Look for "1-Skewer", "2-Skewers", "3 Skewers" in description
                        const regex = /(\d)[ -]?-?Skewer[s]?/gi;
                        let match;
                        while ((match = regex.exec(selectedMenuItemObj.description)) !== null) {
                          skewerOptions.push(Number(match[1]));
                        }
                      }
                      // Remove duplicates
                      skewerOptions = Array.from(new Set(skewerOptions));
                      // Add-ons from addOns field
                      const addOns = selectedMenuItemObj.addOns || [];
                      if (skewerOptions.length > 0 || addOns.length > 0) {
                        return (
                          <div className="mt-6 w-full">
                            <div className="text-base font-semibold text-foreground mb-2 text-center">Customizations & Add-ons</div>
                            <div className="flex flex-wrap gap-2 justify-center">
                              {skewerOptions.length > 0 && (
                                <div className="flex items-center gap-2">
                                  <Label>Choose Skewers:</Label>
                                  <select
                                    className="border rounded px-2 py-1 bg-card text-foreground"
                                    value={typeof customizations[`menu-${selectedMenuItemObj.id}`]?.skewers === 'number' || typeof customizations[`menu-${selectedMenuItemObj.id}`]?.skewers === 'string' ? String(customizations[`menu-${selectedMenuItemObj.id}`]?.skewers) : ''}
                                    onChange={e => setCustomizations(prev => ({
                                      ...prev,
                                      [`menu-${selectedMenuItemObj.id}`]: {
                                        ...prev[`menu-${selectedMenuItemObj.id}`],
                                        skewers: Number(e.target.value)
                                      }
                                    }))}
                                  >
                                    <option value="">Select</option>
                                    {skewerOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                  </select>
                                </div>
                              )}
                              {addOns.map((addon, idx) => (
                                <div key={addon} className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(customizations[`menu-${selectedMenuItemObj.id}`]?.[addon])}
                                    onChange={e => setCustomizations(prev => ({
                                      ...prev,
                                      [`menu-${selectedMenuItemObj.id}`]: {
                                        ...prev[`menu-${selectedMenuItemObj.id}`],
                                        [addon]: e.target.checked
                                      }
                                    }))}
                                  />
                                  <Label>{addon}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* Build Your Own Shake/Fruit Blend Button (also triggered from menu) */}
                    {(
                      selectedMenuItemObj?.category.toLowerCase().includes('shake') ||
                      selectedMenuItemObj?.category.toLowerCase().includes('juice') ||
                      (formData.selectedItems[0] === 'build-your-own-shake')
                    ) && (
                      <div className="mt-6 w-full flex justify-center">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-primary/30"
                          onClick={() => setShowBuildYourOwn(selectedMenuItemObj?.subCategory?.toLowerCase().includes('fruit') || selectedMenuItemObj?.name.toLowerCase().includes('fruit') ? 'fruit' : 'shake')}
                        >
                          Build Your Own {selectedMenuItemObj?.subCategory?.toLowerCase().includes('fruit') || selectedMenuItemObj?.name.toLowerCase().includes('fruit') ? 'Fruit Blend' : 'Shake'}
                        </Button>
                      </div>
                    )}

                    {/* Build Your Own Form Modal (enhanced) */}
                    {showBuildYourOwn && (
                      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                        <div className="bg-card rounded-lg p-6 w-full max-w-md relative">
                          <button className="absolute top-2 right-2 text-xl" onClick={() => setShowBuildYourOwn(null)}>&times;</button>
                          <h2 className="text-lg font-bold mb-4">Build Your Own {showBuildYourOwn === 'shake' ? 'Shake' : 'Fruit Blend'}</h2>
                          <div className="mb-3">
                            <Label>Base</Label>
                            <Input
                              value={buildYourOwnForm.base}
                              onChange={e => setBuildYourOwnForm(f => ({ ...f, base: e.target.value }))}
                              placeholder="e.g. Milk, Almond Milk, Juice..."
                            />
                          </div>
                          <div className="mb-3">
                            <Label>Flavors (comma separated)</Label>
                            <Input
                              value={buildYourOwnForm.flavors.join(', ')}
                              onChange={e => setBuildYourOwnForm(f => ({ ...f, flavors: e.target.value.split(',').map(s => s.trim()) }))}
                              placeholder="e.g. Mango, Strawberry, Banana"
                            />
                          </div>
                          <div className="mb-3">
                            <Label>Add-ins (comma separated)</Label>
                            <Input
                              value={buildYourOwnForm.addIns.join(', ')}
                              onChange={e => setBuildYourOwnForm(f => ({ ...f, addIns: e.target.value.split(',').map(s => s.trim()) }))}
                              placeholder="e.g. Chia Seeds, Almonds, Honey"
                            />
                          </div>
                          <div className="mb-3">
                            <Label>Notes</Label>
                            <Textarea
                              value={buildYourOwnForm.notes}
                              onChange={e => setBuildYourOwnForm(f => ({ ...f, notes: e.target.value }))}
                              placeholder="Any special instructions..."
                            />
                          </div>
                          <Button className="mt-2 w-full" onClick={() => {
                            setCustomBuilds((prev) => [...prev, { ...buildYourOwnForm, type: showBuildYourOwn }]);
                            setShowBuildYourOwn(null);
                            setBuildYourOwnForm({ type: 'shake', base: '', flavors: [], addIns: [], notes: '' });
                            toast.success('Custom item added!');
                          }}>
                            Add to Order
                          </Button>
                        </div>
                      </div>
                    )}
                    {(() => {
                      // Collect all selected menu items (excluding the main item)
                      const selectedMenuItemIds = formData.selectedItems
                        .filter((key) => key.startsWith('menu-'))
                        .map((key) => Number(key.replace('menu-', '')));
                      // Main item is the first selected menu item
                      const mainItemId = selectedMenuItemIds[0];
                      // All other menu items (add-ons)
                      const addonMenuItems = effectiveMenuItems.filter(
                        (item) => selectedMenuItemIds.includes(item.id) && item.id !== mainItemId
                      );
                      // Selected sauces
                      const selectedSauceObjs = sauces.filter((sauce) =>
                        formData.selectedItems.includes(getSauceKey(sauce.name))
                      );
                      // Compose all add-ons (salads, sides, drinks, etc.)
                      // Desserts: flatten all desserts and filter by selected
                      const allDesserts = Object.values(desserts).flat();
                      const selectedDessertObjs = allDesserts.filter((dessert) =>
                        formData.selectedItems.includes(`menu-${dessert.id}`)
                      );
                      const allAddons = [
                        ...addonMenuItems.map((item) => ({
                          key: `menu-${item.id}`,
                          name: item.name,
                          image: item.image,
                          type: item.category,
                          price: item.price,
                          custom: customizations[`menu-${item.id}`],
                        })),
                        ...selectedSauceObjs.map((sauce) => ({
                          key: getSauceKey(sauce.name),
                          name: sauce.name,
                          image: sauce.image,
                          type: 'Sauce',
                          price: undefined,
                        })),
                        ...customBuilds.map((build, idx) => ({
                          key: `custom-build-${idx}`,
                          name: `Custom ${build.type === 'shake' ? 'Shake' : 'Fruit Blend'}`,
                          image: undefined,
                          type: build.type === 'shake' ? 'Shake' : 'Fruit Blend',
                          price: 7.99, // Example price
                          custom: build,
                        })),
                        ...selectedDessertObjs.map((dessert) => ({
                          key: `menu-${dessert.id}`,
                          name: dessert.name,
                          image: dessert.image,
                          type: 'Dessert',
                          price: dessert.price,
                        })),
                      ];
                      // Calculate total price
                      const mainItem = effectiveMenuItems.find((item) => item.id === mainItemId);
                      const totalPrice = [
                        mainItem,
                        ...addonMenuItems,
                        ...customBuilds.map(() => ({ price: 7.99 }))
                      ].reduce((sum, item) => sum + (item?.price || 0), 0);
                      return (
                        <>
                          {allAddons.length > 0 && (
                            <div className="mt-6 w-full">
                              <div className="text-base font-semibold text-foreground mb-2 text-center">Added Items</div>
                              <div className="flex flex-wrap gap-4 justify-center">
                                {allAddons.map((addon, idx) => (
                                  <div key={addon.key} className="flex flex-col items-center relative group">
                                    {/* Remove button (cross) */}
                                    <button
                                      type="button"
                                      aria-label="Remove"
                                      className="absolute -top-2 -right-2 bg-background border border-primary/40 rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-70 hover:opacity-100 z-10"
                                      onClick={() => {
                                        // Remove from selectedItems if menu item or sauce
                                        if (addon.key.startsWith('menu-') || addon.key.startsWith('sauce-')) {
                                          setFormData(prev => ({
                                            ...prev,
                                            selectedItems: prev.selectedItems.filter(k => k !== addon.key)
                                          }));
                                        }
                                        // Remove custom build
                                        if (addon.key.startsWith('custom-build-')) {
                                          setCustomBuilds(prev => prev.filter((_, i) => `custom-build-${i}` !== addon.key));
                                        }
                                      }}
                                    >
                                      ×
                                    </button>
                                    {addon.image && (
                                      <img src={addon.image} alt={addon.name} className="w-16 h-16 rounded object-cover border border-primary/20 mb-1" />
                                    )}
                                    <div className="text-xs text-foreground text-center font-medium">You added: {addon.name}</div>
                                    {addon.price !== undefined && (
                                      <div className="text-xs text-primary text-center font-semibold">${addon.price.toFixed(2)}</div>
                                    )}
                                    {/* Show customizations if any */}
                                    {'custom' in addon && addon.custom && (
                                      <div className="text-[10px] text-muted-foreground mt-1 text-center">
                                        {typeof addon.custom === 'object' && Object.entries(addon.custom).map(([k, v]) => (
                                          <div key={k}>{k}: {Array.isArray(v) ? v.join(', ') : String(v)}</div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* Show total price if any item has a price */}
                          {(mainItem?.price || allAddons.some(a => a.price)) && (
                            <div className="mt-4 text-lg font-bold text-center text-primary">
                              Total Price: ${totalPrice.toFixed(2)}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  // If no menu item is selected, show a grid of all menu items (EXCLUDE sauces)
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {effectiveMenuItems.filter(item => item.category.toLowerCase() !== 'sauces').slice(0, 9).map((item) => (
                      <div key={item.id} className="flex flex-col items-center bg-card rounded-lg p-2 border border-primary/10 hover:border-primary/40 transition">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded mb-2 border border-primary/20"
                          />
                        )}
                        <div className="text-xs font-semibold text-foreground text-center line-clamp-2 mb-1">{item.name}</div>
                        <div className="text-[10px] text-muted-foreground text-center mb-1">{item.category}</div>
                        <Button
                          size="sm"
                          className="btn-gold text-xs px-2 py-1 mt-1"
                          onClick={() => setFormData((prev) => ({
                            ...prev,
                            selectedItems: [`menu-${item.id}`],
                          }))}
                        >
                          Select
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
