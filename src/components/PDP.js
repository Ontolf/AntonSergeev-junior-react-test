import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import {
    GET_IMG,
    GET_PRODUCT
} from './AllQueries'
import { pickCurrency, CurCartProducts } from "./Header";

export var thisProductSelected = 0;

export default function PdpDispl() {

    let params = useParams();

    var thisId = params.productId;

    thisProductSelected = { thisProductId: params.productId };

    return (
        <div className="pdp-pop-up">
            <br />
            <div className="pdp-column-holder">
                {GetPdpImgs(thisId)}
                {ShowPdpInformation(thisId)}
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
            <div id="pdp-main-image">
                <img src={data.product.gallery[thisImgOnTop]} alt="" style={{ high: 610, width: 511 }} />
            </div>
        </div>
    )
}

function ShowPdpInformation(productIdInf) {
    const { data, loading, error, refetch } = useQuery(GET_PRODUCT,
        {
            variables: { "id": productIdInf }
        })

    const [thisButtomsSelected, setThisButtomSelected] = useState([]);

    var thisButton = [];

    const onAttributeClick = (e) => {
        thisButton[e.currentTarget.value] = { thisItemId: e.currentTarget.id, thisItemName: e.currentTarget.name }

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
            var temp = [...thisButtomsSelected]

            var newProduct = ({ ...thisProductSelected, attributes: temp, price: 0, quantity: 1 })

            var allAtributes = newProduct.attributes.length

            if (allAtributes === 0) {

                const exist = CurCartProducts.find(el => el.thisProductId === newProduct.thisProductId)

                if (exist) {
                    CurCartProducts.find(el => el.thisProductId === newProduct.thisProductId ? el.quantity += 1 : "")
                } else {
                    CurCartProducts[CurCartProducts.length] = newProduct
                }

            } else {

                const exist = CurCartProducts.find(el => {
                    var counter = 0
                    el.attributes.map(elA =>
                        newProduct.attributes.map(newA =>
                            newA.thisItemId === elA.thisItemId
                                && newA.thisItemName === elA.thisItemName === true ? counter++ : 0
                        )
                    )
                    if (counter === allAtributes) {
                        return el
                    } else return 0;
                })

                if (exist) {
                    CurCartProducts.find(el => {
                        var counter = 0
                        el.attributes.map(elA =>
                            newProduct.attributes.map(newA =>
                                newA.thisItemId === elA.thisItemId
                                    && newA.thisItemName === elA.thisItemName === true ? counter++ : 0
                            )
                        )
                        if (counter === allAtributes) {
                            return el.quantity += 1
                        } else return 0
                    })
                } else {
                    CurCartProducts[CurCartProducts.length] = newProduct
                }
            }

            localStorage.setItem("CurCartProducts", JSON.stringify(CurCartProducts));

            window.location.assign("/")

        } else {
            console.log("CAN'T BE ADDED")
        }
    }

    if (error) return `Error! ${error}`;
    if (loading) return <p>Loading..</p>;

    return (
        <div className="pdp-right-col">

            <Link to="/">
                <button id='exit-to-main-button' onClick={refetch()}>X</button>
            </Link>

            <p id="product-name">{data.product.name}</p>
            <p id="brand-name">{data.product.brand}</p>

            <div>
                {data.product.attributes.map((attribute) => (
                    <div key={data.product.id} >
                        <p className="attribute-name" id={attribute.id}>{attribute.name}:</p>

                        <ul className="choose-attribute-container-ul">
                            {attribute.items.map((item) => (
                                <li className="attributes-list" key={item.id}>
                                    <button
                                        value={item.value}
                                        id={item.id}
                                        name={attribute.name}
                                        className={thisButtomsSelected.find(el => el.thisItemId === item.id && el.thisItemName === attribute.name) ? 'attribute-button-selected' : 'attribute-button'}
                                        style={attribute.type === "swatch" ? { background: item.value } : {}}
                                        onClick={onAttributeClick}
                                    >

                                        {item.displayValue}

                                    </button>
                                </li>
                            ))}
                        </ul>

                    </div>
                ))}
            </div>

            <div>
                <p id="pdp-price-text">PRICE:</p>
                <p id="pdp-price-lable">{data.product.prices[pickCurrency].currency.symbol}{data.product.prices[pickCurrency].amount}</p>
            </div>

            <br />
            <button className="add-to-cart-button" onClick={onAddToCartClick}>
                <h1 id="add-to-cart-text">ADD TO CART</h1>
            </button>

            <br />
            <div id="pdp-description" dangerouslySetInnerHTML={{ __html: data.product.description }} />
            <br />
        </div >
    )
}