// Styles
import styles from './tableDetail.module.css';

// Components
import { Transition } from '../../Components/Transition';
import { PlateDetail } from '../../Components/PlateDetail';

// Custom hooks
import useConfirmModal from '../../Hooks/useConfirmModal';
import { useStopwatch } from '../../Hooks/useStopwatch';

// Images
import HeroImage from '../../Images/hero.svg';
import AddFood from '../../Images/addFood.svg';

// Imports
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from 'react';
import { checkoutTable, getTableInfo } from '../../Services';
import { TableHasActiveOrdersException } from '../../Utils/errors';

// Status
const tableStatus = {
    1: 'Ocupada',
    2: 'Pendiente'
}

// Functions
const dateToTime = (dateToParse) => dateToParse?.toString().slice(11, 19);

export const TableDetail = () => {
    // Hooks
    let { tableID } = useParams();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [tableInfo, setTableInfo] = useState(undefined);
    const { showModal, setShowConfirm, confirmResponse } = useConfirmModal();
    const { elapsedTime, setInitial, stopTime } = useStopwatch();

    // useEffect
    useEffect(() => {
        if (confirmResponse) {
            checkoutTable(tableInfo.activity__id)
                .then(fetchInfo)
                .catch(handleErrors);
        }
    }, [confirmResponse]);

    useEffect(() => {
        fetchInfo();
    }, []);

    document.title = `EatOnTime - Table #${tableID}`;

    // Handlers
    const showConfirmHandler = () => setShowConfirm(true);

    const orderFoodHandler = () => {
        navigate('/order', {
            state: {
                tableID,
                activityId: tableInfo.activity__id
            }
        });
    }

    const handleErrors = err => {
        if (err instanceof TableHasActiveOrdersException)
            return alert('La mesa tiene pedidos activos');
        console.log(err);
    }

    // Functions
    const currentSubtotal = useMemo(() => orders.reduce((subTotal, order) => subTotal + (order.order__subtotal), 0), [orders]);

    const fetchInfo = () =>
        getTableInfo(tableID)
            .then(info => {
                setTableInfo(info.activityInfo);
                setInitial(info.activityInfo);
                if (info.activityInfo.activity__status === 2) stopTime();
                setOrders(info.orders);
            })
            .catch(console.log);


    // Render section
    return (
        <main className={`padx-4 pady-4 margx-auto ${styles.table__info}`}>
            <Transition duration='1.5s' />
            <div className={`grid ${styles.table_hero}`}>
                <img className={styles.img} src={HeroImage} alt="dashboard logo" />
                <h2 className={`ff-main marg-0 ${styles.title}`}>{`Table No: ${tableID}`}</h2>
                {
                    tableInfo?.activity__status === 1 &&
                    <button className={`flex align-items-center gap-column-2 btn btn-primary-filled ${styles.order_btn}`} onClick={orderFoodHandler}> <img src={AddFood} alt="add food icon eat on time" /> Ordenar</button>
                }
            </div>
            <div className={`flex flex-column align-items-center ff-alter margy-2 ${styles.table_info}`}>
                <span className="flex align-items-center gap-column-2">
                    {`Estado: ${tableStatus[tableInfo?.activity__status]}`}
                    <span className={`${styles.table_status} ${styles[tableStatus[tableInfo?.activity__status]]}`} />
                </span>
                <span>{`Personas: ${tableInfo?.activity__people}`} </span>
                <span>{`Hora de Entrada: ${dateToTime(tableInfo?.parsed__activity__start)}`} </span>
                <span>{elapsedTime}</span>
                <span>{`Hora de Salida: ${dateToTime(tableInfo?.parsed__activity__end) ?? 'Sin salida'}`} </span>
            </div>
            <table className={`margx-auto ${styles.orders}`}>
                <tbody>
                    {
                        orders.map(order =>
                            <PlateDetail
                                id={order.order__id}
                                key={order.order__id}
                                img={order.plate__image}
                                name={order.plate__name}
                                price={order.plate__price}
                                quantity={order.order__quantity}
                            />)
                    }
                </tbody>
            </table>
            <div className={`flex flex-column justify-content-center align-items-center gap-row-4 ${styles.actions}`}>
                <output className={`pad-4 ff-main text-center ${styles.upper} ${styles.subtotal}`}>
                    {`Subtotal: $${currentSubtotal} MXN`}
                </output>
                {tableInfo?.activity__status === 1 &&
                    <input
                        onClick={showConfirmHandler}
                        className={`ff-main btn btn-primary margy-1 ${styles.upper} ${styles.checkout}`}
                        type="button"
                        value="Pedir Cuenta" />
                }
            </div>

            {showModal(`Pedir Cuenta Mesa #${tableID}`, '¿Desea solicitar la cuenta de la mesa?')}
        </main>
    )
}
