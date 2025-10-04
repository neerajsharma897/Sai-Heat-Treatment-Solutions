import React from 'react';
import { FaTools, FaIndustry, FaCogs } from 'react-icons/fa';

// Define the type for a single service object
interface Service {
  title: string;
  description: string;
  img: string;
}

const Services: React.FC = () => {
  const primaryServices: Service[] = [
    {
      title: "PWHT/Stress Relief",
      description: "Post Weld Heat Treatment crucial for improving corrosion resistance and eliminating residual stresses from welding. We use advanced heating elements and combustion oil/gas burners with precise temperature control.",
      img: "/Website gallery/28042013024.jpg"
    },
    {
      title: "Preheating",
      description: "Controlled preheating slows the cooling process after welding, reducing defects like cold cracks and lowering residual stress. Process maintained until welding completion with continuous monitoring.",
      img: "/Website gallery/16072007068.jpg"
    },
    {
      title: "Dry Out System",
      description: "Specialized service for newly installed refractory in high-temperature processes. We deploy high-velocity burners or electrical heating elements to prevent stress cracking and ensure refractory longevity.",
      img: "/Website gallery/IMG_20160403_020811.jpg"
    },
    {
      title: "Annealing & Normalizing",
      description: "Heat treatment processes to alter material microstructure, improving mechanical properties like toughness and ductility while relieving internal stresses for optimal performance.",
      img: "/Website gallery/2014710210020.jpg"
    },
    {
      title: "Hydrogen Diffusion",
      description: "Specialized process to remove hydrogen absorbed during welding that can cause cracking. Involves precise heating to specific temperatures allowing safe hydrogen diffusion.",
      img: "/Website gallery/IMG_0071.JPG"
    },
    {
      title: "Temporary Electric Furnace",
      description: "Essential for efficiently handling PWHT for multiple objects, especially when adhering to ASME standards. Our mobile furnaces accelerate project schedules with temperatures up to 1200°C.",
      img: "/Website gallery/IMG_0066.JPG" 
    }
  ];

  const additionalServices: Service[] = [
    {
      title: "Intermediate Stress Relieving",
      description: "Intermediate heat treatment between welding passes to control residual stress buildup in multi-pass welds and complex fabrications.",
      img: "/tenweb_media_RWW2L8TB4.jpg"
    },
    {
      title: "Paint Baking",
      description: "Controlled heating process for curing paint coatings to achieve optimal adhesion, durability, and finish quality on industrial equipment.",
      img: "/tenweb_media_syr79yfpg.jpg"
    },
    {
      title: "Internal Gas & Oil Firing",
      description: "Internal firing systems for large vessels and tanks using gas and oil burners with precise temperature distribution and control systems.",
      img: "/tenweb_media_r8h0xvvhf.jpg"
    },
    {
      title: "External Gas & Oil Firing",
      description: "External heating solutions using multiple capacity burners for various applications with advanced safety and monitoring systems.",
      img: "/tenweb_media_rf7rq7x5p.jpg"
    },
    {
      title: "Tempering Services",
      description: "Controlled tempering processes to achieve desired hardness and toughness balance in heat-treated components for optimal service performance.",
      img: "/tenweb_media_r03qb6za6.jpg"
    }
  ];
  return (
    <div>
      {/* Hero Image under Navbar (no carousel) */}
  <section className="relative h-[20dvh] sm:h-[20dvh] lg:h-[34dvh] overflow-hidden">
        <img
          src="/tenweb_media_rf7rq7x5p.jpg"
          alt="Heat treatment services"
          className="absolute inset-0 w-full h-full object-cover"
        />
  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--color-primary-blue)]/70 via-[var(--color-primary-blue)]/60 to-transparent backdrop-blur-[2px] sm:backdrop-blur" />
        <div className="relative h-full w-full max-w-7xl mx-auto px-3 sm:px-6 flex items-center pb-6 sm:pb-10">
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white font-heading leading-tight">Heat Treatment Services</h1>
            <p className="text-white/90 max-w-2xl mt-2 text-sm sm:text-base">Comprehensive PWHT and heat treatment solutions for oil & gas, power, chemical, and heavy fabrication across Asia, the Middle East, and Africa.</p>
          </div>
        </div>
      </section>

      {/* Services Overview Grid */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-[1.9rem] sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-blue)] font-heading">Core Services</h2>
            <p className="text-[var(--color-dark)] max-w-3xl mx-auto">High‑precision field and shop heat treatment with full data logging and code compliance.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {primaryServices.map((service) => (
              <div key={service.title} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col">
                <img src={service.img} alt={service.title} className="w-full h-44 sm:h-56 object-cover" loading="lazy" />
                <div className="p-6 flex flex-col gap-3 flex-grow">
                  <h3 className="text-xl font-semibold text-[var(--color-primary-blue)] font-heading">{service.title}</h3>
                  <p className="text-[var(--color-dark)] text-sm sm:text-base leading-relaxed flex-grow">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-12 sm:py-16 bg-[var(--color-neutral-gray)]">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary-blue)] font-heading">Additional Capabilities</h2>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {additionalServices.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition grow-0 shrink-0 basis-[300px] sm:basis-[340px] lg:basis-[360px] max-w-full"
              >
                <h3 className="text-lg font-semibold text-[var(--color-primary-blue)] mb-2 font-heading">{service.title}</h3>
                <p className="text-[var(--color-dark)] text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PWHT / Stress Relief (Deep Dive) */}
  <section id="pwht" className="py-14 sm:py-20 bg-white scroll-mt-[var(--nav-h)]">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-[var(--color-light-gray)]">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-blue)] mb-3 font-heading">PWHT / Stress Relief</h2>
                <p className="text-[var(--color-dark)] mb-4">
                  Post‑weld heat treatment (PWHT) reduces residual stresses, controls hardness, and improves toughness—enhancing corrosion resistance and ensuring durable, code‑compliant performance.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--color-primary-blue)] mb-2 font-heading">When it’s required</h3>
                    <ul className="text-[var(--color-dark)] space-y-2 text-sm">
                      <li>• Pressure vessels, piping, and headers (ASME/ANSI)</li>
                      <li>• Thick‑section welds to mitigate HAZ hardness</li>
                      <li>• Sour service / HIC‑susceptible materials</li>
                      <li>• Repair welds on in‑service equipment</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--color-primary-blue)] mb-2 font-heading">Benefits</h3>
                    <ul className="text-[var(--color-dark)] space-y-2 text-sm">
                      <li>• Relieves residual welding stresses</li>
                      <li>• Reduces hardness and improves ductility</li>
                      <li>• Improves corrosion and crack resistance</li>
                      <li>• Extends service life and reliability</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <img src="/tenweb_media_RWW2L8TB4.jpg" alt="PWHT in progress" className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-md" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-[var(--color-neutral-gray)] rounded-xl p-5 border border-[var(--color-light-gray)]">
                <h4 className="text-lg font-semibold text-[var(--color-primary-blue)] mb-2 font-heading">Specs & Compliance</h4>
                <ul className="text-[var(--color-dark)] space-y-1 text-sm">
                  <li>• Temperature ranges: 200°C–760°C (material dependent)</li>
                  <li>• Codes: ASME Sec. VIII/IX, B31.1, B31.3, API 650/653</li>
                  <li>• Controlled ramp, soak, and cool‑down rates</li>
                  <li>• Multi‑point thermocouple monitoring</li>
                </ul>
              </div>
              <div className="bg-[var(--color-neutral-gray)] rounded-xl p-5 border border-[var(--color-light-gray)]">
                <h4 className="text-lg font-semibold text-[var(--color-primary-blue)] mb-2 font-heading">Methods We Use</h4>
                <ul className="text-[var(--color-dark)] space-y-1 text-sm">
                  <li>• Electrical resistance blankets for local PWHT</li>
                  <li>• Temporary electric furnaces (up to 1200°C)</li>
                  <li>• Internal/external gas & oil firing for large items</li>
                  <li>• Automated data logging and reports</li>
                </ul>
              </div>
            </div>

              <div className="mt-6">
              <h4 className="text-lg font-semibold text-[var(--color-primary-blue)] mb-2 font-heading">Typical Applications</h4>
              <div className="flex flex-wrap gap-2">
                {['Pipeline girth welds','Pressure vessels','Boilers','Heat exchangers','Valves & fittings','Casting repairs'].map(x => (
                  <span key={x} className="px-3 py-1.5 rounded-full bg-[var(--color-primary-orange)]/10 text-[var(--color-primary-orange)] text-sm">{x}</span>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <a href="/quote" className="bg-[var(--color-primary-orange)] text-[var(--color-dark)] font-semibold py-3 px-4 rounded-full hover:bg-[var(--color-primary-orange)]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">Request a PWHT Quote</a>
            </div>
          </div>
        </div>
      </section>

      {/* Design & Manufacturing */}
      <section className="py-12 sm:py-16 bg-[var(--color-neutral-gray)]">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary-blue)] mb-6 text-center font-heading">Design & Manufacturing</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-primary-orange)]/15 text-[var(--color-primary-orange)] grid place-items-center text-2xl">
                  <FaTools aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-[var(--color-primary-blue)] mb-2 font-heading">PWHT Machines</h4>
                <p className="text-[var(--color-dark)] text-sm">Design and manufacturing of custom PWHT machines for specific applications</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-primary-orange)]/15 text-[var(--color-primary-orange)] grid place-items-center text-2xl">
                  <FaIndustry aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-[var(--color-primary-blue)] mb-2 font-heading">Permanent Furnaces</h4>
                <p className="text-[var(--color-dark)] text-sm">Manual and automated furnace systems for continuous operations</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-primary-orange)]/15 text-[var(--color-primary-orange)] grid place-items-center text-2xl">
                  <FaCogs aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-[var(--color-primary-blue)] mb-2 font-heading">Heat Transfer Equipment</h4>
                <p className="text-[var(--color-dark)] text-sm">Rotating machines and specialized heat transfer equipment</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;