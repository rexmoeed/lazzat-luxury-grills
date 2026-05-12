import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";

// Declare window.dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer?: Array<any>;
    gtag?: (...args: any[]) => void;
  }
}

const ThankYou = () => {
  useEffect(() => {
    // Google Ads Purchase Conversion
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18126803392/B4w6CJKdwKYcEMCjxMND',
        'value': 1.0,
        'currency': 'CAD',
        'transaction_id': '' // Replace with dynamic order ID if available
      });
    }
    // (Optional) Still push to dataLayer for GTM if needed
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'purchase' });
    }
  }, []);

  return (
    <Layout>
      <section className="pt-36 pb-12 md:pt-44 md:pb-16 bg-background text-center">
        <div className="container-luxury px-4">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Thank You!
          </h1>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Your order has been received. We appreciate your business!
          </p>
          {/* ...Add order summary or next steps here... */}
        </div>
      </section>
    </Layout>
  );
};

export default ThankYou;
