import { FaPlus } from "react-icons/fa"
import "../Styles/productCard.css"
import { server } from "../redux/store.js"

const productCard = ({ productid, photo, name, price, stock, handler }) => {

    const handleClick = () => {
        handler({ productid, photo, name, price, stock, quantity: 1 });
    };

    return (
        <div className="product-card">
            <img src={`${server}/${photo}`} alt={name} />
            <h2>{name}</h2>
            <span>Price: ₹{price}</span>
            <div className="addtocartbtn">
                <button className="btn" onClick={handleClick}><FaPlus /></button>
            </div>
        </div>
    )
}

export default productCard
