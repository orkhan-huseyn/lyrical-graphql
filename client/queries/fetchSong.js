import gql from 'graphql-tag';

export default gql`
  query getSongDetails($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;
