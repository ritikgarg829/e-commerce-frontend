import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Cartitem from "../components/cartitem"
import { VscError } from "react-icons/vsc"
import "../Styles/cart.css";
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { addTocart, removeFromCart, calculatePrice, discountApplied } from '../redux/reducer/cartReducer.js'
import axios from "axios";
import { server } from "../redux/store.js"



const cart = () => {

    const dispatch = useDispatch();


    const { cartItems, subtotal, tax, shippingCharges, discount, total } = useSelector((state) => state.cartReducer)

    const incrementHandler = (cartItem) => {

        if (cartItem.quantity >= cartItem.stock) return;

        const updatedCartItem = { ...cartItem, quantity: cartItem.quantity + 1 };

        dispatch(addTocart(updatedCartItem));
    }



    const decrementHandler = (cartItem) => {
        if (cartItem.quantity <= 1) return;

        const updatedCartItem = { ...cartItem, quantity: cartItem.quantity - 1 };

        dispatch(addTocart(updatedCartItem));
    }


    const removeHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }


    const [couponCode, setcouponCode] = useState("")
    const [isValidcouponCode, setisValidcouponCode] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`)
                .then((res) => {
                    dispatch(discountApplied(res.data.discount));
                    setisValidcouponCode(true);
                    dispatch(calculatePrice())



                }).catch((err) => {
                    dispatch(discountApplied(0));
                    setisValidcouponCode(false)
                    dispatch(calculatePrice())


                })
        }, 1000)

        return () => {
            clearTimeout(timeout)
            setisValidcouponCode(false)


        }
    }, [couponCode])


    useEffect(() => {
        dispatch(calculatePrice())
    }, [cartItems])



    return (
        <>
            <div className="cart">
                <main>
                    {cartItems.length > 0 ? cartItems.map((item, index) => <Cartitem incrementHandler={incrementHandler} decrementhandler={decrementHandler} removeHandler={removeHandler} key={index} cartitems={item} />) : <h1>No Items Added</h1>}
                </main>
                <aside>
                    <p>Subtotal : ₹{subtotal} </p>
                    <p>Shipping Charges : ₹{shippingCharges} </p>
                    <p>Tax : ₹{tax} </p>
                    <p> Discount: - <em className="text-red-600"> ₹{discount}</em></p>
                    <p><b>Total :₹{total} </b></p>
                    <input type="text" value={couponCode} placeholder="Enter Coupon Code" onChange={(e) => setcouponCode(e.target.value)} />

                    {couponCode && (isValidcouponCode ? (<span className="coupon text-green-800">₹{discount} Off using the <code>{couponCode}</code></span>) : (<span className="coupon text-red-800"> <VscError />Invalid coupon </span>))}

                    {cartItems.length > 0 ? <Link to="/shipping">Checkout</Link> : <h1>Checkout</h1>}
                </aside>
            </div >
        </>
    )
}

export default cart







