import Recaunter from "./Recauter";
import { curCart, cartAr } from "./SetCart";

export default function AddToCart(thisButtonsAr, thisProductSel) {

    const newProduct = (
        {
            ...thisProductSel,
            attributes: [...thisButtonsAr],
            quantity: 1,
            price: 0,
            symbol: 0,
            gallery: 0,
            brand: 0,
        })

    const allAtributes = newProduct.attributes.length
    var tempAr = curCart

    if (allAtributes === 0) {

        const exist = tempAr.find(el => el.thisProductId === newProduct.thisProductId)

        if (exist) {
            tempAr.find(el => el.thisProductId === newProduct.thisProductId ? el.quantity += 1 : "")
        } else {
            tempAr[tempAr.length] = newProduct

        }

    } else {

        const exist = tempAr.find(el => {
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
            tempAr.find(el => {
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
            tempAr[tempAr.length] = newProduct
        }
    }

    cartAr(tempAr)

    Recaunter()

    localStorage.setItem("CurCartProducts", JSON.stringify(tempAr))
}