import CartOverview from "./CartOverview";
import Header from "./Header";

export default function Cart() {
  return (
    <main>
      <Header />
      <div>

        <h2 id='cart-txt'>Cart</h2>
        <hr id="cart-hr" />

        <div id="cart-hold">
          <CartOverview />
        </div>

      </div>
    </main>
  );
}