import { CartItem } from "../../types/cartTypes";
import { addToCart } from "../../utils/locSto";

export default function AddToCart(product : CartItem) {
    const handleAddToCart = () =>  {
        addToCart({...product})
    }
    return (
        <button onClick={handleAddToCart} className="p-2 rounded hover:bg-accent active:scale-x-90 text-white transition duration-200 bg-lighterAccent " type="button">
            Add to Cart
        </button>
    )
}