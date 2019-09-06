import React, { Component } from 'react'
import axios from 'axios'
import { withGlobalState } from 'react-globally'
import Ringtone from '../component/Ringtone';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import ArtistLoader from '../component/ArtistLoader';
import TrackShareOptions from '../component/TrackShareOptions';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TrackLikeOption from '../component/TrackLikeOption';
import { LazyImage } from "react-lazy-images";
import DownloadTrack from '../component/DownloadTrack';


class TrackView extends Component {
    constructor(props) {
        super(props)
        this.testWeeklyRef = React.createRef()
        this.state = {
            page_idd: '',
            albumData: [],
            trackData: [],
            playlist: [],
            recommendSlider: [],
            trackIndex: null,
            loadingData: true,
            checkRef: true
        }

        this.clickOnTrack = this.clickOnTrack.bind(this)
        this.downloadTrack = this.downloadTrack.bind(this)
        this.noRBT = this.noRBT.bind(this)
        this.likeAlbum = this.likeAlbum.bind(this)

    }

    getData = () => {

        let url = ''

        if ((this.props.match.params.type === 'album') && (this.props.match.params.albumId === 'genre')) {

            url = `http://api.koyal.pk/musicapp/?request=get-tracks-sd&action=${this.props.match.params.albumName}&limit=50`
        }

        else if (this.props.match.params.type === 'collection') {

            url = `http://api.koyal.pk/musicapp/?request=get-tracks-react&action=collect&Id=${this.props.match.params.albumId}`

        } else if (this.props.match.params.type === 'album') {

            url = `http://api.koyal.pk/musicapp/?request=get-tracks-react&id=${this.props.match.params.albumId}`

        }

        axios.get(url)

            .then(response => {

                this.setState({
                    page_idd: this.props.match.params.albumId,
                    albumData: response.data.Response.AlbumInfo,
                    trackData: response.data.Response.Tracks,
                    recommendSlider: response.data.Response.RelatedAlbums,
                    loadingData: false
                },
                    () => {
                       // console.log(this.state.albumData)
                        this.getDataTracks()
                    }
                )
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
                'rbtTelenor': data['TelenorCode'],
                'albumArtist': data['AlbumArtist'],
            }
        ))


        //console.log(dataTrack)
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
        }))



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
                    'albumArtist': dataTrack2[trackOrder[y]]['albumArtist']
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
        alert('Is song ki RBT Mojood Nahi hai.')
    }

    downloadTrack = (TrackId, AlbumId, OrgTrackUrl) => {

        // let trackInfo = {
        //     'track_id': TrackId,
        //     'album_id': AlbumId
        // }


        // axios.post(`http://35.156.24.14/koyaldownload/download.php`, trackInfo)
        //     .then(response => {

        //         if (response.data.SearchResult.Success === 'Charged') {
        //             setTimeout(() => {
        //                 window.location.href = OrgTrackUrl
        //             }, 100);
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.setState({ errMsg: 'Error Post Data' })
        //     })



        const method = 'GET';

        const url = 'https://d3ball6p71brug.cloudfront.net/Teri-Bargah-Main_Afshan_Zaibi.mp3';

        axios

            .request({

                url,

                method,

                responseType: 'blob', //important

            })

            .then(({ data }) => {

                const downloadUrl = window.URL.createObjectURL(new Blob([data]));

                const link = document.createElement('a');

                link.href = downloadUrl;

                link.setAttribute('download', 'Khan_Rokhrhi.mp3'); //any other extension

                document.body.appendChild(link);

                link.click();

                link.remove();

            });

    }



    componentDidMount() {

        this.getData()
        //console.log(`I m did mount ${this.testWeeklyRef.current.clientHeight}`)
    }

    componentDidUpdate(prevState) {

        if (this.state.page_idd !== this.props.match.params.albumId) {
            this.getData()
            //console.log(`I m did update ${this.testWeeklyRef.current.clientHeight}`)
        }


    }

    responsive2 = {
        0: { items: 2 },
        1024: { items: 8 },
    }

    likeAlbum = () => {

        let likeData = [
            {
                'userId': 0,
                'albumId': this.props.match.params.albumId
            }
        ]


        axios.post(`http://api.koyal.pk/musicapp/?request=add-fav-react`, likeData)
            .then(response => {
                // console.log(response)
            })
            .catch(error => {
                console.log(error)
                
            })
    }


    render() {

        const { albumData, trackData, recommendSlider, loadingData } = this.state

        var bgImage = {
            backgroundImage: 'url(' + albumData.ThumbnailImageWeb + ')',
            WebkitTransition: 'all', // note the capital 'W' here
            msTransition: 'all' // 'ms' is the only lowercase vendor prefix
        };

    

        return (


            <div className="allTracksContainer">
                {loadingData ? <ArtistLoader /> :

                    <>
                        <div className="dummy-img">
                            <div style={bgImage} className="divImage"></div>
                        </div>
                        <Grid container spacing={0} className="trackGridMain1">
                            <Grid item xs={2} className="pageGrid1">

                                <div className="albumImgBox">
                                    <LazyImage
                                        src={albumData.ThumbnailImageWeb}
                                        alt={albumData.Name}
                                        debounceDurationMs={50}
                                        placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                                        actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={albumData.Name} />)} />
                                </div>

                            </Grid>
                            <Grid item xs={10} className="pageGrid2">
                                <div className="albumMetaBox">
                                    <p className="short-head">Album</p>
                                    <h1 className="main-title">{albumData.Name}</h1>
                                    <p className="short-desc">
                                       {albumData.Description}
                                    </p>
                                    {/* <ul className="byDetails">
                                        <li>By : {albumData.Name}</li>
                                        <li>Writer : {albumData.Name}</li>
                                        <li>Composer : {albumData.Name}</li>
                                    </ul> */}
                                    <ul className="counterList">
                                        <li className="albumLikes">
                                            {/* {albumData.NoOfLikes}  */}
                                            1.2k Likes</li>
                                        <li className="albumShare">
                                            {/* {albumData.NoOfShares}  */}
                                            2.3k Shares</li>
                                        <li className="albumPlay">
                                            {/* {albumData.NoOfLikes} */}
                                            4k Views</li>
                                    </ul>
                                </div>

                            </Grid>
                        </Grid>

                        <Grid container spacing={1} className="trackGridMain2">
                            <Grid item xs={12} className="pageGrid3">
                                <div className="trackTableCustom">
                                    <ul className="trackListHeader">
                                        <li className="trackCol1">#</li>
                                        <li className="trackCol2"></li>
                                        <li className="trackCol3">Title</li>
                                        <li className="trackCol4">Artist</li>
                                        <li className="trackCol5"><i className="material-icons">access_time </i></li>
                                        <li className="trackCol6">Popularity</li>
                                        <li className="trackCol7"></li>
                                        <li className="trackCol8"></li>
                                        <li className="trackCol9"></li>

                                    </ul>
                                    {
                                        trackData.map((data, index) =>
                                            <ul className="trackListHeader trackBody" key={index}>
                                                <li className="trackCol1 trackImg">


                                                    {this.props.globalState.track_exist === data.TrackId ?


                                                        <i className="material-icons pause-icon">
                                                            pause_circle_outline
</i>
                                                        :
                                                        <LazyImage
                                                            src={data.ThumbnailImageWeb}
                                                            alt={data.Name}
                                                            debounceDurationMs={5}
                                                            placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                                                            actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Name} />)} />


                                                    }


                                                    <i className="material-icons playIcon" onClick={() => this.clickOnTrack(index, data.Name.split("-").join(" "))}>
                                                        play_circle_outline
