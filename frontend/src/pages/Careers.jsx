import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, X, Plus, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

function Careers() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [viewJob, setViewJob] = useState(null); // For "View Details" modal
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [resumeFile, setResumeFile] = useState(null);

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

    const handleApply = (job) => {
        setSelectedJob(job);
        setViewJob(null);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let resumeBase64 = '';
        if (resumeFile) {
            const reader = new FileReader();
            resumeBase64 = await new Promise((resolve) => {
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(resumeFile);
            });
        }
        const payload = {
            name: applicantName,
            email: applicantEmail,
            message: `Position: ${selectedJob.title}\n\nCover Letter:\n${coverLetter}`,
            resume: resumeBase64
        };
        try {
            await api.post('/public/contact', payload);
            alert('Application submitted successfully!');
            setApplicantName('');
            setApplicantEmail('');
            setCoverLetter('');
            setResumeFile(null);
            setShowForm(false);
            setSelectedJob(null);
        } catch (error) {
            console.error("Error submitting application:", error);
            alert('Failed to submit application. Please try again.');
        }
    };

    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
                <h2 className="text-sm font-bold tracking-widest text-berrypink-600 uppercase mb-3 block w-full">Join Us</h2>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight block w-full">Build the Future</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                    We are always looking for talented and passionate individuals to join our growing team of enterprise innovators.
                </p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center items-center py-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-berrypink-600"></div>
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
                            className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-berrypink-200 hover:shadow-[0_10px_40px_rgba(240,90,102,0.1)] transition-all duration-300 group"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-berrygreen-50 rounded-lg text-berrypink-600">
                                            <Briefcase size={20} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-berrypink-600 transition-colors">{job.title}</h3>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4 font-medium">
                                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg"><MapPin size={16} className="text-berrypink-500" /> {job.location}</span>
                                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg"><Clock size={16} className="text-berrypink-500" /> {job.type}</span>
                                    </div>
                                    {/* Description preview */}
                                    <p className="text-gray-600 font-light leading-relaxed line-clamp-2">{job.description}</p>
                                    <button
                                        onClick={() => setViewJob(job)}
                                        className="mt-3 inline-flex items-center gap-1 text-berrypink-600 font-semibold text-sm hover:gap-2 transition-all duration-200"
                                    >
                                        View Full Details <ChevronRight size={15} />
                                    </button>
                                </div>
                                <div className="w-full md:w-auto mt-2 md:mt-0">
                                    <button
                                        onClick={() => handleApply(job)}
                                        className="bg-berrypink-600 text-white font-semibold py-3.5 px-8 rounded-full hover:bg-berrypink-700 transition shadow-md w-full md:w-auto hover:-translate-y-0.5 hover:shadow-lg"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* View Full Details Modal */}
            <AnimatePresence>
                {viewJob && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-12 w-full max-w-2xl shadow-2xl relative border border-gray-100 my-8"
                        >
                            <button
                                onClick={() => setViewJob(null)}
                                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2.5 bg-berrypink-50 rounded-xl text-berrypink-600">
                                    <Briefcase size={22} />
                                </div>
                                <h2 className="text-3xl font-extrabold text-gray-900">{viewJob.title}</h2>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-8 mt-3">
                                <span className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-sm text-gray-600 font-medium">
                                    <MapPin size={15} className="text-berrypink-500" /> {viewJob.location}
                                </span>
                                <span className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-sm text-gray-600 font-medium">
                                    <Clock size={15} className="text-berrypink-500" /> {viewJob.type}
                                </span>
                            </div>

                            {viewJob.description && (
                                <div className="mb-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <FileText size={16} className="text-berrypink-500" /> About the Role
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed font-light whitespace-pre-line">{viewJob.description}</p>
                                </div>
                            )}

                            {viewJob.requirements && (
                                <div className="mb-8">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-berrypink-500" /> Requirements
                                    </h4>
                                    <ul className="space-y-2">
                                        {viewJob.requirements.split(',').map((req, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm font-light">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-berrypink-400 flex-shrink-0"></span>
                                                {req.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button
                                onClick={() => { handleApply(viewJob); }}
                                className="w-full bg-berrypink-600 text-white font-bold py-4 rounded-2xl hover:bg-berrypink-700 transition shadow-lg hover:-translate-y-0.5"
                            >
                                Apply for this Position
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Application Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-12 w-full max-w-2xl shadow-2xl relative border border-gray-100 my-8"
                        >
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>

                            <div className="mb-8">
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Apply for {selectedJob?.title}</h2>
                                <p className="text-gray-500">Fill in your details and we'll get back to you soon.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-berrypink-500 focus:border-transparent outline-none transition-all"
                                            value={applicantName}
                                            onChange={(e) => setApplicantName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-berrypink-500 focus:border-transparent outline-none transition-all"
                                            value={applicantEmail}
                                            onChange={(e) => setApplicantEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Cover Letter</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Tell us about yourself and why you're a great fit..."
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-berrypink-500 focus:border-transparent outline-none transition-all resize-none"
                                        value={coverLetter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Resume / CV</label>
                                    <div className="relative group">
                                        <input
                                            required
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            className="hidden"
                                            id="resume-upload"
                                            onChange={(e) => setResumeFile(e.target.files[0])}
                                        />
                                        <label
                                            htmlFor="resume-upload"
                                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:border-berrypink-400 hover:bg-berrypink-50 transition-all cursor-pointer group"
                                        >
                                            <Plus className="text-gray-400 group-hover:text-berrypink-600 mb-2" size={24} />
                                            <span className="text-sm font-medium text-gray-600 group-hover:text-berrypink-700">
                                                {resumeFile ? resumeFile.name : "Click to upload your resume (PDF, DOC)"}
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-berrypink-600 text-white font-bold py-4 rounded-2xl hover:bg-berrypink-700 transition shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        Submit Application
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="w-full mt-3 text-gray-500 font-medium py-2 hover:text-gray-700 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Careers;
