import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const EMAIL = 'saiheattreatmentsolution@gmail.com';
// Assumed India country code based on location; change if needed
const PHONE_DISPLAY = '+91 93216 13552';
const PHONE_TEL = '+919321613552';
const ADDRESS_POSTAL = 'Plot No. A-12, Near Rotary equipment, Anand Nagar, Ambernath (E), Maharashtra 421506, India';
const PLACE_QUERY = 'Sai Heat Treatment Solutions, Ambernath, Maharashtra, India';

const Contact: React.FC = () => {
                // Use place name so the map bubble shows the company label instead of Plus Code
                const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(PLACE_QUERY)}&z=17&output=embed`;

    return (
        <div>
            {/* Hero image band */}
            <section className="relative h-[20dvh] sm:h-[20dvh] lg:h-[34dvh] overflow-hidden">
                <img
                    src="/tenweb_media_r8h0xvvhf.jpg"
                    alt="Contact Sai Heat Treatment Solutions"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--color-primary-blue)]/70 via-[var(--color-primary-blue)]/60 to-transparent backdrop-blur-[2px] sm:backdrop-blur" />
                <div className="relative h-full w-full max-w-7xl mx-auto px-3 sm:px-6 flex items-center pb-6 sm:pb-10">
                    <div>
                        <h1 className="text-3xl sm:text-5xl font-bold text-white font-heading leading-tight">Contact Us</h1>
                        <p className="text-white/90 max-w-2xl mt-2 text-sm sm:text-base">We’re here to help—reach us for quotes, scheduling, or technical guidance.</p>
                    </div>
                </div>
            </section>

            {/* Main content */}
                    <section className="py-14 sm:py-20 bg-white">
                        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
                            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                                {/* Contact info + CTAs */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-[var(--color-light-gray)] md:h-full">
                            <h2 className="text-2xl font-bold text-[var(--color-primary-blue)] mb-4 font-heading">Talk to us</h2>
                            <p className="text-[var(--color-dark)] mb-6">Fastest responses via phone or email. Share drawings/specs for accurate quotes.</p>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <FaPhone className="text-[var(--color-primary-orange)] text-xl mr-3" />
                                    <a href={`tel:${PHONE_TEL}`} className="text-[var(--color-primary-blue)] font-semibold hover:underline">{PHONE_DISPLAY}</a>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="text-[var(--color-primary-orange)] text-xl mr-3" />
                                    <a href={`mailto:${EMAIL}`} className="text-[var(--color-primary-blue)] font-semibold hover:underline">{EMAIL}</a>
                                </div>
                                    <div className="flex items-start">
                                    <FaMapMarkerAlt className="text-[var(--color-primary-orange)] text-xl mr-3 mt-1" />
                                    <div className="text-[var(--color-dark)]">{ADDRESS_POSTAL}</div>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-3 items-stretch sm:items-center sm:justify-start">
                                <a  href={`tel:${PHONE_TEL}`} className="w-full sm:w-auto text-center bg-[var(--color-primary-orange)] text-white font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--color-primary-orange)]/90 transition"> Call Now </a>
                                <a  href={`mailto:${EMAIL}`} className="w-full sm:w-auto text-center bg-white border border-[var(--color-primary-blue)] text-[var(--color-primary-blue)] font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--color-neutral-gray)] transition"> Email Us </a>
                                <a  href="/quote" className="w-full sm:w-auto text-center bg-white border border-[var(--color-primary-blue)] text-[var(--color-primary-blue)] font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--color-neutral-gray)] transition"> Get a Quote </a>
                            </div>
                        </div>

                        {/* Map embed (paired for balanced proportions) */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[var(--color-light-gray)] md:h-full">
                            <div className="h-[280px] sm:h-[340px] md:h-full w-full">
                                <iframe
                                    title="Sai Heat Treatment Solutions Location"
                                    src={mapEmbedSrc}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;