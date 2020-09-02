import gql from "graphql-tag";

// export const LOGGED_IN_USER = gql`
//   query {
//     me {
//       name
//     }
//   }
// `;

export const LOGGED_IN_USER = gql`
  query {
    user(id: 1) {
      name
      email
      is_admin
    }
  }
`;
