import React, { Component } from 'react'
import axios from 'axios'
//import { Col, Card, CardImg, CardBody, CardSubtitle, Table } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import MainSlider from '../component/MainSlider';
import LazyLoad from 'react-lazyload'
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
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
import weeklyData from '../dummy/weekly.json'



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
    }

    getData = () => {

        axios.get(`http://www.staging.koyal.pk/app_files/web/artist/artist-${this.props.match.params.artistid}.json`)
            .then(response => {
                console.log(response)
                this.setState({
                    page_idd: this.props.match.params.artistid,
                    artistInfo: response.data.Response,
                    artistAlbums: response.data.Response.Albums,
                    artistTracks: response.data.Response.Tracks,
                    loadingData: false
                })
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                this.setState({ errMsg: 'Error Data' })
            })

    }

    // testFnf() {
    //     this.forceUpdate();
    // }

    componentDidMount() {
        this.getData()
        //this.testFnf()
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

        // var divStyle = {
        //     width: '15%'
        // };
        var bgImage = {
            backgroundImage: 'url(' + artistInfo.ThumbnailImageWeb + ')',
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
                {loadingData ? <ArtistLoader /> :

                    <>
                        <div className="dummy-img">
                            <div style={bgImage} className="divImage"></div>
                        </div>

                        <Grid container spacing={1} className="trackContainer">
                            <Grid item xs={3}>

                                <div className="albumImageContainer">

                                    <Card className="album_side">
                                        <CardActionArea>
                                            <LazyLoad height={100} offset={[-100, 100]} placeholder={<img src={`https://via.placeholder.com/150`} alt={`hello`} />}>
                                                <LazyLoad once={true} placeholder={<img src={`https://via.placeholder.com/100`} alt={`hello`} />} >
                                                    <CardMedia
                                                        component="img"
                                                        alt={artistInfo.Name}
                                                        // height="200"
                                                        image={artistInfo.ThumbnailImageWeb}
                                                        title={artistInfo.Name}
                                                    />
                                                </LazyLoad>
                                            </LazyLoad>

                                            <CardContent>

                                            </CardContent> </CardActionArea> </Card>

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
                                        Artist
                                </Typography>
                                    <Typography className="album-title" gutterBottom variant="h4">
                                        {artistInfo.Artist}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom>
                                        By. {artistInfo.Style}
                                    </Typography>
                                    <Typography className="trackShare" variant="h6" gutterBottom> <i className="material-icons"> share </i>{artistInfo.Shares}  </Typography>
                                    <Typography className="trackLike" variant="h6" gutterBottom> <i className="material-icons"> thumb_up </i> {artistInfo.Likes} </Typography>

                                    <hr />
                                    <Paper>
                                        <Table className="trackListTable">
                                            <TableBody>
                                                {
                                                    artistTracks.map((data, index) =>
                                                        // <tr key={index}>
                                                        <TableRow key={data.index}>
                                                            <TableCell component="th" scope="row">
                                                                <img className="trackImageIcon" src={data.ThumbnailImageWeb} alt={data.Name} />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Link component={Link} to={`/track/` + data.Id + `/` + data.Name}>
                                                                    {data.Name.split("-").join(" ")}
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell>
                                                                {artistInfo.Artist}
                                                            </TableCell>
                                                            <TableCell>
                                                                {data.LanguageName}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }
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
                                            items={artistAlbums.map((data, index) => <LazyLoad height={100} offset={[-100, 100]} key={data.index} placeholder={<img src={`https://via.placeholder.com/150`} alt={`hello`} />}> <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}> <MainSlider id={data.Id} image={data.ThumbnailImageWeb} /> </Link> </LazyLoad>)}
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


            </div >

        )
    }
}
