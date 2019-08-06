import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import LazyLoad from 'react-lazyload'
import LanguageBar2 from '../component/LanguageBar2'
import { Link } from "react-router-dom";
import homeDataDummy from '../dummy/home.json'
import { withGlobalState } from 'react-globally'


class Homepage extends Component {
    constructor(props) {
        super(props)
        this.playTracksDirectly = this.playTracksDirectly.bind(this);
        this.state = {
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

        console.log(id)

        axios.get(`http://www.staging.koyal.pk/musicapp/?request=get-tracks-react-button&id=${id}`)
            .then(response => {

                console.log(response.data.Response.Tracks)

                let dataTrack = []
                let respo = response.data.Response.Tracks

                respo.map(data => dataTrack.push(
                    {
                        'file': data['TrackUrl'],
                        'track_id': data['TrackId'],
                        'trackName': data['Name']
                    }
                ))


                if (this.props.globalState.track_exist !== 0) {

                    this.props.setGlobalState({
                        tracks: dataTrack,
                        trackAlbumImage: respo[0].ThumbnailImageWeb,
                        trackAlbumName: respo[0].Album.split("_").join(" "),
                        trackGlobalName: respo[0].Name.split("-").join(" "),
                    })


                } else {
                    this.props.setGlobalState({
                        tracks: dataTrack,
                        trackAlbumImage: respo[0].ThumbnailImageWeb,
                        trackAlbumName: respo[0].Album.split("_").join(" "),
                        trackGlobalName: respo[0].Name.split("-").join(" "),
                    })

                }
            })
            .catch(error => {
                console.log(error)
                this.setState({ errMsg: 'Error Data' })
            })
    }

    componentDidMount() {

        setTimeout(() =>


            axios.get('http://www.staging.koyal.pk/app_files/web/new/home.json')
                .then(response => {
                    console.log(homeDataDummy)
                    this.setState({
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
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ errMsg: 'Error Data' })
                })

            , 2000)

    }

    responsiveSlider = {
        0: { items: 1 },
        1024: { items: 4 },

    }

    stagePadding = {
        paddingLeft: 100,
        paddingRight: 100
    }

    responsive2 = {
        0: { items: 2 },
        1024: { items: 8 }
    }

    responsive3 = {
        0: { items: 2 },
        1024: { items: 12 },
    }

    artistR = {
        0: { items: 2 },
        1024: { items: 11 },
    }

    render() {

        const { sliderSection, genreSection, newSection, newSection2, popularSection, collectionsSection, artistSection, albumSection, islamicSection } = this.state

        const forSlider = sliderSection.map(data =>

            <>

                <div className="sliderImageBox">

                    <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}>

                        <img className="slider-image" src={data.SliderImageWeb} style={{ width: "100%", height: "100%" }} alt={data.Id} />

                    </Link>

                    <div className="play-icon-1"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div>
                </div>
            </>
        )

        const forGenre = genreSection.map(data => <LazyLoad height={100} offset={[-100, 100]} key={data.Id} placeholder={<img src={`assets/genre.jpg`} alt={`dummy`} />}> <Link component={Link} to={`/album/genre/` + data.Name}> <LazyLoad once={true} placeholder={<img src={`assets/genre.jpg`} alt={`dummy`} />} >  <img className="genre-image" src={data.ThumbnailImageWeb} style={{ width: "100%", height: "100%" }} alt={data.Id} /> </LazyLoad> <h6 className="genre-name">{data.Name}</h6> </Link></LazyLoad>)

        const forNew = newSection.map((data, index) =>

            <LazyLoad height={100} offset={[-100, 100]} key={data.Id} placeholder={<img src="/assets/album.jpg" alt={`placeholder`} />}>

                <div className="new-1">

                    <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}>

                        <img className="new1-image" src={data.ThumbnailImageWeb} style={{ width: "100%", height: "100%" }} alt={data.Id} />

                        <h6>{data.Name}</h6>

                    </Link>


                    <div className="play-icon">

                        <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div> </div> <div className="new-2">

                    <Link component={Link} to={`/album/` + newSection2[index].Id + `/` + newSection2[index].Name}>

                        <LazyLoad once={true} placeholder={<img src={`assets/album.jpg`} alt={`dummy`} />} >

                            <img className="new2-image" src={newSection2[index].ThumbnailImageWeb} style={{ width: "100%", height: "100%" }} alt={newSection2[index].Id} />

                        </LazyLoad>
                        <h6>{newSection2[index].Name}</h6></Link>

                    <div className="play-icon"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} />

