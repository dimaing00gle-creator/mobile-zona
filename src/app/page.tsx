import { About } from "@/components/About";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { ProductSlider } from "@/components/ProductSlider";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { Socials } from "@/components/Socials";
import { StoreFinder } from "@/components/StoreFinder";
import { UsedIphones } from "@/components/UsedIphones";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main">
        <Hero />
        <ProductSlider />
        <UsedIphones />
        <Services />
        <About />
        <Reviews />
        <StoreFinder />
        <Contacts />
        <Socials />
      </main>
      <Footer />
    </>
  );
}
