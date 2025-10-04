import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-6xl font-extrabold text-[var(--color-primary-blue)]">404</h1>
        <p className="mt-4 text-xl text-gray-700">Page not found</p>
        <p className="mt-2 text-gray-500">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-block bg-[var(--color-primary-orange)] text-[var(--color-dark)] font-semibold py-2 px-4 rounded-full hover:bg-[var(--color-primary-orange)]/90 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/contact"
            className="inline-block border border-[var(--color-primary-blue)] text-[var(--color-primary-blue)] font-semibold py-2 px-4 rounded-full hover:bg-[var(--color-primary-blue)] hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
