import { Code, Smartphone, Cloud, PenTool, Database, Server, Megaphone, BarChart, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

import webDevImg from '../assets/images/web-dev.jpg';
import mobileAppImg from '../assets/images/mobile-app.jpg';
import backendImg from '../assets/images/backend.jpg';
import cloudImg from '../assets/images/cloud.jpg';
import marketingImg from '../assets/images/marketing.jpg';
import dataImg from '../assets/images/data.jpg';
import fullstackImg from '../assets/images/fullstack.jpg';

function Services() {
    return (
        <section id="services" className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4 }} className="text-center mb-24">
                <h2 className="text-sm font-bold tracking-widest text-berrypink-600 uppercase mb-3 block w-full">What We Do</h2>
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
                    image={webDevImg}
                    reverse={false}
                />
                <ServiceSection
                    icon={<Smartphone className="w-10 h-10" />}
                    title="Mobile App Development"
                    desc="Engage your customers anywhere with custom iOS, Android, and cross-platform apps using Flutter and React Native. Beautiful UI matched with robust, crash-free performance."
                    image={mobileAppImg}
                    reverse={true}
                />
                <ServiceSection
                    icon={<Server className="w-10 h-10" />}
                    title="Backend & API Architecture"
                    desc="Robust backend architectures using Spring Boot, Node.js, and Python. We design high-performance RESTful APIs, GraphQL endpoints, and microservices that can scale to handle millions of concurrent requests."
                    image={backendImg}
                    reverse={false}
                />
                <ServiceSection
                    icon={<Cloud className="w-10 h-10" />}
                    title="Cloud & DevOps Integration"
                    desc="Optimize your deployment pipelines and infrastructure with AWS, Azure, Docker, and Kubernetes. We ensure 99.99% uptime, auto-scaling capabilities, and uncompromised security protocols."
                    image={cloudImg}
                    reverse={true}
                />
                <ServiceSection
                    icon={<Megaphone className="w-10 h-10" />}
                    title="Digital Marketing & SEO"
                    desc="Data-driven marketing campaigns, comprehensive SEO strategies, and targeted social media management to skyrocket your brand's digital presence, conversion rates, and ROI."
                    image={marketingImg}
                    reverse={false}
                />
                <ServiceSection
                    icon={<BarChart className="w-10 h-10" />}
                    title="Data Analysis & BI"
                    desc="Transform raw metrics into actionable insights. We build custom dashboards, implement predictive AI models, and engineer robust data pipelines tailored for your executive decision-making."
                    image={dataImg}
                    reverse={true}
                />
                <ServiceSection
                    icon={<Layers className="w-10 h-10" />}
                    title="Full Stack Application Architecture"
                    desc="Cohesive, feature-rich full stack apps integrating modern frontends with powerful secure backends. We own the entire software lifecycle from database modeling to final UI production."
                    image={fullstackImg}
                    reverse={false}
                />
            </div>
        </section>
    );
}

function ServiceSection({ icon, title, desc, image, reverse }) {
    return (
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1 text-left">
                <div className="w-20 h-20 fluent-panel text-cyan-600 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                    {icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{title}</h2>
                <p className="text-lg text-gray-600 leading-relaxed font-light">{desc}</p>
            </div>
            <div className="flex-1 w-full relative group">
                <div className="fluent-panel p-4 pb-0 rounded-[2.5rem] transform group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
                    <img src={image} alt={title} className="rounded-[2rem] rounded-b-none w-full h-72 md:h-[400px] object-cover" />
                </div>
            </div>
        </motion.div>
    );
}

export default Services;
