import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSongQuery from '../queries/fetchSong';

class LyricList extends React.Component {
  likeLyric(id) {
    this.props.mutate({
      variables: {
        id
      },
      refetchQueries: [
        { query: fetchSongQuery, variables: { id: this.props.songId } }
      ]
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.props.list.map(lyric => (
          <li key={lyric.id} className="collection-item">
            {lyric.content}
            <span className="new badge" data-badge-caption="likes">
              {lyric.likes}
            </span>
            <button
              onClick={() => this.likeLyric(lyric.id)}
              title="Like this lyric"
              className="btn secondary-content"
            >
              <i className="material-icons">thumb_up</i>
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

const mutation = gql`
  mutation likeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(LyricList);
