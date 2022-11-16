import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import './TableResume.css';

// Hooks
import useConfirmModal from '../../Hooks/useConfirmModal';
import useFormModal from '../../Hooks/useFormModal';

// Configurations
import { configurationUpdate, createActivityConfig } from './inputConfig';

// Services
import { releaseTable } from '../../Services/dashboard';

export const TableResume = ({
    tableNo,
    tableId,
    capacity,
    busy,
    editingMode,
    updateTables,
    lastActivity }) => {
    // Hooks
    const navigate = useNavigate();
    const { showModal, setShowConfirm, confirmResponse } = useConfirmModal();
    const { showForm, FormModalComponent } = useFormModal();
    
    // useEffects
    useEffect(() => {
        confirmResponse && releaseTable(tableId, lastActivity, updateTables);
    }, [confirmResponse]);

    // Handlers
    const onEnableHandler = e => {
        e.stopPropagation();
        busy ? setShowConfirm(true) : showForm(createActivityConfig(tableId, capacity, updateTables));
    }

    // Checks if editing mode is active, if it is deploys edit modal
    // if not and table is busy redirects to table detail
    const showHandler = () => {
        if (editingMode)
            return showForm(configurationUpdate(tableId, capacity, updateTables));

        if (busy)
            return navigate(`details/${tableNo}`);
    }

    // Render Section
    return (
        <tr
            className={busy ? "dashboard__resume__table dashboard__resume__table--busy" : "dashboard__resume__table"}
            onClick={showHandler}
        >
            <td className='dashboard__resume__table-info' > {tableNo.toString().padStart(2, '0')} </td>
            <td> {capacity.toString().padStart(2, '0')} </td>
            <td> {busy ? "Ocupada" : "Disponible"} </td>
            <td> {
                !busy ?
                    <button className='dashboard__resume__table-update' onClick={onEnableHandler} >Habilitar</button> :
                    <button className='dashboard__resume__table-update inverted' onClick={onEnableHandler} >Liberar</button>
            }
            </td>
            {
                showModal(`¿Desea liberar la mesa #${tableNo}?`,
                    `¿Desea terminar la actividad en esta mesa? Esta acción no podrá ser revertida`)
            }

            {FormModalComponent()}
        </tr>
    );
}
