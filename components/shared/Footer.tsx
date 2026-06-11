import React from "react";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1220] text-[#FEFEFE] overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4  lg:px-8 2xl:px-0 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mb-12">
          {/* Left Side */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <Link href="/" className="flex shrink-0 items-center gap-3">
                <Image 
                             src="/logo-up.svg" 
                             alt="Brightside Car Wash" 
                             width={85} 
                             height={76}
                             className="h-[130px] max-w-[130px]  sm:w-auto"
                           />
              </Link>

              <h3 className="text-xl font-semibold">
                Brightside Car Wash & Detailing
              </h3>
            </div>

            <p className="max-w-md leading-relaxed">
              Veteran-owned and family-operated, Brightside is committed to
              delivering fast service, premium results, and a cleaner driving
              experience every visit.
            </p>
          </div>

          {/* Right Side */}
          <div className="lg:pl-12">
            <h3 className="text-lg font-semibold mb-4 text-[#B23730]">
              SUBSCRIBE
            </h3>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#F2F2F2] rounded-[12px] p-2 w-full max-w-[620px] gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-transparent px-4 py-3 text-[#0C467899] placeholder-[#0C467899] text-base font-bold outline-none min-w-0"
              />

              <button className="bg-[#0A1325] hover:bg-[#111c33] text-white font-bold text-base px-7 py-3 rounded-[10px] transition-all duration-200 uppercase whitespace-nowrap">
                Subscribe
              </button>
            </div>

            <p className="text-sm mt-3">
              Subscribe to get all the updates
            </p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#B23730]">
              QUICK LINK
            </h4>

            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Membership Plans
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Car Wash Service
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Locations
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Testimonials
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#B23730]">
              BUSINESS HOURS
            </h4>

            <ul className="space-y-3 text-gray-300">
              <li>Monday - Friday: 8:00 AM - 7:00 PM</li>
              <li>Saturday: 8:00 AM - 6:00 PM</li>
              <li>Sunday: 9:00 AM - 5:00 PM</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#B23730]">
              OUR SERVICES
            </h4>

            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Unlimited Wash Memberships
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Express Exterior Wash
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Interior Detailing
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Full-Service Detailing
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Ceramic Coating
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Fleet Wash Services
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#B23730]">
              CONTACT US
            </h4>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-0.5 shrink-0" />

                <div className="min-w-0">
                  <p className="text-gray-300 wrap-break-word">
                    hello@brightsidewash.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-0.5 shrink-0" />

                <div>
                  <p className="text-gray-300">(630) 555-2025</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mt-4">
                Our team is available daily to help with memberships, bookings,
                and service questions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  width="11"
                  height="20"
                  viewBox="0 0 11 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 11.5H9.5L10.5 7.5H7V5.5C7 4.47 7 3.5 9 3.5H10.5V0.14C10.174 0.0970001 8.943 0 7.643 0C4.928 0 3 1.657 3 4.7V7.5H0V11.5H3V20H7V11.5Z"
                    fill="#FEFEFE"
                  />
                </svg>
              </a>

              <a
                href="#"
                className="flex items-center justify-center transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="#"
                className="flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-center md:text-right">
              © 2026 Brightside Car Wash & Detailing. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;