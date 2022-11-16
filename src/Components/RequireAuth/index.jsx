// Imports
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

export const RequireAuth = ({ children, requiredRole }) => {
    // Hooks
    let location = useLocation();
    const { userRole, userName } = useAuth();

    const roleValid =
        requiredRole instanceof Array ?
            requiredRole.some(rqRole => rqRole === userRole) :
            userRole !== requiredRole;

    // Conditional render section
    // If we havent a session yet, returns to login page
    if (userRole === null)
        return <Navigate to="/login" state={{ from: location }} replace />;
    // In case session role is TABLE we were send to that table detail
    if (userRole === 'TABLE')
        return <Navigate to={`/dashboard/details/${userName[5]}`} />
    // If we are any role not valid we were send to home
    if (!roleValid) {
        return <Navigate to="/" replace />;
    }
    // Else we render the component
    return children;
}
