"use client";

import {
  ShieldCheck,
  Zap,
  Sparkles,
  Home,
  MapPin,
  HandCoins,
} from "lucide-react";
import { toast } from "sonner";

export default function Claim() {
  const features = [
    {
      icon: ShieldCheck,
      text: "VETERAN-OWNED & COMMUNITY TRUSTED",
    },
    {
      icon: Zap,
      text: "FAST & PROFESSIONAL SERVICE",
    },
    {
      icon: HandCoins,
      text: "MEMBERSHIP SAVINGS",
    },
    {
      icon: Sparkles,
      text: "PREMIUM DETAILING",
    },
    {
      icon: Home,
      text: "FAMILY-OWNED & LOCAL",
    },
    {
      icon: MapPin,
      text: "TWO NAPERVILLE LOCATIONS",
    },
  ];
const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
  toast.success("Claim submitted successfully!");
};
  return (
    <section id="contact" className="w-full bg-[#f4f4f4] py-12 md:py-20">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8 2xl:px-0">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
          {/* Left Content */}
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold leading-tight text-[#1E1E1E] sm:text-4xl">
              Claim Your Exclusive Brightside Offer Today
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#6E6E6E] sm:text-base">
              Whether you're looking for unlimited washes, premium
              detailing, or seasonal savings, we'll help you find the perfect package for your vehicle.
            </p>

            <h4 className="mt-8 text-sm font-bold text-[#1E1E1E]">
              Why Drivers Choose Brightside
            </h4>

            <div className="mt-6 space-y-5">
              {features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-5 w-5 items-center justify-center text-[#B23730]">
                      <Icon size={16} strokeWidth={2.2} />
                    </div>

                    <p className="text-xs font-medium tracking-wide text-[#7B7B7B] sm:text-sm">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Form Card */}
          <div className="w-full">
            <div className="mx-auto w-full lg:max-w-2xl rounded-[28px] bg-[#020B23] p-5 shadow-2xl sm:p-8 md:p-10">
              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  Get Started in Less Than 30 Seconds
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Choose your service and claim your offer today.
                </p>
              </div>

              <form className="mt-8 space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-4 ">
                  <div className="w-full">
              <label className="block text-sm lg:text-base font-medium text-gray-300 mb-1">
                Full Name
              </label>
                  <input
                  required
                    type="text"
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-md border border-transparent bg-[#ECEEF3] px-4 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B23730]"
                  />
                  </div>

                  <div className="w-full">
              <label className="block text-sm lg:text-base font-medium text-gray-300 mb-1">
                Email Address
              </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="h-12 w-full rounded-md border border-transparent bg-[#ECEEF3] px-4 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B23730]"
                  />
                  </div> 

<div className="w-full">
              <label className="block text-sm lg:text-base font-medium text-gray-300 mb-1">
              Mobile Number
              </label>
                  <input
                    type="number"
                    required
                    placeholder="(555) 123-4567"
                    className="h-12 w-full rounded-md border border-transparent bg-[#ECEEF3] px-4 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B23730]"
                  /> 
                  </div>

<div className="w-full">
              <label className="block text-sm lg:text-base font-medium text-gray-300 mb-1">
                Full Name
              </label>
                  <select
                    required
                    className="h-12 w-full rounded-md border border-transparent bg-[#ECEEF3] px-4 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B23730]"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Vehicle Type 
                    </option>
                    <option value="car">Car</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                    <option value="van">Van</option>
                    {/* <option>Car Wash</option>
                    <option>Premium Detailing</option>
                    <option>Membership Plan</option>
                    <option>Interior Cleaning</option> */}
                  </select>
                </div>
                </div>

                {/* Textarea */}
                {/* <textarea
                  rows={5}
                  placeholder="Tell us about your vehicle or service needs..."
                  className="w-full rounded-md border border-transparent bg-[#ECEEF3] px-4 py-4 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B23730]"
                /> */}

                {/* Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    onClick={handleClaim}
                    className="flex h-12 w-full items-center justify-center rounded-md bg-[#B23730] text-sm font-bold text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    Claim My Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}