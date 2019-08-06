import React, { Component } from 'react'
import ReactJWPlayer from 'react-jw-player';
import { withGlobalState } from 'react-globally'
//import { Link } from "react-router-dom";

class Player extends Component {

    constructor(props) {
        super(props)

        this.onVideoLoad = this.onVideoLoad.bind(this);
        // this.onReady = this.onReady.bind(this);
    }

    onVideoLoad(event) {

        this.props.setGlobalState({
            track_exist: event.item.track_id,
            trackGlobalName: event.item.trackName
        })

        console.log(event)

    }

    // onReady(event) {
    // this.props.setGlobalState({
    //     trackAlbumImage: this.props.TrackImage,
    //     trackAlbumName: this.props.TrackAlbumsName,
    //     trackGlobalName: this.props.TrackName,
    // })
    //  console.log(event)
    //}

    render() {

        return (
            <div className="myAudioPlayer">

                <ReactJWPlayer
                    playerId='MyPlayer'
                    playerScript='https://cdn.jwplayer.com/libraries/PYG4ZTcd.js'
                    playlist={this.props.TrackData}
                    isMuted={true}
                    aspectRatio='inherit'
                    onVideoLoad={this.onVideoLoad}
                //  onReady={this.onReady}
                />


                <div className="audioPlayerImage">
                    <img src={this.props.TrackImage} alt={this.props.TrackImageName} />
                    <p> {this.props.TrackName.split("-").join(" ")}  <br />{this.props.TrackAlbumsName}</p>
                </div>

            </div>
        )
    }
}

export default withGlobalState(Player)
