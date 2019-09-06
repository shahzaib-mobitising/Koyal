import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import ArtistLoader from '../component/ArtistLoader';
import { LazyImage } from "react-lazy-images";
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';


export default class SingleArtist extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page_idd: '',
            artistInfo: [],
            artistAlbums: [],
            artistTracks: [],
            TestState: [],
            loadingData: true,
        }

        this.downloadTrack = this.downloadTrack.bind(this)
    }

    getData = () => {

        axios.get(`http://api.koyal.pk/app_files/web/artist/artist-${this.props.match.params.artistid}.json`)
            .then(response => {
                //  console.log(response)
                this.setState({
                    page_idd: this.props.match.params.artistid,
                    artistInfo: response.data.Response,
                    artistAlbums: response.data.Response.Albums,
                    artistTracks: response.data.Response.Tracks,
                    loadingData: false
                })
               
            })
            .catch(error => {
                console.log(error)
                
            })

    }

    downloadTrack = (TrackId, AlbumId, OrgTrackUrl) => {

        let trackInfo = {
            'track_id': TrackId,
            'album_id': AlbumId
        }

        axios.post(`http://35.156.24.14/koyaldownload/download.php`, trackInfo)
            .then(response => {

                if (response.data.SearchResult.Success === 'Charged') {
                    setTimeout(() => {
                        window.location.href = OrgTrackUrl
                    }, 100);
                }
            })
            .catch(error => {
                console.log(error)
               
            })
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate(prevState) {

        if (this.state.page_idd !== this.props.match.params.artistid) {
            this.getData()
        }

    }

    responsive2 = {
        0: { items: 1 },
        1024: { items: 4 },
    }

    render() {
        const { artistInfo, artistAlbums, artistTracks, loadingData } = this.state

        var bgImage = {
            backgroundImage: 'url(' + artistInfo.ThumbnailImageWeb + ')',
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
                                        src={artistInfo.ThumbnailImageWeb}
                                        alt={artistInfo.Name}
                                        debounceDurationMs={50}
                                        placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                                        actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={artistInfo.Name} />)} />
                                </div>

                            </Grid>
                            <Grid item xs={10} className="pageGrid2">
                                <div className="albumMetaBox">
                                    <p className="short-head">Artist</p>
                                    <h1 className="main-title">{artistInfo.Artist}</h1>
                                    <p className="short-desc">
                                        {artistInfo.Description}
                                    </p>
                                    {/* <p> 
                                        By <span>{artistInfo.Artist}</span>
                                        Writer <span>{artistInfo.Artist}</span>
                                        Composer <span>{artistInfo.Artist}</span>
                                    </p> */}
                                    <ul className="counterList">
                                        <li className="artistAlbumCounter">80 Albums</li>
                                        <li className="artistSongsCounter">240 Songs</li>
                                    </ul>
                                </div>

                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="trackGridMain2">
                            <Grid item xs={12} className="pageGrid3">
                                <div className="trackTableCustom">
                                    <ul className="trackListHeader">
                                        <li className="trackCol1">#</li>
                                        {/* <li className="trackCol2"></li> */}
                                        <li className="trackCol3 atistiPageTitle">Title</li>
                                        <li className="trackCol4">Artist</li>
                                        <li className="artistAlbumCol">Album</li>
                                        {/* <li className="trackCol5"><i className="material-icons">access_time </i></li> */}
                                        <li className="trackCol6">Popularity</li>
                                        {/* <li className="trackCol7"></li>
                                        <li className="trackCol8"></li>
                                        <li className="trackCol9"></li> */}

                                    </ul>
                                    {
                                        artistTracks.map((data, index) =>
                                            <ul className="trackListHeader trackBody" key={index}>
                                                <li className="trackCol1 trackImg">
                                                    <LazyImage
                                                        src={data.ThumbnailImageWeb}
                                                        alt={data.ThumbnailImageWeb}
                                                        debounceDurationMs={5}
                                                        placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                                                        actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.ThumbnailImageWeb} />)} />
                                                </li>
                                                {/* <li className="trackCol2 downloadImg">

                                                    <img src='/assets/download_black.png' alt="download" onClick={() => this.downloadTrack(data.Id, data.AlbumId, data.TrackUrl)} />
                                                </li> */}
                                                <li className="trackCol3 trackTitle atistiPageTitle">
                                                    <Link component={Link} to={`/track/` + data.Id + `/` + data.Name}>
                                                        {data.Name.split("-").join(" ")}
                                                        {/* Episode 03 Zindagi Guzarne Ka Behtareen Tarika */}
                                                    </Link>
                                                </li>
                                                <li className="trackCol4 trackArtist">

                                                    <Link component={Link} to={`/artist/` + data.ArtistId + `/` + data.Artist}>
                                                        {artistInfo.Artist}
                                                    </Link>
                                                    {/* Episode 03 Zindagi Guzarne Ka Behtareen Tarika */}
                                                </li>
                                                <li className="artistAlbumCol">
                                                    <Link component={Link} to={`/album/` + data.AlbumId + `/` + data.Album}>
                                                        {data.Album}
                                                    </Link>
                                                </li>
                                                {/* <li className="trackCol5">
                                                    5:30
                                                </li> */}

                                                <div className="trackCol6">
                                                    <Rating
                                                        value="2"
                                                        readOnly
                                                        icon={<FavoriteIcon fontSize="inherit" />}
                                                        className="ratingTrack"
                                                        max={3}
                                                    />
                                                </div>
                                                {/* <div className="trackCol7">
                                                    <TrackLikeOption />
                                                </div> */}
                                                {/* <div className="trackCol8">
                                                    <TrackShareOptions
                                                        albumImage={data.ThumbnailImageWeb}
                                                        trackName={data.Name.split("-").join(" ")}
                                                        albumName={data.Name.split("-").join(" ")}
                                                        pageURL={window.location.href} />
                                                </div>
                                                <div className="trackCol9">
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
                                                        albumName={data.Name.split("-").join(" ")}
                                                        ThumbnailImageWeb={data.Name.split("-").join(" ")}
                                                        TrackName={data.Name.split("-").join(" ")}
                                                        TrackId={data.TrackId}
                                                    />
                                                </div> */}

                                            </ul>
                                        )
                                    }
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} className="trackGridMain3">
                            <Grid item xs={12}>
                                <div className="relate-title">
                                    <h2>Albums</h2>
                                </div>
                            </Grid>
                            {
                                artistAlbums.map((data, index) =>
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
            </div >

        )
    }
}
