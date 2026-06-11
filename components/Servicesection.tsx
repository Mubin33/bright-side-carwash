

import { Coins, Sparkles, Infinity, Gift, Timer, Megaphone } from "lucide-react";
import Link from "next/link";

interface MembershipCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const membershipCards: MembershipCard[] = [
  {
    icon: <Coins className="w-6 h-6 text-red-500" />,
    title: "Save Over $285 in Value",
    description:
      "A single BEST wash is $49. At just 4 visits, you've already broken even. Wash weekly, and you're unlocking $1,700+ in value for only $150.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-red-500" />,
    title: "BEST Full-Service, Every Visit",
    description:
      "Every wash includes our top-tier package: advanced ceramic seal, wheel & rim cleaning, triple foam treatment, floor mat deep clean, and professional hand towel dry.",
  },
  {
    icon: <Infinity className="w-6 h-6 text-red-500" />,
    title: "Unlimited Washes for 90 Days",
    description:
      "Drive in as many times as you want! No limits, no blackout dates. Every visit is your full BEST full-service wash at no extra charge.",
  },
  {
    icon: <Gift className="w-6 h-6 text-red-500" />,
    title: "20% Goes Directly to Veterans",
    description:
      "20% of all proceeds are donated to veteran-focused and veteran-run nonprofit organizations. Your car gets clean, veterans get support.",
  },
  {
    icon: <Timer className="w-6 h-6 text-red-500" />,
    title: "In & Out in Under 10 Minutes",
    description:
      "Our state-of-the-art express tunnels get you back on the road fast without cutting a single corner on cleanliness. No waiting, every time.",
  },
  {
    icon: <Megaphone className="w-6 h-6 text-red-500" />,
    title: "Your Membership Puts Veterans in the Spotlight",
    description:
      "Participating veteran non-profits receive co-branded marketing, social media promotion, and direct public engagement opportunities during the event.",
  },
];

export default function ServiceSection() {
  return (
    <section id="services" className="relative py-16 px-6 md:px-12" style={{ backgroundImage: "url('/service-bg.png')", backgroundSize: "cover", backgroundPosition: "center"  }}>
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 py-16 px-6 md:px-12 rounded-xl"></div> */}
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Everything Include for $150
          </h2>
          <p className="text-white text-sm lg:text-base mb-8 max-w-2xl mx-auto">
            Unlimited premium washes, exclusive veteran impact, and over $1,700 in potential value
 
            all packed into one 90-day membership
          </p>
          <Link href="#contact">
          <button className="bg-white text-primary px-6 py-2 rounded-sm font-bold hover:bg-gray-100 transition cursor-pointer">
            CLAIM OFFER
          </button>
          </Link>
        </div>

        {/* Divider */}
        <hr className="border-white/30 mb-12" />

        {/* Content Section with Image and Cards */}
        <div className=" gap-8 items-start z-50">
          {/* Left Image - assuming there's an image, using placeholder structure */}
          {/* <div className="hidden lg:block">
            <div className=" "> 
              <div className="aspect-square flex items-center justify-center">
                <img
                  src="/services-left.png"
                  alt="Car Wash Service"
                  className="max-w-full max-h-full object-cover"
                />
              </div>
            </div>
          </div> */}

          {/* Right Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {membershipCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-lg"
              >
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center">
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}






// import { Trophy, Timer, BadgePercent, Sparkles, Users, MapPin } from "lucide-react";

// interface ServiceCard {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// const services: ServiceCard[] = [
//   {
//     icon: <Trophy className="w-5 h-5 text-orange-500" />,
//     title: "Veteran-Owned",
//     description:
//       "Founded on discipline, integrity, and extreme attention to detail by US veterans.",
//   },
//   {
//     icon: <Timer className="w-5 h-5 text-orange-500" />,
//     title: "Fast Service",
//     description:
//       "Express tunnels designed to get you back on the road in under 10 minutes without compromise.",
//   },
//   {
//     icon: <BadgePercent className="w-5 h-5 text-orange-500" />,
//     title: "Membership Savings",
//     description:
//       "We provide expert plumbing services and repairs to keep your home or business running smoothly.",
//   },
//   {
//     icon: <Sparkles className="w-5 h-5 text-orange-500" />,
//     title: "Premium Detail",
//     description:
//       "Using only top-tier ceramic coatings and pH-balanced chemicals safe for luxury finishes.",
//   },
//   {
//     icon: <Users className="w-5 h-5 text-orange-500" />,
//     title: "Family-Owned",
//     description:
//       "Deeply rooted in the Naperville community with a commitment to local service.",
//   },
//   {
//     icon: <MapPin className="w-5 h-5 text-orange-500" />,
//     title: "Two Locations",
//     description:
//       "Convenient access in North and South Naperville to serve you wherever you are.",
//   },
// ];

// export default function ServiceSection() {
//   return (
//     <section id="services" className="bg-gray-100 py-16 px-6 md:px-12">
//       <div className="max-w-[1400px] mx-auto">
//         {/* Heading */}
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">
//           Service without limits
//         </h2>
//         <hr className="border-gray-300 mb-10" />

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               {/* Icon badge */}
//               <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
//                 {service.icon}
//               </div>

//               {/* Title */}
//               <h3 className="text-base font-bold text-gray-900">
//                 {service.title}
//               </h3>

//               {/* Description */}
//               <p className="text-sm text-gray-500 leading-relaxed">
//                 {service.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }