import React, { Component, Fragment } from 'react'
import { Placeholder } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from "react-router-dom";
//import { LazyImage } from "react-lazy-images";
import Grid from '@material-ui/core/Grid';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { LazyImageFull, ImageState } from "react-lazy-images";
//import HomeLoad from './HomeLoad1';
import HomeLoad2 from './HomeLoad2';



export default class LoadEffect extends Component {

    constructor(props) {
        super(props)
        this.playTracksDirectly = this.playTracksDirectly.bind(this);
        this.state = {
            loading: true,
            sliderSection: [],
            newSection: [],
            popularSection: [],
            collectionsSection: [],
        }
    }

    playTracksDirectly = (id) => {

        //   console.log(id)

        axios.get(`https://api.koyal.pk/musicapp/?request=get-tracks-react-button&id=${id}`)
            .then(response => {

                let dataTrack = []
                let respo = response.data.Response.Tracks

                let TestImage = respo[0].ThumbnailImageWeb;
                //console.log(respo)
                respo.map(data =>

                    dataTrack.push(
                        {

                            'file': data['TrackUrl'],
                            'track_id': data['TrackId'],
                            'trackName': data['Name'].split("-").join(" "),
                            'albumId': data['AlbumId'],
                            'albumName': data['Album'].split("_").join(" "),
                            'thumbnailImage': TestImage,
                            'rbtTelenor': data['rbtTelenor'],
                            'albumArtist': data['AlbumArtist'],
                        }

                    ))

                if (this.props.globalState.track_exist !== 0) {

                    this.props.setGlobalState({
                        tracks: dataTrack,
                        trackAlbumImage: respo[0].ThumbnailImageWeb,
                        trackAlbumName: respo[0].Album.split("_").join(" "),
                        trackGlobalName: respo[0].Name.split("-").join(" "),
                        queueState: dataTrack
                    })


                } else {
                    this.props.setGlobalState({
                        tracks: dataTrack,
                        trackAlbumImage: respo[0].ThumbnailImageWeb,
                        trackAlbumName: respo[0].Album.split("_").join(" "),
                        trackGlobalName: respo[0].Name.split("-").join(" "),
                        queueState: dataTrack
                    })

                }
            })
            .catch(error => {
                console.log(error)

            })
    }


    getdata() {

        axios.get('https://api.koyal.pk/app_files/web/new/home.json')
            .then(response => {

                this.setState({
                    loading: false,
                    sliderSection: response.data.Response.HomePageContent[0]['Data'],
                    newSection: response.data.Response.HomePageContent[2]['Data'],
                    popularSection: response.data.Response.HomePageContent[4]['Data'],
                    collectionsSection: response.data.Response.HomePageContent[5]['Data'],
                })

                console.log(response)

            })
            .catch(error => {
                console.log(error)
                this.setState({ errMsg: 'Error Data' })
            })
    }
    componentDidMount() {

        this.getdata();
    }


