import {useQuery} from "@apollo/client";
import {GET_CURRENCIES} from "../../../queries/GET_CURRENCIES";
import {useEffect, useRef, useState} from "react";
import "./ShowCurrencies.css"

export default function ShowCurrencies({setCurrency, currentCurrency}) {
    const [openCurrencies, setOpenCurrencies] = useState(false);
    const wrapperRef = useRef(null);

    const changeCurrency = e => {
        setCurrency(e.target.value)
    }

    const openCurrenciesClick = () => {
        setOpenCurrencies(prev => !prev)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (openCurrencies && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                openCurrenciesClick();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [openCurrencies]);

    const {loading, error, data} = useQuery(GET_CURRENCIES);
    if (loading) return <p>...</p>;
    if (error) return <p>Whooops, Something went wrong!</p>;

    return (
        <div className={"currency-switcher"} ref={wrapperRef}>
            <div className={"currency-button"} onClick={openCurrenciesClick}>
                {data.currencies[currentCurrency].symbol}{openCurrencies ? "^" : "⌄"}
            </div>
            <ul className={openCurrencies ? "currencies-list" : "currencies-list-hidden"}>
                {data.currencies.map((currency, index) =>
                    <li
                        onClick={changeCurrency}
                        key={currency.symbol}
                        value={index}>{currency.symbol} {currency.label}
                    </li>
                )}
            </ul>
        </div>
    )
}