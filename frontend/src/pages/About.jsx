import { motion } from 'framer-motion';

function About() {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-24">
                <h2 className="text-sm font-bold tracking-widest text-berrypurple-600 uppercase mb-3 block w-full">Our Story</h2>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight block w-full">About BerryBeans</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                    We are a strategic team of passionate technologists dedicated to building software that drives real business value.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-10 font-light">
                        To empower enterprises through innovative, reliable, and scalable digital solutions. We believe in writing clean code and delivering exceptional user experiences that elevate brands.
                    </p>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                        To be the leading global IT partner recognized for technical excellence, creative problem-solving, and transformative impact.
                    </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-berrypurple-600 to-blue-500 rounded-3xl transform translate-x-4 translate-y-4 -z-10 opacity-50 blur-lg"></div>
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Team meeting" className="rounded-3xl shadow-2xl w-full object-cover aspect-square md:aspect-auto" />
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-gray-50 to-white rounded-[3rem] p-12 lg:p-20 text-center border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-sm font-bold tracking-widest text-berrypurple-600 uppercase mb-3 block w-full">Leadership</h2>
                <h3 className="text-4xl font-bold text-gray-900 mb-16 block w-full">Meet Our Team</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    <TeamMember name="Alex Turner" role="CEO & Founder" />
                    <TeamMember name="Maria Santos" role="CTO" />
                    <TeamMember name="James Wilson" role="Lead Designer" />
                    <TeamMember name="Emma Davis" role="Head of Engineering" />
                </div>
            </motion.div>
        </div>
    );
}

function TeamMember({ name, role }) {
    return (
        <div className="group text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden ring-4 ring-berrypurple-50 group-hover:ring-berrypurple-200 transition-all duration-300 shadow-md group-hover:shadow-lg">
                <img src={`https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=5b21b6&color=fff&size=128`} alt={name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
            <p className="text-berrypurple-600 font-medium">{role}</p>
        </div>
    );
}

export default About;
