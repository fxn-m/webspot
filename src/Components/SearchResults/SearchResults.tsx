import React from 'react';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';

interface IProps {
  searchResults?: { name: string, artist: string, album: string, id: string, uri: string }[],
  onAdd: (track: { name: string, artist: string, album: string, id: string, uri: string }) => void;
}

interface IState {
}

export class SearchResults extends React.Component<IProps, IState> {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
      </div>
    );
  }
}