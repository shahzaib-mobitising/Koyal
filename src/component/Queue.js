import React, { Component } from 'react'
import axios from 'axios'
import { withGlobalState } from 'react-globally'
import PlayerMenuQueue from './PlayerMenuQueue'

//import { SortablePane, Pane } from 'react-sortable-pane';



class Queue extends Component {

    constructor(props) {
        super(props)
        this.clickOnTrack = this.clickOnTrack.bind(this)
        this.state = {
            getFromStorage: [],
            oldArray: [],
            albumID: '',
            cacheStory: []
        }

        // localStorage.setItem('testState', JSON.stringify(this.state.weeklyList));
    }

    clickOnTrack = (trackid) => {

        let url = `http://api.koyal.pk/musicapp/?request=get-tracks-react-tracks&id=${trackid}`

        axios.get(url)

            .then(response => {

                // console.log(response.data.Response.Tracks[0].TrackUrl)

                let dataTrack = []
                let respo = response.data.Response.Tracks

                respo.map(data => dataTrack.push(
                    {
                        'file': data['TrackUrl'],
                        'track_id': data['TrackId'],
                        'trackName': data['Name'].split("-").join(" "),
                        'albumId': data['AlbumId'],
                        'albumName': data['Album'].split("_").join(" "),
                        'thumbnailImage': data['ThumbnailImageWeb']
                    }
                ))

                //  console.log(dataTrack)
                if (this.props.globalState.track_exist !== 0) {

                    this.props.setGlobalState({
                        tracks: dataTrack,
                        trackAlbumImage: respo[0].ThumbnailImageWeb,
                        trackAlbumName: respo[0].Album,
                        trackGlobalName: respo[0].Name,
                        queueState: dataTrack
                    })


                } else {
                    this.props.setGlobalState({
                        tracks: dataTrack,
                        trackAlbumImage: respo[0].ThumbnailImageWeb,
                        trackAlbumName: respo[0].Album,
                        trackGlobalName: respo[0].Name,
                        queueState: dataTrack
                    })

                }
            })
            .catch(error => {
                console.log(error)

            })
    }


    componentDidUpdate(prevProps, prevState) {

        let mergeList;

        if (this.state.oldArray.length === 0) {
            mergeList = this.props.TrackData
        } else {
            mergeList = this.state.oldArray.concat(this.props.TrackData)

        }


        // console.log(mergeList)

        if (JSON.parse(localStorage.getItem('queuelist'))) {
            mergeList = JSON.parse(localStorage.getItem('queuelist')).concat(this.props.TrackData)
        }

        const uniqueList = Array.from(new Set(mergeList.map(a => a.track_id)))
            .map(track_id => {
                return mergeList.find(a => a.track_id === track_id)
            })

        if (this.props.QueueData[0].albumId !== this.state.albumID) {

            this.setState({
                albumID: this.props.QueueData[0].albumId,
                oldArray: uniqueList
            })

            localStorage.setItem('queuelist', JSON.stringify(this.state.oldArray));

        } else {
            localStorage.setItem('queuelist', JSON.stringify(this.state.oldArray));
        }

    }

    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    render() {


        let cacheStory = JSON.parse(localStorage.getItem('queuelist'))
        let orignalTracks = this.state.oldArray
        let finalList;
        //console.log(cacheStory)

        if (orignalTracks.length === 0) {
            finalList = cacheStory
        } else {
            finalList = orignalTracks
        }

        return (
            <>
                {/* <div className="queueDrawer">
                    <div className="queueWrapper">
                        <div className="queueTopBar"><h4>QUEUE</h4></div>
                        <div className="queueMiddleBar">
                            <ul className="scrollQue">
                                <h3 className="nwplyng">Now Playing</h3>
                                {
                                    cacheStory === null ? <>No Data</> :
                                        finalList.map(val => (
                                            <li className="queueTrackList" key={val.track_id} data-id={val.track_id} onClick={() => this.clickOnTrack(val.track_id)}>
                                                <div className="trackItem">

                                                    <div style={{ backgroundImage: `url('${val.thumbnailImage}')` }} className="trackImage">
                                                        <img src={val.thumbnailImage} alt={val.trackName} />
                                                    </div>
                                                    <div className="trackMeta">

                                                        <div className="metaNames">
                                                            <h5>{val.trackName}</h5>
                                                            <p>{val.albumName} </p>
                                                        </div>
                                                        <div className="cancelQueTrack">


                                                            <PlayerMenu
                                                                albumImage={val.thumbnailImage}
                                                                trackName={val.trackName}
                                                                albumName={val.albumName}
                                                                artistName={val.albumName}
                                                                pageURL={window.location.href}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>))
                                }
                            </ul>


                        </div>
                    </div>
                </div>
            */}

                <div className="queueDrawer">
                    <div className="queueWrapper">
                        <div className="queueTopBar">
                            {/* <h4>QUEUE</h4> */}
                            {/* <h3 className="nwplyng">Now Playing</h3> */}
                        </div>

                        <div className="queueMiddleBar">
                            <ul className="scrollQue">
                                {cacheStory === null ? (
                                    <>No Data</>
                                ) : (
                                        finalList.map(val => (
                                            <li
                                                className="queueTrackList"
                                                key={val.track_id}
                                                data-id={val.track_id}
                                                onClick={() => this.clickOnTrack(val.track_id)}
                                            >


                                                <div className="trackItem">
                                                    <div
                                                        style={{
                                                            backgroundImage: `url('${val.thumbnailImage}')`
                                                        }}
                                                        className="trackImage"
                                                    >
                                                        <img src={val.thumbnailImage} alt={val.trackName} />

                                                    </div>

                                                    <div className="trackMeta">
                                                        <div className="metaNames">
                                                            <h5>{val.trackName}</h5>
                                                            <p>{val.albumName} </p>
                                                        </div>
                                                        <div className="cancelQueTrack">
                                                            <i className="material-icons cancel_button_css"> cancel </i>
                                                            <PlayerMenuQueue
                                                                albumImage={val.thumbnailImage}
                                                                trackName={val.trackName}
                                                                albumName={val.albumName}
                                                                artistName={val.albumName}
                                                                pageURL={window.location.href}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                        ))
                                    )}
                            </ul>

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default withGlobalState(Queue)