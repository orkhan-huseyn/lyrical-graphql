import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import fetchSongQuery from '../queries/fetchSong';

class SongDetail extends React.Component {
  render() {
    const { song, loading } = this.props.data;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h2>{song.title}</h2>
        <ul className="collection">
          {song.lyrics.map(lyric => (
            <li key={lyric.id} className="collection-item">
              {lyric.content}
            </li>
          ))}
        </ul>
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

const options = props => {
  return {
    variables: { id: props.params.id }
  };
};

export default graphql(fetchSongQuery, { options })(SongDetail);
