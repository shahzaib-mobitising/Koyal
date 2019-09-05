import React, { Component } from 'react'
import axios from 'axios'
import { withGlobalState } from 'react-globally'
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
                    })


                } else {
                    this.props.setGlobalState({
                        tracks: dataTrack,
                        trackAlbumImage: respo[0].ThumbnailImageWeb,
                        trackAlbumName: respo[0].Album,
                        trackGlobalName: respo[0].Name,
                    })

                }
            })
            .catch(error => {
                console.log(error)
                this.setState({ errMsg: 'Error Data' })
            })
    }


    componentDidUpdate(prevProps, prevState) {


        let mergeList = this.state.oldArray.concat(this.props.TrackData)

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


        // let cacheStory =  JSON.parse(localStorage.getItem('queuelist'))
        let orignalTracks = this.state.oldArray
        // let finalList ;

        // if(orignalTracks.length === 0){
        //             finalList = cacheStory
        // }else{
        //     finalList = orignalTracks
        // }

        return (
            <>
                <div className="queueDrawer">
                    <div className="queueWrapper">
                        <div className="queueTopBar"><h4>QUEUE</h4></div>
                        <div className="queueMiddleBar">
                            <ul className="scrollQue">
                                {
                                    orignalTracks.map(val => (
                                        <li className="queueTrackList" key={val.track_id} data-id={val.track_id} onClick={() => this.clickOnTrack(val.track_id)}>
                                            <div className="trackItem">
                                                <div style={{ backgroundImage: `url('${val.thumbnailImage}')` }} className="trackImage">
                                                    <img src={val.thumbnailImage} alt={val.trackName} />
                                                    {/* <span className="hoverPlayIcon">  </span> */}
                                                    {/* <i className="material-icons">
                                                    play_circle_filled_white </i> */}
                                                </div>
                                                <div className="trackMeta">
                                                    <h5>{val.trackName}</h5>
                                                    <p>{val.albumName} </p>

                                                </div>
                                                {/* <div className="trackMetaOptions">
                                                <div className="removeTrackBtn">
                                                    <i class="material-icons"> close </i>
                                                </div>
                                            </div> */}
                                            </div>
                                        </li>))
                                }
                            </ul>

                            {/* <SortablePane
                            direction="vertical"
                            isSortable={true}
                            margin={20}
                        >
                            {/* <Pane id={0} key={0} width={120} height="100%">
                                <p>0</p>
                            </Pane>
                            <Pane id={1} key={1} width={120} height="100%">
                                <p>1</p>
                            </Pane> */}

                            {/* </SortablePane> */}

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withGlobalState(Queue)