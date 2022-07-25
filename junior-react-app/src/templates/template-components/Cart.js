import "./Cart.css";
import {useQuery} from "@apollo/client";
import {GET_PRODUCT_LIST} from "../../queries/GET_PRODUCT_LIST";
import QuantityManager from "./QuantityManager";
import GalleryMini from "./GalleryMini";

export default function Cart({currency, quantityOfProducts, productCart, setProductCart, displayOrderInformation}) {
    let cartPrice = 0;

    function countTax(price) {
        let tax = price * 0.21;
        return tax.toFixed(2);
    }

    function displayPrice(amount, quantity) {
        let price = amount * quantity;
        addToTotalPrice(price)
        return price.toFixed(2);
    }

    function addToTotalPrice(price) {
        return cartPrice += price;
    }

    const {loading, error, data} = useQuery(GET_PRODUCT_LIST, {
        fetchPolicy: "cache-and-network"
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong!</p>;

    let currencyInCart = data.category.products[0].prices[currency].currency.symbol;

    return (
        <div className={"cart-holder"}>
            <div className={"cart"}>
                {data.category.products.map((product, index) =>
                    productCart.map((productInCart, productInCartIndex) => {
                        if (productInCart.id === product.id) {
                            return (
                                <div key={index + productInCartIndex} className={"product"}>
                                    <div className={"information"}>
                                        <div className={"name"}>{product.name}</div>
                                        <div className={"brand"}>{product.brand}</div>
                                        <div className={"price"}>
                                            {currencyInCart}{displayPrice(product.prices[currency].amount, productInCart.quantity)}
                                        </div>
                                        {product.attributes.map((attribute) =>
                                            <div key={attribute.id} className={"attribute-container"}>
                                                <div className={"text-bold"}>{attribute.name}:</div>
                                                <div className={"items-container"}>
                                                    {attribute.items.map((item) =>
                                                        productInCart.attributes.map((attributeInCart) => {
                                                            if (attribute.name === attributeInCart.attributeName && item.id === attributeInCart.id) {
                                                                return (
                                                                    attribute.type === "swatch" ? <div key={item.id} style={{background: item.value}} className={"item-swatch"}></div> :
                                                                        <div key={item.id} className={"item-classic"}>{item.displayValue}</div>
                                                                )
                                                            }
                                                            return "";
                                                        })
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={"second-column"}>
                                        <QuantityManager productInCart={productInCart}
                                                         setProductCart={setProductCart} />
                                    </div>
                                    <GalleryMini gallery={product.gallery} />
                                </div>
                            )
                        }
                        return "";
                    })
                )}
            </div>
            <div className={"order-information"}>
                {displayOrderInformation ?
                    <div>
                        <div className={"information-card"}>
                            <p className={"text-slim"}>Tax 21%:</p>
                            <p className={"text-super-bold"}>{currencyInCart}{countTax(cartPrice)}</p>
                        </div>
                        <div className={"information-card"}>
                            <p className={"text-slim"}>Quantity:</p>
                            <p className={"text-super-bold"}>{quantityOfProducts}</p>
                        </div>
                    </div>: ""}
                <div className={"information-card"}>
                    <p className={"text-bold"}>Total:</p>
                    <p className={"text-super-bold"}>{currencyInCart}{cartPrice.toFixed(2)}</p>
                </div>
                {displayOrderInformation ? <div className={"order-button"}>ORDER</div> : ""}
            </div>
        </div>
    )
}