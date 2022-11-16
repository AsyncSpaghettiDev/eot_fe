// Imports
import { useState } from 'react';

// Components
import { ConfirmModal } from '../Components/ConfirmModal';

// Hook
const useConfirmModal = () => {
    // Hooks
    const [confirmResponse, setConfirmResponse] = useState(undefined);
    const [showConfirm, setShowConfirm] = useState(false);

    // Functions
    const unshowConfirmHandler = () => setShowConfirm(false);
    const resetResponse = () => setConfirmResponse(undefined);
    const dispatchModal = (modal) => {
        modal.classList.add('modal--close');
        setTimeout(() => unshowConfirmHandler(), 500);
    }

    // Render Function
    const showModal = (title, description) => showConfirm ? <ConfirmModal
        title={title}
        description={description}
        onDismiss={dispatchModal}
        onSelect={setConfirmResponse}
        resetResponse={resetResponse}
    /> : null;

    return {
        showModal,
        setShowConfirm,
        confirmResponse,
        resetResponse
    }
}

export default useConfirmModal;