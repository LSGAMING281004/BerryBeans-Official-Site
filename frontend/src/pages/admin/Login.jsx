import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/signin', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background blobs for premium feel */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-berrypurple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>

            <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative z-10">
                <div>
                    <div className="flex justify-center mb-6">
                        <img src="/logo.png" alt="BerryBeans Logo" className="h-16 w-auto drop-shadow-md" />
                    </div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight block w-full">Admin Gateway</h2>
                    <p className="mt-3 text-center text-sm text-gray-500 font-light block w-full">
                        Secure access to BerryBeans Control Panel
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <div className="text-red-600 text-sm text-center bg-red-50 py-3 rounded-xl font-medium">{error}</div>}
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Username</label>
                            <input type="text" required className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-berrypurple-500 focus:border-transparent transition bg-gray-50 focus:bg-white" placeholder="admin" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                            <input type="password" required className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-berrypurple-500 focus:border-transparent transition bg-gray-50 focus:bg-white" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loading} className={`group w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-full text-white bg-berrypurple-600 hover:bg-berrypurple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-berrypurple-500 transition shadow-[0_4px_14px_0_rgb(91,33,182,0.39)] hover:shadow-[0_6px_20px_rgba(91,33,182,0.23)] hover:-translate-y-0.5 ${loading ? 'opacity-70' : ''}`}>
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
