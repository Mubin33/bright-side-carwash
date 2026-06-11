import React from "react";
import Image from "next/image";

const CTASection: React.FC = () => {
    return (
        <section className="relative w-full  bg-white py-12">
            <div className="mx-4 lg:mx-8 2xl:mx-0">

                <div className="relative rounded-[24px] overflow-hidden max-w-[1600px] mx-auto px-4 lg:px-0 ">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/home/cta1.png"
                            alt="Car wash background"
                            fill
                            className="object-cover "
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16 ">
                        {/* Left Side - Text Content */}
                        <div className="flex flex-col justify-center space-y-6">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                Ready for a Cleaner Car?
                            </h2>

                            <p className="text-lg sm:text-xl text-gray-300 max-w-lg">
                                Claim Your Offer Today
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="bg-[#B23730]  hover:scale-105 cursor-pointer text-white font-bold text-base  px-8 py-4 rounded-[12px] transition-all duration-200 uppercase whitespace-nowrap">
                                    Join Membership
                                </button>

                                <button className="bg-white  hover:scale-105 cursor-pointer text-[#B23730] font-bold text-base  px-8 py-4 rounded-[12px] transition-all duration-200 uppercase whitespace-nowrap">
                                    Book Detailing
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Person Image */}
                        <div className="relative flex items-center justify-center md:justify-start lg:justify-end min-h-[300px] lg:min-h-[400px]">
                            <div className="relative w-full max-w-[400px] md:max-w-[750px] lg:max-w-[500px]">
                                <Image
                                    src="/home/cta2.png"
                                    alt="Car wash professional"
                                    width={500}
                                    height={600}
                                    className="w-full h-auto object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
