// Imports
import { useEffect, useState } from "react";
import { useTimer } from '../../Hooks/useTimer';

// Components
import { NavBar } from "../../Components/NavBar";
import { Transition } from "../../Components/Transition";
import { OrderDetail } from "../../Components/OrderDetail";

// Style
import styles from './orders.module.css';
import { getOrders } from "../../Services";

// Component
export const Orders = () => {
    // Hooks
    const [orders, setOrders] = useState({});
    const { elapsedTime, elapsedMessage } = useTimer(30);

    document.title = `EatOnTime - Ordenes`;

    // UseEffects
    useEffect(() => {
        collectOrders();
        return () => setOrders({});
    }, []);

    useEffect(() => {
        if (elapsedTime === 0)
            collectOrders();
    }, [elapsedTime]);

    // Functions
    const confirmTrigger = () => {
        collectOrders();
    }

    const collectOrders = () => getOrders().then(orders => setOrders({
        ordered: orders.ordered,
        cooking: orders.cooking,
        ready: orders.readyToGo,
    }));

    const mapOrders = orders => orders?.map(
        ord =>
            <OrderDetail
                key={ord.order__id}
                productimg={ord.plate__image}
                productcode={ord.plate__name}
                orderid={ord.order__id}
                orderQuantity={ord.order__quantity}
                orderStatus={ord.order__status}
                onChange={confirmTrigger} />
    )

    // Render section
    return (
        <main className="orders">
            <NavBar />
            <h1 className={styles.title}>Ordenes activas</h1>
            <h2 className={styles.title}>{elapsedMessage}</h2>
            <div className={styles.list}>
                <h2 className={`${styles.title} ${styles.fit}`}>Ordenes Recien Llegadas</h2>
                {
                    mapOrders(orders?.ordered)
                }
                <h2 className={`${styles.title} ${styles.fit}`}>Ordenes En Preparación</h2>
                {
                    mapOrders(orders?.cooking)
                }
                <h2 className={`${styles.title} ${styles.fit}`}>Ordenes para entregar</h2>
                {
                    mapOrders(orders?.ready)
                }
            </div>
            <Transition duration="500ms" />
        </main>
    );
}
