import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { menuItemsFlat } from "@/lib/menu-data";

// Declare window.dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer?: Array<any>;
  }
}


const Checkout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Google Ads Begin Checkout Conversion
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18126803392/I4NqCJWdwKYcEMCjxMND',
        'value': 1.0,
        'currency': 'CAD'
      });
    }
    // (Optional) Still push to dataLayer for GTM if needed
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'begin_checkout' });
    }
  }, []);

  const handleCompleteOrder = () => {
    // Here you would normally process payment, etc.
    navigate('/thank-you');
  };

  // For demo: show first 5 menu items as the order
  const orderItems = menuItemsFlat.slice(0, 5);
  const total = orderItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <Layout>
      <section className="pt-36 pb-12 md:pt-44 md:pb-16 bg-background text-center">
        <div className="container-luxury px-4">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Checkout
          </h1>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto mb-8">
            Please review your order and complete your purchase below.
          </p>
          <div className="bg-card border border-primary/20 rounded-lg p-8 max-w-md mx-auto mb-8">
            <h2 className="font-serif text-2xl mb-4">Order Summary</h2>
            <ul className="text-left mb-4">
              {orderItems.map((item) => (
                <li key={item.id}>
                  {item.name} <span className="text-muted-foreground">${item.price?.toFixed(2) ?? 'N/A'}</span>
                </li>
              ))}
            </ul>
            <div className="font-bold text-lg mb-2">Total: ${total.toFixed(2)}</div>
          </div>
          <button className="btn-gold px-8 py-3 text-lg font-semibold rounded-full" onClick={handleCompleteOrder}>
            Complete Order
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
