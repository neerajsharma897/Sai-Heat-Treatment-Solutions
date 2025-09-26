import React from 'react';

const Gallery: React.FC = () => {
    const images = [
        { src: "https://i.imgur.com/G5g2fTh.png", alt: "PWHT Works" },
        { src: "https://i.imgur.com/Rk5e6Xw.png", alt: "Preheating Works" },
        // ... other images
    ];

    return (
        <div className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary-blue">Project Gallery</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                            <img 
                              src={image.src} 
                              alt={image.alt} 
                              className="w-full h-72 object-cover"
                              loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Gallery;