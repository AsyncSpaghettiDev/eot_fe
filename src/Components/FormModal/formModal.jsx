// Imports
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

// Hooks
import useForm from '../../Hooks/useForm';

// Styles
import './index.css';
import styles from './formModal.module.css';

// Components
import { FormInput } from './Inputs/form.Input';
import { FormTextArea } from './Inputs/form.TextArea';
import { FormSelect } from './Inputs/form.Select';
import { FormRadio } from './Inputs/form.Radio';

const modalRoot = document.querySelector('#modal_section');

export const FormModal = ({
    title,
    description,
    errorMessage,
    autocomplete = 'off',
    onDismiss,
    onSelect,
    confirmButtonText,
    onSubmitAction,
    inputs,
    initialFormState = {},
    resetResponse
}) => {
    const onSubmit = (formData) => {
        if (onSubmitAction)
            onSubmitAction(formData);
        onSelect(true);
        onDismiss(modalRef.current);
    }

    // Hooks
    const { formInputs, formInvalid, submitHandler, updateInput } = useForm(inputs, onSubmit, initialFormState);

    // Ref for modal
    const modalRef = useRef(null);

    useEffect(() => {
        return () => resetResponse();
    }, []);

    // Handlers
    const onResponseHandler = e => {
        onSelect(e.target.valueAsBoolean);
        onDismiss(modalRef.current);
    }

    const onDismissHandler = e => {
        propagationHandler(e);
        onDismiss(modalRef.current);
    }

    const propagationHandler = e => e.stopPropagation();

    // Render Section
    return createPortal(
        <div className="modal__container" onClick={onDismissHandler} ref={modalRef}>
            <div className='modal__body' role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogDesc" onClick={propagationHandler}>
                <h2 className='modal_title' id="dialogTitle"> {title} </h2>
                <p className='modal_desc' id="dialogDesc"> {description} </p>
                <form className={styles.form} autoComplete={autocomplete} onSubmit={submitHandler}>
                    {
                        formInputs?.map(inpt => {
                            switch (inpt.input__type) {
                                case 'radio':
                                    return <FormRadio key={inpt.id} {...inpt} onChangeInput={updateInput} />

                                case 'select':
                                    return <FormSelect key={inpt.id} {...inpt} onChangeInput={updateInput} />

                                case 'textarea':
                                    return <FormTextArea key={inpt.id} {...inpt} onChangeInput={updateInput} />

                                default:
                                    return <FormInput key={inpt.id} {...inpt} onChangeInput={updateInput} />
                            }
                        }
                        )
                    }

                    {
                        formInvalid &&
                        <p className={styles.form_exception}>
                            {errorMessage || 'Hubo un error, verifica los campos marcados en rojo.'}
                        </p>
                    }

                    <div className='modal__btns'>
                        <button type='button' className={`btn modal_btn ${styles.modal_btn}`} onClick={onResponseHandler} value={false}> Cancelar </button>
                        <button type="submit" className={`btn modal_btn ${styles.modal_btn}`} value={true}> {confirmButtonText || `Aceptar`} </button>
                    </div>
                </form>
            </div>
        </div>,
        modalRoot
    )
}
