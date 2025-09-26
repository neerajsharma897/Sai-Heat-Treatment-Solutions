import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 sticky-bottom text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Logo + About */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <img
            src="/Sai_logo.png"
            alt="Sai Group Logo"
            className="h-20 w-20"
          />
          <h3 className="text-xl font-bold text-primary-orange">
            Sai Group Of Companies
          </h3>
          <p className="text-gray-400 text-sm text-center md:text-left">
            Providing reliable heat treatment solutions with advanced
            technology and expert services.
          </p>
        </div>

        {/* Quick Links / Services */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg mb-4 border-b-2 border-primary-orange pb-2">
            Our Services
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/services"
                className="text-gray-300 hover:text-primary-orange transition-colors"
              >
                PWHT / Stress Relief
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-gray-300 hover:text-primary-orange transition-colors"
              >
                Preheating
              </Link>
            </li>
            {/* Add more if needed */}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg mb-4 border-b-2 border-primary-orange pb-2">
            Contact Us
          </h3>
          <p className="text-gray-400 text-sm">
            Plot No. A-100, Addl. Ambernath MIDC, Anand Nagar, Ambernath (E)
          </p>
          <p className="text-gray-400 text-sm">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:saiheattreatmentsolution@gmail.com"
              className="hover:text-primary-orange transition-colors"
            >
              saiheattreatmentsolution@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-orange py-4">
        <p className="container mx-auto px-6 text-center text-black text-sm">
          © {currentYear} Sai Group Of Companies. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
