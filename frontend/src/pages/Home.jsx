import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Cloud, PenTool, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

function Home() {
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
            <section className="relative min-h-screen flex items-center pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-berrydark overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-berrypurple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
                <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-berrypurple-800 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>

                <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
                        <motion.div variants={fadeUp} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/20 glass-morphism-dark">
                            <span className="text-sm font-medium text-berrypurple-300">Award-winning IT Solutions Agency</span>
                        </motion.div>
                        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
                            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-berrypurple-400 to-blue-400">Smart</span> Digital Solutions
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                            We transform your ideas into powerful, scalable, and beautifully designed software products. Elevate your business with enterprise-grade technology.
                        </motion.p>
                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-5 items-center">
                            <Link to="/contact" className="w-full sm:w-auto bg-berrypurple-600 text-white font-semibold py-4 px-10 rounded-full hover:bg-berrypurple-700 transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2">
                                Get Started <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/portfolio" className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-semibold py-4 px-10 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                View Our Work
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative border-b border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-sm font-bold tracking-widest text-berrypurple-600 uppercase mb-3 text-center w-full block">Our Expertise</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 w-full block">Comprehensive IT Solutions</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ServiceCard icon={<Code className="w-8 h-8" />} title="Web Development" desc="Responsive, highly-performant web applications tailored to your business needs." />
                        <ServiceCard icon={<Smartphone className="w-8 h-8" />} title="Mobile Apps" desc="Native and cross-platform mobile experiences that users love." />
                        <ServiceCard icon={<Cloud className="w-8 h-8" />} title="Cloud Solutions" desc="Scalable, secure, and resilient cloud architectures on AWS and Azure." />
                        <ServiceCard icon={<PenTool className="w-8 h-8" />} title="UI/UX Design" desc="User-centric, beautiful interfaces with meticulous attention to detail." />
                        <div className="lg:col-span-2 bg-gradient-to-br from-berrypurple-900 to-berrydark rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden group shadow-lg">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] opacity-10 group-hover:opacity-20 transition-opacity duration-700 mix-blend-luminosity bg-cover bg-center text-left"></div>
                            <div className="relative z-10 text-left">
                                <h3 className="text-3xl font-bold text-white mb-4">Need Custom Development?</h3>
                                <p className="text-berrypurple-200 mb-8 max-w-xl text-lg font-light">Our engineering team is ready to tackle your most complex technical challenges.</p>
                                <Link to="/services" className="inline-flex items-center text-white font-semibold group-hover:text-berrypurple-300 transition-colors bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 backdrop-blur-sm">
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
                    <h2 className="text-sm font-bold tracking-widest text-berrypurple-600 uppercase mb-3">Tech Stack</h2>
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
        <div className="p-10 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(91,33,182,0.08)] hover:-translate-y-2 transition-all duration-300 group text-left">
            <div className="w-16 h-16 bg-berrypurple-50 text-berrypurple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-berrypurple-600 group-hover:text-white transition-all duration-300 shadow-sm">
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
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center p-5 group-hover:shadow-xl group-hover:border-berrypurple-200 group-hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-white to-gray-50/50">
                <img src={icon} alt={name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <span className="text-sm font-bold text-gray-400 group-hover:text-berrypurple-600 tracking-wider uppercase transition-colors">{name}</span>
        </div>
    );
}

export default Home;
