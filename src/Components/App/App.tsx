import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

interface IProps {
}

interface IState {
  searchResults?: { name: string, artist: string, album: string, id: string, uri: string }[];
  playlistName: string;
  playlistTracks: { name: string, artist: string, album: string, id: string, uri: string }[];
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      searchResults: [
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track: { name: string, artist: string, album: string, id: string, uri: string }) {
    if (this.state.playlistTracks?.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks?.push(track);
    this.setState({ playlistTracks: this.state.playlistTracks });
  }

  removeTrack(track: { name: string, artist: string, album: string, id: string, uri: string }) {
    this.setState({ playlistTracks: this.state.playlistTracks?.filter(playlistTrack => track.id !== playlistTrack.id) });
  }

  updatePlaylistName(name: string) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
      .then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
      });
  }

  search(term: string) {
    Spotify.search(term).then((results: { name: string, artist: string, album: string, id: string, uri: string }[]) => {
      this.setState({ searchResults: results });
    });
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
