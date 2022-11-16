// Imports
import { useState } from 'react';

// Style
import styles from './plateDetail.module.css'

// Components
import { PlateStatusModal } from '../PlateStatusModal';
import { getOrderInfo } from '../../Services';

export const PlateDetail = ({ id, img, name, price, quantity }) => {
    // Hooks
    const [orderInfo, setOrderInfo] = useState(undefined);
    const [showStatus, setShowStatus] = useState(false);

    // Handlers
    const onClickHandler = () => {
        getOrderInfo(id).then(setOrderInfo).then(_ => setShowStatus(true));
    }

    // Render section
    return (
        <tr>
            <td>
                <img className={`${styles.image}`} src={img} alt="plate" />
            </td>
            <td>
                <h3 className={`ff-main`}> {name} </h3>
                <p className={`ff-alter ${styles.price}`}> {`$${price} mxn`} </p>
                <p className={`ff-alter`}> {`Cantidad: ${quantity}`} </p>
            </td>
            <td>
                <button className={`ff-main btn btn-primary-filled`} onClick={onClickHandler}>Estado</button>
            </td>
            {
                showStatus &&
                <PlateStatusModal
                    onDismiss={() => { setShowStatus(false) }}
                    orderInfo={orderInfo}
                />
            }
        </tr >
    );
}
