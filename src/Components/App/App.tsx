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
  playlistTracks?: { name: string, artist: string, album: string, id: string, uri: string }[];
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      searchResults: [
        { name: 'name1', artist: 'artist1', album: 'album1', id: 'id1', uri: 'uri1' },
        { name: 'name2', artist: 'artist2', album: 'album2', id: 'id2', uri: 'uri2' },
        { name: 'name3', artist: 'artist3', album: 'album3', id: 'id3', uri: 'uri3' },
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        { name: 'name4', artist: 'artist4', album: 'album4', id: 'id4', uri: 'uri1' },
        { name: 'name5', artist: 'artist5', album: 'album5', id: 'id5', uri: 'uri2' },
        { name: 'name6', artist: 'artist6', album: 'album6', id: 'id6', uri: 'uri3' },
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
    this.setState({ playlistTracks: this.state.playlistTracks?.filter(playlistTrack => track.id !== playlistTrack.id)});
  }

  updatePlaylistName(name: string) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    // const trackURIs = this.state.playlistTracks?.map(track => track.id);
  }

  search(term: string) {
    console.log(term);
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
