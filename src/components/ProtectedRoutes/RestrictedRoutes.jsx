import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RestrictedRoute = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    return isLoggedIn ? <Navigate to="/diary" /> : <Outlet />;
};

export default RestrictedRoute;