                    </div> </div> </LazyLoad>)

        const forPopular = popularSection.map(data => <LazyLoad height={100} offset={[-100, 100]} key={data.Id} placeholder={<img src="assets/album.jpg" alt={`placeholder`} />}> <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}> <LazyLoad once={true} placeholder={<img src={`assets/album.jpg`} alt={`dummy`} />} > <img className="popular-image" src={data.ThumbnailImageWeb} style={{ width: "100%", height: "100%" }} alt={data.Id} /> </LazyLoad> <h6>{data.Name}</h6> </Link> {/* <Link component={Link} to={`/artist/` + data.ArtistId + `/` + data.Artist}><h6 className="artist-name">{data.Artist}</h6></Link> */} <div className="play-icon"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div></LazyLoad>)

        const forArtist = artistSection.map(data => <LazyLoad height={100} offset={[-100, 100]} key={data.Id} placeholder={<img src="assets/dummy-img.jpg" alt={`placeholder`} />}> <Link component={Link} to={`/artist/` + data.Id + `/` + data.Name}> <LazyLoad once={true} placeholder={<img src={`assets/album.jpg`} alt={`dummy`} />} > <img className="artist-image" src={data.ThumbnailImageWeb} style={{ width: "100%", height: "100%" }} alt={data.Id} /> </LazyLoad> </Link></LazyLoad>)

        const forAlbum = albumSection.map(data => <LazyLoad height={100} offset={[-100, 100]} key={data.Id} placeholder={<img src="assets/album.jpg" alt={`placeholder`} />}> <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}> <LazyLoad once={true} placeholder={<img src={`assets/album.jpg`} alt={`dummy`} />} > <img className="album-image" src={data.ThumbnailImageWeb} style={{ width: "100%", height: "100%" }} alt={data.Id} /> </LazyLoad> <h6>{data.Name}</h6> </Link> {/* <Link component={Link} to={`/artist/` + data.ArtistId + `/` + data.Artist}><h6 className="artist-name">{data.Artist}</h6></Link> */} <div className="play-icon"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div> </LazyLoad>)

        const forIslamic = islamicSection.map(data => <LazyLoad height={100} offset={[-100, 100]} key={data.Id} placeholder={<img src="assets/album.jpg" alt={`placeholder`} />}> <Link component={Link} to={`/album/` + data.Id + `/` + data.Name}> <LazyLoad once={true} placeholder={<img src={`assets/album.jpg`} alt={`dummy`} />} > <img className="islamic-image" src={data.ThumbnailImageWeb} style={{ width: "100%", height: "100%" }} alt={data.Id} /> </LazyLoad> <h6>{data.Name}</h6> </Link> {/* <Link component={Link} to={`/artist/` + data.ArtistId + `/` + data.Artist}><h6 className="artist-name">{data.Artist}</h6></Link> */} <div className="play-icon"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div> </LazyLoad>)

        const forCollection = collectionsSection.map(data => <LazyLoad height={100} offset={[-100, 100]} key={data.Id} placeholder={<img src="assets/album.jpg" alt={`placeholder`} />}> <Link component={Link} to={`/collection/` + data.Id + `/` + data.Name}> <LazyLoad once={true} placeholder={<img src={`assets/album.jpg`} alt={`dummy`} />} > <img className="collection-image" src={data.ThumbnailImageWeb} style={{ width: "100%", height: "100%" }} alt={data.Id} /> </LazyLoad> <h6>{data.Name}</h6> </Link> {/* <Link component={Link} to={`/artist/` + data.ArtistId + `/` + data.Artist}><h6 className="artist-name">{data.Artist}</h6></Link> */} <div className="play-icon"> <img src="assets/play-icon.svg" alt='play-icon' onClick={() => this.playTracksDirectly(data.Id)} /> </div> </LazyLoad>)

        return (
            <div className="homeMainClass">

                <LanguageBar2 />
                
                

                <div className="sliderBox">
                    <AliceCarousel
                        items={forSlider}
                        responsive={this.responsiveSlider}
                        autoPlayInterval={4000}
                        autoPlay={false}
                        fadeOutAnimation={true}
                        stagePadding={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={false}
                        buttonsDisabled={false}
                        dotsDisabled={true}
                    />
                </div>

                <hr className="divider" />

                <div className="sliderSection_1 new-section-slider">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">New</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to="/explore/urdu-new" className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <AliceCarousel
                        items={forNew}
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

                <hr className="divider2" />
                <div className="sliderSection_1">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Popular</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to="/explore/urdu-trend" className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <AliceCarousel
                        items={forPopular}
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
                <hr className="divider2" />
                <div className="sliderSection_1">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Collection</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to="/explore/urdu-collect" className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>


                    <AliceCarousel
                        items={forCollection}
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
                <hr className="divider2" />
                <div className="sliderSection_1 artist_section">


                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Artist</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to="/explore/urdu-artist" className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <AliceCarousel
                        items={forArtist}
                        responsive={this.artistR}
                        autoPlayInterval={6000}
                        autoPlay={false}
                        fadeOutAnimation={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={false}
                        buttonsDisabled={false}
                        dotsDisabled={true}
                    />
                </div>
                <hr className="divider2" />
                <div className="sliderSection_1">


                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Albums</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to="/explore/urdu-album" className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <AliceCarousel
                        items={forAlbum}
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
                <hr className="divider2" />
                <div className="sliderSection_1">

                    <Grid container spacing={3} className="slider-header"> <Grid item xs={6} className="slider-side1"><h2 className="slider_heading">Islamic</h2></Grid> <Grid item xs={6} className="slider-side2">  <Link to="/explore/urdu-islamic" className="see_all"><h6 className="slider_subheading">See All <i className="material-icons"> arrow_forward</i></h6></Link> </Grid> </Grid>

                    <AliceCarousel
                        items={forIslamic}
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

                <hr className="divider2" />

                <div className="sliderSection_1 grenre_section">

                    <h2 className="slider_heading">Genres</h2>

                    <AliceCarousel
                        items={forGenre}
                        responsive={this.responsive3}
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
        )
    }
}

export default withGlobalState(Homepage)