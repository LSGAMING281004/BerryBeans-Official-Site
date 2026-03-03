import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { MessageSquare, FolderKanban, Briefcase, LogOut, LayoutDashboard, Plus, Trash2, X, FileText, Menu } from 'lucide-react';

function Dashboard() {
    const [messages, setMessages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [activeTab, setActiveTab] = useState('messages');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Form States
    const [projectForm, setProjectForm] = useState({ title: '', description: '', imageUrl: '', technologies: '' });
    const [jobForm, setJobForm] = useState({ title: '', description: '', requirements: '', location: '', type: 'Full-time' });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchData();
    }, [navigate, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'messages') {
                const res = await api.get('/admin/messages');
                setMessages(res.data);
            } else if (activeTab === 'projects') {
                const res = await api.get('/admin/projects');
                setProjects(res.data);
            } else if (activeTab === 'jobs') {
                const res = await api.get('/admin/jobs');
                setJobs(res.data);
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) navigate('/admin/login');
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;
        try {
            await api.delete(`/admin/${type}/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (activeTab === 'projects') {
                await api.post('/admin/projects', projectForm);
                setProjectForm({ title: '', description: '', imageUrl: '', technologies: '' });
            } else if (activeTab === 'jobs') {
                await api.post('/admin/jobs', jobForm);
                setJobForm({ title: '', description: '', requirements: '', location: '', type: 'Full-time' });
            }
            setShowForm(false);
            fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    const NavButton = ({ id, icon, label }) => (
        <button
            onClick={() => { setActiveTab(id); setShowForm(false); setShowMobileMenu(false); }}
            className={`w-full flex items-center gap-3 text-left py-3 px-5 rounded-xl transition-all duration-300 font-medium ${activeTab === id ? 'bg-berrypurple-600 text-white shadow-md' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
        >
            {icon} {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans">
            {/* Mobile Header */}
            <div className="lg:hidden bg-berrydark text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="h-8 w-auto bg-white rounded-lg p-1" />
                    <span className="font-bold tracking-tight">BerryAdmin</span>
                </div>
                <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-berrydark text-white p-6 flex flex-col border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="hidden lg:flex flex-col items-center gap-3 mb-10 px-2 mt-4 bg-white/5 p-4 rounded-2xl">
                    <img src="/logo.png" alt="BerryBeans Logo" className="h-10 w-auto bg-white rounded-xl p-1 shadow-md" />
                    <h2 className="text-xl font-bold tracking-tight text-white">BerryAdmin</h2>
                </div>

                <nav className="space-y-2 flex-1 mt-10 lg:mt-0">
                    <NavButton id="messages" icon={<MessageSquare size={20} />} label="Messages" />
                    <NavButton id="projects" icon={<FolderKanban size={20} />} label="Projects" />
                    <NavButton id="jobs" icon={<Briefcase size={20} />} label="Jobs" />
                </nav>

                <div className="mt-auto">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 py-3 px-5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors duration-300 font-medium">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {showMobileMenu && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setShowMobileMenu(false)}></div>}

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-6 md:mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <LayoutDashboard size={28} className="text-berrypurple-600" />
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 capitalize tracking-tight">{activeTab} Management</h1>
                        </div>
                        {activeTab !== 'messages' && (
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className="w-full md:w-auto flex items-center justify-center gap-2 bg-berrypurple-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-berrypurple-700 transition transform hover:-translate-y-0.5"
                            >
                                {showForm ? <X size={20} /> : <Plus size={20} />}
                                {showForm ? 'Cancel' : `Add ${activeTab.slice(0, -1)}`}
                            </button>
                        )}
                    </header>

                    {showForm && (
                        <div className="mb-10 bg-white p-8 rounded-[2.5rem] shadow-xl border border-berrypurple-100 animate-in fade-in slide-in-from-top-4 duration-300">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New {activeTab.slice(0, -1)}</h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {activeTab === 'projects' ? (
                                    <>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 outline-none transition" placeholder="e.g. Modern E-commerce" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Technologies</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 outline-none transition" placeholder="React, Node.js, Tailwind" value={projectForm.technologies} onChange={e => setProjectForm({ ...projectForm, technologies: e.target.value })} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 outline-none transition" placeholder="https://unsplash.com/..." value={projectForm.imageUrl} onChange={e => setProjectForm({ ...projectForm, imageUrl: e.target.value })} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                            <textarea required rows="4" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 outline-none transition resize-none" placeholder="Describe the project objective and results..." value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}></textarea>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 outline-none transition" placeholder="Fullstack Developer" value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 outline-none transition" placeholder="Remote / New York" value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                                            <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 outline-none transition" value={jobForm.type} onChange={e => setJobForm({ ...jobForm, type: e.target.value })}>
                                                <option>Full-time</option>
                                                <option>Part-time</option>
                                                <option>Contract</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 outline-none transition" placeholder="React, Spring Boot, MySQL" value={jobForm.requirements} onChange={e => setJobForm({ ...jobForm, requirements: e.target.value })} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                            <textarea required rows="4" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypurple-500 outline-none transition resize-none" placeholder="What will the person do?..." value={jobForm.description} onChange={e => setJobForm({ ...jobForm, description: e.target.value })}></textarea>
                                        </div>
                                    </>
                                )}
                                <div className="col-span-2 flex justify-end gap-3 mt-4">
                                    <button type="submit" disabled={loading} className="bg-berrypurple-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-berrypurple-700 disabled:opacity-50 transition">
                                        {loading ? 'Saving...' : 'Publish'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    {activeTab === 'messages' ? (
                                        <tr>
                                            <th className="px-4 md:px-8 py-4 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Name</th>
                                            <th className="px-4 md:px-8 py-4 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</th>
                                            <th className="px-4 md:px-8 py-4 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th>
                                            <th className="px-4 md:px-8 py-4 md:py-5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    ) : activeTab === 'projects' ? (
                                        <tr>
                                            <th className="px-4 md:px-8 py-4 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Project</th>
                                            <th className="px-4 md:px-8 py-4 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Technologies</th>
                                            <th className="px-4 md:px-8 py-4 md:py-5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <th className="px-4 md:px-8 py-4 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Job Role</th>
                                            <th className="px-4 md:px-8 py-4 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Info</th>
                                            <th className="px-4 md:px-8 py-4 md:py-5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    )}
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-50">
                                    {loading ? (
                                        <tr><td colSpan="4" className="px-8 py-20 text-center text-gray-400">Loading data...</td></tr>
                                    ) : activeTab === 'messages' ? (
                                        messages.length === 0 ? (
                                            <tr><td colSpan="4" className="px-8 py-20 text-center text-gray-400 font-light">No messages found.</td></tr>
                                        ) : (
                                            messages.map(msg => (
                                                <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap font-bold text-gray-900 text-sm md:text-base">{msg.name}</td>
                                                    <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap text-gray-500 text-sm">{msg.email}</td>
                                                    <td className="px-4 md:px-8 py-4 md:py-6 text-gray-600 min-w-[200px] max-w-sm">
                                                        <div className="line-clamp-2 text-sm">{msg.message}</div>
                                                    </td>
                                                    <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            {msg.resume && (
                                                                <button
                                                                    onClick={() => {
                                                                        const link = document.createElement('a');
                                                                        link.href = msg.resume;
                                                                        link.download = `resume_${msg.name.replace(/\s+/g, '_')}.pdf`;
                                                                        link.click();
                                                                    }}
                                                                    className="text-berrypurple-600 p-2 hover:bg-berrypurple-50 rounded-xl transition flex items-center gap-1 text-xs font-bold"
                                                                    title="Download Resume"
                                                                >
                                                                    <FileText size={16} className="md:w-[18px] md:h-[18px]" /> <span className="hidden md:inline">Resume</span>
                                                                </button>
                                                            )}
                                                            <button onClick={() => deleteItem('messages', msg.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-xl transition" title="Delete Message">
                                                                <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    ) : activeTab === 'projects' ? (
                                        projects.length === 0 ? (
                                            <tr><td colSpan="3" className="px-8 py-20 text-center text-gray-400 font-light">No projects added yet.</td></tr>
                                        ) : (
                                            projects.map(proj => (
                                                <tr key={proj.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-4 md:px-8 py-4 md:py-6 flex items-center gap-3 md:gap-4">
                                                        <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-inner bg-gray-100">
                                                            <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="font-bold text-gray-900 text-sm md:text-base truncate">{proj.title}</div>
                                                            <div className="text-xs md:text-sm text-gray-500 truncate max-w-[150px] md:max-w-[200px]">{proj.description}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 md:px-8 py-4 md:py-6">
                                                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                                                            {proj.technologies?.split(',').map(tech => (
                                                                <span key={tech} className="bg-berrypurple-50 text-berrypurple-600 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold">{tech.trim()}</span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap text-center">
                                                        <button onClick={() => deleteItem('projects', proj.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-xl transition"><Trash2 size={16} className="md:w-[18px] md:h-[18px]" /></button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    ) : (
                                        jobs.length === 0 ? (
                                            <tr><td colSpan="3" className="px-8 py-20 text-center text-gray-400 font-light">No jobs listed.</td></tr>
                                        ) : (
                                            jobs.map(job => (
                                                <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap">
                                                        <div className="font-bold text-gray-900 text-sm md:text-base">{job.title}</div>
                                                        <div className="text-[10px] md:text-sm text-berrypurple-600 font-semibold">{job.type}</div>
                                                    </td>
                                                    <td className="px-4 md:px-8 py-4 md:py-6">
                                                        <div className="text-gray-900 text-xs md:text-sm font-medium">{job.location}</div>
                                                        <div className="text-gray-500 text-[10px] md:text-xs truncate max-w-[150px] md:max-w-sm">{job.requirements}</div>
                                                    </td>
                                                    <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap text-center">
                                                        <button onClick={() => deleteItem('jobs', job.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-xl transition"><Trash2 size={16} className="md:w-[18px] md:h-[18px]" /></button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
