import React from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import fetchSongsQuery from '../queries/fetchSongs';
import gql from 'graphql-tag';

class SongList extends React.Component {
  deleteSong(songId) {
    this.props
      .mutate({
        variables: {
          id: songId
        }
      })
      .then(() => {
        this.props.data.refetch();
      });
  }

  getSongDetails(id) {
    hashHistory.push(`/songs/${id}`);
  }

  renderSongs() {
    const { songs, loading } = this.props.data;
    if (loading) {
      return <li className="collection-item">Loading...</li>;
    }
    return songs.map(song => (
      <li className="collection-item" key={song.id}>
        {song.title}
        <button
          onClick={() => this.getSongDetails(song.id)}
          title="Show song details"
          className="btn secondary-content"
        >
          Details <i className="material-icons right">remove_red_eye</i>
        </button>
        <button
          onClick={() => this.deleteSong(song.id)}
          title="Delete this song"
          className="btn secondary-content"
        >
          Delete <i className="material-icons right">delete</i>
        </button>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongsQuery)(SongList));
