import OurStory from "@/components/OurStory";
import CTASection from "@/components/CTASection";
import Location from "@/components/Location";
import ScrollRevealSlider from "@/components/Scrollrevealslider";
import ServiceSection from "@/components/Servicesection";
import { HomeHero } from "@/components/shared/HomeHero";
import TestimonialSlider from "@/components/TestimonialSlider";
import Claim from "@/components/Claim";

export default function Home() {
  return (
    <div>
      <main>
        <HomeHero />
      </main>

      <OurStory />
      <ServiceSection />
      {/* <div className="hidden lg:block">
        <ScrollRevealSlider
          leftImage="/clear-new.jpeg"
          rightImage="/not-clear-new.jpeg"
          leftAlt="Untouched"
          rightAlt="Transformed"
          scrollHeight="350vh"
          componentHeight="100vh"
          leftOverlay={{
            eyebrow: " ",
            heading: " ",
            subheading: "",
            description: "",
            buttonLabel: "View Original",
            buttonHref: "#",
          }}
          rightOverlay={{
            eyebrow: "",
            heading: " ",
            subheading: " ",
            description: " ",
            buttonLabel: "Explore Series",
            buttonHref: "#",
          }}
        />
      </div>

      <div className="lg:hidden">
        <ScrollRevealSlider
          leftImage="/clean-font-new.jpeg"
          rightImage="/not-clean-font-new.jpeg"
          leftAlt="Untouched"
          rightAlt="Transformed"
          scrollHeight="350vh"
          componentHeight="100vh"
          leftOverlay={{
            eyebrow: " ",
            heading: " ",
            subheading: "",
            description: "",
            buttonLabel: "View Original",
            buttonHref: "#",
          }}
          rightOverlay={{
            eyebrow: "",
            heading: " ",
            subheading: " ",
            description: " ",
            buttonLabel: "Explore Series",
            buttonHref: "#",
          }}
        />
      </div> */}
      <TestimonialSlider />
      <Claim />
      <Location />
      <CTASection />
    </div>
  );
}
