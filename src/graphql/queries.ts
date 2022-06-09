// Here we put queries. Remove next line
import { gql } from '@apollo/client';
const PRODUCTS = gql`
  query GetProducts {
    products {
      items {
        name
        description
        variantList {
          items {
            price
          }
        }

        featuredAsset {
          source
        }
      }
    }
  }
`;
export default PRODUCTS;
