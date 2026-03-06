import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedLogo from './AnimatedLogo';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Careers', path: '/careers' },
    ];

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-morphism py-2 shadow-sm' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <AnimatedLogo className="h-16 w-auto" speed={0.6} />
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-1 lg:space-x-4 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${location.pathname === link.path ? 'text-berrypink-700 bg-berrypink-50' : 'text-gray-600 hover:text-berrypink-600 hover:bg-berrypink-50/50'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/contact" className="ml-4 bg-[#f05a66] text-white px-6 py-2.5 rounded-full font-bold shadow-[0_4px_15px_rgba(240,90,102,0.3)] hover:bg-berrypink-700 hover:shadow-[0_8px_25px_rgba(240,90,102,0.5)] hover:-translate-y-0.5 transition-all duration-300">
                            Contact Us
                        </Link>
                    </div>

                    <div className="md:hidden flex flex-col justify-center">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-600 hover:text-berrypink-600 transition">
                            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 origin-top overflow-hidden ${isOpen ? 'max-h-96 border-b border-gray-100' : 'max-h-0'}`}>
                <div className="px-4 pt-2 pb-6 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl font-medium text-base transition-colors ${location.pathname === link.path ? 'text-berrypink-700 bg-berrypink-50' : 'text-gray-600 hover:text-berrypink-600 hover:bg-gray-50'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="block mt-4 text-center bg-[#f05a66] text-white px-4 py-3 rounded-xl font-bold shadow-md">
                        Contact Us
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
