
import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'
import { LazyImage } from "react-lazy-images";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import homeDataDummy from '../dummy/home.json'
import { withGlobalState } from 'react-globally'
import LanguageBarCustom from '../component/LanguageBarCustom';


class Urdu extends Component {
    constructor(props) {
        super(props)
        this.playTracksDirectly = this.playTracksDirectly.bind(this);
        this.state = {
            page_idd: '',
            sliderSection: homeDataDummy.Response.HomePageContent[0]['Data'],
            genreSection: homeDataDummy.Response.HomePageContent[1]['Data'],
            newSection: homeDataDummy.Response.HomePageContent[2]['Data'],
            newSection2: homeDataDummy.Response.HomePageContent[2]['Data'],
            popularSection: homeDataDummy.Response.HomePageContent[2]['Data'],
            collectionsSection: homeDataDummy.Response.HomePageContent[2]['Data'],
            artistSection: homeDataDummy.Response.HomePageContent[1]['Data'],
            albumSection: homeDataDummy.Response.HomePageContent[2]['Data'],
            islamicSection: homeDataDummy.Response.HomePageContent[2]['Data']
        }
    }

    playTracksDirectly = (id) => {



        axios.get(`http://api.koyal.pk/musicapp/?request=get-tracks-react-button&id=${id}`)
            .then(response => {

                let dataTrack = []
                let respo = response.data.Response.Tracks

                let TestImage = respo[0].ThumbnailImageWeb;

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

    getData = () => {

        axios.get(`http://api.koyal.pk/app_files/web/new/${this.props.match.params.language}.json`)
            //axios.get(`http://api.koyal.pk/app_files/web/new/saraiki-songs.json`)
            .then(response => {

                this.setState({
                    page_idd: this.props.match.params.language,
                    sliderSection: response.data.Response.HomePageContent[0]['Data'],
                    genreSection: response.data.Response.HomePageContent[1]['Data'],
                    newSection: response.data.Response.HomePageContent[2]['Data'],
                    newSection2: response.data.Response.HomePageContent[3]['Data'],
                    popularSection: response.data.Response.HomePageContent[4]['Data'],
                    collectionsSection: response.data.Response.HomePageContent[5]['Data'],
                    artistSection: response.data.Response.HomePageContent[6]['Data'],
                    albumSection: response.data.Response.HomePageContent[7]['Data'],
                    islamicSection: response.data.Response.HomePageContent[8]['Data']

                })


                let CacheData = JSON.parse(localStorage.getItem('queuelist'))

                // console.log(CacheData)

                if (CacheData) {

                    let dataTrack = []

                    CacheData.map(data =>

                        dataTrack.push(
                            {

                                'file': data['TrackUrl'],
                                'track_id': data['TrackId'],
                                'trackName': data['Name'],
                                'albumId': data['AlbumId'],
                                'albumName': data['Album'],
                                'thumbnailImage': data['ThumbnailImageWeb'],
                                'rbtTelenor': data['rbtTelenor']
                            }


                        ))

                    //  console.log(dataTrack.file)

                    if (dataTrack.file === undefined) {
                        // console.log('empty')
                    } else {
                        if (this.props.globalState.track_exist !== 0) {

                            this.props.setGlobalState({
                                tracks: dataTrack,
                                trackAlbumImage: CacheData[0].ThumbnailImageWeb,
                                trackAlbumName: CacheData[0].Album,
                                trackGlobalName: CacheData[0].Name,
                                queueState: dataTrack
                            })


                        } else {
                            console.log(456)
                            this.props.setGlobalState({
                                tracks: dataTrack,
                                trackAlbumImage: CacheData[0].ThumbnailImageWeb,
                                trackAlbumName: CacheData[0].Album,
                                trackGlobalName: CacheData[0].Name,
                                queueState: dataTrack
                            })

                        }
                    }

                } else {
                    console.log(false)
                }


            })
            .catch(error => {
                console.log(error)

            })

    }

    testFnf() {
        this.forceUpdate();
    }

    componentDidMount() {
        setTimeout(() =>
            this.getData()
            , 1000)

        this.testFnf()
    }

    componentDidUpdate(props, prevState) {

        if (prevState.page_idd !== this.props.match.params.language) {

            this.getData()
        }

    }

    responsiveSlider = {
        0: { items: 1 },
        1024: { items: 3 },
    }

    responsive2 = {
        0: { items: 2 },
        1024: { items: 8 },
    }

    responsive3 = {
        0: { items: 2 },
        1024: { items: 12 },
    }

    artistR = {
        0: { items: 2 },
        1024: { items: 10 },
    }


    render() {


        const { sliderSection, genreSection, newSection, newSection2, popularSection, collectionsSection, artistSection, albumSection, islamicSection } = this.state

        const forSlider = sliderSection.map(data => <div className="sliderImageBox"> <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}> <LazyImage src={data.SliderImageWeb} alt="A portrait of Bill Murray."
            debounceDurationMs={1} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/slider.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /> </Link> <div className="play-icon-1"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /></div> </div>)

        const forGenre = genreSection.map(data => <> <Link component={Link} to={`/album/genre/` + data.Name}> <LazyImage src={data.ThumbnailImageWeb} className="genre-image" alt={data.Id}
            debounceDurationMs={1} style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/slider.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /> <h6 className="genre-name">{data.Name}</h6> </Link></>)

        const forNew = newSection.map((data, index) => <> <div className="new-1"> <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}> <LazyImage src={data.ThumbnailImageWeb} alt={data.Id}
            debounceDurationMs={1} className="new1-image" style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/150.svg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /> <h6>{data.Name}</h6> </Link> <div className="play-icon"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div> </div> <div className="new-2"> <Link component={Link} to={`/album/` + newSection2[index].Id + `/` + newSection2[index].Name}> <LazyImage src={newSection2[index].ThumbnailImageWeb} alt={newSection2[index].Id}
                debounceDurationMs={1} className="new2-image" style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/150.svg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={newSection2[index].Id} />)} /> <h6>{newSection2[index].Name}</h6></Link> <div className="play-icon"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(newSection2[index].Id)} /> </div> </div> </>)

        const forPopular = popularSection.map(data => <> <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}> <LazyImage src={data.ThumbnailImageWeb} alt={data.Id}
            debounceDurationMs={1} className="popular-image" style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/150.svg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /> <h6>{data.Name}</h6> </Link> <div className="play-icon"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div> </>)

        const forArtist = artistSection.map(data => <> <Link component={Link} to={`/artist/` + data.Id + `/` + data.Name}> <LazyImage src={data.ThumbnailImageWeb} style={{ width: "100%", height: "100%" }} alt={data.Id}
            debounceDurationMs={1} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/album.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /> </Link> </>)

        const forAlbum = albumSection.map(data => <> <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}> <LazyImage src={data.ThumbnailImageWeb} alt={data.Id}
            debounceDurationMs={1} className="album-image" style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/150.svg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /> <h6>{data.Name}</h6> </Link> <div className="play-icon"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div> </>)

        const forIslamic = islamicSection.map(data => <> <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}> <LazyImage src={data.ThumbnailImageWeb} alt={data.Id}
            debounceDurationMs={1} className="islamic-image" style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/150.svg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /> <h6>{data.Name}</h6> </Link> <div className="play-icon"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div> </>)

        const forCollection = collectionsSection.map(data => <> <Link component={Link} to={`/collection/` + data.Id + `/` + data.Name}> <LazyImage src={data.ThumbnailImageWeb} alt={data.Id}
            debounceDurationMs={1} className="collection-image" style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/150.svg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /> <h6>{data.Name}</h6> </Link> <div className="play-icon"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div> </>)


        let pageName = this.props.match.params.language.split("-", 1);
        let newPage = `/explore/${pageName}-new`
        let trendPage = `/explore/${pageName}-trend`
        let collectionPage = `/explore/${pageName}-collect`
        let artistPage = `/explore/${pageName}-artist`
        let albumPage = `/explore/${pageName}-album`
        let islamicPage = `/explore/${pageName}-islamic`

        return (


            <div className="homeMainClass">

                {/* <LanguageBar2 /> */}


                <LanguageBarCustom />

                <div className="sliderBox">
                    <AliceCarousel
                        items={forSlider}
                        responsive={this.responsiveSlider}
                        autoPlayInterval={4000}
                        autoPlay={false}
                        fadeOutAnimation={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={false}
                        buttonsDisabled={false}
                        dotsDisabled={true}
                        infinite={false}
                    />
                </div>

                {forSlider.length === 0 ?
                    <div className="extraSpaceHome">
                        <div className="emptyItem">
                            <img src={`assets/slider.jpg`} alt={`ok`} style={{ width: "100%" }} />
                        </div>
                        <div className="emptyItem">
                            <img src={`assets/slider.jpg`} alt={`ok`} style={{ width: "100%" }} />
                        </div>
                        <div className="emptyItem">
                            <img src={`assets/slider.jpg`} alt={`ok`} style={{ width: "100%" }} />
                        </div>
                        {/* <div className="emptyItem">
                            <img src={`assets/slider.jpg`} alt={`ok`} style={{ width: "100%" }} />
                        </div> */}
                    </div>
                    : <div></div>}

                <hr className="divider" />

                <div className="sliderSection_1 new-section-slider">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">New</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to={newPage} className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <AliceCarousel
                        items={forNew}
                        responsive={this.responsive2}
                        autoPlayInterval={6000}
                        autoPlay={false}
                        fadeOutAnimation={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={false}
                        buttonsDisabled={false}
                        dotsDisabled={true} infinite={false}
                    />
                </div>

                <hr className="divider2" />
                <div className="sliderSection_1">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Popular</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to={trendPage} className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <AliceCarousel
                        items={forPopular}
                        responsive={this.responsive2}
                        autoPlayInterval={6000}
                        autoPlay={false}
                        fadeOutAnimation={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={false}
                        buttonsDisabled={false}
                        dotsDisabled={true} infinite={false}
                    />

                </div>

                <hr className="divider2" />
                <div className="sliderSection_1">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Collection</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to={collectionPage} className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <AliceCarousel
                        items={forCollection}
                        responsive={this.responsive2}
                        autoPlayInterval={6000}
                        autoPlay={false}
                        fadeOutAnimation={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={false}
                        buttonsDisabled={false}
                        dotsDisabled={true} infinite={false}
                    />

                </div>

                <hr className="divider2" />
                <div className="sliderSection_1 artist_section">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Artist</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to={artistPage} className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <AliceCarousel
                        items={forArtist}
                        responsive={this.artistR}
                        autoPlayInterval={6000}
                        autoPlay={false}
                        fadeOutAnimation={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={false}
                        buttonsDisabled={false}
                        dotsDisabled={true} infinite={false}
                    />

                </div>

                <hr className="divider2" />
                <div className="sliderSection_1">


                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Albums</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to={albumPage} className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <AliceCarousel
                        items={forAlbum}
                        responsive={this.responsive2}
                        autoPlayInterval={6000}
                        autoPlay={false}
                        fadeOutAnimation={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={false}
                        buttonsDisabled={false}
                        dotsDisabled={true} infinite={false}
                    />
                </div>

                <hr className="divider2" />
                <div className="sliderSection_1">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Islamic</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to={islamicPage} className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <AliceCarousel
                        items={forIslamic}
                        responsive={this.responsive2}
                        autoPlayInterval={2000}
                        autoPlay={false}
                        fadeOutAnimation={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={false}
                        buttonsDisabled={false}
                        dotsDisabled={true} infinite={false}
                    />
                </div>

                <hr className="divider2" />

                <div className="sliderSection_1 grenre_section">


                    <h1 className="home-headings">Genres</h1>

                    <AliceCarousel
                        items={forGenre}
                        responsive={this.responsive3}
                        autoPlayInterval={6000}
                        autoPlay={false}
                        fadeOutAnimation={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={false}
                        buttonsDisabled={false}
                        dotsDisabled={true} infinite={false}
                    />
                </div>

            </div>
        )
    }
}
export default withGlobalState(Urdu)