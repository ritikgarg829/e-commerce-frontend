import { Link } from 'react-router-dom'
import ProductCard from "../components/productCard"
import Productskelton from "../components/loader.jsx"
import { useLastestProductsQuery } from "../redux/api/product-api.js"
import toast from "react-hot-toast"
import "../Styles/home.css"
import { useDispatch } from 'react-redux'
import { addTocart } from '../redux/reducer/cartReducer.js'

const home = () => {

    const dispatch = useDispatch();

    const { data, isLoading, isError } = useLastestProductsQuery()

    if (isError) toast.error("can not fetch latest order");

    const AddtoCartHandler = (cartItems) => {
        if (cartItems.stock < 1) return toast.error("out of stock");
        dispatch(addTocart(cartItems))
        toast.success("Added In a Cart")

    }

    return (
        <div className="home">
            <h1 className="main-heading">Latest Products
                <Link className="findmore" to="/search">More</Link>
            </h1>

            <main className="main">
                {
                    isLoading ? <Productskelton /> : data?.products.map((i) => (
                        <ProductCard key={i._id} productid={i._id} stock={i.stock} name={i.name} price={i.price} photo={i.photo} handler={AddtoCartHandler} />
                    ))

                }


            </main>
        </div>
    )
}

export default home
