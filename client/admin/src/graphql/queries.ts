import gql from "graphql-tag";

export const LOGGED_IN_USER = gql`
  query {
    me {
      id
      name
      email
      is_admin
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logOut {
      success
    }
  }
`;

export const ADMIN_PRODUCTS = gql`
  query($first: Int!, $page: Int!) {
    adminProducts(first: $first, page: $page) {
      data {
        id
        title
        status
        published
        price_cents
        price_currency
        short_description
        long_description
        # created_at
        # updated_at
        meta {
          value
        }
        prices {
          currency
          value
        }
        sizes {
          size
        }
        variants {
          id
        }
        categories {
          title
        }
        dimensions {
          length
          width
          height
          unit
        }
        weight {
          weight
          unit
        }
        images {
          url
          type
          name
        }
        featured_image {
          url
          type
          name
        }
        tags {
          name
        }
        fixedPrices {
          country_code
          price
        }
      }
      paginatorInfo {
        total
        hasMorePages
        currentPage
      }
    }
  }
`;
