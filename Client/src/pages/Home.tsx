import React from 'react';
import { FaIndustry, FaGlobe, FaUsers, FaShieldAlt } from 'react-icons/fa';
import Carousel from '../components/Carousel';
import { homeCarouselSlides } from '../data/carouselData';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Carousel Section */}
      <Carousel slides={homeCarouselSlides} />

      {/* Mission & Vision (Asymmetric) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-[1.9rem] sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-blue)] mb-3 sm:mb-4 font-heading text-center">
              Our Mission & Vision
            </h2>
            <p className="text-[var(--color-dark)] max-w-3xl mx-auto text-center">
              Part of the SAI GROUP, established to fill the gap in regional PWHT expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Mission - light card */}
            <div className="lg:col-span-7 bg-[var(--color-neutral-gray)] p-6 sm:p-10 rounded-2xl shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary-blue)] mb-4 font-heading">Mission</h3>
              <p className="text-[var(--color-dark)] mb-4">
                To safely and cost-effectively provide world-class heat treatment solutions, serving routine to the most challenging customer needs.
              </p>
              <p className="text-[var(--color-dark)]">
                Become the most trusted provider in Asia & Middle East with commitment to safety, quality, customer satisfaction, dependability, and flexibility.
              </p>
            </div>
            {/* Vision - dark panel with accent */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl shadow-xl bg-[var(--color-primary-blue)] text-white p-6 sm:p-10">
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[var(--color-primary-orange)]/20 blur-2xl" aria-hidden="true" />
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary-orange)] mb-4 font-heading">Vision 2030</h3>
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

      {/* Stats strip */}
      <section className="bg-[var(--color-neutral-gray)] py-8 sm:py-12">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[{n:'15+', l:'Years Experience'}, {n:'500+', l:'Happy Customers'}, {n:'24/7', l:'Service'},{n:'99%', l:'Success Rate'}].map((s) => (
              <div key={s.l} className="">
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary-blue)] font-heading">{s.n}</div>
                <div className="text-[var(--color-dark)] text-sm sm:text-base">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section id="about" className="py-14 sm:py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-5 order-1 lg:order-none">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/tenweb_media_r8h0xvvhf.jpg"
                  alt="Heat treatment operations"
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary-blue)]/10 to-transparent" />
              </div>
            </div>
            {/* Copy */}
            <div className="lg:col-span-7">
              <h2 className="text-[1.9rem] sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-blue)] font-heading mb-3">About Sai Heat Treatment Solutions</h2>
              <p className="text-[var(--color-dark)] mb-5">
                Founded as part of SAI GROUP, we deliver world‑class heat treatment across oil & gas, power, chemical, and heavy industries throughout India, Asia, and the Middle East.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  'Electrical and burner systems expertise',
                  '300+ skilled technical staff',
                  'Mobile furnaces up to 1200°C',
                  'Quality backed by EN/ASNT Level‑III',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-block w-2.5 h-2.5 rounded-full bg-[var(--color-primary-orange)]" />
                    <span className="text-[var(--color-dark)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence band */}
      <section className="bg-[var(--color-primary-blue)] text-white py-10 sm:py-14">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { title: 'India', desc: 'HQ in Maharashtra with nationwide coverage' },
              { title: 'Asia & Middle East', desc: 'UAE, Oman, Dubai, Sharjah, and expanding' },
              { title: 'Africa', desc: 'Nigeria, Kenya, growing footprint' },
            ].map(x => (
              <div key={x.title} className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="text-[var(--color-primary-orange)] font-extrabold text-2xl mb-1">{x.title}</div>
                <div className="text-white/90 text-sm sm:text-base">{x.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us (Staggered list) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-[1.9rem] sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-blue)] font-heading">
              Why Choose Us
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {icon: <FaGlobe className="text-2xl" />, title:'Global Experience', desc:'Serving Asia, Middle East, and Africa with a proven track record.'},
              {icon: <FaUsers className="text-2xl" />, title:'ASNT Level-III Experts', desc:'EN/ASNT Level-III inspectors ensure the highest quality standards.'},
              {icon: <FaIndustry className="text-2xl" />, title:'Advanced Equipment', desc:'14 PWHT machines (50 KVA), 25+ recorders, mobile furnaces up to 1200°C.'},
              {icon: <FaShieldAlt className="text-2xl" />, title:'Safety First', desc:'Zero incidents goal with structured risk management and safety-first culture.'},
            ].map((f, i) => (
              <div key={f.title} className={`flex items-start gap-4 p-6 rounded-xl shadow-sm border border-[var(--color-light-gray)] hover:shadow-md transition ${i % 2 ? 'md:translate-y-3' : ''}`}>
                <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary-orange)]/15 text-[var(--color-primary-orange)] grid place-items-center">{f.icon}</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-primary-blue)] mb-1 font-heading">{f.title}</h3>
                  <p className="text-[var(--color-dark)] text-sm sm:text-base">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Team (concise) */}
      <section className="py-10 sm:py-12 bg-[var(--color-neutral-gray)]">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-[1.9rem] sm:text-4xl  lg:text-5xl mb-4 font-bold text-[var(--color-primary-blue)] font-heading">Key Team</h2>
            <p className="text-[var(--color-dark)]">Leadership with deep NDT and heat treatment expertise.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Anil Khond */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="h-40 bg-[var(--color-neutral-gray)] border-b border-[var(--color-light-gray)] grid place-items-center text-[var(--color-dark)] text-xs uppercase tracking-wide">Image coming soon</div>
              <div className="p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-primary-blue)] font-heading">Mr. Anil Khond</h3>
                <p className="text-[var(--color-dark)] text-sm mt-1">NDT: PAUT, TOFD, UT, MT, RT, PT</p>
                <ul className="text-[var(--color-dark)] text-sm mt-3 space-y-1">
                  <li>• ASNT Level III | ISO 9712 Level III</li>
                  <li>• 13+ years in NDT</li>
                </ul>
              </div>
            </div>

            {/* Naresh Kolekar */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="h-40 bg-[var(--color-neutral-gray)] border-b border-[var(--color-light-gray)] grid place-items-center text-[var(--color-dark)] text-xs uppercase tracking-wide">Image coming soon</div>
              <div className="p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-primary-blue)] font-heading">Mr. Naresh Kolekar</h3>
                <p className="text-[var(--color-dark)] text-sm mt-1">Heat Treatment Specialist</p>
                <ul className="text-[var(--color-dark)] text-sm mt-3 space-y-1">
                  <li>• Electrical, Oil & Gas firing methods</li>
                  <li>• 32+ years experience</li>
                </ul>
              </div>
            </div>

            {/* Dharmendra Sharma */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="h-40 bg-[var(--color-neutral-gray)] border-b border-[var(--color-light-gray)] grid place-items-center text-[var(--color-dark)] text-xs uppercase tracking-wide">Image coming soon</div>
              <div className="p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-primary-blue)] font-heading">Mr. Dharmendra Sharma</h3>
                <p className="text-[var(--color-dark)] text-sm mt-1">Heat Treatment Specialist</p>
                <ul className="text-[var(--color-dark)] text-sm mt-3 space-y-1">
                  <li>• Electrical, Oil & Gas firing methods</li>
                  <li>• 26+ years experience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
