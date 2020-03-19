
import React, { Component } from 'react'
import axios from 'axios'
import { LazyImage } from "react-lazy-images";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import homeDataDummy from '../dummy/home.json'
import { withGlobalState } from 'react-globally'
import LanguageBarCustom from '../component/LanguageBarCustom';
import { Card, Placeholder } from 'semantic-ui-react'
import { isMobile } from 'react-device-detect';
import { Helmet } from "react-helmet";
import ReactGA from 'react-ga';

class Urdu extends Component {
    constructor(props) {
        super(props)
        this.playTracksDirectly = this.playTracksDirectly.bind(this);
        this.state = {
            page_idd: '',
            loading: true,
            sliderSection: homeDataDummy.Response.HomePageContent[0]['Data'],
            genreSection: homeDataDummy.Response.HomePageContent[1]['Data'],
            newSection: homeDataDummy.Response.HomePageContent[2]['Data'],
            popularSection: homeDataDummy.Response.HomePageContent[2]['Data'],
            collectionsSection: homeDataDummy.Response.HomePageContent[2]['Data'],
            artistSection: homeDataDummy.Response.HomePageContent[1]['Data'],
            albumSection: homeDataDummy.Response.HomePageContent[2]['Data'],
            islamicSection: homeDataDummy.Response.HomePageContent[2]['Data']
        }
    }

