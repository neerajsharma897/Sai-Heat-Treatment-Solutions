import React from 'react';
import { FaMapMarkerAlt, FaUserAlt , FaCalendar, FaTools } from 'react-icons/fa';

interface Project {
    title: string;
    location: string;
    country: string;
    description: string;
    services: string[];
    client: string;
    year?: string;
}

const Projects: React.FC = () => {
    const majorProjects: Project[] = [
        {
            title: "Spherical Tank Heat Treatment",
            location: "Lagos",
            country: "Nigeria",
            description: "Successfully completed heat treatment of a massive 25m diameter spherical tank using advanced oil firing method. This project demonstrated our capability to handle large-scale industrial heat treatment in challenging environments.",
            services: ["PWHT", "Oil Firing Method", "Large Scale Operations"],
            client: "Major Oil & Gas Company",
            year: "2023",
        },
        {
            title: "Hamriyah IPP 1800 CCPP Project",
            location: "Hamriyah",
            country: "UAE",
            description: "Comprehensive heat treatment services for the Hamriyah Independent Power Project 1800MW Combined Cycle Power Plant, ensuring optimal performance and longevity of critical components.",
            services: ["PWHT", "Preheating", "Stress Relief"],
            client: "Jurong Engineering PTE Ltd",
            year: "2023-2024",
        },
        {
            title: "CSP + PV Hybrid Project",
            location: "Dubai",
            country: "UAE",
            description: "Heat treatment services for the innovative Concentrated Solar Power and Photovoltaic hybrid renewable energy project, contributing to UAE's sustainable energy goals.",
            services: ["PWHT", "Equipment Heat Treatment"],
            client: "China Energy Engineering Group",
            year: "2024",
        },
        {
            title: "Moray Project",
            location: "Dubai",
            country: "UAE",
            description: "Specialized heat treatment services for offshore wind energy project components, ensuring durability and performance in marine environments.",
            services: ["PWHT", "Hydrogen Diffusion", "Corrosion Resistance Treatment"],
            client: "Lamprell Energy FZE",
            year: "2023",
        },
        {
            title: "Dangote Refinery Project",
            location: "Lagos",
            country: "Nigeria",
            description: "Heat treatment services for Africa's largest oil refinery project, handling critical components for the 650,000 barrels per day facility.",
            services: ["PWHT", "Stress Relief", "Large Scale Operations"],
            client: "International Contractor",
            year: "2023-2024",
        },
        {
            title: "Ammonia Storage Tanks",
            location: "Pune",
            country: "India",
            description: "Heat treatment of large ammonia storage tanks for chemical processing facility, ensuring safety and regulatory compliance for hazardous material storage.",
            services: ["PWHT", "Stress Relief", "Safety Compliance"],
            client: "Spark Engineers",
            year: "2023",
        },
        {
            title: "Oxygen/Nitrogen Storage Tanks",
            location: "Ambernath",
            country: "India",
            description: "Local project involving heat treatment of cryogenic storage tanks for industrial gas applications, showcasing our expertise in specialized gas storage solutions.",
            services: ["PWHT", "Cryogenic Treatment", "Industrial Gas Storage"],
            client: "Spacetech Equipment & Structural Pvt. Ltd.",
            year: "2023",
        },
        {
            title: "Horton Sphere Heat Treatment",
            location: "Nairobi",
            country: "Kenya",
            description: "Successfully completed heat treatment of a 22m diameter Horton Sphere for petroleum storage, expanding our African operations and expertise.",
            services: ["PWHT", "Spherical Vessel Treatment", "Petroleum Storage"],
            client: "Optech Kenya",
            year: "2024",
        }
    ];

    const clients = [
        "Jurong Engineering PTE Ltd (Sharjah)",
        "Lamprell Energy FZE (Dubai)",
        "China Energy Engineering Group (Dubai)",
        "Ajmal Steel Tubes & Pipes (UAE)",
        "Quality International (Sharjah)",
        "Jindal Drilling & Industries (Dubai)",
        "Chemie-Tech (Dubai)",
        "Spacetech Equipment & Structural Pvt. Ltd. (India)",
        "Spark Engineers (Pune, India)",
        "Optech (Kenya)"
    ];

    return (
        <div className="bg-white">
            {/* Hero similar to Services */}
            <section className="relative h-[20dvh] sm:h-[20dvh] lg:h-[34dvh] overflow-hidden">
                <img
                    src="/tenweb_media_RWW2L8TB4.jpg"
                    alt="Projects banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--color-primary-blue)]/70 via-[var(--color-primary-blue)]/60 to-transparent backdrop-blur-[2px] sm:backdrop-blur" />
                <div className="relative h-full w-full max-w-7xl mx-auto px-3 sm:px-6 flex items-center pb-6 sm:pb-10">
                    <div>
                        <h1 className="text-3xl sm:text-5xl font-bold text-white font-heading leading-tight">Major Projects Portfolio</h1>
                        <p className="text-white/90 max-w-2xl mt-2 text-sm sm:text-base">Showcasing our expertise across continents—from massive spherical tanks in Nigeria to renewable energy projects in UAE and industrial facilities across Asia & Africa.</p>
                    </div>
                </div>
            </section>

            <div className="w-full max-w-7xl mx-auto px-6 sm:px-6 py-10 sm:py-14">

                {/* Projects Grid */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
                    {majorProjects.map((project, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg border border-[var(--color-light-gray)] overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="p-6 flex flex-col h-full">
                                {/* div: Title */}
                                <h3 className="text-xl font-bold text-[var(--color-primary-blue)] mb-2 font-heading">{project.title}</h3>

                                {/* Flag, Location, Year on separate lines for symmetry */}
                                <div className="flex items-center text-[var(--color-dark-gray)] mb-1">
                                    <FaMapMarkerAlt className="mr-2" />
                                    <span>{project.location}, {project.country}</span>
                                </div>
                                {project.year && (
                                    <div className="flex items-center text-[var(--color-dark-gray)] mb-3">
                                        <FaCalendar className="mr-2 " />
                                        <span>{project.year}</span>
                                    </div>
                                )}

                                {/* div2: Description (clamped for uniform height) */}
                                <p className="text-[var(--color-dark)] leading-relaxed line-clamp-4">
                                    {project.description}
                                </p>

                                {/* Spacer to push bottom section so layout remains consistent */}
                                <div className="flex-grow" />

                                {/* div3: Services Provided */}
                                <div className="mt-4">
                                    <h5 className="font-semibold mb-2 flex items-center font-heading text-[var(--color-dark-gray)]">
                                        <FaTools className="mr-2 " />
                                        Services Provided:
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {project.services.map((service, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-[var(--color-primary-orange)]/30 text-[var(--color-primary-black)] text-sm rounded-full">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Client Line */}
                                <div className="mt-4 flex items-center text-[var(--color-dark-gray)]">
                                    <FaUserAlt  className="mr-2 text-[var(--color-primary-gray)]" />
                                    <span className="font-medium">Client: {project.client}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section - Full Width */}
            <div className="w-full">
                <div className="bg-[var(--color-primary-blue)] text-white p-8 mb-16">
                    <h2 className="lg:text-5xl sm:text-4xl font-bold text-center mb-8">Project Statistics</h2>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-[var(--color-primary-orange)] mb-2">50+</div>
                            <div>Major Projects Completed</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[var(--color-primary-orange)] mb-2">9</div>
                            <div>Countries Served</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[var(--color-primary-orange)] mb-2">25m</div>
                            <div>Largest Sphere Diameter</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[var(--color-primary-orange)] mb-2">1800MW</div>
                            <div>Largest Power Project</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Major Clients - Full Width */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-6 pb-10 sm:pb-14">
                <div className="bg-white p-8 rounded-lg shadow-lg border border-[var(--color-light-gray)]">
                    <h2 className="text-3xl font-bold text-primary-blue text-center mb-8">Trusted by Leading Companies</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {clients.map((client, index) => {
                            const total = clients.length;
                            const isLast = index === total - 1;
                            const isSecondLast = index === total - 2;
                            const lgRem = total % 3; // items in last row at lg
                            const mdRem = total % 2; // items in last row at md

                            let spanClasses = '';
                            // Center last row items for symmetry
                            if (lgRem === 1 && isLast) {
                                // One item in last row on lg: center by spanning all 3 cols
                                spanClasses += ' lg:col-span-3 lg:max-w-2xl lg:mx-auto';
                            } else if (lgRem === 2 && isSecondLast) {
                                // Two items in last row on lg: make first span 2 cols
                                spanClasses += ' lg:col-span-2';
                            }
                            if (mdRem === 1 && isLast) {
                                // One item in last row on md: center by spanning both cols
                                spanClasses += ' md:col-span-2 md:max-w-xl md:mx-auto';
                            }

                            return (
                                <div
                                    key={index}
                                    className={`p-4 border border-[var(--color-light-gray)] rounded-lg hover:border-[var(--color-primary-orange)] transition-colors${spanClasses}`}
                                >
                                    <span className="text-[var(--color-dark)] font-medium">{client}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-[var(--color-dark-gray)]">
                            ...and many more across UAE, Oman, India, Nigeria, Kenya, and Africa
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;