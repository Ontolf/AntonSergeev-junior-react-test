import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useReactiveVar
} from '@apollo/client';
import { BrowserRouter, Link, Routes, Route, Outlet } from 'react-router-dom';

import './index.css';

import {
  PLP
} from './components/AllQueries';
import Cart from './components/Cart'
import Header, { setCategory } from './components/Header';
import PdpDispl from './components/PDP'
import AddToCart from './components/AddToCart';
import { pickCurrency } from './components/SetCart';
import cartIc from "./Icons/Empty_Cart_White.png"

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
});

function PlpDispl() {
  const category = useReactiveVar(setCategory)
  const pCurrencyPlp = useReactiveVar(pickCurrency)

  const { loading, error, data } = useQuery(PLP,
    {
      variables: {
        "ChooseCategory": { "title": category }
      }
    }
  );

  if (error) return `Error! ${error}`;

  const CheckOnAr = (array) => {
    var val = 0
    array.map(() => val++)
    if (val > 0) {
      return true
    } else { return false }

  }

  const addToCart = e => {
    const thisProductSelected = { thisProductId: e.target.value };
    AddToCart([], thisProductSelected)
  }

  return (
    <div>
      <h2 id="plp-current-category">
        {category}
      </h2>
      <div>
        <div id="plp-list-inside">
          {loading ? <li>Loading...</li>
            : data.category.products.map((products, index) => (
              <div id="plp-li" key={index}>

                {CheckOnAr(products.attributes) ? products.inStock &&
                  <Link to={`/${products.id}`} params={products.id} style={{ textDecoration: 'none' }}>
                    <button id="open-add-to-cart" >
                      <img src={cartIc} alt="cart" style={{ position: "relative", top: "2px", right: "1px" }} />
                    </button>
                  </Link> : products.inStock && <button id="open-add-to-cart" value={products.id} onClick={addToCart}>
                    <img src={cartIc} alt="cart" style={{ position: "relative", top: "2px", right: "1px" }} />
                  </button>
                }

                <Link to={`/${products.id}`} params={products.id} style={{ textDecoration: 'none' }}>

                  <div>

                    {products.inStock ?
                      <div className="plp-container" style={{ height: 338, width: 356, textAlign: "center" }}>
                        <img src={products.gallery[0]} alt="" style={{ maxHeight: "100%", maxWidth: "100%" }} />
                      </div>
                      :
                      <div className="plp-container" style={{ height: 338, width: 356, textAlign: "center" }}>
                        <img src={products.gallery[0]} alt="" style={{ opacity: 0.5, maxHeight: "100%", maxWidth: "100%" }} />
                        <h1 id="out-of-stock">OUT OF STOCK</h1>
                      </div>
                    }

                    {<p id="plp-name-style">{products.name}</p>}

                    {<p id="plp-brand-style">{products.brand}</p>}

                    {<p id="plp-cost-style">{products.prices[pCurrencyPlp].currency.symbol}{products.prices[pCurrencyPlp].amount}</p>}

                  </div>

                </Link>

                <Outlet />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/" element={<PlpDispl />} >
          <Route path=":productId" element={<PdpDispl />} />
        </Route>

        <Route path="cart" element={<Cart />} />

      </Routes>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
