import { Link } from 'react-router-dom';
import { X, Linkedin, Github, Mail, MapPin, Phone, Instagram, Youtube, Facebook } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

function Footer() {
    return (
        <footer className="bg-berrydark text-gray-300 pt-20 pb-10 border-t-2 border-berrygreen-900/30 mt-auto relative overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-berrypink-900/10 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-flex items-center mb-6 bg-white rounded-2xl p-2 shadow-lg">
                            <AnimatedLogo className="h-12 w-auto" speed={0.6} />
                        </Link>
                        <p className="text-sm leading-relaxed mb-8 opacity-80 font-light">
                            We transform your core ideas into powerful, enterprise-grade, and beautifully designed digital experiences.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/berrybeans" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-berrypink-600 hover:border-berrypink-500 hover:text-white transition-all duration-300"><Facebook size={18} /></a>
                            <a href="https://twitter.com/berrybeans" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-berrypink-600 hover:border-berrypink-500 hover:text-white transition-all duration-300"><X size={18} /></a>
                            <a href="https://instagram.com/berrybeans" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-berrypink-600 hover:border-berrypink-500 hover:text-white transition-all duration-300"><Instagram size={18} /></a>
                            <a href="https://youtube.com/berrybeans" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-berrypink-600 hover:border-berrypink-500 hover:text-white transition-all duration-300"><Youtube size={18} /></a>
                            <a href="https://linkedin.com/company/berrybeans" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-berrypink-600 hover:border-berrypink-500 hover:text-white transition-all duration-300"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li><Link to="/about" className="hover:text-berrygreen-400 transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-berrygreen-400 transition-colors">Services</Link></li>
                            <li><Link to="/portfolio" className="hover:text-berrygreen-400 transition-colors">Portfolio</Link></li>
                            <li><Link to="/careers" className="hover:text-berrygreen-400 transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="hover:text-berrygreen-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Expertise</h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li><Link to="/services" className="hover:text-berrygreen-400 transition-colors">Web Development</Link></li>
                            <li><Link to="/services" className="hover:text-berrygreen-400 transition-colors">Mobile Apps</Link></li>
                            <li><Link to="/services" className="hover:text-berrygreen-400 transition-colors">Cloud Solutions</Link></li>
                            <li><Link to="/services" className="hover:text-berrygreen-400 transition-colors">UI/UX Design</Link></li>
                            <li><Link to="/services" className="hover:text-berrygreen-400 transition-colors">Custom Software</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Get in Touch</h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-berrygreen-500 mt-0.5 shrink-0" />
                                <a href="https://maps.app.goo.gl/DmC77fNTJvJUwPn48" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:text-berrygreen-400 transition-colors">41/27, 6th cross street, new street, Cheyyar, Tamil Nadu 604407</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-berrygreen-500 shrink-0" />
                                <a href="mailto:hello@berrybeans.com" className="opacity-80 hover:text-berrygreen-400 transition-colors">hello@berrybeans.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-berrygreen-500 shrink-0" />
                                <a href="tel:+18001234567" className="opacity-80 hover:text-berrygreen-400 transition-colors">+1 (800) 123-4567</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-60 font-light mt-8">
                    <p>&copy; {new Date().getFullYear()} BerryBeans Technologies. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <Link to="/admin/login" className="hover:text-berrypink-400 transition-colors">Admin Login</Link>
                        <Link to="#" className="hover:text-berrypink-400 transition-colors">Privacy</Link>
                        <Link to="#" className="hover:text-berrypink-400 transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
