import { gql } from '@apollo/client';


export const USER_REGISTER = gql`
mutation UserRegister(
  $secret: String!
    $phone: String!
  ) {
  userRegister(phone: $phone, secret: $secret) {
    id
    id_token
    refresh_token
  }
}`;
export const USER_LOGIN = gql`
mutation UserLogin(
  $secret: String!
  $phone: String!
  ) {
  userLogin(phone: $phone, secret: $secret) {
    id
    id_token
    refresh_token
  }
}`;

export const UPDATE_USER = gql`
mutation updateUser($id: String!, $payload: user_update_payload) {
  updateUser(_id: $id, payload: $payload) {
    id
    data {
      body
      email
      first_name
      phone
    }
  }
}`;
