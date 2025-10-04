import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 sticky-bottom" role="contentinfo" aria-label="Site footer">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 text-white flex flex-col gap-10 md:flex-row md:gap-12">
        {/* Logo + About */}
        <div className="flex flex-col items-start space-y-4 text-left md:basis-[37.5%] md:flex-none">
          <img src="/Sai_logo.png" alt="Sai Group Logo" className="h-20 w-20" />
          <h3 className="text-xl font-bold text-[var(--color-primary-orange)]">Sai Group Of Companies</h3>
          <p className="text-gray-400 text-sm">
            Founded as part of SAI GROUP, we deliver world‑class heat treatment across oil & gas, power,
            chemical, and heavy industries throughout India, Asia, and the Middle East.
          </p>
        </div>

        {/* Quick Links / Services */}
        <div className="flex flex-col items-start text-left md:basis-[25%] md:flex-none">
          <h3 className="font-bold text-lg mb-4 border-b-2 border-[var(--color-primary-orange)] pb-2">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/services" className="text-gray-300 hover:text-[var(--color-primary-orange)] transition-colors">
                PWHT / Stress Relief
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-300 hover:text-[var(--color-primary-orange)] transition-colors">
                Preheating
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-300 hover:text-[var(--color-primary-orange)] transition-colors">
                Temporary Electric Furnace
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-300 hover:text-[var(--color-primary-orange)] transition-colors">
                Annealing & Normalizing
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-300 hover:text-[var(--color-primary-orange)] transition-colors">
                Hydrogen diffusion
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-300 hover:text-[var(--color-primary-orange)] transition-colors">
                Dry Out System
              </Link>
            </li>
            {/* Add more if needed */}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-start text-left md:basis-[37.5%] md:flex-none">
          <h3 className="font-bold text-lg mb-4 border-b-2 border-[var(--color-primary-orange)] pb-2">Contact Us</h3>
          <p className="text-gray-400 text-sm mt-2">
            <strong>Phone:</strong>{" "}
            <a href="tel:+919321613552" className="hover:text-[var(--color-primary-orange)] transition-colors">
              +91 93216 13552
            </a>
          </p>
          <p className="text-gray-400 text-sm">
            <strong>Email:</strong>{" "}
            <a href="mailto:saiheattreatmentsolution@gmail.com" className="hover:text-[var(--color-primary-orange)] transition-colors">
              saiheattreatmentsolution@gmail.com
            </a>
          </p>
          <div className="text-gray-400 text-sm mt-3">
            <p className="font-semibold text-white">Hours</p>
            <ul className="mt-1 space-y-1">
              <li>Mon – Sat: 10 am – 6 pm</li>
              <li>Sun: Closed</li>
              <li className="text-gray-500">Holidays: Hours might differ</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[var(--color-primary-orange)] py-4">
        <p className="container mx-auto px-6 text-center text-black text-sm">
          © {currentYear} Sai Group Of Companies. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
