// Styles
import styles from './confirmModal.module.css';

import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

const modalRoot = document.querySelector('#modal_section');

export const ConfirmModal = ({ title, description, onDismiss, onSelect, resetResponse }) => {
    useEffect(() => resetResponse(), []);
    const modalRef = useRef(null);
    // Handlers
    const dismissHandler = e => {
        propagationHandler(e);
        onDismiss(modalRef.current);
    }

    const responseHandler = e => {
        onSelect(e.target.value === 'true');
        onDismiss(modalRef.current);
    }

    const propagationHandler = e => e.stopPropagation();

    return createPortal(
        <div className="modal__container" ref={modalRef} onClick={dismissHandler}>
            <div onClick={propagationHandler} className='modal__body' role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogDesc">
                <h2 className='modal_title' id="dialogTitle"> {title} </h2>
                <p className='modal_desc' id="dialogDesc"> {description} </p>
                <div className='modal__btns'>
                    <button onClick={responseHandler} value={false} className={`btn modal_btn ${styles.modal_btn}`}> Cancelar </button>
                    <button onClick={responseHandler} value={true} className={`btn modal_btn ${styles.modal_btn}`}> Sí </button>
                </div>
            </div>
        </div>,
        modalRoot
    )
}
