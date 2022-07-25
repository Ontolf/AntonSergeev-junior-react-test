import "./ProductList.css";
import {useQuery} from "@apollo/client";
import {GET_PRODUCT_LIST} from "../queries/GET_PRODUCT_LIST";
import {Link} from "react-router-dom";

export default function ProductList({ category, currency, productCart, setProductCart }) {

    const onAddToCartClick = (product) => {
        if (product.attributes.length === 0) {
            if (productCart.find(el => el.id === product.id )) {
                productCart.map(el => {
                    if (el.id === product.id) {
                        return el.quantity += 1;
                    }
                    return el;
                })
                setProductCart((prev) => [...prev]);
            }

            if (!productCart.find(el => el.id === product.id )) {
                setProductCart((prevProducts) => [...prevProducts, {
                    id: product.id,
                    attributes: null,
                    quantity: 1
                }]);
            }
        }
    }

    const {loading, error, data} = useQuery(GET_PRODUCT_LIST, {
        variables: {
            "ChosenCategory": { "title": category}
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong!</p>;

    return (
        <div className={"product-list"}>
            <h2 className={"current-category"}>
                {category}
            </h2>
            <div className={"product-list-container"}>
                {data.category.products.map(product =>
                    <div key={product.id} className={"product-card"}>
                        <Link  to={`/${product.id}`} params={product.id} className={"link-styles-none"}>
                            <div className={product.inStock ? "product-image-container" : "product-image-container-out-of-stock"}>
                                <img src={product.gallery[0]} alt={""}/>
                                {product.inStock ? "" : <p className={"out-of-stock-text-xxl"}>OUT OF STOCK</p>}
                            </div>
                            <div className={"information-container"}>
                                <div className={"product-title"}>{product.name}</div>
                                <div className={"product-price"}>
                                    {product.prices[currency].currency.symbol}{product.prices[currency].amount}
                                </div>
                            </div>
                        </Link>
                        {product.attributes.length === 0 && product.inStock ?
                        <div onClick={() => onAddToCartClick(product)} className={"add-product-button"}>
                            <img className={"add-product-button"} src={"./circle-cart-icon.png"} alt={""}/>
                        </div> : ""}
                    </div>
                )}
            </div>
        </div>
    )
}