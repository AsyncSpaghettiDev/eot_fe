// Style
import './PlateStatusModal.css';

import { useRef } from 'react';
import { createPortal } from 'react-dom';

const modal_section = document.getElementById('modal_section');

// Status
const orderStatus = {
    1: 'Ordenada',
    2: 'En preparación',
    3: 'Lista para servir',
    4: 'Servida'
}

export const PlateStatusModal = ({ orderInfo, onDismiss }) => {
    // Hooks
    // Ref for modal
    const modalRef = useRef(null);

    const {
        order__id,
        order__datetime,
        order__quantity,
        order__status,
        order__subtotal,
        plate__name,
    } = orderInfo;

    // Handlers
    const dismissHandler = () => {
        dispatchModal();
    }
    const propagationHandler = e => e.stopPropagation();

    const dispatchModal = () => {
        modalRef.current.classList.add('modal--close');
        setTimeout(() => onDismiss(), 500);
    }

    // Render section
    return createPortal(
        <div className="modal__container" ref={modalRef} onClick={dismissHandler}>
            <div onClick={propagationHandler} className='modal__body' role="dialog" aria-labelledby="dialogTitle">
                <h2 className="modal_title" id='dialogTitle'> {`Orden #${order__id}`} </h2>
                <p className='modal_desc'> {`Nombre del platillo: ${plate__name}`} </p>
                <p className='modal_desc'> {`Costo: $${order__subtotal} MXN`} </p>
                <p className='modal_desc'> {`Cantidad: ${order__quantity} pzs`} </p>
                <p className='modal_desc'> {`Hora de la orden: ${order__datetime.toString().slice(11, 16)}`} </p>
                <p className='modal_desc'> {`Estado actual: ${orderStatus[order__status]}`} </p>
            </div>
        </div>
        , modal_section);
}
