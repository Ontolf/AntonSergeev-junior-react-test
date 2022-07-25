import Header from "./templates/layout/Header";
import ProductList from "./templates/ProductList";
import {useEffect, useState} from "react";
import ShowCategories from "./templates/layout/layout-components/ShowCategories";
import ShowCurrencies from "./templates/layout/layout-components/ShowCurrencies";
import CartOverlay from "./templates/layout/layout-components/CartOverlay";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CartOverlayBig from "./templates/CartOverlayBig";
import ProductDetails from "./templates/ProductDetails";

export default function App() {
    const [category, setCategory] = useState("all");
    const [currency, setCurrency] = useState(3);
    const [productCart, setProductCart] = useState([]);

    if (productCart.find((product) => product.quantity <= 0)) {
        let newCart = productCart.filter((product) => product.quantity > 0);
        setProductCart(newCart)
    }

    useEffect(() => {}, [category, currency, productCart]);

    const countCartProducts = (products) => {
        let amount = 0;
        products.map((product) => amount += product.quantity);
        return amount;
    }

    return (
        <BrowserRouter>
            <Header
                navigation={<ShowCategories setCategory={setCategory} currentCategory={category} />}
                currencySwitcher={<ShowCurrencies setCurrency={setCurrency} currentCurrency={currency} />}
                cartOverlay={<CartOverlay currency={currency}
                                          quantityOfProducts={countCartProducts(productCart)}
                                          productCart={productCart}
                                          setProductCart={setProductCart} />}
            />
            <Routes>
                <Route path={"/"} element={
                    <ProductList category={category}
                                 currency={currency}
                                 productCart={productCart}
                                 setProductCart={setProductCart}
                    />
                } />
                <Route path={":productId"}
                       element={<ProductDetails currency={currency}
                                                productCart={productCart}
                                                setProductCart={setProductCart} />}
                />
                <Route path={"/cart"} element={<CartOverlayBig currency={currency}
                                                               quantityOfProducts={countCartProducts(productCart)}
                                                               productCart={productCart}
                                                               setProductCart={setProductCart} />} />
            </Routes>
        </BrowserRouter>
    )
}