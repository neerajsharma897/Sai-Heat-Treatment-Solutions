import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaIndustry, FaGlobe, FaCertificate, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Animated Counter Component
const AnimatedCounter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({
  end,
  suffix = '',
  duration = 2000
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-4xl font-bold text-primary-orange mb-2">
      {count}{suffix}
    </div>
  );
};

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      title: "Sai Heat Treatment Solution",
      subtitle: "Leading PWHT & Heat Treatment Specialists",
      description: "Safely and cost-effectively providing world-class heat treatment solutions across Asia, Middle East & Africa since 2022.",
      image: '/tenweb_media_rf7rq7x5p.jpg'
    },
    {
      title: "300+ Technical Staff",
      subtitle: "Experienced Professionals at Your Service",
      description: "Our team includes ASNT Level-III inspectors and heat treatment specialists with decades of combined experience.",
      image: '/tenweb_media_RWW2L8TB4.jpg'
    },
    {
      title: "24-Hour Response",
      subtitle: "Prompt & Reliable Service",
      description: "Dedicated staff and equipment ready to handle routine to the most challenging customer needs across multiple continents.",
      image: '/tenweb_media_syr79yfpg.jpg'
    },
    {
      title: "Zero Incidents Goal",
      subtitle: "Safety-First Culture",
      description: "Committed to safety excellence with structured risk management and strict adherence to international safety standards.",
      image: '/tenweb_media_r8h0xvvhf.jpg'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);

  return (
    <div>
      {/* Hero Carousel Section */}
      <div className="relative h-[80vh] overflow-hidden">
        {carouselData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide ? 'translate-x-0' :
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary-blue/80 to-primary-blue/40 flex items-center justify-center text-center">
              <div className="max-w-4xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in font-heading">
                  {slide.title}
                </h1>
                <h2 className="text-2xl md:text-3xl text-black font-semibold mb-6">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl text-black mb-8 max-w-3xl mx-auto">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="bg-primary-orange text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary-orange/90 transition-all hover:shadow-lg hover:-translate-y-0.5">
                    Get Quote
                  </Link>
                  <Link to="/services" className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-primary-blue transition-all hover:shadow-lg hover:-translate-y-0.5">
                    Our Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-primary-orange' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Company Stats Section */}
      <section className="py-16 bg-primary-blue text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <AnimatedCounter end={300} suffix="+" />
              <div className="text-lg">Technical Staff</div>
            </div>
            <div className="p-6">
              <AnimatedCounter end={2022} />
              <div className="text-lg">Founded</div>
            </div>
            <div className="p-6">
              <AnimatedCounter end={24} suffix="/7" />
              <div className="text-lg">Response Time</div>
            </div>
            <div className="p-6">
              <AnimatedCounter end={3} />
              <div className="text-lg">Continents Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-blue mb-4 font-heading">Our Mission & Vision</h2>
            <p className="text-black max-w-3xl mx-auto">
              Part of the SAI GROUP, established to fill the gap in regional PWHT expertise
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-neutral-gray p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-primary-blue mb-4 font-heading">Mission</h3>
              <p className="text-black mb-4">
                To safely and cost-effectively provide world-class heat treatment solutions, serving routine to the most challenging customer needs.
              </p>
              <p className="text-black">
                Become the most trusted provider in Asia & Middle East with commitment to safety, quality, customer satisfaction, dependability, and flexibility.
              </p>
            </div>
            <div className="bg-primary-blue text-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-primary-orange mb-4 font-heading">Vision 2030</h3>
              <p className="mb-4">
                Establish SHS as a regional leader in heat treatment services and gain continental recognition in Asia and Africa.
              </p>
              <p>
                Achieve leadership through innovation, collaboration, project excellence, and customer service perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-neutral-gray">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-primary-blue mb-12 font-heading">Why Choose Sai Heat Treatment Solution?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <FaGlobe className="text-5xl text-primary-orange mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-blue mb-4 font-heading">Global Experience</h3>
              <p className="text-black">Extensive experience serving clients across Asia, Middle East, and Africa with proven track record.</p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <FaCertificate className="text-5xl text-primary-orange mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-blue mb-4 font-heading">ASNT Level-III Experts</h3>
              <p className="text-black">Team includes experienced EN/ASNT Level-III inspectors ensuring highest quality standards.</p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <FaIndustry className="text-5xl text-primary-orange mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-blue mb-4 font-heading">Advanced Equipment</h3>
              <p className="text-black">14 PWHT machines (50 KVA), 25+ temperature recorders, mobile furnaces up to 1200°C.</p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl text-primary-orange mx-auto mb-4 flex justify-center">🛡️</div>
              <h3 className="text-xl font-semibold text-primary-blue mb-4 font-heading">Safety First</h3>
              <p className="text-black">Zero incidents goal with structured risk management and safety-first culture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-blue mb-4 font-heading">Our Specialized Services</h2>
            <p className="text-black">Comprehensive heat treatment solutions for diverse industrial applications</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border-2 border-neutral-gray rounded-lg hover:border-primary-orange hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-semibold text-primary-blue mb-2 font-heading">PWHT / Stress Relief</h4>
              <p className="text-black">Post-weld heat treatment for improved corrosion resistance</p>
            </div>
            <div className="text-center p-6 border-2 border-neutral-gray rounded-lg hover:border-primary-orange hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-semibold text-primary-blue mb-2 font-heading">Preheating & Annealing</h4>
              <p className="text-black">Controlled heating processes for optimal material properties</p>
            </div>
            <div className="text-center p-6 border-2 border-neutral-gray rounded-lg hover:border-primary-orange hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-semibold text-primary-blue mb-2 font-heading">Dry Out Systems</h4>
              <p className="text-black">High-velocity burners and electrical heating solutions</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/services" className="bg-primary-orange text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-orange/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;