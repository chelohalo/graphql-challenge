import { gql } from '@apollo/client';
const PRODUCTS = gql`
query GetProducts {
  products {
    items {
      variants {
        id
        name
      }
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
