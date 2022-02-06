import {gql} from "@apollo/client";

export const GET_POSTS = gql`
query Posts {
  posts {
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
 }
`;

export const GET_POST = gql`
query Posts($id: String!) {
  post(_id: $id) {
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
}
`;