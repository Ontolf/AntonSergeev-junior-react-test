import { Link } from "react-router-dom"
import SetCart, { curCart } from "./SetCart"
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import Recaunter from "./Recauter";

export default function CartOverview() {
    SetCart()

    const [cartC, setCartC] = useState(curCart.filter((el) => el.quantity !== 0))

    useEffect(() => {
        if (cartC) {
            localStorage.setItem("CurCartProducts", JSON.stringify(cartC))
            Recaunter()
        }
    }, [cartC])

    const CallProduct = (prop) => {
        var productsQuantity = prop.productId.quantity

        const IncreaseQnClick = () => {
            prop.productId.quantity += 1
            productsQuantity = prop.productId.quantity

            setCartC(curCart.filter((el) => el.quantity > 0))
        }

        const DecreaseQnClick = () => {
            prop.productId.quantity -= 1
            productsQuantity = prop.productId.quantity

            setCartC(curCart.filter((el) => el.quantity > 0))
        }

        return (
            <div>
                <div id="increase-decrease-box">
                    <button id="increase-decrease-quantity" onClick={IncreaseQnClick}>+</button>
                    <p>{productsQuantity}</p>
                    <button id="increase-decrease-quantity" onClick={DecreaseQnClick}>-</button>
                </div>
                <Link to={`/${prop.productId.thisProductId}`} params={prop.productId.thisProductId} style={{ textDecoration: 'none' }}>
                    <div>

                        <div className="cart-left-column">

                            <p id="product-name-cart">{prop.productId.name}</p>
                            <p id="product-brand-cart">{prop.productId.brand}</p>

                            <div id="cart-attribute-holder">

                                {prop.productId.attributes.map((attribute, index) => (
                                    <div key={index} id="cart-attribute-holder-each">
                                        <p key={index + 2} id="attribute-name-cart">{attribute.thisItemName}</p>
                                        <p key={index + 3} id="cart-attribute-name" style={attribute.type === "swatch" ? {
                                            background: attribute.thisItemId, margin: "13px 10px", maxWidth: 10, height: 20,
                                            border: "1px solid #1D1F22"
                                        } : {}}>
                                            {attribute.type === "swatch" ? "" : attribute.thisItemId}
                                        </p>
                                    </div>
                                ))}

                            </div>

                            <div id="cart-product-price-div">
                                <p id="cart-product-price-text">{prop.productId.symbol}{prop.productId.price}</p>
                            </div>

                        </div>

                        <div className="cart-right-column">
                            <img src={prop.productId.gallery} alt="" style={{ maxHeight: "100%", maxWidth: "100%" }} />
                        </div>
                    </div >
                </Link>
            </div>
        )
    }

    if (cartC.length > 0) {
        return (
            <div>
                <div className="all-products-holder">
                    {cartC.map((product, index) =>
                        <div key={index} id="cart-column-holder">
                            <br />
                            <CallProduct productId={product} />
                        </div>
                    )}
                </div>
                <CountTotal />
            </div>
        )
    } else {
        return <p>EMPTY</p>
    }

}

function CountTotal() {
    var currentSymbol = curCart[0].symbol

    var countPrice = 0;
    curCart.forEach((el) => countPrice += el.price * el.quantity)
    countPrice = countPrice.toFixed(2)

    return (
        <div id="cart-price-holder">
            <p id="cart-all-price-text">Total:</p><p id="total-price-number">{currentSymbol}{countPrice}</p>
        </div>
    )
}
