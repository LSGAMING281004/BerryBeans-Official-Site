import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await api.get('/public/projects');
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
                <h2 className="text-sm font-bold tracking-widest text-berrypurple-600 uppercase mb-3 block w-full">Case Studies</h2>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight block w-full">Our Portfolio</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                    Explore our recent projects and the innovative solutions we've engineered for our enterprise partners.
                </p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center items-center py-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-berrypurple-600"></div>
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center text-gray-500 py-32 text-lg font-light">No projects to display yet.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white relative hover:shadow-[0_20px_50px_rgb(91,33,182,0.15)] transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col"
                        >
                            <div className="relative h-64 overflow-hidden shrink-0">
                                <img src={project.imageUrl || 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80'} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-berrydark/90 via-berrydark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                    {project.link && (
                                        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-berrypurple-600 text-white rounded-full p-3 hover:bg-berrypurple-500 transition-colors shadow-lg float-right inline-block"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-6 line-clamp-3 font-light flex-1">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.technologies?.split(',').map((tech, i) => (
                                        <span key={i} className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">{tech.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Portfolio;
