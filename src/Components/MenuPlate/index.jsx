// Styles
import './MenuPlate.css';

// Menu plate view for menu page
export const MenuPlate = ({ id, img, name, description, price, showPrice, onClick }) => {
    // Handlers
    const onClickHandler = async () => {
        onClick(id);
    }

    // Render section
    return (
        <div className="menu__plate__detail" onClick={onClickHandler}>
            <img className='plate-image' src={img} alt={name + ' ' + description} />
            <h3 className="plate-name"> {name} </h3>
            {
                showPrice && <p className="plate-price"> {`Ordenar $${price} MXN`} </p>
            }
            <p className="plate-desc"> {description} </p>
        </div>
    );
}
