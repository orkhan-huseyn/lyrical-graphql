import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId
        }
      })
      .then(() => {
        this.setState({ content: '' });
      });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit.bind(this)}>
        <label htmlFor="lyricContent"> Lyric</label>
        <input
          type="text"
          id="lyricContent"
          placeholder="Type lyrics and press enter..."
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation addLyric($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
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

export default graphql(mutation)(LyricCreate);
