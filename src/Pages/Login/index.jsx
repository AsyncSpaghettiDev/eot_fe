// Imports
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Style
import styles from './login.module.css';

// Resources
import EOTLogo from '../../Images/logo.png';

// Components
import { NavBar } from "../../Components/NavBar";
import { Transition } from '../../Components/Transition';
import { FormInput } from '../../Components/FormModal/Inputs/form.Input';

// Inputs
import { loginPassword, loginUsername } from './inputConfig';

// Hooks
import useAuth from '../../Hooks/useAuth';
import useLoginForm from '../../Hooks/useLoginForm';

export const Login = () => {
    // Hooks
    const { updateCredentials, handleSubmit } = useLoginForm();
    const { authenticated } = useAuth();
    let navigate = useNavigate();
    let location = useLocation();

    document.title = `EatOnTime - Login`;

    // Return to last page when authenticated
    useEffect(() => {
        if (authenticated)
            navigate(location?.state?.from?.pathname ?? "/", { replace: true });
    }, [authenticated]);

    // Render section
    return (
        <main>
            <NavBar />
            <form
                onSubmit={handleSubmit}
                className={`${styles.form} pad-2 flex flex-column gap-row-1 justify-content-center align-items-center text-center ff-main`}
                autoComplete='off'>
                <img className={styles.logo} src={EOTLogo} alt="" />
                <FormInput {...loginUsername} onChangeInput={updateCredentials} />
                <FormInput {...loginPassword} onChangeInput={updateCredentials} />
                <div id="login-error" className={`${styles.error} hidden`}>
                    <p>Credenciales inválidas, prueba otra vez.</p>
                </div>
                <input className={`btn btn-primary ${styles.btn}`} type="submit" value="Ingresar" />
            </form>
            <Transition duration='200ms' />
        </main>
    )
}
