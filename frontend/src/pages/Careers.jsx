import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock } from 'lucide-react';

function Careers() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await api.get('/public/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, []);

    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
                <h2 className="text-sm font-bold tracking-widest text-berrypurple-600 uppercase mb-3 block w-full">Join Us</h2>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight block w-full">Build the Future</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                    We are always looking for talented and passionate individuals to join our growing team of enterprise innovators.
                </p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center items-center py-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-berrypurple-600"></div>
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center text-gray-500 py-32 text-lg font-light">Currently no open positions. Check back later!</div>
            ) : (
                <div className="space-y-6">
                    {jobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-berrypurple-200 hover:shadow-[0_10px_40px_rgb(91,33,182,0.08)] transition-all duration-300 group"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-berrypurple-50 rounded-lg text-berrypurple-600">
                                            <Briefcase size={20} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-berrypurple-600 transition-colors">{job.title}</h3>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-5 font-medium">
                                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg"><MapPin size={16} className="text-berrypurple-500" /> {job.location}</span>
                                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg"><Clock size={16} className="text-berrypurple-500" /> {job.type}</span>
                                    </div>
                                    <p className="text-gray-600 mt-2 line-clamp-2 font-light leading-relaxed">{job.description}</p>
                                </div>
                                <div className="w-full md:w-auto mt-4 md:mt-0">
                                    <button className="bg-berrypurple-600 text-white font-semibold py-3.5 px-8 rounded-full hover:bg-berrypurple-700 transition shadow-md w-full md:w-auto hover:-translate-y-0.5 hover:shadow-lg">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Careers;
