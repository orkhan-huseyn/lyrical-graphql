import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongDetail extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h2>Song details</h2>
      </div>
    );
  }
}

const query = gql`
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

const options = props => {
  return {
    variables: { id: props.params.id }
  };
};

export default graphql(query, { options })(SongDetail);
