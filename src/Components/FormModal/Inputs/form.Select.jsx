import styles from './inputs.module.css';

import useInputValue from "../../../Hooks/useInputValue";

export const FormSelect = ({
    defaultValue,
    id,
    lbl__style,
    style,
    onChangeInput,
    label,
    direction = 'column',
    options,
}) => {
    const { value, handleChange } = useInputValue(defaultValue, onChangeInput);

    return (
        <>
            <div className={`${styles.input__container} flex margy-1 gap-column-2 gap-row-1 flex-wrap align-items-center justify-content-center flex-${direction}`}>
                <label className="pad-1" style={lbl__style} htmlFor={id}> {label} </label>
                <select
                    value={value}
                    id={id}
                    name={id}
                    style={style}
                    className={`pad-1 padx-4 ${styles.form_input}`}
                    onChange={handleChange}
                >
                    {
                        options.map((option, i) =>
                            <option
                                hidden={option.hidden}
                                value={option.value}
                                id={option.id}
                                style={option.style}
                                key={`SelectT${option.value + i}`}
                                className='dialog__form-input'
                            >
                                {option.name}
                            </option>
                        )
                    }

                </select>
            </div>
        </>
    )
}
