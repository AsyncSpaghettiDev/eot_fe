// Imports
import { useState } from "react";

// Components
import { FormModal } from "../Components/FormModal";

// Hook
const useFormModal = () => {
    // Hooks
    const [modalConfiguration, setModalConfiguration] = useState(undefined);
    const [formResponse, setFormResponse] = useState(undefined);
    const [formVisibility, setFormVisibility] = useState(false);

    // Functions
    const unshowFormHandler = () => setFormVisibility(false);
    const resetFormResponse = () => setFormResponse(undefined);
    const showForm = (modalConfiguration) => {
        setFormVisibility(true);
        setModalConfiguration(modalConfiguration);
    }

    const dispatchModal = (modal) => {
        modal.classList.add('modal--close');
        setTimeout(() => unshowFormHandler(), 500);
    }

    // Render function
    const FormModalComponent = () => {
        if (modalConfiguration === undefined || !formVisibility) return null;

        const {
            title,
            description,
            errorMessage,
            inputs,
            confirmButtonText,
            onSubmitAction,
            initialState = {} } = modalConfiguration;

        return <FormModal
            title={title}
            description={description}
            errorMessage={errorMessage}
            onDismiss={dispatchModal}
            onSelect={setFormResponse}
            confirmButtonText={confirmButtonText}
            inputs={inputs}
            onSubmitAction={onSubmitAction}
            initialFormState={initialState}
            resetResponse={resetFormResponse}
        />;
    }

    return {
        formResponse,
        FormModalComponent,
        showForm,
    }
}

export default useFormModal;