import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        setIsSubmitting(false);

        alert('Thank you for your message. We will get back to you soon.');
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-cream)' }}>
            {/* Hero Section */}
            <section
                className="relative py-32 px-4 text-center"
                style={{
                    background: `linear-gradient(135deg, var(--gradient-from-sage-900-80) 0%, var(--gradient-via-sage-800-40) 100%)`
                }}
            >
                <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-gradient-to-br from-transparent via-transparent to-white/10"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1
                        className="text-5xl md:text-6xl font-bold mb-6 tracking-wide"
                        style={{ color: 'var(--color-cream)' }}
                    >
                        GET IN TOUCH
                    </h1>
                    <p
                        className="text-xl md:text-2xl font-serif italic mb-8 max-w-2xl mx-auto"
                        style={{ color: 'var(--text-cream-90)' }}
                    >
                        Connect with Heritage
                    </p>
                    <p
                        className="text-lg max-w-3xl mx-auto leading-relaxed"
                        style={{ color: 'var(--text-cream-80)' }}
                    >
                        We're here to help you discover timeless elegance. Whether you have questions about our collections,
                        need styling advice, or want to share your feedback, we'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Information & Form Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2
                                    className="text-4xl font-bold mb-8 tracking-wide"
                                    style={{ color: 'var(--color-sage-900)' }}
                                >
                                    REACH OUT TO US
                                </h2>
                                <p
                                    className="text-lg leading-relaxed mb-8" 
                                    style={{ color: 'var(--color-sage-700)' }}
                                >
                                    Our dedicated team is ready to assist you with personalized service
                                    that reflects our commitment to excellence and heritage craftsmanship.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="">
                                <div
                                    className="p-8 rounded-lg shadow-lg border space-y-3.5 bg-white border-sage-200"

                                >
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className="p-3 rounded-full"
                                            style={{ backgroundColor: 'var(--color-gold-500)' }}
                                        >
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3
                                                className="text-xl font-semibold mb-2 text-sage-900"
                                            >
                                                Visit Our Atelier
                                            </h3>
                                            <p style={{ color: 'var(--color-sage-700)' }}>
                                                123 Heritage Lane<br />
                                                Craftsmanship District<br />
                                                New York, NY 10001
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div
                                            className="p-3 rounded-full"
                                            style={{ backgroundColor: 'var(--color-gold-500)' }}
                                        >
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3
                                                className="text-xl font-semibold mb-2 text-sage-900"
                                            >
                                                Call Us
                                            </h3>
                                            <p style={{ color: 'var(--color-sage-700)' }}>
                                                +1 (555) 123-4567<br />
                                                Toll-free: +1 (800) 987-6543
                                            </p>
                                        </div>
                                    </div>
                                
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className="p-3 rounded-full"
                                            style={{ backgroundColor: 'var(--color-gold-500)' }}
                                        >
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3
                                                className="text-xl font-semibold mb-2 text-sage-900"
                                            >
                                                Email Us
                                            </h3>
                                            <p style={{ color: 'var(--color-sage-700)' }}>
                                                hello@elysianheritage.com<br />
                                                support@elysianheritage.com
                                            </p>
                                        </div>
                                    </div>
                                
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className="p-3 rounded-full"
                                            style={{ backgroundColor: 'var(--color-gold-500)' }}
                                        >
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3
                                                className="text-xl font-semibold mb-2 text-sage-900"
                                            >
                                                Business Hours
                                            </h3>
                                            <p style={{ color: 'var(--color-sage-700)' }}>
                                                Monday - Friday: 9:00 AM - 7:00 PM<br />
                                                Saturday: 10:00 AM - 6:00 PM<br />
                                                Sunday: 12:00 PM - 5:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <div
                                className="p-12 rounded-xl shadow-2xl"
                                style={{ backgroundColor: 'white' }}
                            >
                                <h3
                                    className="text-3xl font-bold mb-8 text-center"
                                    style={{ color: 'var(--color-sage-900)' }}
                                >
                                    SEND US A MESSAGE
                                </h3>

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-semibold mb-2 text-sage-700"
                                            >
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 bg-sage-50 border-sage-200 ring-gold-500"
                                                placeholder="Your full name"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-semibold mb-2 text-sage-700"
                                            >
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                                                style={{
                                                    borderColor: 'var(--color-sage-200)',
                                                    backgroundColor: 'var(--color-sage-50)'
                                                }}
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="block text-sm font-semibold mb-2"
                                            style={{ color: 'var(--color-sage-700)' }}
                                        >
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                                            style={{
                                                borderColor: 'var(--color-sage-200)',
                                                backgroundColor: 'var(--color-sage-50)'
                                            }}
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="product">Product Information</option>
                                            <option value="order">Order Support</option>
                                            <option value="styling">Personal Styling</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="partnership">Partnership</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-semibold mb-2"
                                            style={{ color: 'var(--color-sage-700)' }}
                                        >
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 resize-vertical"
                                            style={{
                                                borderColor: 'var(--color-sage-200)',
                                                backgroundColor: 'var(--color-sage-50)'
                                            }}
                                            placeholder="Tell us how we can help you..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg disabled:opacity-70"
                                        style={{
                                            backgroundColor: 'var(--color-gold-500)',
                                            color: 'white'
                                        }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>SEND MESSAGE</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section
                className="py-20 px-4 text-center"
                style={{ backgroundColor: 'var(--color-sage-900)' }}
            >
                <div className="max-w-4xl mx-auto">
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-wide"
                        style={{ color: 'var(--color-cream)' }}
                    >
                        EXPERIENCE TIMELESS ELEGANCE
                    </h2>
                    <p
                        className="text-xl mb-8 font-serif italic"
                        style={{ color: 'var(--text-cream-90)' }}
                    >
                        Heritage Craftsmanship Meets Contemporary Sophistication
                    </p>
                    <p
                        className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
                        style={{ color: 'var(--text-cream-80)' }}
                    >
                        Visit our showroom to experience our curated collections firsthand,
                        or schedule a personal consultation with our style experts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="bg-gold-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-gold-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            SCHEDULE CONSULTATION
                        </button>
                        <button
                            className="border-2 border-cream/30 text-cream px-8 py-4 rounded-lg font-medium hover:bg-cream/10 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            VIEW COLLECTIONS
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;