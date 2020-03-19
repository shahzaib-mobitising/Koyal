import React, { Component } from 'react'
import { withGlobalState } from 'react-globally'
import PlayerMenuQueue from './PlayerMenuQueue'
import { LazyImage } from "react-lazy-images";

class Queue extends Component {

    constructor(props) {
        super(props)

        this.clickOnTrack2 = this.clickOnTrack2.bind(this)
        this.removeQueueSong = this.removeQueueSong.bind(this)
        this.state = {
            getFromStorage: [],
            oldArray: [],
            albumID: '',
            cacheStory: []
        }
        // console.log('From Constructor')
        // console.log(JSON.parse(localStorage.getItem('queuelist')))

        if (localStorage.getItem('playlist') !== null) {
            //console.log(true)
            let dataTrack = []
            let respo = JSON.parse(localStorage.getItem('playlist'))

            respo.map(data => dataTrack.push(
                {
                    'file': data['file'],
                    'track_id': data['track_id'],
                    'trackName': data['trackName'],
                    'albumId': data['albumId'],
                    'albumName': data['albumName'],
                    'thumbnailImage': data['thumbnailImage'],
                    'rbtTelenor': data['rbtTelenor'],
                    'albumArtist': data['albumArtist'],
                    'trackURL': data['trackURL'],
                    'MobilinkCode': data['MobilinkCode'],
                    'ZongCode': data['ZongCode'],
                    'UfoneCode': data['UfoneCode'],
                    'TelenorCode': data['TelenorCode']
                }
            ))

            //console.log(dataTrack)
            if (this.props.globalState.track_exist !== 0) {

                this.props.setGlobalState({
                    tracks: dataTrack,
                    trackAlbumImage: respo[0].thumbnailImage,
                    trackAlbumName: respo[0].albumName,
                    trackGlobalName: respo[0].trackName,
                    queueState: dataTrack
                })

            } else {
                this.props.setGlobalState({
                    tracks: dataTrack,
                    trackAlbumImage: respo[0].thumbnailImage,
                    trackAlbumName: respo[0].albumName,
                    trackGlobalName: respo[0].trackName,
                    queueState: dataTrack
                })
            }
        } else {

            //console.log(false)
        }

    }

    removeQueueSong = (trackid) => {

        let localData = JSON.parse(localStorage.getItem('queuelist'))

        let newQue = []


        localData.map((data, i) => {

            if (data.track_id === trackid) {

                //console.log('Same track not inserted')

            } else {

                newQue.push(
                    {
                        'file': data['file'],
                        'track_id': data['track_id'],
                        'trackName': data['trackName'],
                        'albumId': data['albumId'],
                        'albumName': data['albumName'],
                        'thumbnailImage': data['thumbnailImage'],
                        'rbtTelenor': data['rbtTelenor'],
                        'albumArtist': data['albumArtist'],
                        'trackURL': data['trackURL'],
                        'MobilinkCode': data['MobilinkCode'],
                        'ZongCode': data['ZongCode'],
                        'UfoneCode': data['UfoneCode'],
                        'TelenorCode': data['TelenorCode']
                    })

                // console.log('Data Inserted')
            }
        })

        localStorage.clear();


        localStorage.setItem('queuelist', JSON.stringify(newQue));

        this.setState({
            oldArray: JSON.parse(localStorage.getItem('queuelist'))
        })

     //   console.log(this.state.oldArray)

    }

    clickOnTrack2 = (trackid, trackName, imageT, Album) => {


        let dataTrack2 = JSON.parse(localStorage.getItem('queuelist'))

        let trackOrder = []
        let trackDataSort = []

        for (let index = trackid; index < dataTrack2.length; index++) {
            trackOrder.push(index)
        }

        for (let x = 0; x < trackid; x++) {
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

        // console.log(this.props.globalState)

        this.props.setGlobalState(
            {
                tracks: trackDataSort,
                trackAlbumImage: imageT,
                trackAlbumName: Album,
                trackGlobalName: trackName,
                queueState: trackDataSort
            }
        )

        // localStorage.clear();


        localStorage.setItem('playlist', JSON.stringify(trackDataSort));

        // this.setState({
        //     oldArray: JSON.parse(localStorage.getItem('queuelist'))
        // })

    }


    componentDidUpdate(prevProps, prevState) {

        let mergeList;

        if (this.state.oldArray.length === 0) {
            mergeList = this.props.TrackData
        } else {
            mergeList = this.state.oldArray.concat(this.props.TrackData)

        }


        if (JSON.parse(localStorage.getItem('queuelist'))) {
            mergeList = JSON.parse(localStorage.getItem('queuelist')).concat(this.props.TrackData)
        }

        const uniqueList = Array.from(new Set(mergeList.map(a => a.track_id)))
            .map(track_id => {
                return mergeList.find(a => a.track_id === track_id)
            })

        // console.log(`Queue` + this.props.QueueData[0].albumId)
        // console.log(`Album ID` + this.state.albumID)

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
                <div className="queueDrawer">
                    <div className="queueWrapper">
                        <div className="queueTopBar">
                            {/* <h4>QUEUE</h4> */}
                            <div className="nwplyng">Now </div>
                            {/* <div className="nwplyng2">Now Playing </div> */}
                            <div className="divider_queue">

                            </div>
                        </div>
                        <div className="queueMiddleBar">
                            <ul className="scrollQue">
                                {cacheStory === null ? (
                                    <li className="text-center">No Data</li>
                                ) : (

                                        finalList.map((val, index) => (
                                            <li
                                                className="queueTrackList"
                                                key={val.track_id}
                                                data-id={val.track_id}
                                            >
                                                <div className="trackItem">
                                                    <div
                                                        style={{
                                                            backgroundImage: `url('${val.thumbnailImage}')`
                                                        }}
                                                        className="trackImage">

                                                        <LazyImage
                                                            onClick={() => this.clickOnTrack2(index, val.trackName, val.thumbnailImage, val.albumName)}
                                                            src={val.thumbnailImage}
                                                            alt={val.trackName}
                                                            debounceDurationMs={0}
                                                            placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                                                            actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={val.trackName} />)} />

                                                        {/* <i aria-hidden="true" className="pause circular icon"></i> */}

                                                    </div>

                                                    <div className="trackMeta">
                                                        <div className="metaNames">
                                                            <h5>{val.trackName}</h5>
                                                            <p>{val.albumName} </p>
                                                        </div>
                                                        <div className="cancelQueTrack">
                                                            {
                                                                this.props.globalState.track_exist === val.track_id ?
                                                                    <p></p> :
                                                                    <i
                                                                        onClick={() => this.removeQueueSong(val.track_id)}
                                                                        className="material-icons cancel_button_css"> cancel </i>
                                                            }
                                                            <PlayerMenuQueue
                                                                componentName={'RBT From Queue'}
                                                                albumImage={val.thumbnailImage}
                                                                trackName={val.trackName}
                                                                albumName={val.albumName}
                                                                artistName={val.albumArtist}
                                                                pageURL={window.location.href}
                                                                MobilinkCode={val.MobilinkCode}
                                                                TelenorCode={val.TelenorCode}
                                                                UfoneCode={val.UfoneCode}
                                                                ZongCode={val.ZongCode}
                                                                OrgTrackUrl={val.trackURL}
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