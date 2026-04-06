"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import React, { ReactNode } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SwapperProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  effect?: 'cards' | 'slide' | 'fade' | 'cube' | 'flip' | 'creative';
  autoplay?: boolean | { delay: number; disableOnInteraction: boolean };
  loop?: boolean;
  onSwiper?: (swiper: SwiperType) => void;
  onSlideChange?: (swiper: SwiperType) => void;
}

export function Swapper<T>({
  items,
  renderItem,
  className = "",
  effect = "cards",
  autoplay = false,
  loop = true,
  onSwiper,
  onSlideChange
}: SwapperProps<T>) {
  return (
    <div className={`w-full h-full ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        .mySwiper .swiper-slide {
          border-radius: 2.5rem !important;
          overflow: hidden !important;
          background: transparent !important;
        }
        .mySwiper .swiper-slide-shadow,
        .mySwiper .swiper-slide-shadow-cards,
        .mySwiper .swiper-slide-shadow-left,
        .mySwiper .swiper-slide-shadow-right {
          border-radius: 2.5rem !important;
        }
      `}} />
      <Swiper
        effect={effect}
        grabCursor={true}
        modules={[EffectCards, Navigation, Pagination, Autoplay]}
        className="mySwiper w-full h-full"
        autoplay={autoplay}
        loop={loop}
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
        centeredSlides={true}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center bg-transparent">
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
