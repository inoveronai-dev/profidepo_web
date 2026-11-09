import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Contact } from "@/components/contact";
import { About } from "@/components/about";
import { AvailabilityBanner } from "@/components/availability-banner";
import { Footer } from "@/components/footer";
import { Services } from "@/components/page-sections";
import { SocialStrip } from "@/components/social";
import { Realizacie } from "@/components/realizacie-gallery";
import { Spolupraca } from "@/components/spolupraca";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <SocialStrip />
        <Spolupraca />
        <About />
        <AvailabilityBanner />
        <Contact />
        <Realizacie />
      </main>
      <Footer />
    </>
  );
}
