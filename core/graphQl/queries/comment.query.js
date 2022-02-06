import {gql} from "@apollo/client";

export const GET_COMMENTS = gql`
query getComments {
  comments {
    id
    post {
      id
    }
    data {
      body
    }
  }
}
`;

export const GET_COMMENT = gql`
query getComment($id: String!) {
  comment(_id: $id) {
    id
    post {
      id
      data {
        title
      }
    }
    data {
      body
    }
  }
}
`;