import { Layout } from "@/components/layout/Layout";
import ubereats from "@/assets/ubereats.png";
import doordash from "@/assets/doordash.png";
import toasttab from "@/assets/toasttab.png";

const TOASTTAB_URL = "https://order.toasttab.com/online/lazzat-mcvean?";
const UBEREATS_URL = "https://www.ubereats.com/store-browse-uuid/48026b70-6654-5abe-9229-eb555f43b989?diningMode=DELIVERY";
const DOORDASH_URL = "https://www.doordash.com/store/lazzat-grill-&-shakes-brampton-41884743/109121149/";

function OrderPartnerCard({
  href,
  logo,
  logoAlt,
  buttonText,
  logoSizeClass,
}: {
  href: string;
  logo: string;
  logoAlt: string;
  buttonText: string;
  logoSizeClass?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group w-full min-h-[170px] rounded-xl border border-primary/20 bg-secondary/40 hover:border-primary/60 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between gap-4"
    >
      <div className="h-16 sm:h-20 w-full flex items-center justify-center">
        <img
          src={logo}
          alt={logoAlt}
          className={`${logoSizeClass ?? "w-12 h-12 sm:w-14 sm:h-14"} object-contain`}
        />
      </div>
      <span className="btn-gold border border-primary/70 w-full !py-3 !px-4 inline-flex items-center justify-center text-sm sm:text-base font-semibold tracking-wide">
        {buttonText}
      </span>
    </a>
  );
}

export default function Order() {
  return (
    <Layout>
      <section className="pt-28 pb-14 md:pt-44 md:pb-20 bg-background border-y border-primary/15">
        <div className="container-luxury px-4">
          <div className="text-center mb-10 md:mb-14">
            <div className="gold-divider w-20 mx-auto mb-5 md:mb-7" />
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
              Order & Delivery Options
            </h1>
            <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Pick your preferred way to order from Lazzat.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <article className="rounded-2xl border border-primary/20 bg-card/70 p-5 sm:p-6 md:p-8">
              <div className="gold-divider w-16 mb-4" />
              <h2 className="font-serif text-2xl md:text-3xl text-primary mb-2">
                Online Order & Pickup
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Place your pickup order directly through ToastTab.
              </p>

              <div className="max-w-sm w-full mx-auto">
                <OrderPartnerCard
                  href={TOASTTAB_URL}
                  logo={toasttab}
                  logoAlt="ToastTab"
                  buttonText="Order Pickup"
                />
              </div>
            </article>

            <article className="rounded-2xl border border-primary/20 bg-card/70 p-5 sm:p-6 md:p-8">
              <div className="gold-divider w-16 mb-4" />
              <h2 className="font-serif text-2xl md:text-3xl text-primary mb-2">
                Online Order & Delivery
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Order delivery with your preferred delivery app.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <OrderPartnerCard
                  href={UBEREATS_URL}
                  logo={ubereats}
                  logoAlt="Uber Eats"
                  buttonText="Order on Uber Eats"
                  logoSizeClass="w-[3.25rem] h-[3.25rem] sm:w-[3.75rem] sm:h-[3.75rem]"
                />
                <OrderPartnerCard
                  href={DOORDASH_URL}
                  logo={doordash}
                  logoAlt="DoorDash"
                  buttonText="Order on DoorDash"
                  logoSizeClass="w-[3.25rem] h-[3.25rem] sm:w-[3.75rem] sm:h-[3.75rem]"
                />
              </div>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
}
