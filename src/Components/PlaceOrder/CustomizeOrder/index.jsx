// Imports
import { useEffect } from 'react';

// Styles
import styles from './customizeOrder.module.css';

// Custom Hooks
import useCounter from '../../../Hooks/useCounter';
import useConfirmModal from '../../../Hooks/useConfirmModal';

// Functions
const formatMoney = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const CustomizePlate = (
    {
        id,
        img,
        name,
        price,
        description,
        onTriggerStep,
        onOrderSet
    }) => {
    // Hooks
    const { counter, increase, decrease, reset, greaterOne } = useCounter();
    const { showModal, setShowConfirm, confirmResponse, resetResponse } = useConfirmModal();

    // useEffects
    useEffect(() => {
        if (confirmResponse) {
            confirmTrigger();
            resetResponse();
        }
    }, [confirmResponse]);

    // Event Handlers
    const showConfirmHandler = () => setShowConfirm(true);

    const confirmTrigger = () => {
        onOrderSet({
            plate__id: id,
            order__status: 1,
            order__quantity: counter,
            order__subtotal: counter * price,
        });
        reset();
        onTriggerStep({ one: 0, two: -1, three: 1, four: 0 });
    }

    const returnTrigger = () => {
        onTriggerStep({ one: 1, two: -1, three: 0, four: 0 });
        reset();
    }

    // Render Section
    return (
        <div className={`${styles.customize_order} flex flex-column align-items-center gap-row-2 text-center`}>
            <img className={`${styles.image}`} src={img} alt={description} />
            <h3 className={`${styles.name} ff-main`}> {name} </h3>
            <p className={`${styles.price}`}> {`$${formatMoney(counter * price)} MXN`} </p>
            <p className={`${styles.description}`}> {description} </p>
            <div className={`flex align-items-center gap-column-1 ff-alter`}>
                <button onClick={decrease} className={`${styles.counter_btn} btn`} disabled={(!greaterOne())} >-</button>
                <output>{counter.toString().padStart(2, 0)}</output>
                <button onClick={increase} className={`${styles.counter_btn} btn`}>+</button>
            </div>
            <button className={`${styles.confirm} btn btn-primary-filled`} onClick={showConfirmHandler} >Ordenar</button>
            <button className='btn btn-primary btn-back-menu' onClick={returnTrigger}>Volver al menú</button>
            {showModal(`¿Desea ordenar ${name}?`)}
        </div>
    );
}
