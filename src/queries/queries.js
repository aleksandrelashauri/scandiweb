import { gql } from "apollo-boost";

const getCategories = gql`
  {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          name
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

const getProductsQuery = gql`
  {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;
const getProductQuery = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
    }
  }
`;
const getCurrencies = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export {
  getProductsQuery,
  getCategories,
  getProductQuery,
  getCurrencies
};
