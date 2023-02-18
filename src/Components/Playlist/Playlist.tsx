import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

interface IProps {
  playlistName: string;
  playlistTracks?: { name: string, artist: string, album: string, id: string, uri: string }[];
  onRemove?: (track: { name: string, artist: string, album: string, id: string, uri: string }) => void;
  onNameChange?: (name: string) => void;
  onSave?: () => void;
}

interface IState {
}

export class Playlist extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onNameChange && this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input id={'playlistNameField'} defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove} />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}