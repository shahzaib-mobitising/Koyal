import React, { Component } from 'react'
import ReactJWPlayer from 'react-jw-player';
import { withGlobalState } from 'react-globally'
import Grid from '@material-ui/core/Grid';
import PlayerMenu from './PlayerMenu';
import DownloadTrack from './DownloadTrack';
import { Link } from "react-router-dom";
import Radio from './Radio';


class Player extends Component {

    constructor(props) {
        super(props)
        this.onVideoLoad = this.onVideoLoad.bind(this);


        this.state = {

        }
    }


    onVideoLoad(event) {

        this.props.setGlobalState({
            track_exist: event.item.track_id,
            trackGlobalName: event.item.trackName,
            trackAlbumImage: event.item.thumbnailImage,
            trackAlbumName: event.item.albumName
        })

        let dataTrack2 = this.props.TrackData

        let trackOrder = []
        let trackDataSort = []

        for (let index = event.index; index < this.props.TrackData.length; index++) {
            trackOrder.push(index)
        }

        for (let x = 0; x < event.index; x++) {
            trackOrder.push(x)
        }


        for (let y = 0; y < trackOrder.length; y++) {
            trackDataSort.push(
                {
                    'file': dataTrack2[trackOrder[y]]['file'],
                    'track_id': dataTrack2[trackOrder[y]]['track_id'],
                    'trackName': dataTrack2[trackOrder[y]]['trackName'],
                    'albumId': dataTrack2[trackOrder[y]]['albumId'],
                    'albumName': dataTrack2[trackOrder[y]]['albumName'],
                    'thumbnailImage': dataTrack2[trackOrder[y]]['thumbnailImage'],
                    'rbtTelenor': dataTrack2[trackOrder[y]]['rbtTelenor'],
                    'albumArtist': dataTrack2[trackOrder[y]]['albumArtist'],
                    'trackURL': dataTrack2[trackOrder[y]]['trackURL'],
                    'MobilinkCode': dataTrack2[trackOrder[y]]['MobilinkCode'],
                    'ZongCode': dataTrack2[trackOrder[y]]['ZongCode'],
                    'UfoneCode': dataTrack2[trackOrder[y]]['UfoneCode'],
                    'TelenorCode': dataTrack2[trackOrder[y]]['TelenorCode']
                })
        }

        localStorage.setItem('playlist', JSON.stringify(trackDataSort));
    }



    render() {



        let trackIdforLike = 0
        let albumIdforLike = 0
        let imageForShare = 0
        let trackNameforlike = 0
        let rbtCode = 0
        let artistForShare = 0
        let albumNameforLike = 0
        let MobilinkCode = 0
        let UfoneCode = 0
        let ZongCode = 0
        let TelenorCode = 0
        let trackURL = ''


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
            MobilinkCode = this.props.TrackData[0].MobilinkCode
            UfoneCode = this.props.TrackData[0].UfoneCode
            ZongCode = this.props.TrackData[0].ZongCode
            TelenorCode = this.props.TrackData[0].TelenorCode
            trackURL = this.props.TrackData[0].trackURL

        }

        // console.log(this.props.globalState)


        return (
            <div className="myAudioPlayer playerresponsive">

                {this.props.TrackData.length === 0
                    ?
                    <></>
                    :
                    <Grid container spacing={0} className="playerGrid1">
                        <Grid item xs={6} sm={2}>
                            <div className="audioPlayerImage">
                                <Link to={`/track/` + trackIdforLike + `/` + trackNameforlike}>
                                    <img src={this.props.TrackImage} alt={this.props.TrackImageName} />
                                </Link>
                                <ul>
                                    <li className="playerTrackName">

                                        <Link to={`/track/` + trackIdforLike + `/` + trackNameforlike}>
                                            {this.props.globalState.trackGlobalName}

                                        </Link>
                                    </li>
                                    <li className="playerAlbumName">
                                        {/* {this.props.TrackAlbumsName} */}
                                        <Link to={`/track/` + trackIdforLike + `/` + trackNameforlike}>
                                            {this.props.globalState.trackAlbumName}
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8} className="playerGrid2">
                            <ReactJWPlayer
                                playerId='MyPlayer'
                                playerScript='https://cdn.jwplayer.com/libraries/PYG4ZTcd.js'
                                playlist={this.props.TrackData}
                                isMuted={false}
                                aspectRatio='inherit'
                                onVideoLoad={this.onVideoLoad}
                            />
                        </Grid>
                        <Grid item xs={6} sm={2} className="playerGrid3 startRadio">
                            <div className="playerOptions bottom_layer downloadPlayeroption">
                                <ul>
                                    <li className="downloadImagePlayer">
                                        <DownloadTrack
                                            trackURL={trackURL}
                                            albumImage={imageForShare}
                                            trackName={trackNameforlike}
                                            albumName={albumNameforLike}
                                            artistName={artistForShare}
                                            pageURL={window.location.href}
                                            TrackId={trackIdforLike}
                                            Albumid={albumIdforLike}
                                            RBTCodes={
                                                [
                                                    {
                                                        'code': 0,
                                                        'name': 'Telenor'
                                                    },
                                                    {
                                                        'code': UfoneCode,
                                                        'name': 'Ufone'
                                                    },
                                                    {
                                                        'code': ZongCode,
                                                        'name': 'Zong'
                                                    },
                                                    {
                                                        'code': MobilinkCode,
                                                        'name': 'Mobilink'
                                                    }
                                                ]
                                            }
                                        />
                                    </li>
                                    <li className="menuIconPlayer">
                                        <PlayerMenu
                                            albumImage={imageForShare}
                                            trackName={trackNameforlike}
                                            albumName={albumNameforLike}
                                            artistName={artistForShare}
                                            pageURL={window.location.href}
                                            MobilinkCode={MobilinkCode}
                                            TelenorCode={TelenorCode}
                                            UfoneCode={UfoneCode}
                                            ZongCode={ZongCode}
                                            OrgTrackUrl={trackURL}
                                            TrackId={trackIdforLike}
                                            Albumid={albumIdforLike}
                                        />
                                    </li>
                                    <li className="menuIconRadio">

                                        <Radio />
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
