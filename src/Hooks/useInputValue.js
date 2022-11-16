import { useState } from "react";

const useInputValue = (initialValue, parentHandler) => {
    const [value, setValue] = useState(initialValue?.toString() ?? '');

    // Handle the change of the input
    const handleChange = (e) => {
        const target = e.target;
        const valueObject = {}
        valueObject[target.name] = target.value;
        setValue(target.value);
        parentHandler(valueObject);
    };
    
    return {
        value,
        handleChange
    };
}

export default useInputValue;