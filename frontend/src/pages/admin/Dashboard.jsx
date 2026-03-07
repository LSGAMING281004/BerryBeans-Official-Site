import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { MessageSquare, FolderKanban, Briefcase, LogOut, LayoutDashboard, Plus, Trash2, X, FileText, Menu, Eye, Users, Linkedin, Pencil } from 'lucide-react';
import AnimatedLogo from '../../components/AnimatedLogo';

function Dashboard() {
    const [messages, setMessages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [leadership, setLeadership] = useState([]);
    const [activeTab, setActiveTab] = useState('messages');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // View modals
    const [viewMessage, setViewMessage] = useState(null);
    const [viewJob, setViewJob] = useState(null);

    // Edit leadership state
    const [editLeader, setEditLeader] = useState(null);

    // Form States
    const [projectForm, setProjectForm] = useState({ title: '', description: '', imageUrl: '', technologies: '', link: '' });
    const [jobForm, setJobForm] = useState({ title: '', description: '', requirements: '', location: '', type: 'Full-time' });
    const [leaderForm, setLeaderForm] = useState({ name: '', photoUrl: '', position: '', description: '', linkedinUrl: '' });

    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
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
            } else if (activeTab === 'leadership') {
                const res = await api.get('/admin/leadership');
                setLeadership(res.data);
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) navigate('/admin/login');
        } finally {
            setLoading(false);
        }
    }, [activeTab, navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchData();
    }, [navigate, fetchData]);

    const deleteItem = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type === 'leadership' ? 'member' : type.slice(0, -1)}?`)) return;
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
                setProjectForm({ title: '', description: '', imageUrl: '', technologies: '', link: '' });
            } else if (activeTab === 'jobs') {
                await api.post('/admin/jobs', jobForm);
                setJobForm({ title: '', description: '', requirements: '', location: '', type: 'Full-time' });
            } else if (activeTab === 'leadership') {
                if (editLeader) {
                    await api.put(`/admin/leadership/${editLeader.id}`, leaderForm);
                    setEditLeader(null);
                } else {
                    await api.post('/admin/leadership', leaderForm);
                }
                setLeaderForm({ name: '', photoUrl: '', position: '', description: '', linkedinUrl: '' });
            }
            setShowForm(false);
            fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditLeader = (member) => {
        setEditLeader(member);
        setLeaderForm({
            name: member.name,
            photoUrl: member.photoUrl || '',
            position: member.position,
            description: member.description || '',
            linkedinUrl: member.linkedinUrl || ''
        });
        setShowForm(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    const NavButton = ({ id, icon, label }) => (
        <button
            onClick={() => { setActiveTab(id); setShowForm(false); setEditLeader(null); setShowMobileMenu(false); }}
            className={`w-full flex items-center gap-3 text-left py-3 px-5 rounded-xl transition-all duration-300 font-medium ${activeTab === id ? 'bg-berrypink-600 text-white shadow-md' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
        >
            {icon} {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans">
            {/* Mobile Header */}
            <div className="lg:hidden bg-berrydark text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
                <div className="flex items-center gap-2">
                    <AnimatedLogo className="h-8 w-auto bg-white rounded-lg p-1" speed={0.6} />
                    <span className="font-bold tracking-tight">BerryAdmin</span>
                </div>
                <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-berrydark text-white p-6 flex flex-col border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="hidden lg:flex flex-col items-center gap-3 mb-10 px-2 mt-4 bg-white/5 p-4 rounded-2xl">
                    <AnimatedLogo className="h-10 w-auto bg-white rounded-xl p-1 shadow-md" speed={0.6} />
                    <h2 className="text-xl font-bold tracking-tight text-white">BerryAdmin</h2>
                </div>

                <nav className="space-y-2 flex-1 mt-10 lg:mt-0">
                    <NavButton id="messages" icon={<MessageSquare size={20} />} label="Messages" />
                    <NavButton id="projects" icon={<FolderKanban size={20} />} label="Projects" />
                    <NavButton id="jobs" icon={<Briefcase size={20} />} label="Jobs" />
                    <NavButton id="leadership" icon={<Users size={20} />} label="Leadership" />
                </nav>

                <div className="mt-auto">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 py-3 px-5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors duration-300 font-medium">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            {showMobileMenu && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setShowMobileMenu(false)}></div>}

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-6 md:mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <LayoutDashboard size={28} className="text-berrypink-600" />
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 capitalize tracking-tight">{activeTab} Management</h1>
                        </div>
                        {activeTab !== 'messages' && (
                            <button
                                onClick={() => { setEditLeader(null); setLeaderForm({ name: '', photoUrl: '', position: '', description: '', linkedinUrl: '' }); setShowForm(!showForm); }}
                                className="w-full md:w-auto flex items-center justify-center gap-2 bg-berrypink-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-berrypink-700 transition transform hover:-translate-y-0.5"
                            >
                                {showForm ? <X size={20} /> : <Plus size={20} />}
                                {showForm ? 'Cancel' : `Add ${activeTab === 'leadership' ? 'Member' : activeTab.slice(0, -1)}`}
                            </button>
                        )}
                    </header>

                    {/* Add / Edit Form */}
                    {showForm && (
                        <div className="mb-10 bg-white p-8 rounded-[2.5rem] shadow-xl border border-berrypink-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                                {activeTab === 'leadership' ? (editLeader ? 'Edit Member' : 'Add New Member') : `Create New ${activeTab.slice(0, -1)}`}
                            </h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {activeTab === 'projects' ? (
                                    <>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" placeholder="e.g. Modern E-commerce" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Technologies</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" placeholder="React, Node.js, Tailwind" value={projectForm.technologies} onChange={e => setProjectForm({ ...projectForm, technologies: e.target.value })} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" placeholder="https://unsplash.com/..." value={projectForm.imageUrl} onChange={e => setProjectForm({ ...projectForm, imageUrl: e.target.value })} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                            <textarea required rows="4" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition resize-none" placeholder="Describe the project objective and results..." value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}></textarea>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Link (Optional)</label>
                                            <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" placeholder="https://app.berrybeans.com" value={projectForm.link} onChange={e => setProjectForm({ ...projectForm, link: e.target.value })} />
                                        </div>
                                    </>
                                ) : activeTab === 'jobs' ? (
                                    <>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" placeholder="Fullstack Developer" value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" placeholder="Remote / New York" value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                                            <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" value={jobForm.type} onChange={e => setJobForm({ ...jobForm, type: e.target.value })}>
                                                <option>Full-time</option>
                                                <option>Part-time</option>
                                                <option>Contract</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements (comma-separated)</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" placeholder="React, Spring Boot, MySQL" value={jobForm.requirements} onChange={e => setJobForm({ ...jobForm, requirements: e.target.value })} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                            <textarea required rows="4" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition resize-none" placeholder="What will the person do?..." value={jobForm.description} onChange={e => setJobForm({ ...jobForm, description: e.target.value })}></textarea>
                                        </div>
                                    </>
                                ) : (
                                    /* Leadership Form */
                                    <>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" placeholder="e.g. Alex Turner" value={leaderForm.name} onChange={e => setLeaderForm({ ...leaderForm, name: e.target.value })} />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Position / Title</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" placeholder="e.g. CEO & Founder" value={leaderForm.position} onChange={e => setLeaderForm({ ...leaderForm, position: e.target.value })} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Photo URL</label>
                                            <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" placeholder="https://example.com/photo.jpg" value={leaderForm.photoUrl} onChange={e => setLeaderForm({ ...leaderForm, photoUrl: e.target.value })} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn Profile URL</label>
                                            <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition" placeholder="https://linkedin.com/in/..." value={leaderForm.linkedinUrl} onChange={e => setLeaderForm({ ...leaderForm, linkedinUrl: e.target.value })} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio / Description</label>
                                            <textarea rows="3" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-berrypink-500 outline-none transition resize-none" placeholder="Brief bio about this team member..." value={leaderForm.description} onChange={e => setLeaderForm({ ...leaderForm, description: e.target.value })}></textarea>
                                        </div>
                                    </>
                                )}
                                <div className="col-span-2 flex justify-end gap-3 mt-4">
                                    <button type="button" onClick={() => { setShowForm(false); setEditLeader(null); }} className="px-8 py-4 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition">Cancel</button>
                                    <button type="submit" disabled={loading} className="bg-berrypink-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-berrypink-700 disabled:opacity-50 transition">
                                        {loading ? 'Saving...' : (editLeader ? 'Update' : 'Publish')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Leadership Grid */}
                    {activeTab === 'leadership' ? (
                        <div>
                            {loading ? (
                                <div className="text-center py-20 text-gray-400">Loading...</div>
                            ) : leadership.length === 0 ? (
                                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-20 text-center text-gray-400 font-light">No leadership members added yet.</div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {leadership.map(member => (
                                        <div key={member.id} className="bg-white rounded-[1.75rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md hover:border-berrypink-100 transition-all duration-300">
                                            {/* Photo */}
                                            <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                                                <img
                                                    src={member.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=aedd4c&color=333&size=256`}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            {/* Info */}
                                            <div className="p-5">
                                                <h3 className="font-bold text-gray-900 text-base">{member.name}</h3>
                                                <p className="text-berrypink-600 font-semibold text-sm mt-0.5">{member.position}</p>
                                                {member.description && (
                                                    <p className="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-2">{member.description}</p>
                                                )}
                                                {member.linkedinUrl && (
                                                    <a
                                                        href={member.linkedinUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 mt-3 text-[#0077b5] text-xs font-semibold hover:underline"
                                                    >
                                                        <Linkedin size={13} /> LinkedIn Profile
                                                    </a>
                                                )}
                                                {/* Actions */}
                                                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                                                    <button
                                                        onClick={() => handleEditLeader(member)}
                                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-50 hover:bg-berrypink-50 text-gray-600 hover:text-berrypink-600 text-xs font-semibold transition-colors"
                                                    >
                                                        <Pencil size={13} /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteItem('leadership', member.id)}
                                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-500 text-xs font-semibold transition-colors"
                                                    >
                                                        <Trash2 size={13} /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Table for Messages / Projects / Jobs */
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
                                                        <td className="px-4 md:px-8 py-4 md:py-6 text-gray-600 min-w-[200px] max-w-xs">
                                                            <div className="line-clamp-2 text-sm">{msg.message}</div>
                                                            <button
                                                                onClick={() => setViewMessage(msg)}
                                                                className="mt-1 inline-flex items-center gap-1 text-berrypink-600 text-xs font-semibold hover:underline"
                                                            >
                                                                <Eye size={12} /> View Full
                                                            </button>
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
                                                                        className="text-berrypink-600 p-2 hover:bg-berrypink-50 rounded-xl transition flex items-center gap-1 text-xs font-bold"
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
                                                                    <span key={tech} className="bg-berrypink-50 text-berrypink-600 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold">{tech.trim()}</span>
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
                                                            <div className="text-[10px] md:text-sm text-berrypink-600 font-semibold">{job.type}</div>
                                                        </td>
                                                        <td className="px-4 md:px-8 py-4 md:py-6">
                                                            <div className="text-gray-900 text-xs md:text-sm font-medium">{job.location}</div>
                                                            <div className="text-gray-500 text-[10px] md:text-xs line-clamp-1 max-w-[150px] md:max-w-sm">{job.requirements}</div>
                                                            <button
                                                                onClick={() => setViewJob(job)}
                                                                className="mt-1 inline-flex items-center gap-1 text-berrypink-600 text-xs font-semibold hover:underline"
                                                            >
                                                                <Eye size={12} /> View Details
                                                            </button>
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
                    )}
                </div>
            </div>

            {/* View Message Modal */}
            {viewMessage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative">
                        <button onClick={() => setViewMessage(null)} className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-gray-600">
                            <X size={22} />
                        </button>
                        <div className="mb-5">
                            <h2 className="text-2xl font-extrabold text-gray-900">{viewMessage.name}</h2>
                            <a href={`mailto:${viewMessage.email}`} className="text-berrypink-600 text-sm font-medium hover:underline">{viewMessage.email}</a>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-5 text-gray-700 text-sm leading-relaxed whitespace-pre-line border border-gray-100 max-h-80 overflow-y-auto">
                            {viewMessage.message}
                        </div>
                        <div className="flex gap-3 mt-5">
                            {viewMessage.resume && (
                                <button
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = viewMessage.resume;
                                        link.download = `resume_${viewMessage.name.replace(/\s+/g, '_')}.pdf`;
                                        link.click();
                                    }}
                                    className="flex items-center gap-2 bg-berrypink-50 text-berrypink-600 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-berrypink-100 transition"
                                >
                                    <FileText size={15} /> Download Resume
                                </button>
                            )}
                            <button
                                onClick={() => { deleteItem('messages', viewMessage.id); setViewMessage(null); }}
                                className="flex items-center gap-2 bg-red-50 text-red-500 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-red-100 transition ml-auto"
                            >
                                <Trash2 size={15} /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Job Modal */}
            {viewJob && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setViewJob(null)} className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-gray-600">
                            <X size={22} />
                        </button>
                        <div className="mb-2">
                            <h2 className="text-2xl font-extrabold text-gray-900">{viewJob.title}</h2>
                            <span className="text-berrypink-600 font-semibold text-sm">{viewJob.type} · {viewJob.location}</span>
                        </div>
                        {viewJob.description && (
                            <div className="mt-5">
                                <h4 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wider">Description</h4>
                                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line bg-gray-50 rounded-2xl p-4 border border-gray-100">{viewJob.description}</p>
                            </div>
                        )}
                        {viewJob.requirements && (
                            <div className="mt-5">
                                <h4 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wider">Requirements</h4>
                                <ul className="space-y-1.5">
                                    {viewJob.requirements.split(',').map((req, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-berrypink-400 flex-shrink-0"></span>
                                            {req.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button
                            onClick={() => { deleteItem('jobs', viewJob.id); setViewJob(null); }}
                            className="flex items-center gap-2 bg-red-50 text-red-500 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-red-100 transition mt-6"
                        >
                            <Trash2 size={15} /> Delete Job
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
