import { makeVar, useReactiveVar, useQuery } from "@apollo/client";
import { useEffect } from "react/cjs/react.development";

import { GET_PRODUCT } from "./AllQueries";
import Recaunter from "./Recauter";

export const pickCurrency = makeVar(!!localStorage.getItem("pickCurrency") ? localStorage.getItem("pickCurrency") : 0);

export const cartAr = makeVar(localStorage.getItem("CurCartProducts") !== null
    ? JSON.parse(localStorage.getItem("CurCartProducts")) : [])

export var curCart = []

export default function SetCart() {
    const SetProperCurrencies = (el) => {
        const { loading, data } = useQuery(GET_PRODUCT,
            {
                variables: { "id": el.thisProductId }
            })

        if (loading) { } else {
            el.price = data.product.prices[pCurrencyCart].amount
            el.symbol = data.product.prices[pCurrencyCart].currency.symbol
            el.brand = data.product.brand
            el.gallery = data.product.gallery[0]
        }

    }

    useEffect(() => {
        Recaunter()
    },[]) 

    curCart = useReactiveVar(cartAr)
    const pCurrencyCart = useReactiveVar(pickCurrency)
    curCart.forEach(el => SetProperCurrencies(el))
}
