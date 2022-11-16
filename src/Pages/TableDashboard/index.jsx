// Imports
import { useEffect, useMemo, useState } from 'react';

// Styles
import styles from './dashboard.module.css';

// Images
import HeroImage from '../../Images/hero.svg';

// Components
import { Transition } from '../../Components/Transition';
import { TableResume } from '../../Components/TableResume';
import { ProtectContent } from '../../Components/ProtectContent';

// Hooks
import useFormModal from '../../Hooks/useFormModal';

// Configs
import { configurationAdd } from './inputConfig';

// Services
import { getTables } from '../../Services/dashboard';

export const TableDashboard = () => {
    // Hooks
    const [tables, setTables] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const { showForm, FormModalComponent } = useFormModal();

    const lastTableCode = useMemo(() => tables[tables.length - 1]?.table__code?.slice(5), [tables]);

    document.title = `EatOnTime - Dashboard`;

    // UseEffect
    useEffect(() => {
        fetchTables();
    }, []);

    // Handlers
    const onNewHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        showForm(configurationAdd(lastTableCode));
    }

    const onToggleEditMode = () => setEditMode(!editMode);

    // Functions
    const fetchTables = () => getTables().then(setTables);

    // Render Section
    return (
        <section className={`${styles.dashboard} margx-auto`}>
            <Transition duration='2s' />

            <div className="flex flex-wrap flex-column align-items-center justify-content-center margx-auto margy-4">
                <img className={`${styles.img}`} src={HeroImage} alt="dashboard logo" />
                <h2 className={`${styles.title} ff-main text-center`}>Mesas {editMode && "(Edit Mode)"} </h2>
            </div>

            <ProtectContent requiredRole={'ADMIN'}>
                <div className={`flex justify-content-center text-center gap-2`}>
                    <button className={`btn btn-primary ${styles.btn}`} onClick={onNewHandler}>Agregar Mesa</button>
                    <button className={`btn btn-primary ${styles.btn}`} onClick={onToggleEditMode}>Alternar modo editar</button>
                </div>
            </ProtectContent>

            <table className={`margx-auto ${styles.table}`}>
                <tbody>
                    <tr className={`${styles.table_headers} ff-alter text-center`}>
                        <th>No. de Mesa</th>
                        <th>Capacidad</th>
                        <th>Disponible</th>
                        <th>Habilitar mesa</th>
                    </tr>
                    {
                        tables.map(table =>
                            <TableResume
                                key={table.table__id}
                                tableId={table.table__id}
                                tableNo={table.table__code.toString().slice(5)}
                                capacity={table.table__capacity}
                                busy={!table.table__isFree}
                                lastActivity={table.table__lastActivity}
                                editingMode={editMode}
                                updateTables={fetchTables}
                            />)
                    }
                </tbody>
            </table>
            {FormModalComponent()}
        </section>
    )
}
