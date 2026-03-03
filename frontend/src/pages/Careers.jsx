import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock } from 'lucide-react';

// New imports for form handling
import { X, Plus } from 'lucide-react';

function Careers() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    // New state for application form
    const [showForm, setShowForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
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
            // Reset form
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
                                    <button
                                        onClick={() => handleApply(job)}
                                        className="bg-berrypurple-600 text-white font-semibold py-3.5 px-8 rounded-full hover:bg-berrypurple-700 transition shadow-md w-full md:w-auto hover:-translate-y-0.5 hover:shadow-lg"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Application Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 w-full max-w-2xl shadow-2xl relative border border-gray-100"
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
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 focus:border-transparent outline-none transition-all"
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
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 focus:border-transparent outline-none transition-all"
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
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 focus:border-transparent outline-none transition-all resize-none"
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
                                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:border-berrypurple-400 hover:bg-berrypurple-50 transition-all cursor-pointer group"
                                    >
                                        <Plus className="text-gray-400 group-hover:text-berrypurple-600 mb-2" size={24} />
                                        <span className="text-sm font-medium text-gray-600 group-hover:text-berrypurple-700">
                                            {resumeFile ? resumeFile.name : "Click to upload your resume (PDF, DOC)"}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-berrypurple-600 text-white font-bold py-4 rounded-2xl hover:bg-berrypurple-700 transition shadow-lg hover:shadow-berrypurple-200/50 hover:-translate-y-0.5 active:translate-y-0"
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
        </div>
    );
}

export default Careers;
