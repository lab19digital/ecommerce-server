import gql from "graphql-tag";
export const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    logIn(input: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
        is_admin
      }
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

export const REGISTER_USER = gql`
  mutation createAccount(
    $name: String!
    $email: String!
    $password: String!
    $is_admin: Boolean
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      is_admin: $is_admin
    ) {
      token
    }
  }
`;

export const UPDATE_PRODUCT_IMAGES = gql`
  mutation($product_id: String!, $images: []) {
    updateProductImages(product_id: ' . $product_id . ', images: $images){
      product {
          id
          images {
              id
              url
          }
      }
    } 
  }
`;
