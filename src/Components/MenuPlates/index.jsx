import { useEffect, useState, Fragment, forwardRef, useImperativeHandle } from "react";
import { getMenuPlates } from "../../Services";
import { MenuPlate } from "../MenuPlate";

import styles from './menuPlates.module.css';

export const MenuPlates = forwardRef(({ onSelectPlate, showPrices = false }, ref) => {
    // Hooks
    const [menuPlates, setMenuPlates] = useState([]);

    // UseEffect
    useEffect(() => {
        fetchMenuPlates();
    }, []);

    // Return fresh menu plates
    useImperativeHandle(ref, () => ({
        refreshPlates: () => fetchMenuPlates()
    }));

    // Functions
    const fetchMenuPlates = () => getMenuPlates().then(setMenuPlates);

    const returnPlate = (id) => {
        let plateFinded;
        menuPlates.forEach(cats => {
            cats.plates.forEach(plate => {
                if (plate.plate__id === id)
                    return plateFinded = plate;

            });
        });
        onSelectPlate(plateFinded);
    }

    // Render Section
    return (
        <div className={`flex flex-wrap justify-content-center padx-5 pady-4 ${styles.plates}`}>
            {
                menuPlates?.map(plt =>
                    <Fragment key={`${plt.category}_section`}>
                        <h2 className={styles.menu__title}>{plt.category}</h2>
                        <div className={`flex flex-wrap justify-content-center ${styles.plates}`}>
                            {
                                plt.plates.map(plate =>
                                    <MenuPlate
                                        key={plate.plate__id}
                                        id={plate.plate__id}
                                        img={plate.plate__image}
                                        name={plate.plate__name}
                                        description={plate.plate__description}
                                        price={plate.plate__price}
                                        showPrice={showPrices}
                                        onClick={returnPlate}
                                    />
                                )
                            }
                        </div>
                    </Fragment>
                )
            }
        </div>
    )
});
