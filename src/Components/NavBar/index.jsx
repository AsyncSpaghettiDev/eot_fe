// Imports
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

// Styles
import './NavBar.css';

export const NavBar = ({ noBack = false, showUser = true }) => {
    // Hooks
    const { logout, authenticated, userName, userRole } = useAuth();
    const navigate = useNavigate();

    // Handlers
    const returnHandler = () => navigate(-1);

    const homeHandler = () => navigate('/');

    // Render Section
    return (
        <nav className="navbar__header">
            {
                // In case we dont want back arrow or we are not admin, we display back arrow
                !noBack || userRole === 'ADMIN' &&
                <span className='navbar__back' onClick={returnHandler}> &#5176; </span>
            }
            <h1 className='navbar-header' onClick={homeHandler} >EatOnTime</h1>
            {
                // If we have an active session we can logout by clicking in out name
                // also is conditional render, if we dont want it
                showUser && authenticated &&
                <span className="navbar__logout" onClick={logout}>Welcome {userName} ({userRole}) </span>
            }
        </nav>
    )
}
