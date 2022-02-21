import React, { useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { useParams } from "react-router-dom";

import {
    GET_IMG,
    GET_PRODUCT
} from './AllQueries'
import AddToCart from "./AddToCart";
import { pickCurrency } from "./SetCart";

export default function PdpDispl() {

    const params = useParams();

    const thisId = params.productId;

    const thisProductSelected = { thisProductId: params.productId };

    return (
        <div className="pdp-pop-up">
            <br />
            <div className="pdp-column-holder">
                {GetPdpImgs(thisId)}
                {ShowPdpInformation(thisId, thisProductSelected)}
            </div>
        </div>
    )
}

function GetPdpImgs(productIdImg) {
    const { data, loading, error } = useQuery(GET_IMG,
        {
            variables: { "id": productIdImg }
        })

    const [thisImgOnTop, setThisImgOnTop] = useState(0);

    const onImgClick = e => {
        const eTarget = e.currentTarget.value;
        setThisImgOnTop(eTarget);
    }

    if (error) return `Error! ${error}`;
    if (loading) return <h1>Loading...</h1>;

    return (
        <div className="pdp-left-col">
            <ul>
                {data.product.gallery.map((gallery, index) => (

                    <li key={index}>
                        <button className="button-to-choose-main-img" value={index} onClick={onImgClick}>
                            <img src={gallery} alt="" style={{ heigh: 80, width: 79 }} />
                        </button>
                    </li>

                ))}
            </ul>
            <div id="pdp-main-image" >
                <img src={data.product.gallery[thisImgOnTop]} alt="" style={{ hmaxHeight: "100%", maxWidth: "100%" }} />
            </div>
        </div >
    )
}

function ShowPdpInformation(productIdInf, thisProductName) {
    const { data, loading, error, refetch } = useQuery(GET_PRODUCT,
        {
            variables: { "id": productIdInf }
        })

    const [thisButtomsSelected, setThisButtomSelected] = useState([]);
    const pCurrencyPdp = useReactiveVar(pickCurrency)

    var thisButton = [];

    const onAttributeClick = (e) => {
        thisButton[e.currentTarget.value] =
        {
            thisItemId: e.currentTarget.id,
            thisItemName: e.currentTarget.name,
            type: e.currentTarget.value
        }

        var temporary = [...thisButtomsSelected]

        if (!!thisButtomsSelected.find(el => el.thisItemName === e.currentTarget.name) === true) {

            thisButtomsSelected.filter(el => {
                if (el.thisItemId !== e.currentTarget.id && el.thisItemName === e.currentTarget.name === true) {
                    el.thisItemId = e.currentTarget.id;
                }
                return (0)
            });
            temporary = [...thisButtomsSelected];
            setThisButtomSelected(temporary);

        } else setThisButtomSelected([...thisButtomsSelected, thisButton[e.currentTarget.value]]);
    }

    const onAddToCartClick = () => {
        var isEverythingSelected = false;
        var count = 0;
        var checker = 0;

        data.product.attributes.map((attributes) => (
            (count++,
                thisButtomsSelected.find(el => {
                    if (el.thisItemName === attributes.name) {
                        checker++
                    }
                    return (0)
                }))
        ));

        if (count === checker) {
            isEverythingSelected = true;
        }

        if (isEverythingSelected) {
            AddToCart(thisButtomsSelected, thisProductName)
            setThisButtomSelected([])
        } else {
            console.log("CAN'T BE ADDED")
        }
    }

    if (error) return `Error! ${error}`
    if (loading) return <p>Loading..</p>

    refetch()

    return (
        <div id="pdp-right-col">

            <p id="product-name">{data.product.name}</p>
            <p id="brand-name">{data.product.brand}</p>

            <div>
                {data.product.attributes.map((attribute, index) => (
                    <div key={index} >
                        <p id="attribute-name">{attribute.name}:</p>

                        <ul id="choose-attribute-container-ul" >
                            {attribute.items.map((item, index) => (
                                <li id="attributes-list" key={index}>
                                    <button
                                        value={attribute.type}
                                        id={item.id}
                                        name={attribute.name}
                                        key={index}
                                        className={thisButtomsSelected.find(el => el.thisItemId === item.id && el.thisItemName === attribute.name) ? 'attribute-button-selected' : 'attribute-button'}
                                        style={thisButtomsSelected.find(el => el.thisItemId === item.id && el.thisItemName === attribute.name) && attribute.type === "swatch" ? { background: item.value, opacity: 0.2 } : { background: item.value }}
                                        onClick={onAttributeClick}
                                    >

                                        {attribute.type === "swatch" ? "" : item.displayValue}

                                    </button>
                                </li>
                            ))}
                        </ul>

                    </div>
                ))}
            </div>

            <div>
                <p id="pdp-price-text">PRICE:</p>
                <p id="pdp-price-lable">{data.product.prices[pCurrencyPdp].currency.symbol}{data.product.prices[pCurrencyPdp].amount}</p>
            </div>

            <br />
            {data.product.inStock ?
                <button className="add-to-cart-button" onClick={onAddToCartClick}>
                    <h1 id="add-to-cart-text">ADD TO CART</h1>
                </button>
                : <button className="add-to-cart-button" style={{ background: "rgba(57, 55, 72, 0.22)" }} onClick={console.log("OUT OF STOCK")}>
                    <h1 id="add-to-cart-text">OUT OF STOCK</h1>
                </button>
            }

            <br />
            <div id="pdp-description" dangerouslySetInnerHTML={{ __html: data.product.description }} />
            <br />
        </div >
    )
}