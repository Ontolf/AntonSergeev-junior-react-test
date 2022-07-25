import "./CartOverlay.css";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Cart from "../../template-components/Cart"

export default function CartOverlay({currency, quantityOfProducts, productCart, setProductCart}) {
    const [openCartOverlay, setOpenCartOverlay] = useState(false);
    const wrapperRef = useRef(null);

    const handleCartClick = () => {
        setOpenCartOverlay(prev => !prev);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if(openCartOverlay && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                handleCartClick();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [openCartOverlay])

    return (
        <div className={"cart-overlay-holder"} ref={wrapperRef}>
            {quantityOfProducts === 0 ? "" : <div className={"cart-quantity"}>{quantityOfProducts}</div>}
            <img onClick={handleCartClick} src={"./cart.png"} alt={""} />
            <div className={openCartOverlay ? "cart-background" : "cart-background-hidden"}>
                <div className={"cart-overlay"}>
                    <div className={"amount-of-items"}>My Bag, {quantityOfProducts}</div>
                    <div className={"cart-items-holder"}>
                        <Cart currency={currency}
                              quantityOfProducts={quantityOfProducts}
                              productCart={productCart}
                              setProductCart={setProductCart}
                              displayOrderInformation={false} />
                    </div>
                    <div className={"cart-buttons"}>
                        <Link to={"/cart"} className={"link-styles-none"}>
                            <div className={"button button-view-bag"}>VIEW BAG</div>
                        </Link>
                        <div className={"button button-check-out"}>CHECK OUT</div>
                    </div>
                </div>
            </div>
        </div>
    )
}