import React from 'react';
import {TrackList} from '../TrackList/TrackList';
import './Playlists.css';


export class Playlists extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(e){
        this.props.onNameChange(e.target.value);
    }
    render() {
        return (
            <div className="Playlists">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
                {/* <!-- Add a TrackList component --> */}
<TrackList 
tracks={this.props.playlistTracks}
onRemove={this.props.onRemove}
isRemoval={true}
/>


                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}