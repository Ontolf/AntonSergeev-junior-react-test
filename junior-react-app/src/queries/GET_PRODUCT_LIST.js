import {gql} from "@apollo/client";

export const GET_PRODUCT_LIST = gql`
  query Categories($ChosenCategory: CategoryInput) {
    category(input: $ChosenCategory) {
        products{
        id
        name 
        gallery
        inStock 
        brand
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
        prices{
          currency{ symbol }
          amount
        }
    }
  }
}`