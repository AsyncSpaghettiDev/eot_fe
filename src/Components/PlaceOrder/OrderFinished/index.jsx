// Styles
import styles from './orderFinished.module.css';

// Resources
import CheckImg from '../../../Images/check.svg';

// Functions
const formatMoney = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const OrderFinished = ({
    orderFinished,
    onTriggerStep
}) => {
    const {
        order__id,
        plate__name,
        order__subtotal,
        order__quantity,
        order__datetime, } = orderFinished

    // Event Handlers
    const returnTrigger = () => {
        onTriggerStep({ one: 1, two: 0, three: 0, four: -1 });
    }

    // Render Section
    return (
        <div className="flex flex-column align-items-center pad-4 gap-row-2 text-center fs-general ff-alter">
            <img className={styles.img} src={CheckImg} alt="order completed successfully" />
            <p className="ff-main">Orden completada con éxito, a continuación se muestran los detalles de la orden</p>
            <p className={styles.number}> {`Orden No.${order__id}`} </p>
            <p> {`Nombre del platillo: ${plate__name}`} </p>
            <p> {`Subtotal: $${formatMoney(order__subtotal)} MXN`} </p>
            <p> {`Cantidad ordenada: ${order__quantity} pieza${order__quantity > 1 ? 's' : ''}`} </p>
            <p>{order__datetime}</p>
            <button className='btn btn-primary btn-back-menu' onClick={returnTrigger}>Volver al menú</button>
        </div>
    )
}
