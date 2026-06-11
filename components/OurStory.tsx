import { Trophy } from "lucide-react";

interface OurStoryProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function OurStory({
  imageSrc = "/jonathan-s.jpeg",
  imageAlt = "Jonathan Roldan, Founder & CEO",
}: OurStoryProps) {
  return (
    <section id="about-us" className="bg-[#0f1a2e] py-16 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto flex flex-col xl:flex-row items-center gap-10 md:gap-16">

        {/* Left — Image with badge */}
        <div className="relative w-full md:w-[620px] shrink-0">
          <div className="rounded-2xl overflow-hidden w-full">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Veteran badge overlay */}
          <div className="absolute bottom-5 -right-12 bg-[#1a2a42]/90 backdrop-blur-sm rounded-xl px-5 py-3 hidden md:flex items-center gap-3 w-max shadow-lg">
            <div className="text-orange-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white text-sm font-bold leading-tight">
                U.S. Army Veteran
              </p>
              <p className="text-gray-400 text-xs">Honorable Service</p>
            </div>
          </div>
        </div>

        {/* Right — Copy */}
        <div className="flex flex-col gap-6 text-white">
          {/* Eyebrow */}
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
            Our Story
          </p>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Meet Jonathan Roldan
          </h2>

          {/* Body paragraphs */}
          <div className="flex flex-col gap-4 text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
            <p>
              Brightside was built to deliver premium service while treating
              every customer like family. After serving in the Army, I wanted to
              bring the same level of discipline, integrity, and excellence to my
              community here in Naperville.
            </p>
            <p>
              Whether it's a quick daily rinse or a deep restorative detail, my
              team and I are committed to ensuring your vehicle looks its best
              every time you leave our lot. We don't just wash cars; we serve
              our neighbors.
            </p>
          </div>

          {/* Signature block */}
          <div className="mt-2">
            <p className="text-white text-xl font-semibold">Jonathan Roldan</p>
            <p className="text-orange-500 text-sm font-medium mt-0.5">
              Founder &amp; CEO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}