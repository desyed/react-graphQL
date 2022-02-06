import {gql} from "@apollo/client";

export const CREATE_POST = gql`
mutation CreatePost($payload: post_create_payload!, $connect: post_input_connection_payload, $status: STATUS_TYPE_ENUM) {
  createPost(payload: $payload, connect: $connect, status: $status) {
    id
    data {
      body {
        html
        markdown
        text
      }
      title
    }
    comments {
      id
      data {
        body
      }
    }
  }
}`;

export const UPDATE_POST = gql`
mutation updatePost( $id: String!, $payload: post_update_payload, $connect: post_input_connection_payload,$disconnect: post_input_disconnection_payload) {
  updatePost(_id: $id, payload: $payload, connect: $connect, disconnect: $disconnect) {
    id
    data {
      title
      body {
        html
        markdown
        text
      }
    }
    comments {
      data {
        body
      }
      id
    }
  }
}`;