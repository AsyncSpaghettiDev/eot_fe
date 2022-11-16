import useInputValue from "../../../Hooks/useInputValue";

import styles from './inputs.module.css';

export const FormRadio = ({
    defaultValue,
    label,
    id,
    radios__buttons,
    onChangeInput,
    direction = 'row',
}) => {
    const { value, handleChange } = useInputValue(defaultValue, onChangeInput);

    return (
        <div className={styles.form_radio}>
            <label>{label}</label>
            <div id={id} className={`${styles.input__container} flex margy-1 gap-column-2 gap-row-1 flex-wrap align-items-center justify-content-center flex-${direction}`}>
                {
                    radios__buttons.map((radio_btn, j) =>
                        <div id={id} className={`flex margy-1 gap-column-2 gap-row-1 flex-wrap align-items-center justify-content-center`} key={`tempDiv${j + 1}`}>
                            <label style={radio_btn.lbl__style} key={`lbl${radio_btn.id}`} htmlFor={radio_btn.id}>{radio_btn.label}</label>
                            <input
                                checked={value === radio_btn.value}
                                type='radio'
                                name={id}
                                id={radio_btn.id}
                                value={radio_btn.value}
                                style={radio_btn.style}
                                key={radio_btn.id}
                                className={`pad-1 ${styles.form_input}`}
                                onChange={handleChange}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}