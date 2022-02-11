import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery
} from '@apollo/client';

import { BrowserRouter, Link, Routes, Route, Outlet } from 'react-router-dom';

import './index.css';

import {
  GET_ALL_CATEGORIES,
  PLP
} from './components/AllQueries';
import Cart from './components/Cart'
import Header, { pickCurrency } from './components/Header';
import PdpDispl from './components/PDP'

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
});

function ShowCategories() {
  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);

  if (error) return `Error! ${error}`;

  return (loading
    ? <option disabled value="">Loading...</option>
    : data.categories.map((category) => (
      <option key={category.name} value={category.name}>
        {category.name}
      </option>
    )))

};

function PlpDispl() {
  var [category, setCategory] = useState("all");

  const { loading, error, data } = useQuery(PLP,
    {
      variables: {
        "ChooseCategory": { "title": category }
      }
    }
  );

  const onChange = e => {
    const { value } = e.target;
    setCategory(value)
  };

  if (error) return `Error! ${error}`;

  return (
    <div>
      <select id="plp-choose-category" onChange={onChange}>
        {ShowCategories()}
      </select>
      <div>
        <ul className="plp-list-inside">
          {loading ? <li>Loading...</li>
            : data.category.products.map((products) => (
              <li className="plp-li" key={products.id} value={products.id}>

                {products.inStock ?
                  <div className="plp-container">
                    <img src={products.gallery} alt="" style={{ height: 338, width: 356 }} />

                    <Link to={`/${products.id}`} params={products.id}>
                      <button className="open-add-to-cart">Buy</button>
                    </Link>

                    <Outlet />

                  </div>
                  :
                  <div className="plp-container">
                    <img src={products.gallery} alt="" style={{ opacity: 0.5, height: 338, width: 356 }} />
                    <h1 className="out-of-stock">OUT OF STOCK</h1>
                  </div>
                }

                {<p id="plp-name-style">{products.name}</p>}

                {<p id="plp-cost-style">{products.prices[pickCurrency].currency.symbol}{products.prices[pickCurrency].amount}</p>}

              </li>))}
        </ul>
      </div>
    </div>
  )
}

function MainPage() {

  return (
    <div>
      <Header />
      <PlpDispl />
    </div>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainPage />} >
          <Route path=":productId" element={<PdpDispl />} />
        </Route>

        <Route path="cart" element={<Cart />} />

      </Routes>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
