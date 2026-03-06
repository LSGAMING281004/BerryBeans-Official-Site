import { useState } from 'react';
import api from '../api/axiosConfig';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            await api.post('/public/contact', formData);
            setStatus({ type: 'success', msg: 'Message sent successfully! We will get back to you soon.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', msg: 'Failed to send message. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
                <h2 className="text-sm font-bold tracking-widest text-berrypink-600 uppercase mb-3 block w-full">Contact Us</h2>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight block w-full">Let's start a conversation</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                    Have a project in mind or want to learn more about our services? Our team is ready to help you scale.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
                {/* Contact info */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-1 space-y-10">
                    <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h3>
                        <p className="text-gray-600 font-light leading-relaxed mb-10">We usually respond within 24 hours to schedule an initial discovery call.</p>
                    </div>
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-berrygreen-50 rounded-2xl text-berrygreen-600 shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Our Headquarters</h4>
                                <a href="https://maps.app.goo.gl/DmC77fNTJvJUwPn48" target="_blank" rel="noopener noreferrer" className="text-gray-600 font-light hover:text-berrygreen-600 transition-colors">41/27, 6th cross street, new street, Cheyyar, Tamil Nadu 604407</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-berrygreen-50 rounded-2xl text-berrygreen-600 shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                                <a href="mailto:hello@berrybeans.com" className="text-gray-600 font-light hover:text-berrygreen-600 transition-colors">hello@berrybeans.com<br />support@berrybeans.com</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-berrygreen-50 rounded-2xl text-berrygreen-600 shrink-0">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
                                <a href="tel:+18001234567" className="text-gray-600 font-light hover:text-berrygreen-600 transition-colors">+1 (800) 123-4567<br />Mon-Fri, 9am-6pm PST</a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Form container */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-2">
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_10px_40px_rgb(0,0,0,0.06)] border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {status.msg && (
                                <div className={`p-4 rounded-2xl text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                    {status.msg}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-berrypink-500 focus:border-transparent transition bg-gray-50 focus:bg-white" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-berrypink-500 focus:border-transparent transition bg-gray-50 focus:bg-white" placeholder="john@company.com" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">Detailed Message</label>
                                <textarea id="message" name="message" required rows="6" value={formData.message} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-berrypink-500 focus:border-transparent transition bg-gray-50 focus:bg-white resize-none" placeholder="Tell us about your project requirements..."></textarea>
                            </div>
                            <div>
                                <button type="submit" disabled={loading} className={`w-full sm:w-auto bg-berrypink-600 text-white font-bold py-4 px-10 rounded-full transition shadow-[0_4px_14px_0_rgba(240,90,102,0.3)] flex justify-center items-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-berrypink-700 hover:shadow-[0_6px_20px_rgba(240,90,102,0.23)] hover:-translate-y-0.5'}`}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                    {!loading && <Send size={18} />}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;
