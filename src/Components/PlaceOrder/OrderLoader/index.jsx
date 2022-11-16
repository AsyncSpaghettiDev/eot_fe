// Styles
import styles from './orderLoader.module.css';

// Imports
import { useEffect } from "react";

export const OrderLoader = ({ onTriggerStep }) => {
    // useEffect
    // Fake trigger after 2s, mimicking server time response
    useEffect(() => {
        setTimeout(() => onTriggerStep({ one: 0, two: 0, three: -1, four: 1 }), 2000)
    }, []);

    // Render Section
    return (
        <div className={`${styles.loader} flex flex-wrap margx-auto gap-row-2`}>
            <span className={`${styles.ball}`}></span>
            <span className={`${styles.ball}`}></span>
            <span className={`${styles.ball}`}></span>
            <span className={`${styles.text} text-center ff-main`}>Generando Pedido</span>
        </div>
    )
}
