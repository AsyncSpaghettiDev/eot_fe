import { useState } from "react";
import useAuth from "./useAuth";

const useLoginForm = () => {
    const [credentials, setCredentials] = useState({ user: "", password: "" });
    const { login } = useAuth();

    const updateCredentials = (newValue) => setCredentials({ ...credentials, ...newValue });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (credentials.user === "" || credentials.password === "")
            return showErrorMessage();

        login(credentials);
    };

    const showErrorMessage = () => {
        document.getElementById('user').classList.add('input--invalid');
        document.getElementById('password').classList.add('input--invalid');
        document.getElementById('login-error').classList.remove('hidden');

        setTimeout(() => {
            document.getElementById('login-error').classList.add('hidden');
            document.getElementById('user').classList.remove('input--invalid');
            document.getElementById('password').classList.remove('input--invalid');
        }, 2500);
    }

    return {
        updateCredentials,
        handleSubmit,
        credentials,
    }
}

export default useLoginForm;