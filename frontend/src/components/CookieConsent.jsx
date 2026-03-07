import { useState, useEffect } from 'react';
import { Cookie, X, Shield } from 'lucide-react';

function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Small delay so it doesn't pop up immediately on page load
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6 flex justify-center">
            <div
                className="bg-white border border-gray-200 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] max-w-3xl w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 animate-in slide-in-from-bottom-4 duration-500"
            >
                {/* Icon */}
                <div className="p-3 bg-berrypink-50 rounded-xl flex-shrink-0">
                    <Cookie size={22} className="text-berrypink-600" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <Shield size={14} className="text-gray-400" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Privacy Notice</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        We use cookies to enhance your browsing experience and analyze site traffic.
                        By clicking <strong>"Accept All"</strong>, you consent to our use of cookies.{' '}
                        <a href="/privacy" className="text-berrypink-600 underline underline-offset-2 hover:text-berrypink-700 transition-colors">
                            Learn more
                        </a>
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                    <button
                        onClick={handleDecline}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-berrypink-600 text-white text-sm font-bold hover:bg-berrypink-700 transition-colors shadow-sm"
                    >
                        Accept All
                    </button>
                    <button
                        onClick={handleDecline}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors sm:hidden"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Close on desktop */}
                <button
                    onClick={handleDecline}
                    className="hidden sm:flex p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Close"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}

export default CookieConsent;
