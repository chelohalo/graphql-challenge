import { gql } from "@apollo/client";

// Here we put mutations. Remove next line
export const ADD_ITEM_TO_ORDER_MUTATION = gql`
mutation($ID: ID!,$quantity: Int!){
  addItemToOrder(productVariantId: $ID, quantity: $quantity){
  __typename
      ... on Order {
          id,
          state,
          totalQuantity,
          total
      } 
  }
}
`;