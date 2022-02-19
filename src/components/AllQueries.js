import {
  gql
} from "@apollo/client";

export const PLP = gql`
  query Categories($ChooseCategory: CategoryInput) {
    category(input: $ChooseCategory) {
        products{ id name gallery inStock brand
        attributes{ id }
        prices{
          currency{ symbol }
          amount
        }
    }}}`

export const GET_ALL_CATEGORIES = gql`
    query{
        categories{ name }
    }`

export const GET_CURRENCIES = gql`
{
  currencies{
    label
    symbol
    }
  }`

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

export const GET_IMG = gql`
query($id: String!){
    product(id: $id){
        gallery
    }
  }`


