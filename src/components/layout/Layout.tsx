import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background/80 supports-[backdrop-filter]:backdrop-blur-none relative">
      <Header />

      {/* Prevent content from hiding behind MobileNav */}
      <main className="pb-20">
        {children}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default Layout;
