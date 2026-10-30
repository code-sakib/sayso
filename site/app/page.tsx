import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { StoreSection } from "@/components/store/StoreSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StoreSection />
      </main>
      <Footer />
    </>
  );
}
