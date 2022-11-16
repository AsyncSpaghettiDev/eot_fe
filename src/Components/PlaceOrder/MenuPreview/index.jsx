// Components
import { MenuPlates } from "../../MenuPlates/index.jsx";

// View while we are making an order
export const MenuPreview = ({ onTriggerStep, onSelectedPlate }) => {
    // Handlers
    const showConfirmHandler = (selectedPlate) => {
        onSelectedPlate(selectedPlate);
        onTriggerStep({ one: -1, two: 1, three: 0, four: 0 });
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    // Render Section
    return (
        <>
            <MenuPlates onSelectPlate={showConfirmHandler} showPrices />
        </>
    )
}