    render() {

        const { loading, sliderSection, newSection, popularSection, collectionsSection } = this.state


        const squareConfig = {
            0: {
                items: 4,
                nav: false
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 8,
                nav: false,
                loop: false
            }
        }

        const sliderConfig = {
            0: {
                items: 2,
                nav: false
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 3,
                nav: false,
                loop: false
            }
        }

        const LoaderCount = [1, 2, 3].map((data, index) =>
            <div key={index} className="sliderItem">

                <Placeholder>
                    <Placeholder.Image rectangular />
                </Placeholder>
            </div>
        )

        const LoaderCount2 = [1, 2, 3, 4, 5, 6, 7, 8].map((data, index) =>
            <div key={index} className="SquareItem">
                <HomeLoad2 />
            </div>
        )

        const sliderSec = <>

            {loading ? (
                LoaderCount
            ) : (
                    sliderSection.map((data, index) =>
                        <div className="sliderItem sliderBox" key={index}>

                            <Link  to={`/album/` + data.Id + `/` + data.Name}>

                                <LazyImageFull src={data.SliderImageWeb}>
                                    {({ imageProps, imageState, ref }) => (
                                        <img
                                            {...imageProps}
                                            ref={ref}
                                            src={
                                                imageState === ImageState.LoadSuccess
                                                    ? imageProps.src
                                                    : "/assets/slider.jpg"
                                            }
                                            style={{ opacity: ImageState.LoadSuccess ? "1" : "0.5" }}
                                            alt={data.Id} />
                                    )}
                                </LazyImageFull>


                            </Link>

                            <div className="play-icon-1">
                                <img src="/assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} />
                            </div>
                        </div>

                    )
                )}

        </>

        const newSec = <>

            {loading ? (
                LoaderCount2
            ) : (
                    newSection.map((data, index) =>
                        <div className="SquareItem" key={index}>

                            <Link  to={`/album/` + data.Id + `/` + data.Name}>

                                <LazyImageFull src={data.ThumbnailImageWeb}>
                                    {({ imageProps, imageState, ref }) => (
                                        <img
                                            {...imageProps}
                                            ref={ref}
                                            src={
                                                imageState === ImageState.LoadSuccess
                                                    ? imageProps.src
                                                    : "/assets/album.jpg"
                                            }
                                            style={{ opacity: ImageState.LoadSuccess ? "1" : "0.5" }}
                                            alt={data.Id} />
                                    )}
                                </LazyImageFull>

                            </Link>
                            <div className="play-icon"> <img src="/assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div>
                            <div className="play-icon-1">
                                <img src="/assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} />
                            </div>
                        </div>

                    )
                )}

        </>

        const popularSec = <>

            {loading ? (
                LoaderCount2
            ) : (
                    popularSection.map((data, index) =>
                        <div className="SquareItem" key={index}>

                            <Link  to={`/album/` + data.Id + `/` + data.Name}>

                                <LazyImageFull src={data.ThumbnailImageWeb}>
                                    {({ imageProps, imageState, ref }) => (
                                        <img
                                            {...imageProps}
                                            ref={ref}
                                            src={
                                                imageState === ImageState.LoadSuccess
                                                    ? imageProps.src
                                                    : "/assets/album.jpg"
                                            }
                                            style={{ opacity: ImageState.LoadSuccess ? "1" : "0.5" }}
                                            alt={data.Id} />
                                    )}
                                </LazyImageFull>

                            </Link>
                            <div className="play-icon"> <img src="/assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div>
                            <div className="play-icon-1">
                                <img src="/assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} />
                            </div>
                        </div>
                    )
                )}
        </>

        const collectionSec = <>

            {loading ? (
                LoaderCount2
            ) : (
                    collectionsSection.map((data, index) =>
                        <div className="SquareItem" key={index}>

                            <Link  to={`/album/` + data.Id + `/` + data.Name}>

                                <LazyImageFull src={data.ThumbnailImageWeb}>
                                    {({ imageProps, imageState, ref }) => (
                                        <img
                                            {...imageProps}
                                            ref={ref}
                                            src={
                                                imageState === ImageState.LoadSuccess
                                                    ? imageProps.src
                                                    : "/assets/album.jpg"
                                            }
                                            style={{ opacity: ImageState.LoadSuccess ? "1" : "0.5" }}
                                            alt={data.Id} />
                                    )}
                                </LazyImageFull>

                            </Link>
                            <div className="play-icon"> <img src="/assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div>
                            <div className="play-icon-1">
                                <img src="/assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} />
                            </div>
                        </div>
                    )
                )}
        </>


        return (
            <Fragment>

                {/* For Slider */}

                <OwlCarousel
                    className="owl-theme"
                    dots={false}
                    lazyLoad={true}
                    loop={false}
                    responsiveClass={true}
                    animateIn={true}
                    animateOut={true}
                    responsive={sliderConfig}>

                    {sliderSec}

                </OwlCarousel>


                <hr className="divider" />

                {/* New Section */}

                <div className="sliderSection_1 new-section-slider">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">New</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to="/explore/urdu-new" className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <OwlCarousel
                        className="owl-theme"
                        dots={false}
                        lazyLoad={true}
                        loop={false}
                        responsiveClass={true}
                        animateIn={true}
                        animateOut={true}
                        responsive={squareConfig}>

                        {newSec}

                    </OwlCarousel>

                </div>

                {/* Popular Section */}

                <div className="sliderSection_1 new_hover2">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Popular</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to="/explore/urdu-trend" className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <OwlCarousel
                        className="owl-theme"
                        dots={false}
                        lazyLoad={true}
                        loop={false}
                        responsiveClass={true}
                        animateIn={true}
                        animateOut={true}
                        responsive={squareConfig}>

                        {popularSec}

                    </OwlCarousel>
                </div>
                <hr className="divider2" />

                {/* Collection Section */}

                <div className="sliderSection_1 new_hover2">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Collection</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to="/explore/urdu-collect" className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <OwlCarousel
                        className="owl-theme"
                        dots={false}
                        lazyLoad={true}
                        loop={false}
                        responsiveClass={true}
                        animateIn={true}
                        animateOut={true}
                        responsive={squareConfig}>

                        {collectionSec}

                    </OwlCarousel>

                </div>
                <hr className="divider2" />



            </Fragment >
        )
    }
}


