// Styles
import styles from './orderDetail.module.css';

import useConfirmModal from "../../Hooks/useConfirmModal";
import { useEffect } from 'react';
import { updateOrderStatus } from '../../Services';

const ordersStatus = {
    1: 'Ordenada',
    2: 'En preparación',
    3: 'Lista para servir',
    4: 'Servida'
}

export const OrderDetail = ({
    productimg,
    productcode,
    orderid,
    orderQuantity,
    orderStatus,
    onChange,
}) => {
    const { showModal, setShowConfirm, confirmResponse } = useConfirmModal();

    useEffect(() => {
        if (confirmResponse){
            updateOrderStatus(orderid, orderStatus + 1).then(() => onChange());
        }
    }, [confirmResponse]);

    // Event Handlers
    const showConfirmHandler = () => {
        setShowConfirm(true);
    }

    // Render section
    return (
        <div className={styles.details} onClick={showConfirmHandler}>
            <img className={styles.order_img} src={productimg} alt={productcode} />
            <p> Platillo: {productcode} </p>
            <p> Cantidad Ordenada: {orderQuantity}</p>
            <p> Número de orden: {orderid} </p>
            <p> Estado: {ordersStatus[orderStatus]} </p>
            {showModal(
                `¿Desea actualizar la orden #${orderid}?`,
                `Seleccione sí para cambiar el status de ${ordersStatus[orderStatus]} a ${ordersStatus[orderStatus + 1]}`
            )
            }
        </div>
    )
}
