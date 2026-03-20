import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import AnimatedLogo from './AnimatedLogo';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const isScrollingRef = useRef(false);
    const [logoClicks, setLogoClicks] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingRef.current) return;
            
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);
            
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down - hide navbar
                setVisible(false);
            } else {
                // Scrolling up - show navbar
                setVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: 'home' },
        { name: 'Services', path: 'services' },
        { name: 'Careers', path: 'careers' },
        { name: 'Portfolio', path: 'portfolio' },
        { name: 'About', path: 'about' },

    ];

    const navigate = useNavigate();

    const handleNavClick = (path) => {
        setIsOpen(false);
        setVisible(true);
        isScrollingRef.current = true;
        
        // Reset after animation
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000);

        if (location.pathname !== '/') {
            navigate(`/#${path}`);
        }
    };

    const handleLogoClick = () => {
        setLogoClicks((prev) => {
            const newCount = prev + 1;
            if (newCount >= 10) {
                window.open('/admin/login?key=berrybeans_secret', '_blank');
                return 0;
            }
            return newCount;
        });
    };

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-300 transform ${visible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'fluent-acrylic py-2 shadow-md' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0">
                        <ScrollLink to="home" smooth={true} duration={250} offset={-80} className="flex items-center cursor-pointer" onClick={() => { handleNavClick('home'); handleLogoClick(); }}>
                            <AnimatedLogo className="h-16 w-auto" speed={0.6} />
                        </ScrollLink>
                    </div>

                    <div className="hidden md:flex space-x-1 lg:space-x-4 items-center">
                        {navLinks.map((link) => (
                            <ScrollLink
                                key={link.name}
                                to={link.path}
                                smooth={true}
                                duration={250}
                                offset={-80}
                                spy={true}
                                activeClass="bg-white/50 shadow-sm text-gray-900 border border-white/60"
                                onClick={() => handleNavClick(link.path)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 text-gray-500 hover:text-gray-900 hover:bg-white/40 border border-transparent cursor-pointer`}
                            >
                                {link.name}
                            </ScrollLink>
                        ))}
                        <ScrollLink to="contact" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('contact')} className="ml-4 p-[1px] rounded-lg bg-gradient-to-r from-[#f05a66] to-[#aedd4c] hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <div className="animate-gradient rounded-[7px] px-6 py-2 font-extrabold flex items-center justify-center h-full">
                                <span className="text-white">
                                    Start Your Project
                                </span>
                            </div>
                        </ScrollLink>
                    </div>

                    <div className="md:hidden flex flex-col justify-center">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-600 hover:text-berrypink-600 transition">
                            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full mx-4 left-0 right-0 top-full fluent-acrylic rounded-2xl shadow-2xl transition-all duration-300 origin-top overflow-hidden border border-white/40 ${isOpen ? 'max-h-96 opacity-100 mt-2 p-2' : 'max-h-0 opacity-0 border-transparent'}`}>
                <div className="space-y-1">
                    {navLinks.map((link) => (
                        <ScrollLink
                            key={link.name}
                            to={link.path}
                            smooth={true}
                            duration={250}
                            offset={-80}
                            spy={true}
                            activeClass="bg-white/60 text-gray-900 border-white/40 shadow-sm"
                            onClick={() => handleNavClick(link.path)}
                            className={`block px-4 py-3 rounded-xl border border-transparent font-medium text-base transition-colors text-gray-600 hover:text-gray-900 hover:bg-white/40 cursor-pointer`}
                        >
                            {link.name}
                        </ScrollLink>
                    ))}
                    <ScrollLink to="contact" smooth={true} duration={250} offset={-80} onClick={() => handleNavClick('contact')} className="block mt-4 p-[1.5px] rounded-xl bg-gradient-to-r from-[#f05a66] to-[#aedd4c] shadow-md cursor-pointer">
                        <div className="animate-gradient rounded-[11px] py-3 font-extrabold text-center">
                            <span className="text-white">
                                Start Your Project
                            </span>
                        </div>
                    </ScrollLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
