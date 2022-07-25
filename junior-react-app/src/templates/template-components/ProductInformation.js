import "./ProductInformation.css";
import {useState} from "react";

export default function ProductInformation({product, currency, productCart, setProductCart}) {
    const [attributeSelected, setAttributeSelected] = useState([]);

    function manageAttribute(id, name) {
        if (product.attributes.length !== 0) {
            if (attributeSelected.find(el => el.attributeName === name)) {
                attributeSelected.map(el => {
                    if (el.attributeName === name) {
                        return el.id = id;
                    }
                    return el;
                })
                setAttributeSelected((prev) => [...prev]);
            }

            if (!attributeSelected.find(el => el.attributeName === name)) {
                setAttributeSelected((prevAttributes) => [...prevAttributes, {
                    id: id,
                    attributeName: name
                }]);
            }
        }
    }

    const addProduct = () => {
        if (attributeSelected.length === product.attributes.length) {
            let newProduct = {
                id: product.id,
                attributes: [...attributeSelected],
                quantity: 1
            };
            let exists = false;
            if (productCart.find(el => el.id === product.id)) {
                productCart.find(productInCart => {
                    if (productInCart.id === newProduct.id) {
                        if (productInCart.attributes !== null) {
                            console.log(productInCart)
                            console.log(newProduct)
                            if (JSON.stringify(newProduct.attributes) === JSON.stringify(productInCart.attributes)) {
                                exists = true;
                                return productInCart.quantity += 1;
                            }
                        }
                    }
                })
                setProductCart((prev) => [...prev]);
            }

            if (!exists) {
                setProductCart((prevProducts) => [...prevProducts, newProduct]);
            }
            setAttributeSelected([]);
        }
    }

    return (
        <div className={"product-information"}>
            <div className={"name"}>{product.name}</div>
            <div className={"brand"}>{product.brand}</div>
            {product.attributes.map((attribute) =>
                <div className={"attribute-container"} key={attribute.id}>
                    <div className={"text-bold"}>{attribute.name}:</div>
                    <div className={"items-container"}>
                        {attribute.items.map((item) =>
                            attribute.type === "swatch" ?
                                <li key={item.id}
                                    id={item.id}
                                    value={attribute.name}
                                    className={attributeSelected.find(el =>
                                        el.id === item.id && el.attributeName === attribute.name) ?
                                        "swatch-item-selected" : "swatch-item"}
                                    style={{background: item.value}}
                                    onClick={() => manageAttribute(item.id, attribute.name)}
                                /> :
                                <li key={item.id}
                                    value={item.id}
                                    className={attributeSelected.find(el =>
                                        el.id === item.id && el.attributeName=== attribute.name) ?
                                        "classic-item-selected" : "classic-item"}
                                    onClick={() => manageAttribute(item.id, attribute.name)}
                                >
                                    {item.value}
                                </li>
                        )}
                    </div>
                </div>
            )}
            <div className={"text-bold"}>PRICE:</div>
            <div className={"price"}>{product.prices[currency].currency.symbol}{product.prices[currency].amount}</div>
            {product.inStock ?
                <div className={"cart-button cart-button-add"} onClick={addProduct}>ADD TO CART</div> :
                <div className={"cart-button cart-button-out-of-stock"}>OUT OF STOCK</div>}
            <div className={"description"} dangerouslySetInnerHTML={{__html: product.description}} />
        </div>
    )
}