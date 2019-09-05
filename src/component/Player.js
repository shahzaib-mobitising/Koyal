import React, { Component } from 'react'
import ReactJWPlayer from 'react-jw-player';
import { withGlobalState } from 'react-globally'
import Grid from '@material-ui/core/Grid';
import PlayerMenu from './PlayerMenu';



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

        let trackIdforLike = 0
        let albumIdforLike = 0
        let imageForShare = 0
        let trackNameforlike = 0
        let rbtCode = 0
        let artistForShare = 0
        let albumNameforLike = 0


        if (this.props.TrackData.length === 0) {
            trackIdforLike = 1
        } else {
            trackIdforLike = this.props.TrackData[0].track_id
            albumIdforLike = this.props.TrackData[0].albumId
            albumNameforLike = this.props.TrackData[0].albumName
            imageForShare = this.props.TrackData[0].thumbnailImage
            trackNameforlike = this.props.TrackData[0].trackName
            rbtCode = this.props.TrackData[0].rbtTelenor
            artistForShare = this.props.TrackData[0].albumArtist

        }

        return (
            <div className="myAudioPlayer">

                {this.props.TrackData.length === 0
                    ?
                    <></>
                    :
                    <Grid container spacing={0} className="playerGrid1">
                        <Grid item xs={2}>
                            <div className="audioPlayerImage">
                                <img src={this.props.TrackImage} alt={this.props.TrackImageName} />
                                <ul>
                                    <li className="playerTrackName"> {this.props.TrackName} </li>
                                    <li className="playerAlbumName">{this.props.TrackAlbumsName} </li>
                                </ul>

                            </div>
                        </Grid>
                        <Grid item xs={8} className="playerGrid2">
                            <ReactJWPlayer
                                playerId='MyPlayer'
                                playerScript='https://cdn.jwplayer.com/libraries/PYG4ZTcd.js'
                                playlist={this.props.TrackData}
                                isMuted={true}
                                aspectRatio='inherit'
                                onVideoLoad={this.onVideoLoad}
                            //  onReady={this.onReady}
                            />
                        </Grid>
                        <Grid item xs={2} className="playerGrid3">
                            <div className="playerOptions">
                                <ul>
                                    <li className="downloadImagePlayer">
                                        <img src="/assets/download_white.png" alt='download' />
                                    </li>
                                    <li className="menuIconPlayer">
                                        <PlayerMenu
                                            albumImage={imageForShare}
                                            trackName={trackNameforlike}
                                            albumName={albumNameforLike}
                                            artistName={artistForShare}
                                            pageURL={window.location.href}
                                        />

                                    </li>
                                    <li className="menuIconRadio">
                                        Start Radio
                                </li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>}





            </div>
        )
    }
}

export default withGlobalState(Player)
