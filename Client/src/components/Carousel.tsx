import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselSlide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  height?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  height
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => nextSlide(), autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setFadeKey((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setFadeKey((prev) => prev + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setFadeKey((prev) => prev + 1);
  };

  // Basic swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = e.changedTouches[0]?.clientX ?? startX;
    touchStartX.current = null;
    if (startX == null || endX == null) return;
    const dx = endX - startX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) nextSlide(); else prevSlide();
    }
  };

  return (
    <div
      className="relative overflow-hidden h-[60vh] sm:h-[60vh] md:h-[100dvh]"
      style={height ? { height } : undefined}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide ? 'translate-x-0 z-10' :
            index < currentSlide ? '-translate-x-full z-0' : 'translate-x-full z-0'
          }`}
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})`, zIndex: 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--color-primary-blue)]/70 via-[var(--color-primary-blue)]/60 to-transparent z-10" />

          {/* Content */}
            <div key={fadeKey} className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-full lg:max-w-4xl px-6 sm:px-6 lg:px-12 mx-auto space-y-3 sm:space-y-4 md:space-y-6 fade-in">
              {/* Subtitle */}
              <div className="hidden sm:inline-block bg-[var(--color-primary-orange)]/20 backdrop-blur-sm border border-[var(--color-primary-orange)]/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 fade-in delay-200">
                <span className="text-[var(--color-primary-orange)] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  {slide.subtitle}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-[2.125rem] sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight fade-in delay-400" style={{ fontFamily: 'var(--font-family-heading)' }}>
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl leading-relaxed fade-in delay-600" style={{ fontFamily: 'var(--font-family-body)' }}>
                {slide.description}
              </p>

              {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4 fade-in delay-800 justify-center">
                <Link
                  to="/quote"
                  className="group bg-[var(--color-primary-orange)] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-[var(--color-primary-orange)]/90 transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  Get Quote
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  to="/services"
                  className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-white hover:text-[var(--color-primary-blue)] transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden sm:inline-flex absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all hover:scale-110 z-30"
      >
        <FaChevronLeft size={16} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden sm:inline-flex absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all hover:scale-110 z-30"
      >
        <FaChevronRight size={16} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
             aria-label={`Go to slide ${index + 1}`} 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-[var(--color-primary-orange)] scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
