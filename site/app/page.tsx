import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { StoreSection } from "@/components/store/StoreSection";
import { FlowSection } from "@/components/flow/FlowSection";
import { BadgeSection } from "@/components/badge/BadgeSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StoreSection />
        <FlowSection />
        <BadgeSection />
      </main>
      <Footer />
    </>
  );
}
