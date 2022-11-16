import useInputValue from "../../../Hooks/useInputValue";

import styles from './inputs.module.css';

export const FormInput = ({
    defaultValue,
    id,
    lbl__style,
    style,
    input__type,
    readOnly = false,
    input__min,
    input__max,
    onChangeInput,
    label,
    placeholder,
    direction = 'column',
}) => {
    const { value, handleChange } = useInputValue(defaultValue, onChangeInput);

    return (
        <div className={`${styles.input__container} ${input__type === 'hidden' ? 'hidden' : ''} flex margy-1 gap-column-2 gap-row-1 flex-wrap align-items-center justify-content-center flex-${direction}`}>
            <label className="pad-1" style={lbl__style} htmlFor={id}> {label} </label>
            <input
                value={value}
                id={id}
                name={id}
                style={style}
                type={input__type}
                readOnly={readOnly}
                min={input__type === 'number' ? input__min || 0 : null}
                max={input__type === 'number' ? input__max : null}
                pattern={input__type === 'number' ? '[0-9]*' : null}
                placeholder={placeholder}
                className={`pad-1 ${styles.form_input}`}
                onChange={handleChange} />
        </div>
    )
} 