import React from 'react';
import { FaBroadcastTower, FaShip, FaPlane, FaIndustry, FaBuilding } from 'react-icons/fa';

interface Industry {
    name: string;
    icon: React.ElementType;
}

const Industries: React.FC = () => {
    const industryData: Industry[] = [
        { name: "Oil & Gas Plants", icon: FaIndustry },
        { name: "Power Plants", icon: FaBroadcastTower },
        { name: "Chemical Plants", icon: FaIndustry },
        { name: "Heavy Fabrication", icon: FaBuilding },
        { name: "Shipping", icon: FaShip },
        { name: "Aviation", icon: FaPlane },
        { name: "Metal Manufacturing", icon: FaIndustry },
        { name: "Pulp and Paper Mills", icon: FaIndustry },
    ];

    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary-blue">Industries We Serve</h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Our technical expertise in heat treatment is trusted by a diverse range of critical industries across the Middle East & Asia Pacific.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {industryData.map((industry, index) => (
                        <div key={index} className="text-center p-6 bg-brand-light rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <industry.icon className="text-5xl text-primary-orange mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-primary-blue">{industry.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Industries;