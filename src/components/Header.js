import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, makeVar, useReactiveVar } from "@apollo/client";

import { GET_CURRENCIES, GET_ALL_CATEGORIES } from "./AllQueries"
import CartOverview from "./CartOverview";
import { inCartAmount } from "./Recauter";
import { pickCurrency } from "./SetCart";

export const setCategory = makeVar("all");

function MiniCartButton() {
    const [showMiniCart, setShowMiniCart] = useState(false)
    const onClick = () => {
        setShowMiniCart(prev => !prev);
    }

    const ref = useRef()
    useEffect(() => {
        const checkIfClickedOut = e => {
            if (showMiniCart && ref.current && !ref.current.contains(e.target)) {
                onClick()
            }
        }
        document.addEventListener("mousedown", checkIfClickedOut)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOut)
        }

    }, [showMiniCart])

    const thisCartAmount = useReactiveVar(inCartAmount)

    return (
        <div ref={ref}>
            <button id="mini-cart" onClick={onClick}>
                {thisCartAmount > 0 ? <div id="mini-cart-badge">{thisCartAmount}</div> : null}
                \_/
            </button>

            {showMiniCart &&
                <div id="mini-cart-background" style={{ pointerEvents: "none" }}>
                    <div className='mini-cart-main' style={{ pointerEvents: "auto" }}>

                        <p id='my-bag-lable'>My Bag </p>

                        <div id="mini-cart-holder">
                            <CartOverview />
                        </div>

                        <div className='mini-cart-buttons-holder'>
                            <Link to="/cart">
                                <button id='view-bag-button'>VIEW BAG</button>
                            </Link>
                            <button id='check-out-button'>CHECK OUT</button>
                        </div>

                    </div>
                </div >}

        </div>
    )
}

function ShowCurrenciesButton() {
    const [showCurrencies, setShowCurrencies] = useState(false)

    const { data, loading, error } = useQuery(GET_CURRENCIES)

    const pCurrency = useReactiveVar(pickCurrency)

    const onClick = () => {
        setShowCurrencies(prev => !prev)
    }

    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOut = e => {
            if (showCurrencies && ref.current && !ref.current.contains(e.target)) {
                onClick()
            }
        }
        document.addEventListener("mousedown", checkIfClickedOut)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOut)
        }

    }, [showCurrencies])

    if (error) return `Error! ${error}`;
    if (loading) return <p>...</p>

    return (
        <div ref={ref}>
            <button onClick={onClick} id="show-currencies-button">
                {data.currencies.map((cur, index) => (
                    parseInt(index) === parseInt(pCurrency) ? cur.symbol : ""
                ))} {showCurrencies ? "^" : "⌄"}
            </button>
            {showCurrencies &&
                <div id="currencies-background">
                    <ShowCurrenciesPopUp />
                </div>
            }
        </div>
    )
}

function ShowCurrenciesPopUp() {
    const { data, loading, error } = useQuery(GET_CURRENCIES);

    const onChangeCurrencieClick = e => {
        localStorage.setItem("pickCurrency", e.target.value);

        pickCurrency(e.target.value)
    }

    if (error) return `Error! ${error}`;
    if (loading) return <p>...</p>

    return (
        <ul id="currencies-background-lable">
            {data.currencies.map((currencies, index) => (
                <li key={index} >
                    <button id="currencies-background-button" value={index} onClick={onChangeCurrencieClick}>
                        {currencies.symbol}  {currencies.label}
                    </button>
                </li>)
            )}
        </ul>
    )
}

function ShowCategories() {
    const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);
    const curCategory = useReactiveVar(setCategory)

    if (error) return `Error! ${error}`;

    const onClick = e => {
        const { value } = e.target;
        setCategory(value)
    }

    return (loading
        ? <p disabled value="">Loading...</p>
        : data.categories.map((category, index) => (
            <button id="plp-cattegories-buttons"
                value={category.name}
                key={index}
                style={curCategory === category.name ? {
                    color: "#5ECE7B",
                    cursor: "default",
                    textDecoration: "underline",
                    textUnderlineOffset: 25
                } : {}}
                onClick={onClick}
            >
                {category.name}
            </button>
        )))

}

export default function Header() {

    return (
        <header id="header">

            <div id="plp-cattegories-container">
                <ShowCategories />
            </div>

            <div id="actions-container">
                <ShowCurrenciesButton />
                <MiniCartButton />
            </div>
        </header>
    )
}