import React, { useState, useEffect, memo } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Code, Smartphone, Cloud, PenTool, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WorldGlobe from '../components/WorldGlobe';
import JarvisLightBackground from '../components/JarvisLightBackground';

import customDevBg from '../assets/images/custom-dev-bg.jpg';

import About from './About';
import Services from './Services';
import Portfolio from './Portfolio';
import Careers from './Careers';
import CtaSection from '../components/CtaSection';
import Contact from './Contact';

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

// Stable variant objects — no re-creation on every render
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0 }
    }
};

function Home() {
    const [activeLocationIndex, setActiveLocationIndex] = useState(0);

    // Check if this is the user's first time visiting the site
    const isFirstVisitRef = React.useRef(!localStorage.getItem('berrybeans_visited'));
    const isFirstVisit = isFirstVisitRef.current;

    useEffect(() => {
        if (isFirstVisit) {
            localStorage.setItem('berrybeans_visited', 'true');
        }
    }, [isFirstVisit]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLocationIndex((prev) => (prev + 1) % locations.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#ffffff] to-[#f4f7fb]">
            {/* <JarvisLightBackground /> */}

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
                <div className="max-w-7xl mx-auto w-full relative">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

                        {/* Left Side: Content */}
                        <motion.div initial={isFirstVisit ? "hidden" : "visible"} animate="visible" variants={staggerContainer} className="text-left order-2 lg:order-1 pt-8">
                            <motion.h1
                                variants={fadeUp}
                                className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight max-w-[95%] md:max-w-none"
                            >
                                <span className="text-[#f05a66]">Engineering the</span> <br className="hidden md:block" /> <span className="text-[#aedd4c]">Future.</span> <br />
                                <span className="text-gray-400 mt-2 block text-3xl md:text-4xl lg:text-5xl">We craft <br className="hidden lg:block" /> digital solutions <br className="hidden md:block" /> that redefine <br className="hidden lg:block" /> industries.</span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-lg md:text-xl mb-10 text-gray-600 max-w-2xl font-light leading-relaxed">
                                Innovative development for web, mobile, and cloud platforms. We turn complex challenges into seamless digital experiences.
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                                <ScrollLink to="services" smooth={true} duration={250} offset={-80} className="bg-gray-900 text-white font-bold py-4 px-8 rounded-full hover:bg-black transition-all duration-300 shadow-xl hover:-translate-y-1 flex items-center justify-center cursor-pointer">
                                    Explore Services
                                </ScrollLink>
                                <ScrollLink to="portfolio" smooth={true} duration={250} offset={-80} className="bg-transparent border-2 border-gray-900 text-gray-900 font-bold py-4 px-8 rounded-full hover:bg-gray-50 transition-all duration-300 flex items-center justify-center cursor-pointer">
                                    Our Portfolio
                                </ScrollLink>
                            </motion.div>
                        </motion.div>

                        {/* Right Side: Globe */}
                        <motion.div
                            initial={isFirstVisit ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
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
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 animate-fade-in-up">
                        <h2 className="text-sm font-bold tracking-widest text-berrygreen-600 uppercase mb-3 text-center w-full block">Our Expertise</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 w-full block tracking-tight">Comprehensive IT Solutions</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ServiceCard icon={<Code className="w-8 h-8" />} title="Web Development" desc="Responsive, highly-performant web applications tailored to your business needs." />
                        <ServiceCard icon={<Smartphone className="w-8 h-8" />} title="Mobile Apps" desc="Native and cross-platform mobile experiences that users love." />
                        <ServiceCard icon={<Cloud className="w-8 h-8" />} title="Cloud Solutions" desc="Scalable, secure, and resilient cloud architectures on AWS and Azure." />
                        <ServiceCard icon={<PenTool className="w-8 h-8" />} title="UI/UX Design" desc="User-centric, beautiful interfaces with meticulous attention to detail." />
                        <div className="lg:col-span-2 fluent-acrylic-dark rounded-[24px] p-10 flex flex-col justify-center relative overflow-hidden group">
                            <div
                                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 mix-blend-overlay bg-cover bg-center text-left"
                                style={{ backgroundImage: `url(${customDevBg})` }}
                            ></div>
                            <div className="relative z-10 text-left">
                                <h3 className="text-3xl font-bold text-white mb-4">Need Custom Development?</h3>
                                <p className="text-gray-400 mb-8 max-w-xl text-lg font-light">Our engineering team is ready to tackle your most complex technical challenges.</p>
                                <ScrollLink to="services" smooth={true} duration={250} offset={-80} className="inline-flex items-center text-white font-semibold hover:text-berrygreen-400 transition-colors bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 backdrop-blur-sm cursor-pointer">
                                    Explore all services <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </ScrollLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies Section (Paradox Marquee) */}
            <section className="py-24 relative overflow-hidden z-10">
                <div className="max-w-7xl mx-auto text-center mb-16 px-4">
                    <h2 className="text-sm font-bold tracking-widest text-berrypink-600 uppercase mb-3">Tech Stack</h2>
                    <h3 className="text-3xl font-bold text-gray-900">Powered by Industry Standards</h3>
                </div>

                <div className="marquee-container flex flex-col gap-8 relative w-full px-4 md:px-0">
                    {/* Fading edges for the marquee effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#fafbfc] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#fafbfc] to-transparent z-10 pointer-events-none"></div>

                    {/* Top Row (Moving Left) */}
                    <div className="overflow-hidden w-full">
                        <div className="animate-marquee-left gap-6 md:gap-10">
                            <TechBadge name="Firebase" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" />
                            <TechBadge name="WordPress" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" />
                            <TechBadge name="Java" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" />
                            <TechBadge name="HTML" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
                            <TechBadge name="CSS" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
                            <TechBadge name="JavaScript" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                            <TechBadge name="AI/ML" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" />
                            <TechBadge name="Python" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
                            <TechBadge name="MongoDB" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
                            <TechBadge name="PostgreSQL" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
                            {/* Duplicated set for seamless loop */}
                            <TechBadge name="Firebase" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" />
                            <TechBadge name="WordPress" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" />
                            <TechBadge name="Java" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" />
                            <TechBadge name="HTML" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
                            <TechBadge name="CSS" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
                            <TechBadge name="JavaScript" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                            <TechBadge name="AI/ML" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" />
                            <TechBadge name="Python" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
                            <TechBadge name="MongoDB" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
                            <TechBadge name="PostgreSQL" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
                        </div>
                    </div>

                    {/* Bottom Row (Moving Right) */}
                    <div className="overflow-hidden w-full">
                        <div className="animate-marquee-right gap-6 md:gap-10">
                            <TechBadge name="GitHub" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
                            <TechBadge name="Antigravity" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" />
                            <TechBadge name="VS Code" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" />
                            <TechBadge name="React" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
                            <TechBadge name="Spring Boot" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" />
                            <TechBadge name="Tailwind" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" />
                            <TechBadge name="AWS" icon="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" />
                            <TechBadge name="Docker" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
                            {/* Duplicated set for seamless loop */}
                            <TechBadge name="GitHub" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
                            <TechBadge name="Antigravity" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" />
                            <TechBadge name="VS Code" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" />
                            <TechBadge name="React" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
                            <TechBadge name="Spring Boot" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" />
                            <TechBadge name="Tailwind" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" />
                            <TechBadge name="AWS" icon="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" />
                            <TechBadge name="Docker" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Injected Single Page Sections */}
            <About />
            <Services />
            <Portfolio />
            <Careers />
            <CtaSection />
            <Contact />
        </div>
    );
}

// Memoized — only re-renders if icon/title/desc change (they never do)
const ServiceCard = memo(function ServiceCard({ icon, title, desc }) {
    return (
        <div className="fluent-panel p-10 group text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/80 shadow-sm text-berrygreen-600 group-hover:scale-110 group-hover:bg-berrygreen-500 group-hover:text-white transition-all duration-500">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{desc}</p>
            </div>
        </div>
    );
});

// Memoized — only re-renders if name/icon change (they never do)
const TechBadge = memo(function TechBadge({ name, icon }) {
    return (
        <div className="flex flex-col items-center gap-4 group cursor-default">
            <div className="w-20 h-20 md:w-24 md:h-24 fluent-panel flex items-center justify-center p-5 group-hover:bg-white/80 group-hover:border-cyan-200 transition-all duration-500">
                <img src={icon} alt={name} className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
            </div>
            <span className="text-sm font-bold text-gray-400 group-hover:text-cyan-600 tracking-wider uppercase transition-colors">{name}</span>
        </div>
    );
});

export default Home;
