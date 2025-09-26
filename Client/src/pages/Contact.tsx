import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact: React.FC = () => {
    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-black">Contact Us</h1>
                    <p className="text-black mt-2">We're available 7 days a week. Get in touch with us for inquiries or emergencies.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-black mb-6">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-orange-600 text-2xl mr-4 mt-1 flex-shrink-0" />
                                <p className="text-black">Plot No. A-100, Near Maharashtra Weigh Bridge Additional Ambernath MIDC Anand Nagar, Ambernath (E)</p>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-orange-600 text-2xl mr-4" />
                                <a href="mailto:saiheattreatmentsolution@gmail.com" className="text-black hover:text-primary-orange">saiheattreatmentsolution@gmail.com</a>
                            </div>
                            <div className="flex items-center">
                                <FaPhone className="text-orange-600 text-2xl mr-4" />
                                <a href="tel:+918999962542" className="text-black hover:text-primary-orange">(+91)-8999962542</a>
                            </div>
                        </div>
                        <div className="mt-8 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                            Google Maps Embed
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-black mb-6">Send us a Message</h2>
                        <form>
                            <div className="mb-4">
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600" />
                            </div>
                            <div className="mb-4">
                                <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600" />
                            </div>
                            <div className="mb-4">
                                <textarea rows={5} placeholder="Message" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;