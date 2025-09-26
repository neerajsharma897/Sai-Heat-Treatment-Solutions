import React from 'react';
import { FaMapMarkerAlt, FaIndustry, FaCalendar, FaTools } from 'react-icons/fa';

interface Project {
    title: string;
    location: string;
    country: string;
    description: string;
    services: string[];
    client: string;
    year?: string;
    flag: string;
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
            flag: "🇳🇬"
        },
        {
            title: "Hamriyah IPP 1800 CCPP Project",
            location: "Hamriyah",
            country: "UAE",
            description: "Comprehensive heat treatment services for the Hamriyah Independent Power Project 1800MW Combined Cycle Power Plant, ensuring optimal performance and longevity of critical components.",
            services: ["PWHT", "Preheating", "Stress Relief"],
            client: "Jurong Engineering PTE Ltd",
            year: "2023-2024",
            flag: "🇦🇪"
        },
        {
            title: "CSP + PV Hybrid Project",
            location: "Dubai",
            country: "UAE",
            description: "Heat treatment services for the innovative Concentrated Solar Power and Photovoltaic hybrid renewable energy project, contributing to UAE's sustainable energy goals.",
            services: ["PWHT", "Annealing", "Equipment Heat Treatment"],
            client: "China Energy Engineering Group",
            year: "2024",
            flag: "🇦🇪"
        },
        {
            title: "Moray Project",
            location: "Dubai",
            country: "UAE",
            description: "Specialized heat treatment services for offshore wind energy project components, ensuring durability and performance in marine environments.",
            services: ["PWHT", "Hydrogen Diffusion", "Corrosion Resistance Treatment"],
            client: "Lamprell Energy FZE",
            year: "2023",
            flag: "🇦🇪"
        },
        {
            title: "Dangote Refinery Project",
            location: "Lagos",
            country: "Nigeria",
            description: "Heat treatment services for Africa's largest oil refinery project, handling critical components for the 650,000 barrels per day facility.",
            services: ["PWHT", "Stress Relief", "Large Scale Operations"],
            client: "International Contractor",
            year: "2023-2024",
            flag: "🇳🇬"
        },
        {
            title: "700MW CSP & 250MW PV Project",
            location: "Muscat",
            country: "Oman",
            description: "Comprehensive heat treatment services for one of the world's largest concentrated solar power projects combined with photovoltaic installation.",
            services: ["PWHT", "High Temperature Processing", "Solar Equipment Treatment"],
            client: "Major Energy Contractor",
            year: "2024",
            flag: "🇴🇲"
        },
        {
            title: "Ammonia Storage Tanks",
            location: "Pune",
            country: "India",
            description: "Heat treatment of large ammonia storage tanks for chemical processing facility, ensuring safety and regulatory compliance for hazardous material storage.",
            services: ["PWHT", "Stress Relief", "Safety Compliance"],
            client: "Spark Engineers",
            year: "2023",
            flag: "🇮🇳"
        },
        {
            title: "Oxygen/Nitrogen Storage Tanks",
            location: "Ambernath",
            country: "India",
            description: "Local project involving heat treatment of cryogenic storage tanks for industrial gas applications, showcasing our expertise in specialized gas storage solutions.",
            services: ["PWHT", "Cryogenic Treatment", "Industrial Gas Storage"],
            client: "Spacetech Equipment & Structural Pvt. Ltd.",
            year: "2023",
            flag: "🇮🇳"
        },
        {
            title: "Horton Sphere Heat Treatment",
            location: "Nairobi",
            country: "Kenya",
            description: "Successfully completed heat treatment of a 22m diameter Horton Sphere for petroleum storage, expanding our African operations and expertise.",
            services: ["PWHT", "Spherical Vessel Treatment", "Petroleum Storage"],
            client: "Optech Kenya",
            year: "2024",
            flag: "🇰🇪"
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
        <div className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary-blue mb-4">Major Projects Portfolio</h1>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Showcasing our expertise across continents - from massive spherical tanks in Nigeria to renewable energy projects in UAE and industrial facilities across Asia & Africa.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {majorProjects.map((project, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-primary-blue mb-2">{project.title}</h3>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <FaMapMarkerAlt className="mr-2 text-primary-orange" />
                                            <span className="mr-2">{project.flag}</span>
                                            <span>{project.location}, {project.country}</span>
                                        </div>
                                        {project.year && (
                                            <div className="flex items-center text-gray-600 mb-3">
                                                <FaCalendar className="mr-2 text-primary-orange" />
                                                <span>{project.year}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                                
                                <div className="mb-4">
                                    <h5 className="font-semibold text-primary-blue mb-2 flex items-center">
                                        <FaTools className="mr-2 text-primary-orange" />
                                        Services Provided:
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {project.services.map((service, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-primary-orange bg-opacity-10 text-primary-orange text-sm rounded-full">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="flex items-center text-gray-600">
                                    <FaIndustry className="mr-2 text-primary-orange" />
                                    <span className="font-medium">Client: {project.client}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="bg-primary-blue text-white p-8 rounded-lg shadow-lg mb-16">
                    <h2 className="text-2xl font-bold text-center mb-8">Project Statistics</h2>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-primary-orange mb-2">50+</div>
                            <div>Major Projects Completed</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-orange mb-2">9</div>
                            <div>Countries Served</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-orange mb-2">25m</div>
                            <div>Largest Sphere Diameter</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-orange mb-2">1800MW</div>
                            <div>Largest Power Project</div>
                        </div>
                    </div>
                </div>

                {/* Major Clients */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-primary-blue text-center mb-8">Trusted by Leading Companies</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {clients.map((client, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-orange transition-colors">
                                <span className="text-gray-700 font-medium">{client}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            ...and many more across UAE, Oman, India, Nigeria, Kenya, and Africa
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;