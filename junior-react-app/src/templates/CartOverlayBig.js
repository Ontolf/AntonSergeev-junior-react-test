import "./CartOverlayBig.css";
import Cart from "./template-components/Cart";

export default function CartOverlayBig({currency, quantityOfProducts, productCart, setProductCart}) {
    return (
        <div className={"cart-overlay-big"}>
            <h2 className={"cart-title"}>CART</h2>
            <div className={"products-holder"}>
                <Cart currency={currency}
                      quantityOfProducts={quantityOfProducts}
                      productCart={productCart}
                      setProductCart={setProductCart}
                      displayOrderInformation={true} />
            </div>
        </div>
    )
}