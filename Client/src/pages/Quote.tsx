import React, { useState } from 'react';

const Quote: React.FC = () => {
    const [fileName, setFileName] = useState<string>("");
    const [file, setFile] = useState<File | null>(null); // State to hold the file

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            setFileName(event.target.files[0].name);
        } else {
            setFile(null);
            setFileName("");
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        if (file) {
            formData.append('file', file);
        }

        try {
            // This is the endpoint on your Python backend that you'll create
            const response = await fetch('/api/quote', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Thank you for your inquiry. We will get back to you shortly!');
                // Reset form if needed
                // event.currentTarget.reset();
                // setFileName("");
                // setFile(null);
            } else {
                alert('There was an error submitting your request. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your request. Please try again.');
        }
    };


    return (
        <div className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-lg">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-primary-blue">Request a Quote</h1>
                        <p className="text-gray-600 mt-2">
                            Fill out the form below to submit your requirements, and our expert team will contact you promptly.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" name="name" placeholder="Your Name *" required
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange" />
                            <input type="email" name="email" placeholder="Your Email *" required
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange" />
                        </div>

                        {/* Company & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" name="company" placeholder="Company Name"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange" />
                            <input type="tel" name="phone" placeholder="Phone Number *" required
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange" />
                        </div>

                        {/* Project Requirements */}
                        <div>
                            <textarea name="requirements" placeholder="Please describe your project requirements in detail... *" rows={6} required
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"></textarea>
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Attach File (optional)</label>
                            <div className="flex items-center gap-4 border rounded-lg px-4 py-3 bg-gray-50 hover:bg-gray-100 transition">
                                {/* Hidden input but accessible */}
                                <input
                                    type="file"
                                    id="fileUpload"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="sr-only"
                                />
                                <label
                                    htmlFor="fileUpload"
                                    className="bg-primary-orange text-white px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-orange-600 transition"
                                >
                                    Choose File
                                </label>
                                <span className="text-gray-700 text-sm truncate flex-1">
                                    {fileName || "No file chosen"}
                                </span>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-primary-orange text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors text-lg"
                        >
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Quote;