import { useState, useEffect } from "react";

const useForm = (inputs, submitAction, initialState = {}) => {
    // State for valid form and form errors
    const [formErrors, setFormErrors] = useState(undefined);
    // Form data
    const [formData, setFormData] = useState(initialState);
    const [formInputs, setFormInputs] = useState(undefined);
    const formValid = formErrors !== undefined && formErrors.length === 0;
    const formInvalid = formErrors !== undefined && formErrors.length > 0;


    // After validate form checks if its valid, if not show errors for 2.5s
    // Else triggers onSubmitAction()
    useEffect(() => {
        if (formInvalid) {
            showErrors();
            setTimeout(() => {
                hideErrors();
                setFormErrors(undefined);
            }, 2500)
        }

        if (formValid) {
            // Here goes onValid trigger
            submitAction(formData);
        }
    }, [formErrors]);

    // Set default values if needed, if not values set to undefined
    useEffect(() => {
        let tags = {};
        inputs.forEach(inp => {
            inp.defaultValue = initialState[inp.id] ?? undefined;
            tags = {
                ...tags,
                [inp.id]: inp.defaultValue
            };
        });
        setFormInputs(inputs);
        setFormData(tags);
    }, [inputs]);

    const updateInput = newValue => setFormData({ ...formData, ...newValue });

    // Submit form handler
    const submitHandler = e => {
        e.preventDefault();
        validateForm();
    }

    // Validates if any form value is undefined or string empty
    const validateForm = () => {
        const errors = [];
        for (const iterator in formData) {
            if (formData[iterator] === undefined || formData[iterator]?.toString().trim() === '') {
                errors.push(iterator);
            }
        }
        setFormErrors(errors);
    }

    const showErrors = () => {
        formErrors.forEach(err => {
            const input = document.getElementById(err);
            input.classList.add('input--invalid');
        });
    }

    const hideErrors = () => {
        formErrors.forEach(err => {
            const input = document.getElementById(err);
            input.classList.remove('input--invalid');
        });
    }

    return {
        formData,
        formInputs,
        formInvalid,
        submitHandler,
        updateInput,
    }
}

export default useForm;