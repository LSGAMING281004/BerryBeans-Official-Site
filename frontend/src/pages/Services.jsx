import { Code, Smartphone, Cloud, PenTool, Database, Server } from 'lucide-react';
import { motion } from 'framer-motion';

function Services() {
    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-24">
                <h2 className="text-sm font-bold tracking-widest text-berrypurple-600 uppercase mb-3 block w-full">What We Do</h2>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight block w-full">Enterprise Services</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                    We provide end-to-end software development services from ideation to deployment, utilizing the latest enterprise-grade technologies.
                </p>
            </motion.div>

            <div className="space-y-32">
                <ServiceSection
                    icon={<Code className="w-10 h-10" />}
                    title="Web Application Engineering"
                    desc="We build highly interactive, scalable, and secure web applications using modern frameworks like React, Next.js, and Angular. Whether it's a corporate platform or a complex enterprise dashboard, we deliver pixel-perfect precision."
                    image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
                    reverse={false}
                />
                <ServiceSection
                    icon={<Smartphone className="w-10 h-10" />}
                    title="Mobile App Development"
                    desc="Engage your customers anywhere with custom iOS, Android, and cross-platform apps using Flutter and React Native. Beautiful UI matched with robust, crash-free performance."
                    image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80"
                    reverse={true}
                />
                <ServiceSection
                    icon={<Server className="w-10 h-10" />}
                    title="Backend & API Architecture"
                    desc="Robust backend architectures using Spring Boot, Node.js, and Python. We design high-performance RESTful APIs, GraphQL endpoints, and microservices that can scale to handle millions of concurrent requests."
                    image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80"
                    reverse={false}
                />
                <ServiceSection
                    icon={<Cloud className="w-10 h-10" />}
                    title="Cloud & DevOps Integration"
                    desc="Optimize your deployment pipelines and infrastructure with AWS, Azure, Docker, and Kubernetes. We ensure 99.99% uptime, auto-scaling capabilities, and uncompromised security protocols."
                    image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
                    reverse={true}
                />
            </div>
        </div>
    );
}

function ServiceSection({ icon, title, desc, image, reverse }) {
    return (
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1 text-left">
                <div className="w-20 h-20 bg-berrypurple-50 text-berrypurple-600 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                    {icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{title}</h2>
                <p className="text-lg text-gray-600 leading-relaxed font-light">{desc}</p>
            </div>
            <div className="flex-1 w-full relative group">
                <div className="absolute inset-0 bg-berrypurple-600 rounded-3xl transform translate-x-4 translate-y-4 -z-10 opacity-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
                <img src={image} alt={title} className="rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full h-72 md:h-[400px] object-cover transition-transform duration-500 group-hover:-translate-y-2" />
            </div>
        </motion.div>
    );
}

export default Services;
