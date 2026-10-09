import { About } from "@/components/About";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { MobileCta } from "@/components/MobileCta";
import { ProductSlider } from "@/components/ProductSlider";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { StoreFinder } from "@/components/StoreFinder";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main">
        <Hero />
        <ProductSlider />
        <Services />
        <About />
        <Reviews />
        <StoreFinder />
        <Contacts />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
