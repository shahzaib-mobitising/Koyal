import React, { Component } from 'react'
import axios from 'axios'
import { withGlobalState } from 'react-globally'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import LazyLoad from 'react-lazyload'
import MainSlider from '../component/MainSlider';
import Ringtone from '../component/Ringtone';
//import Loading from "react-fullscreen-loading";
import { Link } from "react-router-dom";
import trackDataDummy from '../dummy/track.json'
import weeklyData from '../dummy/weekly.json'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ArtistLoader from '../component/ArtistLoader';



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
            beforeRenderAlbum: trackDataDummy.Response.AlbumInfo,
            beforeRenderTracks: trackDataDummy.Response.Tracks,
            beforeRenderSlider: trackDataDummy.Response.RelatedAlbums
        }

        this.clickOnTrack = this.clickOnTrack.bind(this)
        this.downloadTrack = this.downloadTrack.bind(this)
        this.noRBT = this.noRBT.bind(this)

    }

    getData = () => {

        let url = `http://www.staging.koyal.pk/musicapp/?request=get-tracks-react-tracks&id=${this.props.match.params.trackId}`

        // if ((this.props.match.params.type === 'album') && (this.props.match.params.albumId === 'genre')) {

        //     url = `http://www.staging.koyal.pk/musicapp/?request=get-tracks-sd&action=${this.props.match.params.albumName}&limit=50`
        // }

        // else if (this.props.match.params.type === 'collection') {

        //     url = `http://www.staging.koyal.pk/musicapp/?request=get-tracks-react&action=collect&Id=${this.props.match.params.albumId}`

        // } else if (this.props.match.params.type === 'album') {

        //     url = `http://www.staging.koyal.pk/musicapp/?request=get-tracks-react&id=${this.props.match.params.albumId}`

        // }

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
                        // console.log(response)
                        this.getDataTracks()
                    }
                )
            })
            .catch(error => {
                console.log(error)
                this.setState({ errMsg: 'Error Data' })
            })

    }

    getDataTracks() {

        let dataTrack = []

        this.state.trackData.map(data => dataTrack.push(
            {
                'file': data['TrackUrl'],
                'track_id': data['TrackId'],
                'trackName': data['Name']
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
            })
        }

    }

    clickOnTrack = (trackid, trackName) => {

        let dataTrack2 = []
        this.state.trackData.map(data => dataTrack2.push({
            'file': data['TrackUrl'],
            'track_id': data['TrackId'],
            'trackName': data['Name']
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
                    'trackName': dataTrack2[trackOrder[y]]['trackName']
                })
        }

        this.props.setGlobalState(
            {
                tracks: trackDataSort,
                trackAlbumImage: this.state.albumData.ThumbnailImageWeb,
                trackAlbumName: this.state.albumData.Name,
                trackGlobalName: trackName
            }
        )

    }

    noRBT = () => {
        alert('Is song ki RBT Mojood Nahi hai.')
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
                this.setState({ errMsg: 'Error Post Data' })
            })
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

    render() {

        const { albumData, trackData, recommendSlider, loadingData } = this.state

        const sliderRecomender = recommendSlider.map(data => <LazyLoad height={100} offset={[-100, 100]} key={data.Id} placeholder={<img src={`https://via.placeholder.com/150`} alt={`hello`} />}><Link component={Link} to={`/album/` + data.Id + `/` + data.Name}><MainSlider id={data.Id} image={data.ThumbnailImageWeb} /><h6>{data.Name}</h6></Link></LazyLoad>)

        //const trackAlbumDummy = <> <Loading loading loaderColor="rgb(63, 81, 181)" /> <Col xs="3"> <Card> <CardImg top width="100%" src={beforeRenderAlbum.ThumbnailImageWeb} alt={beforeRenderAlbum.Name} /> <CardBody> <CardSubtitle> <i className="material-icons"> share </i>{beforeRenderAlbum.NoOfShares}</CardSubtitle> <CardSubtitle> <i className="material-icons"> thumb_up </i> {beforeRenderAlbum.NoOfLikes}</CardSubtitle> <CardTitle>About this album</CardTitle> <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> </CardBody> </Card> </Col> <Col xs="9"> <Typography variant="subtitle2" gutterBottom> Album </Typography> <Typography gutterBottom variant="h5" component="h2"> {beforeRenderAlbum.Name} </Typography> <Typography variant="subtitle2" gutterBottom> By. {beforeRenderAlbum.Name} </Typography> <Table hover> <thead> <tr> <th>#</th> <th>Song</th> <th>Genre</th> <th>Artist</th> <th>Language</th> <th>Ringtone</th> <th>More</th> </tr> </thead> <tbody> {beforeRenderTracks.map((data, index) => { if (this.props.globalState.track_exist === data.TrackId) { return <tr key={data.TrackId}> <th scope="row">{index}</th> <td>{data.Name.split("-").join(" ")}</td> <td>{data.Genre}</td> <td>{data.Artist.split("_").join(" ")}</td> <td>this song is playing : {this.props.globalState.track_exist} : {data.LanguageName}</td> <td> <Ringtone TelenorCode={data.TelenorCode} UfoneCode={data.UfoneCode} MobilinkCode={data.MobilinkCode} ZongCode={data.ZongCode} RBTCodes={[{ 'code': data.TelenorCode, 'name': 'Telenor' }, { 'code': data.UfoneCode, 'name': 'Ufone' }, { 'code': data.ZongCode, 'name': 'Zong' }, { 'code': data.MobilinkCode, 'name': 'Mobilink' }]} albumName={albumData.Name} ThumbnailImageWeb={albumData.ThumbnailImageWeb} TrackName={data.Name.split("-").join(" ")} TrackId={data.TrackId} /> </td> <td> <Button color="primary" onClick={() => this.clickOnTrack(index)} value={index}><i className="material-icons">play_arrow</i></Button></td></tr> } })}</tbody></Table></Col> <Col xs="12"> <AliceCarousel items={beforeRenderSlider.map(data => <LazyLoad height={100} offset={[-100, 100]} key={data.Id} placeholder={<img src={`https://via.placeholder.com/150`} alt={`hello`} />}><MainSlider id={data.Id} image={data.ThumbnailImageWeb} /> </LazyLoad>)} responsive={this.responsive2} autoPlayInterval={2000} autoPlay={false} fadeOutAnimation={true} playButtonEnabled={false} disableAutoPlayOnAction={false} /></Col></>

        var bgImage = {
            backgroundImage: 'url(' + albumData.ThumbnailImageWeb + ')',
            WebkitTransition: 'all', // note the capital 'W' here
            msTransition: 'all' // 'ms' is the only lowercase vendor prefix
        };

        const sideWeeklyTracks = weeklyData.Response.Weekly.map(data =>

            <>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={data.Name} src={data.ThumbnailImageWeb} />
                    </ListItemAvatar>
                    <Link component={Link} to={`/track/` + data.TrackId + `/` + data.Name}>
                        <ListItemText primary={data.Name} />
                    </Link>
                    {/* <Link component={Link} to={`/artist/` + data.ArtistId + `/` + data.Artist}>
                        <ListItemText primary={data.Artist} />
                    </Link> */}
                </ListItem>
                <Divider variant="inset" component="li" />
            </>
        )

        return (

            <div className="trackMainContainer">
                {/* <LinearProgress color="secondary" /> */}
                <div className="dummy-img">
                    <div style={bgImage} className="divImage"></div>
                </div>
                {

                    loadingData ?
                        // <Loading loading loaderColor="rgb(63, 81, 181)" />
                        <ArtistLoader />
                        //trackAlbumDummy
                        :
                        <>
                            <Grid container spacing={1} className="trackContainer">
                                <Grid item xs={3}>

                                    <div className="albumImageContainer">

                                        <Card className="album_side">
                                            <CardActionArea>
                                                <LazyLoad height={100} offset={[-100, 100]} placeholder={<img src={`https://via.placeholder.com/150`} alt={`hello`} />}>
                                                    <LazyLoad once={true} placeholder={<img src={`https://via.placeholder.com/100`} alt={`hello`} />} >
                                                        <CardMedia
                                                            component="img"
                                                            alt={albumData.Name}
                                                            // height="200"
                                                            image={albumData.ThumbnailImageWeb}
                                                            title={albumData.Name}
                                                        />
                                                    </LazyLoad>
                                                </LazyLoad>

                                                <CardContent>

                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                        across all continents except Antarctica
          </Typography>
                                                </CardContent>
                                            </CardActionArea> </Card>

                                        <div className="sideTracks">

                                            <h3>Weekly Top Tracks</h3>
                                            <hr />


                                            <List className="singleTrackList">

                                                {sideWeeklyTracks}



                                            </List>
                                        </div>
                                    </div>
                                </Grid>


                                <Grid item xs={9}>
                                    <div className="track_side">
                                        <Typography className="album-head-title" variant="subtitle2" gutterBottom>
                                            <Link component={Link} to={`/album/` + trackData[0].AlbumId + `/` + trackData[0].Album}> Go to Album </Link>
                                        </Typography>
                                        <Typography className="album-title" gutterBottom variant="h4">
                                            {albumData.Name}
                                        </Typography>
                                        <Typography variant="subtitle2" gutterBottom>
                                            By. {albumData.Artist}
                                        </Typography>
                                        <Typography className="trackShare" variant="h6" gutterBottom> <i className="material-icons"> share </i>{albumData.NoOfShares}  </Typography>
                                        <Typography className="trackLike" variant="h6" gutterBottom> <i className="material-icons"> thumb_up </i> {albumData.NoOfLikes} </Typography>

                                        <hr />
                                        <Paper>
                                            <Table className="trackListTable">
                                                {/* <TableHead>
                                                    <TableRow>
                                                        <TableCell></TableCell>
                                                        <TableCell align="left">Song</TableCell>
                                                        <TableCell align="left">Artist</TableCell>
                                                        <TableCell align="left">Genre</TableCell>
                                                        <TableCell align="left">Language</TableCell>
                                                        <TableCell align="left">Ringtone</TableCell>
                                                        <TableCell align="left">More</TableCell>
                                                    </TableRow>
                                                </TableHead> */}
                                                <TableBody>
                                                    {
                                                        trackData.map((data, index) => {

                                                            return <TableRow key={data.TrackId}>
                                                                <TableCell component="th" scope="row">

                                                                    {this.props.globalState.track_exist === data.TrackId ?

                                                                        <i className="material-icons noHoverPauseIcon"> pause_circle_outline</i>
                                                                        :
                                                                        <img className="trackImageIcon noHoverAlbumIcon" src={data.ThumbnailImageWeb} alt={data.Name} />
                                                                    }

                                                                    <i className="material-icons onHoverPlayIcon" onClick={() => this.clickOnTrack(index, data.Name.split("-").join(" "))}>
                                                                        play_circle_filled_white </i>


                                                                </TableCell>
                                                                <TableCell>
                                                                    {data.Name.split("-").join(" ")}
                                                                </TableCell>

                                                                <TableCell align="left">

                                                                    {data.Artist.split("_").join(" ")}

                                                                </TableCell>


                                                                <TableCell align="right">


                                                                    <div className="iconImages">
                                                                        <img src='/assets/like_black.png' alt="like" />
                                                                        <img src='/assets/share_black.png' alt="share" />
                                                                        <img src='/assets/download_black.png' alt="download" onClick={() => this.downloadTrack(data.TrackId, data.AlbumId, data.OrgTrackUrl)} />

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


                                                                </TableCell>


                                                                {/* <TableCell align="left">
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
                                                                        <Button variant="contained" color="secondary"> <i className="material-icons"> notifications_off </i> </Button>
                                                                    }
                                                                </TableCell>
                                                                <TableCell align="left"><Button
                                                                    color="primary"
                                                                    onClick={() => this.clickOnTrack(index)}
                                                                    value={index}>
                                                                    <i className="material-icons">play_arrow</i>
                                                                </Button></TableCell>
                                                                <TableCell>
                                                                    <Button
                                                                        color="secondary"
                                                                        onClick={() => this.downloadTrack(data.TrackId, data.AlbumId, data.OrgTrackUrl)}
                                                                        value={index}>
                                                                        <i className="material-icons">cloud_download</i>
                                                                    </Button>
                                                                </TableCell> */}
                                                            </TableRow>


                                                            // else {
                                                            //     return <TableRow key={data.TrackId}>
                                                            //         <TableCell component="th" scope="row">
                                                            //             <img className="trackImageIcon" src={albumData.ThumbnailImageWeb} alt={albumData.Name} />
                                                            //         </TableCell>
                                                            //         <TableCell>
                                                            //             {data.Name.split("-").join(" ")}
                                                            //         </TableCell>

                                                            //         <TableCell align="left">{data.Artist.split("_").join(" ")}</TableCell>

                                                            //         <TableCell align="left">

                                                            // {data.TelenorCode > 0 ?
                                                            //     <Ringtone
                                                            //         TelenorCode={data.TelenorCode}
                                                            //         UfoneCode={data.UfoneCode}
                                                            //         MobilinkCode={data.MobilinkCode}
                                                            //         ZongCode={data.ZongCode}
                                                            //         RBTCodes={
                                                            //             [
                                                            //                 {
                                                            //                     'code': data.TelenorCode,
                                                            //                     'name': 'Telenor'
                                                            //                 },
                                                            //                 {
                                                            //                     'code': data.UfoneCode,
                                                            //                     'name': 'Ufone'
                                                            //                 },
                                                            //                 {
                                                            //                     'code': data.ZongCode,
                                                            //                     'name': 'Zong'
                                                            //                 },
                                                            //                 {
                                                            //                     'code': data.MobilinkCode,
                                                            //                     'name': 'Mobilink'
                                                            //                 }
                                                            //             ]
                                                            //         }
                                                            //         albumName={albumData.Name}
                                                            //         ThumbnailImageWeb={albumData.ThumbnailImageWeb}
                                                            //         TrackName={data.Name.split("-").join(" ")}
                                                            //         TrackId={data.TrackId}
                                                            //     /> :
                                                            //     <Button variant="contained" color="secondary"> <i className="material-icons"> notifications_off </i> </Button>
                                                            // }


                                                            //         </TableCell>
                                                            //         <TableCell align="left"><Button
                                                            //             color="primary"
                                                            //             onClick={() => this.clickOnTrack(index)}
                                                            //             value={index}>
                                                            //             <i className="material-icons">play_arrow</i>
                                                            //         </Button></TableCell>
                                                            //         <TableCell>
                                                            //             <Button
                                                            //                 color="secondary"
                                                            //                 onClick={() => this.downloadTrack(data.TrackId, data.AlbumId, data.OrgTrackUrl)}
                                                            //                 value={index}>
                                                            //                 <i className="material-icons">cloud_download</i>
                                                            //             </Button>
                                                            //         </TableCell>
                                                            //     </TableRow>
                                                            // }
                                                        })}
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </div>



                                    <div className="homeMainClass" >
                                        <div className="sliderSection_1">
                                            <Grid container spacing={3} className="slider-header">
                                                <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Related Albums</h2></Grid>
                                            </Grid>
                                            <AliceCarousel
                                                items={sliderRecomender}
                                                responsive={this.responsive2}
                                                autoPlayInterval={6000}
                                                autoPlay={false}
                                                fadeOutAnimation={true}
                                                playButtonEnabled={false}
                                                disableAutoPlayOnAction={false}
                                                buttonsDisabled={false}
                                                dotsDisabled={true}
                                            />
                                        </div>
                                    </div>
                                </Grid>

                            </Grid>
                        </>
                }
            </div>
        )
    }
}


export default withGlobalState(SingleTrackView)