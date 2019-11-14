import React, { Component } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { LazyImage } from "react-lazy-images";
import CircularProgress from '@material-ui/core/CircularProgress';
import AlbumLoader from './AlbumLoader';
import AlphabetViewMoreCustom from './AlphabetViewMoreCustom';


export default class AlbumViewMore extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            page_idd: '',
            hasMore: true,
            offset: 1,
            langIDs: '',
            itemsCheck: [],
            loadingData: true,
        }
    }

    getData = () => {

        let title_type = this.props.match.params.title + `-` + this.props.match.params.type

        axios.get(`https://api.koyal.pk/app_files/web/seeall/${title_type}.json`)
            .then(response => {

                this.setState({
                    items: response.data.Response.Albums,
                    hasMore: true,
                    loadingData: false,
                    page_idd: this.props.match.params.title
                })

            })
            .catch(error => {
                console.log(error)

            })
    }

    componentDidMount() {

        if (this.props.match.params.title) {

            let forLangId = this.props.match.params.title


            if (forLangId === 'urdu') {
                this.setState({
                    langIDs: 1
                });
            } else if (forLangId === 'punjabi') {
                this.setState({
                    langIDs: 2
                });
            } else if (forLangId === 'saraiki') {
                this.setState({
                    langIDs: 3
                });
            } else if (forLangId === 'sindhi') {
                this.setState({
                    langIDs: 4
                });
            } else if (forLangId === 'pashto') {
                this.setState({
                    langIDs: 5
                });
            } else if (forLangId === 'balochi') {
                this.setState({
                    langIDs: 6
                });
            } else if (forLangId === 'hindko') {
                this.setState({
                    langIDs: 7
                });
            }

        }

        //console.log(this.props.match.params)

        this.getData()
    }

    componentDidUpdate(props, prevState) {

        if (prevState.page_idd !== this.props.match.params.title) {
            this.getData()
        }

    }

    fetchMoreData = () => {

        if (this.state.items.length >= 500) {
            this.setState({
                hasMore: false,
            });

            return;
        }

        this.setState({
            offset: this.state.offset + 24
        });


        setTimeout(() => {

            let forLangItem = this.props.match.params.type;

            let urlMore = ''

            if (forLangItem === 'new') {

                urlMore = `https://api.koyal.pk/musicapp/?request=get-albums&action=general&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&orderBy=ReleaseDate&orderAs=DESC`

            } else if (forLangItem === 'trend') {

                urlMore = `https://api.koyal.pk/musicapp/?request=get-albums&action=popular&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&orderBy=Views&orderAs=DESC`

            } else if (forLangItem === 'collect') {

                urlMore = `https://api.koyal.pk/musicapp/?request=get-albums&action=collect&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}`

            } else if (forLangItem === 'artist') {

                urlMore = `https://api.koyal.pk/musicapp/?request=get-artists-nd&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}`


            } else if (forLangItem === 'album') {

                urlMore = `https://api.koyal.pk/musicapp/?request=get-albums&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}`

            } else if (forLangItem === 'islamic') {

                urlMore = `https://api.koyal.pk/musicapp/?request=get-albums&action=ramadan&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&orderBy=Views&orderAs=DESC`
            }

            axios.get(urlMore)

                .then(response => {
                    this.setState({
                        items: this.state.items.concat(response.data.Response.Albums),
                        itemsCheck: response.data.Response.Albums
                    })

                    if ((this.state.itemsCheck.length < 24) || (this.state.itemsCheck.length === null)) {

                        this.setState({
                            hasMore: false,
                            offset: 0
                        });

                    }
                })
                .catch(error => {
                    console.log(error)

                })
        }, 50);
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

        const checkArtist = this.props.match.params.type;

        const forAlbum2 = <Grid container spacing={3}> {this.state.items.map((i, index) => (
            <Grid key={index} item xs={4} md={2}>
                <Card className="viewMoreBox">
                    <Link to={`/album/` + i.Id + `/` + this.ToSeoUrl(i.Name)}>

                        <LazyImage
                            src={i.ThumbnailImageWeb}
                            alt={i.Name}
                            debounceDurationMs={0}
                            placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                            actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={i.Name} />)} />
                        <p className="album-title">{i.Name}</p>
                    </Link>
                </Card>
            </Grid>
        ))}</Grid>

        const forArtist = <Grid container spacing={3}> {this.state.items.map((i, index) => (
            <Grid key={index} item xs={4} md={2}>
                <Card className="viewMoreBox">
                    <Link to={`/artist/` + i.Id + `/` + this.ToSeoUrl(i.Name)}>
                        <LazyImage
                            src={i.ThumbnailImageWeb}
                            alt={i.Name}
                            debounceDurationMs={0}
                            placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                            actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={i.Name} />)} />
                        <p className="album-title">{i.Name}</p>
                    </Link>
                </Card>
            </Grid>
        ))}</Grid>

        //console.log(this.props.match.params)

        return (

            <div className="alphabetMainBox grid_alphabet">

                <AlphabetViewMoreCustom languageCurrent={this.props.match.params.title} languageCurrentType={this.props.match.params.type} />


                <div className="viewMoreAlphabet ">

                    {this.state.loadingData ? <AlbumLoader /> : <>

                        <InfiniteScroll
                            dataLength={this.state.items.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={<div className="viewMoreLoader"><CircularProgress /></div>}
                            endMessage={<p className="endMessageViewMore"> <b>Whoa !!! You have seen it All …</b></p>}>

                            {checkArtist === 'artist'
                                ? forArtist
                                : forAlbum2
                            }

                        </InfiniteScroll>

                    </>}


                </div>
            </div>

        )
    }
}
