import {gql} from "@apollo/client";

export const GET_USERS = gql`
query Users($status: STATUS_TYPE_ENUM) {
  users(status: $status) {
    id
    data {
      phone
      first_name
      email
      body
    }
  }
}`;

export const FIND_USER = gql`
query User($status: STATUS_TYPE_ENUM, $where: Users_input_where_payload) {
  users(status: $status, where: $where) {
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