import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

interface IProps {
    tracks?: { name: string, artist: string, album: string, id: string, uri: string }[];
    onAdd?: (track: { name: string, artist: string, album: string, id: string, uri:string }) => void;
    onRemove?: (track: { name: string, artist: string, album: string, id: string, uri:string }) => void;
    isRemoval?: boolean;
}

interface IState {
}

export class TrackList extends React.Component<IProps, IState> {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks && this.props.tracks?.map(track => {
                    return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
                })}
            </div>
        );
    }
}