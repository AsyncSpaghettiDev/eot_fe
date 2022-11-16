// Styles
import styles from './employees.module.css';

// Components
import { NavBar } from '../../Components/NavBar';
import { Transition } from '../../Components/Transition';
import { Employee } from '../../Components/Employee'

// Imports
import { useEffect, useState } from 'react';

// Custom Hooks
import useFormModal from '../../Hooks/useFormModal';
import { getEmployees } from '../../Services';
import { configurationAdd, configurationUpdate } from './inputConfig';

export const Employees = () => {
    // Hooks
    const [employees, setEmployees] = useState([]);
    const { showForm, FormModalComponent } = useFormModal();

    document.title = `EatOnTime - Empleados`;

    // useEffects
    useEffect(() => {
        refreshEmployees();
    }, []);

    // Handlers
    const onNewHandler = () => showForm(configurationAdd(refreshEmployees));

    const onUpdateHandler = (empID) => {
        const selectedEmployee = employees?.find(usr => usr.employee__id === empID);
        showForm(configurationUpdate(selectedEmployee, refreshEmployees));
    }

    const refreshEmployees = () => getEmployees().then(setEmployees);

    // Render section
    return (
        <main className={styles.employees}>
            <NavBar noBack />
            <div className={`${styles.btns} text-center`}>
                <h2 className={`${styles.title} ff-main`}>Lista de empleados</h2>
                <button className={`${styles.btn} btn btn-primary`} onClick={onNewHandler}>Nuevo</button>
            </div>
            <table className={`${styles.list} margx-auto text-center `} >
                <tbody id='gral__employees'>
                    <tr className={`${styles.headers} pad-2 ff-main`}>
                        <th>No. Empleado</th>
                        <th>Nombre empleado</th>
                        <th>Apellido empleado</th>
                        <th>Rol</th>
                    </tr>
                    {
                        employees.map(
                            emp =>
                                <Employee
                                    key={emp.employee__id}
                                    empNo={emp.employee__id}
                                    empName={emp.employee__name}
                                    empLast={emp.employee__lastName}
                                    empRole={emp.USER_ROLE}
                                    onClick={onUpdateHandler}
                                />)
                    }
                </tbody>
            </table>
            {FormModalComponent()}
            <Transition duration='1s' />
        </main>
    )
}
