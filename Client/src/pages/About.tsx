import React from 'react';
import { FaIndustry, FaGlobe, FaUsers, FaAward, FaShieldAlt, FaHandshake, FaLightbulb, FaTrophy } from 'react-icons/fa';

const About: React.FC = () => {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-6">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary-blue mb-4">About Sai Heat Treatment Solution</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Part of SAI GROUP, established in 2022 to fill the gap in regional PWHT expertise across Asia, Middle East & Africa
                    </p>
                </div>

                {/* Company Overview */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-primary-blue mb-6">Our Story</h2>
                        <div className="space-y-4 text-black">
                            <p>
                                <strong>Sai Heat Treatment Solution (SHS)</strong> was founded in 2022 as a specialized division of the 
                                established SAI GROUP, with a clear mission to address the growing demand for world-class heat treatment 
                                services across multiple continents.
                            </p>
                            <p>
                                From our headquarters in Ambernath, India, we have rapidly expanded our operations to serve critical 
                                industries including oil & gas plants, power plants, chemical plants, pulp & paper mills, heavy 
                                equipment manufacturing, and more.
                            </p>
                            <p>
                                Our expertise spans electrical heating systems using advanced heating elements and sophisticated oil & gas 
                                burner systems, making us a one-stop solution for all heat treatment requirements.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <img 
                            src="/Sai_logo.png" 
                            alt="Sai Heat Treatment Solution" 
                            className="max-h-64 w-auto"
                        />
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-brand-light p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                            <FaLightbulb className="mr-3 text-primary-orange" />
                            Our Mission
                        </h3>
                        <p className="text-gray-700 mb-4">
                            To safely and cost-effectively provide world-class heat treatment solutions, serving routine to the most challenging customer needs.
                        </p>
                        <p className="text-gray-700">
                            Become the most trusted provider in Asia & Middle East with unwavering commitment to safety, quality, customer satisfaction, dependability, and flexibility.
                        </p>
                    </div>
                    <div className="bg-primary-blue text-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-4 flex items-center">
                            <FaTrophy className="mr-3 text-primary-orange" />
                            Vision 2030
                        </h3>
                        <p className="mb-4">
                            Establish SHS as a regional leader in heat treatment services and gain continental recognition in Asia and Africa.
                        </p>
                        <p>
                            Achieve leadership through innovation, collaboration, project excellence, and customer service perfection.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-primary-blue text-center mb-12">Core Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-orange transition-colors">
                            <FaShieldAlt className="text-4xl text-primary-orange mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-primary-blue mb-2">Safety & Health Stewardship</h4>
                            <p className="text-gray-600">Zero accidents goal with comprehensive safety protocols</p>
                        </div>
                        <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-orange transition-colors">
                            <FaHandshake className="text-4xl text-primary-orange mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-primary-blue mb-2">Customer Satisfaction</h4>
                            <p className="text-gray-600">Deliver flawless service that exceeds expectations</p>
                        </div>
                        <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-orange transition-colors">
                            <FaUsers className="text-4xl text-primary-orange mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-primary-blue mb-2">Employee Integrity</h4>
                            <p className="text-gray-600">Respect, fairness, and trust in all interactions</p>
                        </div>
                        <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-orange transition-colors">
                            <FaAward className="text-4xl text-primary-orange mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-primary-blue mb-2">Investor Value</h4>
                            <p className="text-gray-600">Sustainable and profitable growth strategies</p>
                        </div>
                        <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-orange transition-colors">
                            <FaGlobe className="text-4xl text-primary-orange mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-primary-blue mb-2">Leadership</h4>
                            <p className="text-gray-600">Be the "one source" provider in the region</p>
                        </div>
                        <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-orange transition-colors">
                            <FaIndustry className="text-4xl text-primary-orange mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-primary-blue mb-2">Innovation</h4>
                            <p className="text-gray-600">Continuous adoption of new technologies</p>
                        </div>
                    </div>
                </div>

                {/* Strategy */}
                <div className="bg-brand-light p-8 rounded-lg shadow-lg mb-20">
                    <h2 className="text-3xl font-bold text-primary-blue text-center mb-8">Our Strategic Approach</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold text-primary-blue mb-3">Growth Strategy</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Build investor value through profitable growth</li>
                                <li>• Excellence in design, performance, quality & customer satisfaction</li>
                                <li>• Expansion across all operational markets</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-primary-blue mb-3">Operational Excellence</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Continuous improvement in productivity & service delivery</li>
                                <li>• Innovation and adoption of new technologies</li>
                                <li>• Structured risk management and safety protocols</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Industries We Serve */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary-blue mb-8">Industries We Serve</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[
                            "Oil & Gas Plants",
                            "Power Plants", 
                            "Chemical Plants",
                            "Pulp & Paper Mills",
                            "Heavy Equipment",
                            "Food Industry",
                            "Plastics Manufacturing",
                            "Iron & Steel",
                            "Metal Manufacturing",
                            "Aviation"
                        ].map((industry, index) => (
                            <div key={index} className="p-3 bg-white rounded-lg shadow border-2 border-gray-200 hover:border-primary-orange transition-colors">
                                <span className="text-sm font-medium text-primary-blue">{industry}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Global Presence */}
                <div className="bg-primary-blue text-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-3xl font-bold mb-6">Global Presence</h2>
                    <p className="text-lg mb-6">
                        Expanding across India, Asia, and the Middle East with 300+ technical staff ready to serve
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="text-3xl font-bold text-primary-orange mb-2">🇮🇳 India</div>
                            <p>Nationwide coverage with headquarters in Maharashtra</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-orange mb-2">🌏 Asia & Middle East</div>
                            <p>UAE, Oman, Dubai, Sharjah, and expanding</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-orange mb-2">🌍 Africa</div>
                            <p>Nigeria, Kenya, and growing continental presence</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;