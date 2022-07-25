import "./QuantityManager.css";

export default function QuantityManager({productInCart, setProductCart}) {
    const increaseQuantity = (product) => {
        product.quantity += 1;
        setProductCart((prev) => [...prev]);
    }

    const decreaseQuantity = (product) => {
        product.quantity -= 1;
        setProductCart((prev) => [...prev]);
    }

    return (
        <div className={"quantity-container"}>
            <div className={"quantity-button"} onClick={() => increaseQuantity(productInCart)}>+</div>
            <div>{productInCart.quantity}</div>
            <div className={"quantity-button"} onClick={() => decreaseQuantity(productInCart)}>-</div>
        </div>
    )
}