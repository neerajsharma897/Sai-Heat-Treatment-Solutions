import React from 'react';

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
      img: "/tenweb_media_RWW2L8TB4.jpg"
    },
    {
      title: "Preheating",
      description: "Controlled preheating slows the cooling process after welding, reducing defects like cold cracks and lowering residual stress. Process maintained until welding completion with continuous monitoring.",
      img: "/tenweb_media_syr79yfpg.jpg"
    },
    {
      title: "Dry Out System",
      description: "Specialized service for newly installed refractory in high-temperature processes. We deploy high-velocity burners or electrical heating elements to prevent stress cracking and ensure refractory longevity.",
      img: "/tenweb_media_r8h0xvvhf.jpg"
    },
    {
      title: "Annealing & Normalizing",
      description: "Heat treatment processes to alter material microstructure, improving mechanical properties like toughness and ductility while relieving internal stresses for optimal performance.",
      img: "/tenweb_media_rf7rq7x5p.jpg"
    },
    {
      title: "Hydrogen Diffusion",
      description: "Specialized process to remove hydrogen absorbed during welding that can cause cracking. Involves precise heating to specific temperatures allowing safe hydrogen diffusion.",
      img: "/tenweb_media_r03qb6za6.jpg"
    },
    {
      title: "Temporary Electric Furnace",
      description: "Essential for efficiently handling PWHT for multiple objects, especially when adhering to ASME standards. Our mobile furnaces accelerate project schedules with temperatures up to 1200°C.",
      img: "https://i.imgur.com/k2gCg2j.jpeg" 
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
    <div className="bg-brand-light py-20">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary-blue mb-4">Heat Treatment Services</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Comprehensive PWHT and heat treatment solutions serving oil & gas plants, power plants, 
            chemical plants, heavy fabrication, and more across Asia, Middle East & Africa.
          </p>
        </div>

        {/* Primary Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-blue mb-8 text-center">Core Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {primaryServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-primary-blue mb-3">{service.title}</h3>
                  <p className="text-black leading-relaxed flex-grow">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-blue mb-8 text-center">Additional Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-primary-blue mb-3">{service.title}</h3>
                <p className="text-black text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturing & Design Services */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary-blue mb-6 text-center">Design & Manufacturing</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl mb-4">🔧</div>
              <h4 className="font-semibold text-primary-blue mb-2">PWHT Machines</h4>
              <p className="text-black text-sm">Design and manufacturing of custom PWHT machines for specific applications</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🏭</div>
              <h4 className="font-semibold text-primary-blue mb-2">Permanent Furnaces</h4>
              <p className="text-black text-sm">Manual and automated furnace systems for continuous operations</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">⚙️</div>
              <h4 className="font-semibold text-primary-blue mb-2">Heat Transfer Equipment</h4>
              <p className="text-black text-sm">Rotating machines and specialized heat transfer equipment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;