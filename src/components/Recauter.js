import { makeVar } from "@apollo/client";
import { curCart } from "./SetCart";

export var inCartAmount = makeVar();

export default function Recaunter() {
    var countEl = 0
    curCart.forEach((el) => { countEl += el.quantity });
    inCartAmount(countEl)
}