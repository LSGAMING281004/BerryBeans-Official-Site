import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import api from '../api/axiosConfig';

import teamMeetingImg from '../assets/images/team-meeting.jpg';

function About() {
    const [leaders, setLeaders] = useState([]);
    const [loadingLeaders, setLoadingLeaders] = useState(true);

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    useEffect(() => {
        async function fetchLeadership() {
            try {
                const res = await api.get('/public/leadership');
                setLeaders(res.data);
            } catch (err) {
                console.error('Failed to load leadership:', err);
            } finally {
                setLoadingLeaders(false);
            }
        }
        fetchLeadership();
    }, []);

    return (
        <section id="about" className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center mb-24">
                <h2 className="text-sm font-bold tracking-widest text-berrypink-600 uppercase mb-3 block w-full">Our Story</h2>
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
                    <div className="absolute inset-0 bg-gradient-to-tr from-berrygreen-400 to-berrypink-400 rounded-[32px] transform translate-x-4 translate-y-4 -z-10 opacity-30 blur-xl"></div>
                    <img src={teamMeetingImg} alt="Team meeting" className="rounded-[32px] shadow-2xl w-full object-cover aspect-square md:aspect-auto" />
                </motion.div>
            </div>

            {/* Leadership Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fluent-panel p-12 lg:p-20"
            >
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-berrypink-600 uppercase mb-3">Leadership</h2>
                    <h3 className="text-4xl font-bold text-gray-900">Meet Our Team</h3>
                </div>

                {loadingLeaders ? (
                    <div className="flex justify-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-berrypink-600"></div>
                    </div>
                ) : leaders.length === 0 ? (
                    <p className="text-center text-gray-400 font-light py-10">Leadership team coming soon.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                        {leaders.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <TeamMemberCard member={member} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
}

function TeamMemberCard({ member }) {
    return (
        <div className="group flex flex-col items-center text-center">
            {/* Photo + Hover Overlay */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 shadow-md ring-2 ring-transparent group-hover:ring-berrypink-200 transition-all duration-300">
                <img
                    src={member.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=aedd4c&color=333&size=256`}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* LinkedIn Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
                    {member.linkedinUrl ? (
                        <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 bg-white text-[#0077b5] px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-[#0077b5] hover:text-white transition-colors duration-200"
                        >
                            <Linkedin size={16} />
                            LinkedIn
                        </a>
                    ) : (
                        <span className="text-white/60 text-xs font-medium">No LinkedIn</span>
                    )}
                </div>
            </div>

            {/* Info */}
            <h3 className="text-base font-bold text-gray-900 leading-tight">{member.name}</h3>
            <p className="text-berrypink-600 font-semibold text-sm mt-0.5">{member.position}</p>
            {member.description && (
                <p className="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-3">{member.description}</p>
            )}
        </div>
    );
}

export default About;
