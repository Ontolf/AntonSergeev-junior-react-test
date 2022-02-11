import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, makeVar, useReactiveVar } from "@apollo/client";

import { GET_CURRENCIES } from "./AllQueries"
import CartOverview from "./CartOverview";

export var pickCurrency = localStorage.getItem("pickCurrency");
export var CurCartProducts = JSON.parse(localStorage.getItem("CurCartProducts"));

export var isNewLinkOpen = 0;
export var inCartAmount = makeVar([]);

function MiniCartButton() {
    const [showMiniCart, setShowMiniCart] = useState(false);

    const onClick = e => {
        setShowMiniCart((prev) => !prev);
    }

    if (CurCartProducts === null) {
        CurCartProducts = []
    }
    
    var countEl = 0
    CurCartProducts.forEach((el) => { countEl += el.quantity });
    inCartAmount(countEl)

    var thisCartAmount = useReactiveVar(inCartAmount)

    return (
        <div>

            <button id="mini-cart" onClick={onClick}>
                {thisCartAmount > 0 ? <div id="mini-cart-badge">{thisCartAmount}</div> : null}
                \_/
            </button>
            <div>
                {showMiniCart && <MiniCartPopUp />}
            </div>
        </div>
    )
}

function MiniCartPopUp() {

    const onViewBagClick = () => {
        isNewLinkOpen = true;
    }

    return (
        <div className='mini-cart-background'>
            <div className='mini-cart-main'>

                <p id='my-bag-lable'>My Bag </p>

                <div id="mini-cart-holder">
                    <hr />
                    <CartOverview />
                </div>

                <div className='mini-cart-buttons-holder'>
                    <Link to="/cart">
                        <button id='view-bag-button' onClick={onViewBagClick}>VIEW BAG</button>
                    </Link>
                    <button id='check-out-button'>CHECK OUT</button>
                </div>

            </div>
        </div>
    )
}

function ShowCurrencies() {
    const { data, loading, error } = useQuery(GET_CURRENCIES);

    const onChange = e => {
        localStorage.setItem("pickCurrency", e.target.value);

        window.location.reload(false);
    }

    if (error) return `Error! ${error}`;
    if (loading) return <p>...</p>

    if (localStorage.getItem("pickCurrency") === null) {
        pickCurrency = 0;
    }

    return (
        <form>
            <select defaultValue={pickCurrency} className="show-currencies" onChange={onChange}>
                {data.currencies.map((currencies, index) => (
                    <option key={index} value={index}>
                        {currencies.symbol}
                    </option>)
                )}
            </select>
        </form>
    )
}

export default class Header extends React.Component {

    onClick = () => {
        isNewLinkOpen = false;
    }

    render() {
        return (
            <header className="header">
                {window.location.pathname === "/cart" ? isNewLinkOpen = true : isNewLinkOpen = false}
                <div className="actions-container">

                    <Link to="/">
                        {isNewLinkOpen ? <button id="return-to-main" onClick={this.onClick}>Back</button> : " "}
                    </Link>

                    <ShowCurrencies />
                    <MiniCartButton />
                </div>
            </header>
        )
    }
}