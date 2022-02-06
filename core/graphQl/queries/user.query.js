import {gql} from "@apollo/client";

export const GET_USERS = gql`
query getUsers {
  users {
    id
    data {
      first_name
    }
  }
}`;

export const GET_USER = gql`
query User($id: String!) {
  user(_id: $id) {
    id
    data {
      avatar {
        file_name
        id
        url
      }
      body
      email
      first_name
      phone
    }
  }
}`;