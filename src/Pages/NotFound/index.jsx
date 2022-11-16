// Styles
import styles from './notfound.module.css';

// Resources
import NFLogo from '../../Images/dinnerPlate.svg';

// Imports
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    // Hooks
    const navigate = useNavigate();

    document.title = `EatOnTime - 404`;

    // Handlers
    const returnHandler = () => navigate('/', { replace: true });

    // Render section
    return (
        <main className={`${styles.notfound} grid gap-row-4 text-center pad-4`}>
            <img onClick={returnHandler} className={styles.image} src={NFLogo} alt="Not found page logo" />
            <h1 className={`${styles.title} ff-main`}>
                Oops... Página no encontrada
            </h1>
            <p className={`${styles.description} ff-main`}>
                La página que ingresaste no existe, prueba otra vez.
            </p>
            <button onClick={returnHandler} className={`${styles.return} btn btn-primary`}>Volver</button>
        </main>
    )
}