    playTracksDirectly = (id, albumName) => {

        ReactGA.event({
            category: `Button Play Song ${this.props.match.params.language}`,
            action: 'Direct Play',
            transport: 'beacon',
            label: albumName
        });

        axios.get(`https://api.koyal.pk/musicapp/?request=get-tracks-react-button&id=${id}`)
            .then(response => {

                let dataTrack = []
                let respo = response.data.Response.Tracks

                let TestImage = respo[0].ThumbnailImageWeb;
                console.log(respo)
                respo.map(data =>

                    dataTrack.push(
                        {

                            'file': data['TrackUrl'],
                            'track_id': data['TrackId'],
                            'trackName': data['Name'].split("-").join(" "),
                            'albumId': data['AlbumId'],
                            'albumName': data['Album'].split("_").join(" "),
                            'thumbnailImage': TestImage,
                            'rbtTelenor': data['TelenorCode'],
                            'albumArtist': data['AlbumArtist'],
                            'trackURL': data['OrgTrackUrl'],
                            'MobilinkCode': data['MobilinkCode'],
                            'ZongCode': data['ZongCode'],
                            'UfoneCode': data['UfoneCode'],
                            'TelenorCode': data['TelenorCode']
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

        let apiName = ''
        let localStorageMsisdn = localStorage.getItem('msisdn')
        if (localStorageMsisdn === null || localStorageMsisdn === '' || localStorageMsisdn.length < 14) {
            apiName = this.props.match.params.language + '.json'
        } else {
            apiName = this.props.match.params.language + '.json?msisdn=' + localStorageMsisdn.replace(/["']/g, "")
        }

        axios.get(`https://api.koyal.pk/app_files/web/new/${apiName}`)
            .then(response => {

                this.setState({
                    page_idd: this.props.match.params.language,
                    loading: false,
                    sliderSection: response.data.Response.HomePageContent[0]['Data'],
                    genreSection: response.data.Response.HomePageContent[1]['Data'],
                    newSection: response.data.Response.HomePageContent[2]['Data'],
                    popularSection: response.data.Response.HomePageContent[3]['Data'],
                    collectionsSection: response.data.Response.HomePageContent[4]['Data'],
                    artistSection: response.data.Response.HomePageContent[5]['Data'],
                    albumSection: response.data.Response.HomePageContent[6]['Data'],
                    islamicSection: response.data.Response.HomePageContent[7]['Data']

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
                this.setState({ errMsg: 'Error Data' })
            })

    }

    testFnf() {
        this.forceUpdate();
    }

    componentDidMount() {
        setTimeout(() =>
            this.getData()
            , 500)

        this.testFnf()
    }

    componentDidUpdate(props, prevState) {

        if (prevState.page_idd !== this.props.match.params.language) {

            this.getData()
        }

    }

    responsiveSlider = {
        0: { items: 2 },
        360: { items: 2 },
        1024: { items: 3 },
    }

    responsive2 = {
        0: { items: 4 },
        360: { items: 4 },
        1024: { items: 8 },
    }

    responsive3 = {
        0: { items: 4 },
        360: { items: 4 },
        1024: { items: 8 },
    }

    artistR = {
        0: { items: 4 },
        360: { items: 4 },
        1024: { items: 8 },
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


        const { loading, sliderSection, genreSection, newSection, popularSection, collectionsSection, artistSection, albumSection, islamicSection } = this.state

        const LoaderMobile = isMobile ?
            <Card.Group className="sliderItemMobile" itemsPerRow={2}>
                {
                    [1, 2].map((data, index) =>
                        <Card fluid={true}>
                            <Placeholder key={index}>
                                <Placeholder.Image rectangular />
                            </Placeholder>
                        </Card>
                    )
                }
            </Card.Group>
            : <Card.Group className="sliderItemDesktop" itemsPerRow={3}>
                {
                    [1, 2, 3].map((data, index) =>
                        <Card fluid={true}>
                            <Placeholder key={index}>
                                <Placeholder.Image rectangular />
                            </Placeholder>
                        </Card>
                    )
                }
            </Card.Group>

        const loaderMobile2 = isMobile ?
            <Card.Group className="albumItemMobile" itemsPerRow={4}>
                {
                    [1, 2, 1, 2].map((data, index) =>
                        <Card fluid={true}>
                            <Placeholder key={index}>
                                <Placeholder.Image square />
                                <Placeholder.Line />
                            </Placeholder>
                        </Card>
                    )
                }
            </Card.Group>
            : <Card.Group className="albumItem" itemsPerRow={8}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map((data, index) =>
                        <Card>
                            <Placeholder key={index}>
                                <Placeholder.Image square />
                                <Placeholder.Line />
                            </Placeholder>
                        </Card>
                    )
                }
            </Card.Group>

        const forSlider = sliderSection.map(data => <div className="sliderImageBox"><Link to={`/album/` + data.Id + `/` + this.ToSeoUrl(data.Name)}><LazyImage src={data.SliderImageWeb} alt={data.Id} debounceDurationMs={1} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/slider.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /></Link><div className="play-icon-2"><i aria-hidden="true" className="play circular icon" onClick={() => this.playTracksDirectly(data.Id, data.Name)}></i></div></div>)

        const forGenre = genreSection.map(data => <><div className="new-1 new_hover"><Link to={`/album/genre/` + this.ToSeoUrl(data.Name)}> <LazyImage src={data.ThumbnailImageWeb} className="genre-image" alt={data.Id} debounceDurationMs={1} style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/artist.png`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /><h6 className="genre-name">{data.Name}</h6> </Link></div></>)

        const forNew = newSection.map((data, index) => <><div className="new-1 new_hover"><Link to={`/album/` + data.Id + `/` + this.ToSeoUrl(data.Name)}><LazyImage src={data.ThumbnailImageWeb} alt={data.Id} debounceDurationMs={1} className="new1-image" style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/album.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /><h6>{data.Name}</h6></Link><div className="play-icon-3"><i aria-hidden="true" className="play circular icon" onClick={() => this.playTracksDirectly(data.Id, data.Name)}></i></div></div> </>)

        const forPopular = popularSection.map(data => <><div className="new-1 new_hover"><Link to={`/album/` + data.Id + `/` + this.ToSeoUrl(data.Name)}><LazyImage src={data.ThumbnailImageWeb} alt={data.Id} debounceDurationMs={1} className="popular-image" style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/album.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /><h6>{data.Name}</h6></Link><div className="play-icon-3"><i aria-hidden="true" className="play circular icon" onClick={() => this.playTracksDirectly(data.Id, data.Name)}></i></div> </div></>)

        const forArtist = artistSection.map(data => <><div className="new-1 new_hover"><Link to={`/artist/` + data.Id + `/` + this.ToSeoUrl(data.Name)}><LazyImage src={data.ThumbnailImageWeb} style={{ width: "100%", height: "100%" }} alt={data.Id} debounceDurationMs={1} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/album.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /><p>{data.Name}</p> </Link> </div> </>)

        const forAlbum = albumSection.map(data => <><div className="new-1 new_hover"><Link to={`/album/` + data.Id + `/` + this.ToSeoUrl(data.Name)}> <LazyImage src={data.ThumbnailImageWeb} alt={data.Id} debounceDurationMs={1} className="album-image" style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/album.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /> <h6>{data.Name}</h6></Link><div className="play-icon-3"><i aria-hidden="true" className="play circular icon" onClick={() => this.playTracksDirectly(data.Id, data.Name)}></i></div></div></>)

        const forIslamic = islamicSection.map(data => <><div className="new-1 new_hover"><Link to={`/album/` + data.Id + `/` + this.ToSeoUrl(data.Name)}> <LazyImage src={data.ThumbnailImageWeb} alt={data.Id} debounceDurationMs={1} className="islamic-image" style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/album.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /> <h6>{data.Name}</h6> </Link><div className="play-icon-3"><i aria-hidden="true" className="play circular icon" onClick={() => this.playTracksDirectly(data.Id, data.Name)}></i></div></div></>)

        const forCollection = collectionsSection.map(data => <><div className="new-1 new_hover"><Link to={`/collection/` + data.Id + `/` + this.ToSeoUrl(data.Name)}> <LazyImage src={data.ThumbnailImageWeb} alt={data.Id} debounceDurationMs={1} className="collection-image" style={{ width: "100%", height: "100%" }} placeholder={({ imageProps, ref }) => (<img ref={ref} src={`assets/album.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)} actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={data.Id} />)} /> <h6>{data.Name}</h6> </Link><div className="play-icon-3"><i aria-hidden="true" className="play circular icon" onClick={() => this.playTracksDirectly(data.Id, data.Name)}></i></div></div></>)

        //let pageName = this.props.match.params.language.split("-", 1);
        let pageName = this.props.match.params.language;
        let newPage = `/explore/new/${pageName}`
        let trendPage = `/explore/trend/${pageName}`
        //let collectionPage = `/explore/${pageName}-collect`
        let artistPage = `/explore/artist/${pageName}`
        let albumPage = `/explore/album/${pageName}`
        let islamicPage = `/explore/islamic/${pageName}`

        return (


            <div className="homeMainClass">




                <LanguageBarCustom />

                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Koyal - {pageName}</title>
                </Helmet>

                <div className="sliderBox">


                    {
                        loading ?
                            LoaderMobile
                            :
                            <>
                                <AliceCarousel
                                    items={forSlider}
                                    responsive={this.responsiveSlider}
                                    autoPlayInterval={4000}
                                    autoPlay={false}
                                    fadeOutAnimation={true}
                                    playButtonEnabled={false}
                                    disableAutoPlayOnAction={false}
                                    buttonsDisabled={false}
                                    dotsDisabled={true} infinite={false}
                                />
                            </>
                    }




                </div>

                <hr className="divider" />

                <div className="sliderSection_1 new-section-slider">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">New</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to={newPage} className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    {loading ?
                        loaderMobile2
                        :
                        <>
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
                        </>
                    }

                </div>

                {/* <hr className="divider2" /> */}
                <div className="sliderSection_1 new_hover2">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Popular</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to={trendPage} className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    {
                        loading ?
                            loaderMobile2
                            :
                            <>
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

                            </>
                    }
                </div>
                <hr className="divider2" />
                <div className="sliderSection_1 new_hover2">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Collection</h2></Grid>
                    </Grid>

                    {
                        loading ?
                            loaderMobile2
                            :
                            <>

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

                            </>
                    }

                </div>
                <hr className="divider2" />
                <div className="sliderSection_1 artist_section">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Artist</h2></Grid>
                        <Grid item xs={6} className="slider-side2">  <Link to={artistPage} className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

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


                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Albums</h2></Grid>
                        <Grid item xs={6} className="slider-side2">  <Link to={albumPage} className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

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

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Islamic</h2></Grid>
                        <Grid item xs={6} className="slider-side2">  <Link to={islamicPage} className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

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