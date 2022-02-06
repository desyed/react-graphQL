import {gql} from "@apollo/client";

export const CREATE_POST = gql`
mutation CreatePost($payload: post_create_payload!) {
  createPost(payload: $payload) {
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
mutation CreatePost( $id: String!, $payload: post_update_payload) {
  updatePost(_id: $id, payload: $payload) {
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