"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MarqueeItem {
  id: number;
  text: string;
  image: string;
  color: string;
  bgColor: string;
}

const marqueeItems: MarqueeItem[] = [
  {
    id: 1,
    text: "Beauty & Skin",
    image: "/images/all/steptodown.com195727.jpg",
    color: "#E2779B",
    bgColor: "#FDF2F8",
  },
  {
    id: 2,
    text: "Hair & Salon",
    image: "/images/all/steptodown.com239490.jpg",
    color: "#EF813D",
    bgColor: "#FFFBEB",
  },
  {
    id: 3,
    text: "Spa & Therapy",
    image: "/images/all/steptodown.com750516.jpg",
    color: "#0D9488",
    bgColor: "#F0FDFA",
  },
  {
    id: 4,
    text: "Fitness & Yoga",
    image: "/images/all/steptodown.com575388.jpg",
    color: "#2563EB",
    bgColor: "#EFF6FF",
  },
  {
    id: 5,
    text: "Nutrition & Wellness",
    image: "/images/all/steptodown.com222353.jpg",
    color: "#059669",
    bgColor: "#ECFDF5",
  },
  {
    id: 6,
    text: "Mental Wellness",
    image: "/images/all/steptodown.com968256.jpg",
    color: "#6B7280",
    bgColor: "#F5F3FF",
  },
];

export function InfiniteMarquee() {
  const [duplicatedItems, setDuplicatedItems] = useState<MarqueeItem[]>([]);

  useEffect(() => {
    setDuplicatedItems([...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white py-12 select-none border-y border-gray-50">
      <div className="flex flex-col gap-8 sm:gap-10 md:gap-16">
        {/* Row 1 - Right to Left */}
        <div className="relative flex overflow-x-hidden">
          <motion.div
            animate={{
              x: ["0%", "-33.33%"], // Adjusted for 5x duplication to ensure seamless loop
            }}
            transition={{
              duration: 100, // Significantly slower
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center gap-10 whitespace-nowrap px-5 sm:gap-12 sm:px-6 md:gap-16 md:px-8"
          >
            {duplicatedItems.map((item, i) => (
              <div key={`row1-${item.id}-${i}`} className="flex items-center gap-4 sm:gap-5 md:gap-6">
                <div 
                  className="w-28 h-16 md:w-44 md:h-24 rounded-md overflow-hidden shrink-0 shadow-lg border border-gray-100" 
                >
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span 
                  className="text-2xl sm:text-4xl md:text-7xl font-medium tracking-tighter"
                  style={{ color: item.color, fontFamily: "serif" }}
                >
                  {item.text.toLowerCase()}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Left to Right */}
        <div className="relative flex overflow-x-hidden">
          <motion.div
            animate={{
              x: ["-33.33%", "0%"],
            }}
            transition={{
              duration: 110, // Significantly slower
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center gap-10 whitespace-nowrap px-5 sm:gap-12 sm:px-6 md:gap-16 md:px-8"
          >
            {duplicatedItems.map((item, i) => (
              <div key={`row2-${item.id}-${i}`} className="flex items-center gap-4 sm:gap-5 md:gap-6">
                <div 
                  className="w-28 h-16 md:w-44 md:h-24 rounded-md overflow-hidden shrink-0 shadow-lg border border-gray-100" 
                >
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span 
                  className="text-2xl sm:text-4xl md:text-7xl font-medium tracking-tighter"
                  style={{ color: item.color, fontFamily: "serif" }}
                >
                  {item.text.toLowerCase()}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
