import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongQuery from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

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
        <LyricList list={song.lyrics} songId={this.props.params.id} />
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
