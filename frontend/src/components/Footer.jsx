import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { X, Linkedin, Github, Mail, MapPin, Phone, Instagram, Youtube, Facebook } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

function Footer() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavClick = (path) => {
        if (location.pathname !== '/') {
            navigate(`/#${path}`);
        }
    };

    return (
        <footer className="fluent-acrylic text-gray-600 pt-20 pb-10 border-t border-white/60 mt-auto relative overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-multiply"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="lg:col-span-1">
                        <ScrollLink to="home" smooth={true} duration={250} offset={-80} className="inline-flex items-center mb-6 bg-white rounded-2xl p-2 shadow-lg cursor-pointer" onClick={() => handleNavClick('home')}>
                            <AnimatedLogo className="h-12 w-auto" speed={0.6} />
                        </ScrollLink>
                        <p className="text-sm leading-relaxed mb-8 opacity-80 font-light">
                            We transform your core ideas into powerful, enterprise-grade, and beautifully designed digital experiences.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/berrybeans" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/60 border border-white/80 shadow-sm flex items-center justify-center hover:bg-berrypink-600 hover:border-berrypink-500 hover:text-white hover:shadow-lg hover:-translate-y-1 text-gray-500 transition-all duration-300"><Facebook size={18} /></a>
                            <a href="https://twitter.com/berrybeans" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/60 border border-white/80 shadow-sm flex items-center justify-center hover:bg-berrypink-600 hover:border-berrypink-500 hover:text-white hover:shadow-lg hover:-translate-y-1 text-gray-500 transition-all duration-300"><X size={18} /></a>
                            <a href="https://instagram.com/berrybeans" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/60 border border-white/80 shadow-sm flex items-center justify-center hover:bg-berrypink-600 hover:border-berrypink-500 hover:text-white hover:shadow-lg hover:-translate-y-1 text-gray-500 transition-all duration-300"><Instagram size={18} /></a>
                            <a href="https://youtube.com/berrybeans" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/60 border border-white/80 shadow-sm flex items-center justify-center hover:bg-berrypink-600 hover:border-berrypink-500 hover:text-white hover:shadow-lg hover:-translate-y-1 text-gray-500 transition-all duration-300"><Youtube size={18} /></a>
                            <a href="https://linkedin.com/company/berrybeans" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/60 border border-white/80 shadow-sm flex items-center justify-center hover:bg-berrypink-600 hover:border-berrypink-500 hover:text-white hover:shadow-lg hover:-translate-y-1 text-gray-500 transition-all duration-300"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><ScrollLink to="about" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('about')} className="hover:text-cyan-600 transition-colors cursor-pointer text-gray-600">About Us</ScrollLink></li>
                            <li><ScrollLink to="services" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('services')} className="hover:text-cyan-600 transition-colors cursor-pointer text-gray-600">Services</ScrollLink></li>
                            <li><ScrollLink to="portfolio" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('portfolio')} className="hover:text-cyan-600 transition-colors cursor-pointer text-gray-600">Portfolio</ScrollLink></li>
                            <li><ScrollLink to="careers" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('careers')} className="hover:text-cyan-600 transition-colors cursor-pointer text-gray-600">Careers</ScrollLink></li>
                            <li><ScrollLink to="contact" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('contact')} className="hover:text-cyan-600 transition-colors cursor-pointer text-gray-600">Contact Us</ScrollLink></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">Expertise</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><ScrollLink to="services" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('services')} className="hover:text-cyan-600 transition-colors cursor-pointer text-gray-600">Web Development</ScrollLink></li>
                            <li><ScrollLink to="services" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('services')} className="hover:text-cyan-600 transition-colors cursor-pointer text-gray-600">Mobile Apps</ScrollLink></li>
                            <li><ScrollLink to="services" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('services')} className="hover:text-cyan-600 transition-colors cursor-pointer text-gray-600">Cloud Solutions</ScrollLink></li>
                            <li><ScrollLink to="services" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('services')} className="hover:text-cyan-600 transition-colors cursor-pointer text-gray-600">UI/UX Design</ScrollLink></li>
                            <li><ScrollLink to="services" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('services')} className="hover:text-cyan-600 transition-colors cursor-pointer text-gray-600">Custom Software</ScrollLink></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">Get in Touch</h4>
                        <ul className="space-y-4 text-sm font-medium text-gray-600">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-cyan-600 mt-0.5 shrink-0" />
                                <a href="https://maps.app.goo.gl/DmC77fNTJvJUwPn48" target="_blank" rel="noopener noreferrer" className="hover:text-berrypink-600 transition-colors">41/27, 6th cross street, new street, Cheyyar, Tamil Nadu 604407</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-cyan-600 shrink-0" />
                                <a href="mailto:hello@berrybeans.com" className="hover:text-berrypink-600 transition-colors">hello@berrybeans.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-cyan-600 shrink-0" />
                                <a href="tel:+18001234567" className="hover:text-berrypink-600 transition-colors">+1 (800) 123-4567</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200/60 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-gray-500 mt-8">
                    <p>&copy; {new Date().getFullYear()} BerryBeans Technologies. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <RouterLink to="/privacy" className="hover:text-cyan-600 transition-colors">Privacy</RouterLink>
                        <RouterLink to="/terms" className="hover:text-cyan-600 transition-colors">Terms</RouterLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
