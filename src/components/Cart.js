
import React from "react";
import CartOverview from "./CartOverview";

export default function Cart() {

  return (
    <main>
      <h2 id='cart-txt'>Cart</h2>
      <hr id="cart-hr" />

      <div id="cart-hold">
        <CartOverview />
      </div>
    </main>
  )
}