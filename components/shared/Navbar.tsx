"use client";

import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about-us" },
  { label: "Benefits", href: "#services" },
  { label: "Contact", href: "#contact" },
  // { label: "Buy a Membership", href: "#buy-membership" },
  // { label: "Gift Cards", href: "#gift-cards" },
  // { label: "Store", href: "#store" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 lg:top-5 z-50 w-full lg:px-4">
      <div className="mx-auto max-w-[1600px] rounded-xl border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center justify-between gap-10 px-4 py-1 sm:px-6 lg:py-2 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex-1">
            <Image 
              src="/logo-up.svg" 
              alt="Brightside Car Wash" 
              width={85} 
              height={76}
              className="max-h-[130px] max-w-[130px] sm:w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-6 text-sm font-medium text-white/90 lg:flex lg:gap-8 xl:gap-9"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap transition-colors hover:text-primary text-base lg:text-lg font-normal"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section: Phone + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Phone Contact */}
            <a
              href="tel:+13314015793"
              className="flex items-center gap-2 sm:gap-3 rounded-lg transition-opacity hover:opacity-90 shrink-0"
            >
              <span className="flex size-8 sm:size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Phone className="size-4 sm:size-5" />
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-[0.6rem] sm:text-[0.9rem] font-semibold tracking-wide text-amber-300  ">
                  {/* 24/7  */}
                  Emergency Services
                </span>
                <span className="block text-[0.6rem] sm:text-[0.99rem] font-bold text-white">
                  (331) 401-5793
                </span>
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden flex items-center justify-center size-10 rounded-md transition-colors hover:bg-white/10"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="size-6 text-white" />
              ) : (
                <Menu className="size-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <nav
            className="border-t border-white/10 bg-black/60 backdrop-blur-md lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm sm:text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
