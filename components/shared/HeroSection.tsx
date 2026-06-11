import { Leaf, Star, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/shared/QuoteForm";

const features = [
  { icon: Star, label: "5-Star Rated Service" },
  { icon: Leaf, label: "Eco-Friendly Products" },
  { icon: ThumbsUp, label: "Satisfaction Guaranteed" },
];

export function HeroSection() {
  return (
    <section className="relative z-10 flex flex-1 items-center">
      <div className="mx-auto grid max-w-[1600px] w-[95%] items-center gap-10 lg:grid-cols-2 lg:gap-12 ">
        <div className="space-y-5">
          <h1 className="text-3xl md:text-4xl xl:text-[72px] mt-4 leading-tight font-medium tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
          WASH WITH A    {' '}
            <span className="text-primary">PURPOSE </span>
            <br /> 
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed font-medium tracking-wide text-white/85 uppercase sm:text-base">
           Get 90 Days Unlimited BEST Full-Service Membership for just $150.  20% of proceeds support local veteran-focused organizations.  Limited-time offer.
          </p>

          {/* <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {features.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-white"
              >
                <div className="flex items-center justify-center size-9 rounded-full bg-transparent border-r-2 border-white backdrop-blur-sm">
                <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                </div>
                {label}
              </li>
            ))}
          </ul> */}

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-md bg-primary px-8 text-base font-medium text-primary-foreground uppercase hover:bg-primary/90"
            >
              <Link href="#contact">Claim Offer</Link>
            </Button>
            <Button
              asChild
              size="lg" 
              variant="outline"
              className="h-12 border-2 border-white rounded-md px-8 text-base font-medium text-primary uppercase hover:text-white"
            >
              <Link href="#services">VIEW BENEFITS</Link>
            </Button>
          </div>
        </div>

        <div id="quote" className="flex justify-center lg:justify-end">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
