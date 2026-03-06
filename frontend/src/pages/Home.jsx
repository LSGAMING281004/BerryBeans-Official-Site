import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Cloud, PenTool, ChevronRight, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WorldGlobe from '../components/WorldGlobe';

const locations = [
    { name: 'India', country: 'IN' },
    { name: 'Singapore', country: 'SG' },
    { name: 'Malaysia', country: 'MY' },
    { name: 'US', country: 'US' },
    { name: 'UK', country: 'GB' },
    { name: 'Qatar', country: 'QA' },
    { name: 'Congo', country: 'CG' },
    { name: 'Dubai', country: 'AE' },
    { name: 'Netherlands', country: 'NL' },
];

function Home() {
    const [activeLocationIndex, setActiveLocationIndex] = useState(0);
    const [isListExpanded, setIsListExpanded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isListExpanded) {
                setActiveLocationIndex((prev) => (prev + 1) % locations.length);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [isListExpanded]);

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#fdfdfd] overflow-hidden">
                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

                        {/* Left Side: Content */}
                        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-left order-2 lg:order-1">
                            <motion.div variants={fadeUp} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#f05a66]/20 bg-[#f05a66]/5">
                                <span className="text-sm font-semibold text-[#f05a66]">Growth Focused Agency</span>
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
                                We are <span className="text-[#f05a66]">Not Hunting</span> the sales, <br className="hidden md:block" />
                                Just Supporting your <span className="text-[#aedd4c]">business growth</span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-lg md:text-xl mb-10 text-gray-600 max-w-2xl font-light leading-relaxed">
                                We transform your ideas into powerful, scalable, and beautifully designed software products. Elevate your business with enterprise-grade technology.
                            </motion.p>

                            {/* Location Section */}
                            <motion.div variants={fadeUp} className="space-y-6 relative">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-[#aedd4c]/10 rounded-2xl flex items-center justify-center text-[#aedd4c]">
                                        <MapPin className="w-6 h-6 animate-bounce" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Our Presence</p>
                                        <AnimatePresence mode="wait">
                                            <motion.h3
                                                key={locations[activeLocationIndex].name}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="text-2xl font-bold text-gray-900"
                                            >
                                                {locations[activeLocationIndex].name}
                                            </motion.h3>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Expandable Location List */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsListExpanded(!isListExpanded)}
                                        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-semibold transition-colors group"
                                    >
                                        View all work locations
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isListExpanded ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isListExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-hidden"
                                            >
                                                {locations.map((loc, index) => (
                                                    <button
                                                        key={loc.name}
                                                        onClick={() => setActiveLocationIndex(index)}
                                                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${activeLocationIndex === index
                                                            ? 'border-[#f05a66] bg-[#f05a66] text-white'
                                                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {loc.name}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-5 pt-8">
                                    <Link to="/contact" className="bg-[#f05a66] text-white font-bold py-4 px-10 rounded-full hover:bg-[#e04a56] transition-all duration-300 shadow-[0_10px_30px_rgba(240,90,102,0.3)] hover:shadow-[0_15px_40px_rgba(240,90,102,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2">
                                        Get Started <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Side: Globe */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="order-1 lg:order-2 h-[180px] md:h-[220px] relative pointer-events-auto flex items-center justify-center"
                        >
                            <WorldGlobe activeLocationIndex={activeLocationIndex} />

                            {/* Decorative background for globe */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#f05a66]/5 to-[#aedd4c]/5 rounded-full blur-[100px] -z-10"></div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative border-b border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-sm font-bold tracking-widest text-berrygreen-600 uppercase mb-3 text-center w-full block">Our Expertise</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 w-full block">Comprehensive IT Solutions</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ServiceCard icon={<Code className="w-8 h-8" />} title="Web Development" desc="Responsive, highly-performant web applications tailored to your business needs." />
                        <ServiceCard icon={<Smartphone className="w-8 h-8" />} title="Mobile Apps" desc="Native and cross-platform mobile experiences that users love." />
                        <ServiceCard icon={<Cloud className="w-8 h-8" />} title="Cloud Solutions" desc="Scalable, secure, and resilient cloud architectures on AWS and Azure." />
                        <ServiceCard icon={<PenTool className="w-8 h-8" />} title="UI/UX Design" desc="User-centric, beautiful interfaces with meticulous attention to detail." />
                        <div className="lg:col-span-2 bg-gradient-to-br from-[#1e293b] to-berrydark rounded-[32px] p-10 flex flex-col justify-center relative overflow-hidden group shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] opacity-5 group-hover:opacity-10 transition-opacity duration-700 mix-blend-luminosity bg-cover bg-center text-left"></div>
                            <div className="relative z-10 text-left">
                                <h3 className="text-3xl font-bold text-white mb-4">Need Custom Development?</h3>
                                <p className="text-gray-400 mb-8 max-w-xl text-lg font-light">Our engineering team is ready to tackle your most complex technical challenges.</p>
                                <Link to="/services" className="inline-flex items-center text-white font-semibold group-hover:text-berrygreen-400 transition-colors bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 backdrop-blur-sm">
                                    Explore all services <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies Section */}
            <section className="py-24 px-4 bg-gray-50 border-b border-gray-100 relative">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-sm font-bold tracking-widest text-berrypink-600 uppercase mb-3">Tech Stack</h2>
                    <h3 className="text-3xl font-bold text-gray-900 mb-16">Powered by Industry Standards</h3>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        <TechBadge name="React" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
                        <TechBadge name="Spring Boot" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" />
                        <TechBadge name="Tailwind CSS" icon="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" />
                        <TechBadge name="MySQL" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" />
                        <TechBadge name="AWS" icon="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" />
                        <TechBadge name="Docker" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
                        <TechBadge name="Node.js" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
                    </div>
                </div>
            </section>
        </div>
    );
}

function ServiceCard({ icon, title, desc }) {
    return (
        <div className="p-10 bg-white rounded-[32px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(174,221,76,0.15)] hover:-translate-y-2 transition-all duration-500 group text-left">
            <div className="w-16 h-16 bg-berrygreen-50 text-berrygreen-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-berrygreen-400 group-hover:text-white transition-all duration-500 shadow-sm">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-600 leading-relaxed font-light">{desc}</p>
        </div>
    );
}

function TechBadge({ name, icon }) {
    return (
        <div className="flex flex-col items-center gap-4 group cursor-default">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-[28px] border border-gray-100 shadow-sm flex items-center justify-center p-5 group-hover:shadow-xl group-hover:border-berrygreen-200 group-hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-white to-gray-50/50">
                <img src={icon} alt={name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <span className="text-sm font-bold text-gray-400 group-hover:text-berrygreen-600 tracking-wider uppercase transition-colors">{name}</span>
        </div>
    );
}

export default Home;