</i>
                                                </li>
                                                <li className="trackCol2 downloadImg">

                                                    {/* <img src='/assets/download_black.png' alt="download" onClick={() => this.downloadTrack(data.Id, data.AlbumId, data.OrgTrackUrl)} /> */}
                                                    <DownloadTrack

                                                        TelenorCode={data.TelenorCode}
                                                        UfoneCode={data.UfoneCode}
                                                        MobilinkCode={data.MobilinkCode}
                                                        ZongCode={data.ZongCode}
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
                                                        albumName={albumData.Name}
                                                        ThumbnailImageWeb={albumData.ThumbnailImageWeb}
                                                        TrackName={data.Name.split("-").join(" ")}
                                                        TrackId={data.TrackId}
                                                        Albumid = {data.AlbumId}
                                                    />

                                                </li>
                                                <li className="trackCol3 trackTitle">
                                                    <Link component={Link} to={`/track/` + data.TrackId + `/` + data.Name}>
                                                        {data.Name.split("-").join(" ")}

                                                    </Link>
                                                </li>
                                                <li className="trackCol4 trackArtist">

                                                    <Link component={Link} to={`/artist/` + data.ArtistId + `/` + data.Artist}>
                                                        {albumData.Artist}
                                                    </Link>

                                                </li>
                                                <li className="trackCol5">
                                                    {data.TrackDuration}
                                                </li>
                                                <div className="trackCol6">

                                                    <Rating
                                                        value={`${data.TrackRanking}`}
                                                        readOnly
                                                        icon={<FavoriteIcon fontSize="inherit" />}
                                                        className="ratingTrack"
                                                        max={3}
                                                    />
                                                </div>
                                                <div className="trackCol7">
                                                    <TrackLikeOption
                                                        albumImage={data.ThumbnailImageWeb}
                                                        trackName={data.Name.split("-").join(" ")}
                                                        albumName={data.Name.split("-").join(" ")}
                                                        artistName={albumData.Artist}
                                                        pageURL={window.location.href} />
                                                </div>
                                                <div className="trackCol8">
                                                    <TrackShareOptions
                                                        albumImage={data.ThumbnailImageWeb}
                                                        trackName={data.Name.split("-").join(" ")}
                                                        albumName={data.Name.split("-").join(" ")}
                                                        artistName={albumData.Artist}
                                                        pageURL={window.location.href} />
                                                </div>
                                                <div className="trackCol9">
                                                    {data.TelenorCode > 0 ?
                                                        <Ringtone
                                                            TelenorCode={data.TelenorCode}
                                                            UfoneCode={data.UfoneCode}
                                                            MobilinkCode={data.MobilinkCode}
                                                            ZongCode={data.ZongCode}
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
                                                            albumName={albumData.Name}
                                                            ThumbnailImageWeb={albumData.ThumbnailImageWeb}
                                                            TrackName={data.Name.split("-").join(" ")}
                                                            TrackId={data.TrackId}
                                                        /> :

                                                        <img src="/assets/ringtone_black.png" alt='ringtone' onClick={() => this.noRBT()} />
                                                    }

                                                </div>

                                            </ul>
                                        )
                                    }
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} className="trackGridMain3">
                            <Grid item xs={12}>
                                <div className="relate-title">
                                    <h2>Related Albums</h2>
                                </div>
                            </Grid>
                            {
                                recommendSlider.map((data, index) =>
                                    <Grid item xs={2} className="pageGrid4" key={index}>
                                        <div className="relatedBox">
                                            <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}>
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


export default withGlobalState(TrackView)