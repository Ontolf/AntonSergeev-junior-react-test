import {gql} from "@apollo/client";

export const GET_CURRENCIES = gql`
{
  currencies{
    label
    symbol
    }
  }`