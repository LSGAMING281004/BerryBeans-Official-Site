import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { X, Linkedin, Github, Mail, MapPin, Phone, Instagram, Youtube, Facebook, Send } from 'lucide-react';
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
        <footer className="bg-white text-gray-800 pt-24 pb-12 relative overflow-hidden font-outfit border-t border-gray-100">
            {/* Background Watermark */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[12rem] md:text-[13rem] font-black text-black/[0.06] select-none pointer-events-none whitespace-nowrap z-0 leading-none">
                berrybeans
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

                    {/* Brand Info */}
                    <div className="md:col-span-4 lg:col-span-4 space-y-6">
                        <ScrollLink
                            to="home"
                            smooth={true}
                            duration={250}
                            offset={-80}
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => handleNavClick('home')}
                        >
                            <AnimatedLogo className="h-16 w-auto transition-transform duration-300 group-hover:scale-110" />

                        </ScrollLink>

                        <div className="space-y-4 text-gray-500 font-medium">
                            <p className="text-lg font-bold text-gray-800">BerryBeans <span className="font-medium text-gray-500">Technologies Pvt Ltd</span></p>
                            <p className="text-sm">Chennai: Tamil Nadu, India</p>
                            <a href="mailto:contact@berrybeans.com" className="block text-sm hover:text-[#f05a66] transition-colors">Email: contact@berrybeans.com</a>
                        </div>

                        <div className="flex gap-4 pt-4">
                            {[
                                { icon: <Linkedin size={20} />, link: "https://linkedin.com/company/berrybeans" },
                                { icon: <Github size={20} />, link: "https://github.com/berrybeans" },
                                { icon: <X size={20} />, link: "https://twitter.com/berrybeans" },
                                { icon: <Instagram size={20} />, link: "https://instagram.com/berrybeans" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#f05a66] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="md:col-span-6 grid grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#f05a66]">Solutions</h4>
                            <ul className="space-y-4 text-sm font-semibold text-gray-500">
                                <li><a href="#" className="hover:text-gray-900 transition-colors">For Developers</a></li>
                                <li><a href="#" className="hover:text-gray-900 transition-colors">For Businesses</a></li>
                                <li><a href="#" className="hover:text-gray-900 transition-colors">Cloud Services</a></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#f05a66]">Resources</h4>
                            <ul className="space-y-4 text-sm font-semibold text-gray-500">
                                <li><a href="#" className="hover:text-gray-900 transition-colors">Case Studies</a></li>
                                <li><a href="#" className="hover:text-gray-900 transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-gray-900 transition-colors">API Reference</a></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#f05a66]">Company</h4>
                            <ul className="space-y-4 text-sm font-semibold text-gray-500">
                                <li><ScrollLink to="about" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('about')} className="hover:text-gray-900 transition-colors cursor-pointer">About Us</ScrollLink></li>
                                <li><ScrollLink to="careers" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('careers')} className="hover:text-gray-900 transition-colors cursor-pointer">Careers</ScrollLink></li>
                                <li><ScrollLink to="contact" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('contact')} className="hover:text-gray-900 transition-colors cursor-pointer">Contact</ScrollLink></li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="md:col-span-2 flex flex-col items-center md:items-end space-y-4 border-l border-gray-100 pl-8 h-fit">
                        {[
                            { icon: <MapPin size={22} />, title: "Location" },
                            { icon: <Mail size={22} />, title: "Mail" },
                            { icon: <Phone size={22} />, title: "Call" },
                            { icon: <Linkedin size={22} />, title: "Company" },
                            { icon: <X size={22} />, title: "Stay Updated" }
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                title={item.title}
                                className="w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-200 transition-all duration-300"
                            >
                                {item.icon}
                            </button>
                        ))}
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col items-center justify-center space-y-2 text-sm font-bold text-gray-400">
                    <p>&copy; {new Date().getFullYear()} BerryBeans Technologies. All rights reserved.</p>
                </div>
            </div>

            {/* Horizontal Glow at the target center matching image style but for light mode */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-orange-500/80 blur-lg rounded-full"></div>
        </footer>
    );
}

export default Footer;
