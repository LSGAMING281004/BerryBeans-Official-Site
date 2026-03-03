import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { MessageSquare, FolderKanban, Briefcase, LogOut, LayoutDashboard } from 'lucide-react';

function Dashboard() {
    const [messages, setMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('messages');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchMessages();
    }, [navigate]);

    const fetchMessages = async () => {
        try {
            const res = await api.get('/admin/messages');
            setMessages(res.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) navigate('/admin/login');
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;
        try {
            await api.delete(`/admin/messages/${id}`);
            fetchMessages();
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    const NavButton = ({ id, icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 text-left py-3 px-5 rounded-xl transition-all duration-300 font-medium ${activeTab === id ? 'bg-berrypurple-600 text-white shadow-md' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
        >
            {icon} {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Sidebar */}
            <div className="w-72 bg-berrydark text-white p-6 flex flex-col border-r border-gray-800">
                <div className="flex flex-col items-center gap-3 mb-10 px-2 mt-4 bg-white/5 p-4 rounded-2xl">
                    <img src="/logo.png" alt="BerryBeans Logo" className="h-10 w-auto bg-white rounded-xl p-1 shadow-md" />
                    <h2 className="text-xl font-bold tracking-tight text-white block">BerryAdmin</h2>
                </div>

                <nav className="space-y-2 flex-1">
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

            {/* Main Content */}
            <div className="flex-1 p-10 overflow-auto">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-10 flex items-center gap-3">
                        <LayoutDashboard size={28} className="text-berrypurple-600" />
                        <h1 className="text-3xl font-extrabold text-gray-900 capitalize tracking-tight block w-full">{activeTab} Management</h1>
                    </header>

                    {activeTab === 'messages' && (
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-100">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Name</th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-50">
                                        {messages.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="px-8 py-10 text-center text-gray-500 font-light">No messages found.</td>
                                            </tr>
                                        ) : (
                                            messages.map((msg) => (
                                                <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-8 py-5 whitespace-nowrap font-medium text-gray-900">{msg.name}</td>
                                                    <td className="px-8 py-5 whitespace-nowrap text-gray-500">{msg.email}</td>
                                                    <td className="px-8 py-5 text-gray-600 font-light max-w-sm truncate">{msg.message}</td>
                                                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium">
                                                        <button onClick={() => deleteMessage(msg.id)} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for Projects and Jobs */}
                    {(activeTab === 'projects' || activeTab === 'jobs') && (
                        <div className="bg-white p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-center flex flex-col items-center justify-center min-h-[400px]">
                            <div className="p-4 bg-gray-50 rounded-full mb-4 text-gray-400">
                                {activeTab === 'projects' ? <FolderKanban size={48} /> : <Briefcase size={48} />}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize block w-full">{activeTab} Module Coming Soon</h3>
                            <p className="text-gray-500 font-light max-w-md mx-auto block w-full">The CRUD interface for {activeTab} is currently in development. You can use the REST APIs directly for now.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
