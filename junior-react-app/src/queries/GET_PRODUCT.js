import {gql} from "@apollo/client";

export const GET_PRODUCT = gql`
  query($id: String!){
    product(id: $id){
      id
      name
      gallery
      description
      brand
      inStock
      prices{
          currency{ symbol }
          amount
        }   
      attributes{
          id
          name
          type
          items{
              displayValue
              value
              id
             }
      }
    }
  }`
