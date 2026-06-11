"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Mail, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const vehicleOptions = [
  {
    value: "sedan",
    label: "Sedan",
    subtitle: "2-4 Doors",
    image:
      "/sedan.png",
  },
  {
    value: "suv",
    label: "SUV",
    subtitle: "5+ Seats",
    image:
      "/suv.png",
  },
  {
    value: "truck-van",
    label: "Truck/Van",
    subtitle: "For Work or Cargo",
    image:
      "/van.png",
  },
] as const;

export function QuoteForm() {
  const [vehicle, setVehicle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!vehicle || !name.trim() || !email.trim()) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    const formData = {
      vehicle,
      name: name.trim(),
      email: email.trim(),
    };

    console.log("Quote form submission:", formData);

    toast.success("Quote request received!", {
      description: "We'll send your personalized estimate shortly.",
    });

    setVehicle("");
    setName("");
    setEmail("");
  }

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
      <div className="bg-[var(--hero-navy)] px-6 py-5 text-white">
        <h2 className="text-xl font-bold">Get Your Free Quote</h2>
        <p className="mt-1 text-sm text-blue-100/90">
          Choose your vehicle type and receive an instant personalized estimate.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6">
        <div className="space-y-3">
          <div>
            <Label className="text-base font-bold text-gray-900">
              What vehicle do you drive?
            </Label>
            <p className="mt-0.5 text-sm text-gray-500">
              Pricing varies based on vehicle category.
            </p>
          </div>

          <div
            role="radiogroup"
            aria-label="Vehicle type"
            className="grid grid-cols-3 gap-2"
          >
            {vehicleOptions.map((option) => {
              const isSelected = vehicle === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setVehicle(option.value)}
                  className={cn(
                    "flex flex-col overflow-hidden rounded-xl border-2 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                    isSelected
                      ? "border-blue-600 bg-blue-50 shadow-sm"
                      : "border-transparent bg-gray-100 hover:bg-gray-50"
                  )}
                >
                  <div className="relative aspect-[4/3] w-full bg-white">
                    <Image
                      src={option.image}
                      alt={option.label}
                      fill
                      sizes="(max-width: 768px) 33vw, 120px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="px-2 py-2 text-center">
                    <span
                      className={cn(
                        "block text-sm font-bold",
                        isSelected ? "text-blue-700" : "text-gray-900"
                      )}
                    >
                      {option.label}
                    </span>
                    <span className="mt-0.5 block text-[0.65rem] text-gray-500">
                      {option.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-800">
            Full Name
          </Label>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 border-gray-200 bg-gray-50 pl-10 text-gray-900"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-800">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border-gray-200 bg-gray-50 pl-10 text-gray-900"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-[var(--hero-navy)] text-base font-semibold text-white hover:bg-[var(--hero-navy)]/90"
        >
          Get Instant Quote
        </Button>
      </form>
    </div>
  );
}

