import React from 'react'
import { Link } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import "../Styles/cartitem.css"
import { server } from "../redux/store.js"

const cartitem = ({ cartitems, incrementHandler, decrementhandler, removeHandler }) => {
    const { productid, name, photo, quantity, price } = cartitems
    return (
        <div className="cartitem">
            <img src={`${photo}`} alt={name} />
            <article>
                <Link to={`product/${productid}`}>{name}</Link>
                <span>Price: ₹{price}</span>
                <div className="item-btn">
                    <button onClick={() => decrementhandler(cartitems)} className="plusminus">-</button>
                    <p className="quant">{quantity}</p>
                    <button onClick={() => incrementHandler(cartitems)} className="plusminus">+</button>
                    <button onClick={() => removeHandler(productid)} className="trash"><FaTrash /></button>
                </div>

            </article>

        </div>
    )
}

export default cartitem
