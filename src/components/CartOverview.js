
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development";
import { GET_PRODUCT } from "./AllQueries"
import { CurCartProducts, pickCurrency } from "./Header"

export var currentCurrencieSymbol = 0;

export default function CartOverview() {

    var currentSymbol = ""

    const SetProperCurrencies = (el) => {

        const { loading, data } = useQuery(GET_PRODUCT,
            {
                variables: { "id": el.thisProductId }
            })

        if (loading) { } else {
            el.price = data.product.prices[pickCurrency].amount
        }

        localStorage.setItem("CurCartProducts", JSON.stringify(CurCartProducts))
    }

    const CallProduct = (productId, indP) => {
        const { loading, error, data, refetch } = useQuery(GET_PRODUCT,
            {
                variables: { "id": productId.thisProductId }
            })

        const [productsQuantity, setProductQuantity] = useState(productId.quantity);

        const IncreaseQnClick = () => {
            productId.quantity += 1
            setProductQuantity(productId.quantity)
            localStorage.setItem("CurCartProducts", JSON.stringify(CurCartProducts))
        }

        const DecreaseQnClick = () => {
            productId.quantity -= 1

            if (productId.quantity < 1) {

                CurCartProducts.splice(indP, 1)

                localStorage.setItem("CurCartProducts", JSON.stringify(CurCartProducts))

                window.location.reload()

            } else { setProductQuantity(productId.quantity) }

        }

        if (error) return `ERROR!!! ${error}`
        if (loading) return <p>Loading...</p>

        refetch(data.product.attributes)

        currentSymbol = data.product.prices[pickCurrency].currency.symbol

        return (
            <div className="cart-column-holder">

                <div className="cart-left-column">

                    <Link to={`/${productId.thisProductId}`} params={productId.thisProductId}>
                        <button id="cart-button">{data.product.name}</button>
                    </Link>

                    <div className="cart-attribute-holder">
                        <ul>
                            {data.product.attributes.map((attributes, index) => (
                                attributes.items.map(item => (
                                    productId.attributes.map((attribute) => (
                                        item.id === attribute.thisItemId && attribute.thisItemName === attributes.name ? < li key={index} id="cart-attribute-name" style={attributes.type === "swatch" ? { background: item.value } : {}}> {item.id} </li> : ""
                                    ))
                                ))
                            ))}
                        </ul>
                    </div>

                    <div id="cart-product-price">
                        <p id="cart-product-price-text">{data.product.prices[pickCurrency].currency.symbol}{data.product.prices[pickCurrency].amount}</p>
                    </div>

                </div>

                <div className="cart-right-column">
                    <img src={data.product.gallery} alt="" style={{ width: "auto", height: 105, right: "10%", position: "absolute" }} />

                    <div id="increase-decrease-box">
                        <button id="increase-decrease-quantity" onClick={IncreaseQnClick}>+</button>
                        <p>{productsQuantity}</p>
                        <button id="increase-decrease-quantity" onClick={DecreaseQnClick}>-</button>
                    </div>
                </div>
            </div >
        )
    }

    CurCartProducts.forEach(el => SetProperCurrencies(el))

    var countPrice = 0;
    CurCartProducts.forEach((el) => countPrice += el.price * el.quantity)
    countPrice = countPrice.toFixed(2)

    if (CurCartProducts.length > 0) {

        return (
            <div>
                <div className="all-products-holder">
                    {CurCartProducts.map((product, index) => {
                        return (
                            <div key={index}>
                                {CallProduct(product, index)}
                                <br />
                                <hr style={{ width: 130 }} />
                            </div>
                        )
                    })}
                </div>

                <div id="cart-price-holder">
                    <hr />
                    <p id="cart-all-price-text">Total:</p><p id="total-price-number">{currentSymbol}{countPrice}</p>
                </div>
            </div>
        )

    } else return <p>EMPTY</p>

}