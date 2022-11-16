// Context
import useAuth from "../../Hooks/useAuth";

export const ProtectContent = ({ requiredRole, children }) => {
    const { userRole } = useAuth();

    const roleValid =
        requiredRole instanceof Array ?
            requiredRole.some(rqRole => rqRole === userRole) :
            userRole === requiredRole;

    if (roleValid)
        return children;

    return null;
}