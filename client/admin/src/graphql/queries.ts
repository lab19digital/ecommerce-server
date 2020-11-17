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

export const ADMIN_ORDERS = gql`
  query($first: Int!, $page: Int!) {
    adminOrders(
      first: $first
      page: $page
      orderBy: [{ field: "created_at", order: DESC }]
    ) {
      data {
        id
        name
        email
        telephone
        shipping_address_line_1
        shipping_address_line_2
        shipping_address_postcode
        shipping_address_state
        shipping_address_country
        billing_address_line_1
        billing_address_line_2
        billing_address_postcode
        billing_address_state
        billing_address_country
        payment_method
        agree_to_terms
        notes
        created_at
      }
      paginatorInfo {
        total
        hasMorePages
        currentPage
      }
    }
  }
`;

export const ORDER = gql`
  query($id: ID!) {
    order(id: $id) {
      id
      name
      email
      telephone
      shipping_address_line_1
      shipping_address_line_2
      shipping_address_postcode
      shipping_address_state
      shipping_address_country
      billing_address_line_1
      billing_address_line_2
      billing_address_postcode
      billing_address_state
      billing_address_country
      payment_method
      agree_to_terms
      notes
      created_at
      orderTransaction {
        id
        order_id
        status
        transaction_data
        payment_method
      }
    }
  }
`;

export const PRODUCT = gql`
  query($id: ID!) {
    product(id: $id) {
      id
      parent_id
      title
      status
      published
      price_cents
      price_currency
      short_description
      long_description
      created_at
      updated_at
      meta {
        id
        key
        group
        value
      }
      prices {
        value
        currency
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
  }
`;
