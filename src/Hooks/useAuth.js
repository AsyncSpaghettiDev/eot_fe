// Utils
import { InvalidCredentialsException } from '../Utils/errors';
import AuthContext from '../Utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// Services
import { authenticate, systemLogout } from "../Services/auth";

const useAuth = () => {
    const { authContextApi, setAuthContextApi } = useContext(AuthContext);
    let navigate = useNavigate();

    // Login function
    const login = (credentials) => {
        authenticate(credentials).then(setAuthContextApi).catch(showErrors);
    }

    const showErrors = (e) => {
        if (!e instanceof InvalidCredentialsException)
            showErrors();

        document.getElementById('login-error').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('login-error').classList.add('hidden');
        }, 2500);
    }

    // Logout function
    const logout = () => {
        systemLogout().then(auth => {
            setAuthContextApi(auth);
            navigate('/');
        });
    }

    return {
        login,
        logout,
        authenticated: authContextApi.auth,
        userName: authContextApi.username,
        userRole: authContextApi.role,
    }
}

export default useAuth;