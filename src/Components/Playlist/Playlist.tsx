import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

interface IProps {
    playlistName: string;
    playlistTracks?: {name:string, artist:string, album:string, id:string}[];
    onRemove?: (track:{name:string, artist:string, album:string, id:string}) => void;
    onNameChange?: (name:string) => void;
}

interface IState {
}

export class Playlist extends React.Component<IProps, IState> {
    constructor(props:IProps) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event:React.ChangeEvent<HTMLInputElement>) {
        this.props.onNameChange && this.props.onNameChange(event.target.value);
    }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/> 
        <TrackList tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove}/>
        <button className="Playlist-save">SAVE TO SPOTIFY</button>    
      </div>
    );
  }
}