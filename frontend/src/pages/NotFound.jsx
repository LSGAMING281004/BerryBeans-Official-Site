import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-berrypink-500 to-berrypink-700">
                        404
                    </h1>
                </motion.div>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-full text-white bg-berrypink-600 hover:bg-berrypink-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

export default NotFound;
