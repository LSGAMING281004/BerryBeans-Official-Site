import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

function AdminRoute() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Query param checking
        const queryParams = new URLSearchParams(location.search);
        const secretKey = queryParams.get('key');

        if (secretKey === 'berrybeans_secret') {
            // Authorized by hidden logo click!
            sessionStorage.setItem('isAdmin', 'true');
            // Clean up the URL so it looks clean again
            navigate(location.pathname, { replace: true });
        } else if (sessionStorage.getItem('isAdmin') !== 'true') {
            // Un-authorized. Go to 404 page!
            navigate('/404', { replace: true });
        }
    }, [location, navigate]);

    // Render child routes (Login/Dashboard)
    if (sessionStorage.getItem('isAdmin') === 'true' || location.search.includes('berrybeans_secret')) {
        return <Outlet />;
    }

    return null; // Don't render anything while redirecting
}

export default AdminRoute;
