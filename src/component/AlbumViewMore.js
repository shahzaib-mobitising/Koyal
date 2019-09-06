import React, { Component } from 'react'
//import SearchAlphabet from './SearchAlphabet';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { LazyImage } from "react-lazy-images";
import CircularProgress from '@material-ui/core/CircularProgress';
//import AlbumLoader from './AlbumLoader';
import AlphabetViewMoreCustom from './AlphabetViewMoreCustom';


export default class AlbumViewMore extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            hasMore: true,
            offset: 1,
            langIDs: '',
            itemsCheck: [],
            loadingData: true,
        }
    }

    getData = () => {

        setTimeout(() => {
            axios.get(`http://api.koyal.pk/app_files/web/seeall/${this.props.match.params.languageAlbums}.json`)
                .then(response => {
                 
                    this.setState({
                        items: response.data.Response.Albums,
                        hasMore: true,
                        loadingData: false
                    })
                   
                })
                .catch(error => {
                    console.log(error)
                   
                })
        }, 1000);


    }

    componentDidMount() {

        if (this.props.match.params.languageAlbums) {

            let forLangId = this.props.match.params.languageAlbums.split("-", 1);


            if (forLangId[0] === 'urdu') {
                this.setState({
                    langIDs: 1
                });
            } else if (forLangId[0] === 'punjabi') {
                this.setState({
                    langIDs: 2
                });
            } else if (forLangId[0] === 'saraiki') {
                this.setState({
                    langIDs: 3
                });
            } else if (forLangId[0] === 'sindhi') {
                this.setState({
                    langIDs: 4
                });
            } else if (forLangId[0] === 'pashto') {
                this.setState({
                    langIDs: 5
                });
            } else if (forLangId[0] === 'balochi') {
                this.setState({
                    langIDs: 6
                });
            } else if (forLangId[0] === 'hindko') {
                this.setState({
                    langIDs: 7
                });
            }

        }

        this.getData()
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

            let forLangItem = this.props.match.params.languageAlbums.split("-", 2);

            let urlMore = ''

            if (forLangItem[1] === 'new') {

                urlMore = `http://api.koyal.pk/musicapp/?request=get-albums&action=general&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&orderBy=ReleaseDate&orderAs=DESC`

            } else if (forLangItem[1] === 'trend') {

                urlMore = `http://api.koyal.pk/musicapp/?request=get-albums&action=popular&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&orderBy=Views&orderAs=DESC`

            } else if (forLangItem[1] === 'collect') {

                urlMore = `http://api.koyal.pk/musicapp/?request=get-albums&action=collect&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}`

            } else if (forLangItem[1] === 'artist') {

                urlMore = `http://api.koyal.pk/musicapp/?request=get-artists-nd&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}`


            } else if (forLangItem[1] === 'album') {

                urlMore = `http://api.koyal.pk/musicapp/?request=get-albums&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}`

            } else if (forLangItem[1] === 'islamic') {

                urlMore = `http://api.koyal.pk/musicapp/?request=get-albums&action=ramadan&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&orderBy=Views&orderAs=DESC`
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


    render() {

        const checkArtist = this.props.match.params.languageAlbums.split("-", 2);

        const forAlbum2 = <Grid container spacing={3}> {this.state.items.map((i, index) => (
            <Grid key={index} item xs={4} md={2}>
                <Card className="viewMoreBox">
                    <Link component={Link} to={`/album/` + i.Id + `/` + i.Name}>

                        <LazyImage
                            src={i.ThumbnailImageWeb}
                            alt={i.Name}
                            debounceDurationMs={900}
                            placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                            actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={i.Name} />)} />
                        <p className="album-title">{i.Name}</p>

                        {/* <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={i.Name}
                                image={i.ThumbnailImageWeb}
                                title={i.Name}
                            />
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    {i.Name}
                                </Typography>
                            </CardContent>
                        </CardActionArea> */}
                    </Link>
                </Card>
            </Grid>
        ))}</Grid>

        const forArtist = <Grid container spacing={7}> {this.state.items.map((i, index) => (
            <Grid key={index} item xs={4} md={2}>
                <Card className="viewMoreBox">
                    <Link component={Link} to={`/artist/` + i.Id + `/` + i.Name}>
                        <LazyImage
                            src={i.ThumbnailImageWeb}
                            alt={i.Name}
                            debounceDurationMs={900}
                            placeholder={({ imageProps, ref }) => (<img ref={ref} src={`/assets/albumx150.jpg`} alt={imageProps.alt} style={{ width: "100%" }} />)}
                            actual={({ imageProps }) => (<img {...imageProps} style={{ width: "100%" }} alt={i.Name} />)} />
                        <p className="album-title">{i.Name}</p>
                        {/* <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={i.Name}
                                image={i.ThumbnailImageWeb}
                                title={i.Name}
                            />
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    {i.Name}
                                </Typography>
                            </CardContent>
                        </CardActionArea> */}
                    </Link>
                </Card>
            </Grid>
        ))}</Grid>



        return (

            <div className="alphabetMainBox">


                <AlphabetViewMoreCustom languageCurrent={this.props.match.params.languageAlbums} />

                {/* <SearchAlphabet languageCurrent={this.props.match.params.languageAlbums} /> */}

                <div className="viewMoreAlphabet">



                    {/* {this.state.loadingData ? <AlbumLoader /> : <> */}

                    <InfiniteScroll
                        dataLength={this.state.items.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        loader={<div className="viewMoreLoader"><CircularProgress /></div>}
                        endMessage={<p className="endMessageViewMore"> <b>Thank you for visiting Koyal.pk</b></p>}>

                        {checkArtist[1] === 'artist'
                            ? forArtist
                            : forAlbum2
                        }

                    </InfiniteScroll>

                    {/* </>} */}


                </div>
            </div>

        )
    }
}
