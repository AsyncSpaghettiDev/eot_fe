// Styles
import styles from './order.module.css';

// Components
import {
    MenuPreview,
    CustomizePlate,
    OrderLoader,
    OrderFinished
} from '../../Components/PlaceOrder';
import { NavBar } from '../../Components/NavBar';
import { Transition } from '../../Components/Transition';

// Imports
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Services
import { createNewOrder } from '../../Services';

export const Order = () => {
    // Hooks
    let navigate = useNavigate();
    let { state } = useLocation();
    const [step, setStep] = useState({});
    const [orderInfo, setOrderInfo] = useState(undefined);
    const [currentPlate, setCurrentPlate] = useState(undefined);
    const [orderFinished, setOrderFinished] = useState(undefined);

    state ?? navigate('/');
    const tableNo = state.tableID;

    document.title = `EatOnTime - Ordenar`;

    // Set menu as initial step
    useEffect(() => {
        setStep({ one: 1, two: 0, three: 0, four: 0 });
    }, []);

    // Create order after 
    useEffect(() => {
        orderInfo !== undefined && createOrder()
    }, [orderInfo]);

    // Functions
    const createOrder = () => createNewOrder(orderInfo, state.activityId).then(setOrderFinished)

    // Render section
    return (
        <main>
            <NavBar noBack />
            <section className={`margy-4 margx-auto padx-4 ${styles.order}`}>
                <h2 className="ff-main text-center">{`Orden de la mesa #${tableNo}`}</h2>
                <section className="grid">
                    <article className={`step ${step.one === -1 && 'step fade'} ${step.one === 1 && 'step active'}`}>
                        <MenuPreview
                            onTriggerStep={setStep}
                            onSelectedPlate={setCurrentPlate}
                        />
                    </article>

                    <article className={`step ${step.two === -1 && 'step fade'} ${step.two === 1 && 'step active'}`}>
                        <CustomizePlate
                            id={currentPlate?.plate__id}
                            img={currentPlate?.plate__image}
                            name={currentPlate?.plate__name}
                            price={currentPlate?.plate__price}
                            description={currentPlate?.plate__description}
                            onTriggerStep={setStep}
                            onOrderSet={setOrderInfo}
                        />
                    </article>

                    <article className={`step ${step.three === -1 && 'step fade'} ${step.three === 1 && 'step active'}`}>
                        {step.three === 1 && <OrderLoader
                            onTriggerStep={setStep}
                        />}
                    </article>

                    <article className={`step ${step.four === -1 && 'step fade'} ${step.four === 1 && 'step active'}`}>
                        {orderFinished !== undefined ? <OrderFinished
                            orderFinished={orderFinished}
                            onTriggerStep={setStep}
                        /> : null}
                    </article>

                </section>
                <Transition duration='1s' />
            </section>
        </main>
    )
}
