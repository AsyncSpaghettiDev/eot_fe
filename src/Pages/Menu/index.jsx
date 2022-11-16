// Hooks
import useAuth from "../../Hooks/useAuth";
import useFormModal from '../../Hooks/useFormModal';

// Styles
import styles from "./menu.module.css";

// Components
import { NavBar } from '../../Components/NavBar';
import { Transition } from '../../Components/Transition';
import { MenuPlates } from "../../Components/MenuPlates";

// Configurations
import {
    configurationCreatePlate,
    configurationUpdatePlate,
    configurationCreateCategory,
} from "./inputConfig";

// Services
import { ProtectContent } from "../../Components/ProtectContent";
import { useRef } from "react";

export const Menu = () => {
    // Hooks
    const { userRole } = useAuth();
    const { showForm, FormModalComponent } = useFormModal();
    const platesRef = useRef();

    document.title = `EatOnTime - Menú`;

    // Handlers
    const createPlateHandler = async () => showForm(await configurationCreatePlate(platesRef.current.refreshPlates));

    const createCategoryHandler = () => showForm(configurationCreateCategory);

    const onUpdateHandler = async (plate) => {
        if (userRole !== 'ADMIN')
            return;

        showForm(await configurationUpdatePlate(plate, platesRef.current.refreshPlates));
    }

    // Render Section
    return (
        <main className={`flex flex-wrap gap-4 ${styles.menu}`}>
            <NavBar showUser={false} />
            <h1 className={styles.menu__title}>EatOnTime Menu </h1>

            <ProtectContent requiredRole={'ADMIN'}>
                <div className={`flex flex-wrap justify-content-center text-center gap-4 padx-4`}>
                    <button className={`btn btn-primary ${styles.actionBtn}`} onClick={createPlateHandler}>Crear Platillo</button>
                    <button className={`btn btn-primary ${styles.actionBtn}`} onClick={createCategoryHandler}>Crear Categoria</button>
                </div>
            </ProtectContent>

            <MenuPlates ref={platesRef} onSelectPlate={onUpdateHandler} />

            {FormModalComponent()}
            <Transition duration='250ms' />
        </main>
    )
}
