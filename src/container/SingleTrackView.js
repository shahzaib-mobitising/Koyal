import React, { Component } from 'react'
import axios from 'axios'
import { withGlobalState } from 'react-globally'
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import ArtistLoader from '../component/ArtistLoader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TrackShareOptions from '../component/TrackShareOptions';
import TrackLikeOption from '../component/TrackLikeOption';
import TrackRington from '../component/TrackRington';
import { LazyImage } from "react-lazy-images";
import DownloadTrack from '../component/DownloadTrack';
import { Dropdown } from 'semantic-ui-react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { Helmet } from "react-helmet";


class SingleTrackView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            page_idd: '',
            albumData: [],
            trackData: [],
            playlist: [],
            recommendSlider: [],
            trackIndex: null,
            loadingData: true,
            noRBTModal: false,
        }

        this.clickOnTrack = this.clickOnTrack.bind(this)
        this.RBTModalClose = this.RBTModalClose.bind(this)
        this.RBTModalOpen = this.RBTModalOpen.bind(this)
        this.noRBT = this.noRBT.bind(this)

    }

    getData = () => {

        let url = `https://api.koyal.pk/musicapp/?request=get-tracks-react-tracks&id=${this.props.match.params.trackId}`

        axios.get(url)

            .then(response => {

                this.setState({
                    page_idd: this.props.match.params.trackId,
                    albumData: response.data.Response.AlbumInfo,
                    trackData: response.data.Response.Tracks,
                    recommendSlider: response.data.Response.RelatedAlbums,
                    loadingData: false
                },
                    () => {
                        //console.log('did mount')

                        this.getDataTracks()

                        setTimeout(() => {
                            this.pageViews();
                        }, 2000)
                    }
                )
            })
            .catch(error => {
                console.log(error)

            })

    }


    pageViews() {

        axios.post(`https://api.koyal.pk/musicapp/?request=views_post`, {
            AlbumId: this.state.page_idd,
            UserId: 0
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    getDataTracks() {

        let dataTrack = []

        this.state.trackData.map(data => dataTrack.push(
            {
                'file': data['TrackUrl'],
                'track_id': data['TrackId'],
                'trackName': data['Name'],
                'albumId': data['AlbumId'],
                'albumName': data['Album'],
                'thumbnailImage': data['ThumbnailImageWeb'],
                'rbtTelenor': data['rbtTelenor'],
                'albumArtist': data['AlbumArtist'],
                'trackURL': data['OrgTrackUrl'],
                'MobilinkCode': data['MobilinkCode'],
                'ZongCode': data['ZongCode'],
                'UfoneCode': data['UfoneCode'],
                'TelenorCode': data['TelenorCode']
            }
        ))


        if (this.props.globalState.track_exist !== 0) {

            //console.log(this.props.globalState.track_exist)

        } else {
            this.props.setGlobalState({
                tracks: dataTrack,
                trackAlbumImage: this.state.albumData.ThumbnailImageWeb,
                trackAlbumName: this.state.albumData.Name,
                trackGlobalName: this.state.trackData[0].Name,
                queueState: dataTrack
            })
        }

    }

    clickOnTrack = (trackid, trackName) => {

        let dataTrack2 = []
        this.state.trackData.map(data => dataTrack2.push({
            'file': data['TrackUrl'],
            'track_id': data['TrackId'],
            'trackName': data['Name'],
            'albumId': data['AlbumId'],
            'albumName': data['Album'],
            'thumbnailImage': data['ThumbnailImageWeb'],
            'rbtTelenor': data['TelenorCode'],
            'albumArtist': data['AlbumArtist'],
            'trackURL': data['OrgTrackUrl'],
            'MobilinkCode': data['MobilinkCode'],
            'ZongCode': data['ZongCode'],
            'UfoneCode': data['UfoneCode'],
            'TelenorCode': data['TelenorCode']
        }))

        // console.log('click')
        // console.log(dataTrack2)

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

        this.props.setGlobalState(
            {
                tracks: trackDataSort,
                trackAlbumImage: this.state.albumData.ThumbnailImageWeb,
                trackAlbumName: this.state.albumData.Name,
                trackGlobalName: trackName,
                queueState: trackDataSort
            }
        )

    }

    noRBT = () => {
        this.RBTModalOpen();
    }

    RBTModalOpen = () => {
        this.setState({ noRBTModal: true })
    }

    RBTModalClose = () => {
        this.setState({ noRBTModal: false })
    }

    componentDidMount() {

        this.getData()
    }

    componentDidUpdate(prevState) {

        if (this.state.page_idd !== this.props.match.params.trackId) {
            this.getData()
        }

    }

    responsive2 = {
        0: { items: 2 },
        1024: { items: 5 },
    }

    ToSeoUrl(url) {

        // make the url lowercase         
        var encodedUrl = url.toString().toLowerCase();

        // replace & with and           
        encodedUrl = encodedUrl.split(/\&+/).join("-and-")

        // remove invalid characters 
        encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

        // remove duplicates 
        encodedUrl = encodedUrl.split(/-+/).join("-");

        // trim leading & trailing characters 
        encodedUrl = encodedUrl.trim('-');

        return encodedUrl;
    }

    render() {

        const { noRBTModal, albumData, trackData, recommendSlider, loadingData } = this.state

        // var bgImage = {
        //     backgroundImage: 'url(' + albumData.ThumbnailImageWeb + ')',
        //     WebkitTransition: 'all', // note the capital 'W' here
        //     msTransition: 'all' // 'ms' is the only lowercase vendor prefix
        // };

        let breakArtist = []

        trackData.map(data =>
            breakArtist.push({
                'artist_id': data['Featuring'].split("|"),
                'artist_name': data['Artist'].split(","),
            })
        )


        //console.log(albumData)
        return (


            <div className="allTracksContainer">

                {/* NO RBT */}
                <div className="firstTimeRBTPopup">
                    <Dialog open={noRBTModal} onClose={this.RBTModalClose} aria-labelledby="form-dialog-title">
                        <DialogActions>
                            <Grid item xs={12}>
                                <div className="DialogContent ">
                                    <div className="setCallerTune">
                                        <p className="setTunec">Sorry !!!!</p>
                                    </div>
                                </div>
                                <div className="congs_text rbt_text">
                                    <p>Is song ki RBT Mojood Nahi hai.</p>
                                </div>
                                <button className="button_styles" onClick={this.RBTModalClose}>
                                    Close
      </button>
                            </Grid>
                        </DialogActions>
                    </Dialog>
                </div>
                {/* NO RBT */}

                {loadingData ? <ArtistLoader /> :

                    <>

                        <div>
                            <Helmet>
                                <meta charSet="utf-8" />
                                <title>{albumData.Name}</title>
                            </Helmet>


                        </div>
                        <div className="dummy-img">
                            {/* <div style={bgImage} className="divImage"></div> */}
                        </div>
                        <Grid container spacing={0} className="trackGridMain1 Trackviewplay">
                            <Grid item xs={2} className="pageGrid1">

                                <div className="albumImgBox">
                                    <LazyImage
                                        src={albumData.ThumbnailImageWeb}
                                        alt={albumData.Name}
                                        debounceDurationMs={50}
                                        placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                                        actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%", verticalAlign: "middle" }} alt={albumData.Name} />)} />
                                </div>

                            </Grid>
                            <Grid item xs={10} className="pageGrid2 albumMetaBox">
                                <div className="buttonTrack">
                                    <p className="short-head">Track</p>
                                    <div className="viewAlbumBtn hide_mobile">
                                        <Link to={`/album/` + trackData[0].AlbumId + `/` + this.ToSeoUrl(trackData[0].Album)}>

                                            {/* <img src='/assets/go_back.svg' alt="Go Back" /> */}

                                            <Button size='medium'>Go to Album</Button>

                                        </Link>
                                    </div>
                                </div>
                                <h1 className="main-title">{albumData.Name}</h1>
                                <p className="short-desc">
                                    {albumData.Description}
                                </p>
                                {/* <ul className="byDetails">
                                        <li>By : {albumData.Name}</li>
                                        <li>Writer : {albumData.Name}</li>
                                        <li>Composer : {albumData.Name}</li>
                                    </ul> */}
                                <div className="viewAlbumBtn show_mobile">
                                    <Link to={`/album/` + trackData[0].AlbumId + `/` + this.ToSeoUrl(trackData[0].Album)}>

                                        <img src='/assets/go_back.svg' alt="Go Back" />

                                    </Link>
                                </div>
                                <ul className="counterList hide_mobile">
                                    <li className="albumLikes22">
                                        <Button as='div' labelPosition='right'>
                                            <Button color=''>
                                                <Icon name='heart' />
                                                Like
      </Button>
                                            <Label as='a' basic color='red' pointing='left'>
                                                {albumData.NoOfLikes < 1 ? <> 1K </> : <> {albumData.NoOfLikes} </>}
                                            </Label>
                                        </Button>

                                    </li>
                                    <li className="albumShare22">

                                        <Button as='div' labelPosition='right'>
                                            <Button color=''>
                                                <Icon name='share' />
                                                Share
      </Button>
                                            <Label as='a' basic color='red' pointing='left'>
                                                {albumData.NoOfShares < 1 ? <> 1K </> : <> {albumData.NoOfShares} </>}
                                            </Label>
                                        </Button>
                                    </li>
                                    <li className="albumPlay22">

                                        <Button as='div' labelPosition='right'>
                                            <Button color=''>
                                                <Icon name='play' />
                                                Views
      </Button>
                                            <Label as='a' basic color='red' pointing='left'>
                                                {albumData.NoOfShares < 1 ? <> 1K </> : <> {albumData.NoOfShares} </>}
                                            </Label>
                                        </Button>
                                    </li>
                                </ul>


                            </Grid>
                        </Grid>

                        <Grid container spacing={1} className="trackGridMain2 TrackviewplayGrid">
                            <Grid item xs={12} className="pageGrid3">
                                <div className="trackTableCustom">
                                    <ul className="trackListHeader">
                                        <li className="trackCol1"><span>#</span></li>
                                        <li className="trackCol3">Title</li>
                                        <li className="trackCol4">Artist</li>
                                        <li className="trackCol5"><i className="material-icons">access_time </i></li>
                                        {/* <li className="trackCol6">Popularity</li> */}
                                        <li className="trackCol2">Download</li>
                                        <li className="trackCol7"></li>
                                        {/* <li className="trackCol8">Share</li>
                                        <li className="trackCol9">Tune</li> */}
                                        {/* <li className="trackCol9"></li> */}

                                    </ul>
                                    {
                                        trackData.map((data, index) =>
                                            <ul className="trackListHeader trackBody" key={index}>
                                                <li className="trackCol1 trackImg">


                                                    {this.props.globalState.track_exist === data.TrackId ?

                                                        <div className="trackActive">
                                                            <LazyImage
                                                                src={data.ThumbnailImageWeb}
                                                                alt={data.Name}
                                                                debounceDurationMs={5}
                                                                placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                                                                actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Name} />)} />
                                                            <i aria-hidden="true" className="pause circular icon"></i>
                                                        </div>
                                                        :

                                                        <div className="trackNotActive">
                                                            <LazyImage
                                                                src={data.ThumbnailImageWeb}
                                                                alt={data.Name}
                                                                debounceDurationMs={5}
                                                                placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                                                                actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Name} />)} />
                                                            <i aria-hidden="true" className="play circular icon" onClick={() => this.clickOnTrack(index, data.Name.split("-").join(" "))}></i>
                                                        </div>


                                                    }
                                                </li>

                                                <li className="trackCol3 trackTitle">
                                                    <Link to={`/track/` + data.TrackId + `/` + this.ToSeoUrl(data.Name)}>
                                                        {data.Name.split("-").join(" ")}

                                                    </Link>
                                                </li>
                                                <li className="trackCol4 trackArtist">
                                                    {
                                                        breakArtist[index].artist_name.map((item, i) =>
                                                            <Link to={`/artist/` + breakArtist[index].artist_id[i] + `/` + this.ToSeoUrl(item)}>
                                                                {item}
                                                            </Link>
                                                        )
                                                    }

                                                </li>
                                                <li className="trackCol5 trackDuration">
                                                    {data.TrackDuration}
                                                </li>
                                                {/* <div className="trackCol6 trackRating">

                                                    <Rating
                                                        value={`${data.TrackRanking}`}
                                                        readOnly
                                                        icon={<FavoriteIcon fontSize="inherit" />}
                                                        className="ratingTrack"
                                                        max={3}
                                                    />
                                                </div> */}
                                                <li className="trackCol2 downloadImg">

                                                    <DownloadTrack
                                                        trackURL={data.OrgTrackUrl}
                                                        albumImage={data.ThumbnailImageWeb}
                                                        trackName={data.Name.split("-").join(" ")}
                                                        albumName={data.Name.split("-").join(" ")}
                                                        artistName={albumData.Artist}
                                                        pageURL={window.location.href}
                                                        TrackId={data.TrackId}
                                                        Albumid={data.AlbumId}
                                                        RBTCodes={
                                                            [
                                                                {
                                                                    'code': 0,
                                                                    'name': 'Telenor'
                                                                },
                                                                {
                                                                    'code': data.UfoneCode,
                                                                    'name': 'Ufone'
                                                                },
                                                                {
                                                                    'code': data.ZongCode,
                                                                    'name': 'Zong'
                                                                },
                                                                {
                                                                    'code': data.MobilinkCode,
                                                                    'name': 'Mobilink'
                                                                }
                                                            ]
                                                        }
                                                    />

                                                </li>
                                                <div className="trackCol7">

                                                    <Dropdown
                                                        text=''
                                                        icon='ellipsis horizontal'
                                                        floating
                                                        labeled
                                                        button
                                                        className='icon'
                                                    >
                                                        <Dropdown.Menu>
                                                            {/* <Dropdown.Header icon='tags' content='Filter by tag' /> */}
                                                            <Dropdown.Item> <i aria-hidden="true" className="like outline icon" ></i> Like
                                                                <TrackLikeOption
                                                                    albumImage={data.ThumbnailImageWeb}
                                                                    trackName={data.Name.split("-").join(" ")}
                                                                    albumName={data.Name.split("-").join(" ")}
                                                                    artistName={albumData.Artist}
                                                                    pageURL={window.location.href} /></Dropdown.Item>
                                                            <Dropdown.Item> <i aria-hidden="true" className="share  icon" ></i>  Share <TrackShareOptions
                                                                albumImage={data.ThumbnailImageWeb}
                                                                trackName={data.Name.split("-").join(" ")}
                                                                albumName={data.Name.split("-").join(" ")}
                                                                artistName={albumData.Artist}
                                                                pageURL={window.location.href} /></Dropdown.Item>
                                                            <Dropdown.Item> <i aria-hidden="true" className="bell outline icon" ></i> <b onClick={() => this.noRBT()}> Caller Tune </b>
                                                                {data.TelenorCode > 0 ?
                                                                    <TrackRington
                                                                        albumImage={data.ThumbnailImageWeb}
                                                                        trackName={data.Name.split("-").join(" ")}
                                                                        albumName={data.Name.split("-").join(" ")}
                                                                        artistName={albumData.Artist}
                                                                        pageURL={window.location.href}
                                                                        TrackId={data.TrackId}
                                                                        RBTCodes={
                                                                            [
                                                                                {
                                                                                    'code': data.TelenorCode,
                                                                                    'name': 'Telenor'
                                                                                },
                                                                                {
                                                                                    'code': data.UfoneCode,
                                                                                    'name': 'Ufone'
                                                                                },
                                                                                {
                                                                                    'code': data.ZongCode,
                                                                                    'name': 'Zong'
                                                                                },
                                                                                {
                                                                                    'code': data.MobilinkCode,
                                                                                    'name': 'Mobilink'
                                                                                }
                                                                            ]
                                                                        }
                                                                    />
                                                                    : " "}
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>

                                                </div>


                                            </ul>
                                        )
                                    }
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} className="trackGridMain3">
                            <Grid item xs={12}>
                                <div className="relate-title">
                                    <h2>Related Albums</h2>
                                </div>
                            </Grid>
                            {
                                recommendSlider.map((data, index) =>
                                    <Grid item md={2} xs={4} className="pageGrid4" key={index}>
                                        <div className="relatedBox">
                                            <Link to={`/album/` + data.Id + `/` + this.ToSeoUrl(data.Name)}>
                                                <LazyImage
                                                    src={data.ThumbnailImageWeb}
                                                    alt={data.Name}
                                                    debounceDurationMs={50}
                                                    placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                                                    actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Name} />)} />
                                                <p>{data.Name}</p>
                                            </Link>
                                        </div>
                                    </Grid>
                                )
                            }
                        </Grid>

                    </>
                }
            </div>
        )
    }
}


export default withGlobalState(SingleTrackView)