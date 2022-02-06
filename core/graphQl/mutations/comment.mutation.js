import {gql} from "@apollo/client";

export const CREATE_COMMENT = gql`
mutation create($payload: comment_create_payload!, $connect: comment_input_connection_payload) {
  createComment(payload: $payload, connect: $connect) {
    id
    data {
      body
    }
    post {
      id
      data {
        title
      }
    }
  }
}`;
export const UPDATE_COMMENT = gql`
mutation update($id: String!, $connect: comment_input_connection_payload, $payload: comment_update_payload) {
  updateComment(_id: $id, connect: $connect, payload: $payload) {
    data {
      body
    }
    id
    post {
      id
      data {
        title
      }
    }
  }
}`;