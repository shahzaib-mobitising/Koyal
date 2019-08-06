import React, { Component } from 'react'
import SearchAlphabet from './SearchAlphabet'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import albumDataDummy from '../dummy/albumViewMore.json'



export default class AlphabetViewMore extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page_idd: '',
            items: albumDataDummy.Response.Albums,
            hasMore: true,
            offset: 0,
            langIDs: '',
            itemsCheck: []
        }
    }

    getData = () => {

        axios.get(`http://www.staging.koyal.pk/musicapp/?request=get-albums&action=general&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&orderBy=ReleaseDate&orderAs=DESC&keyword=${this.props.match.params.keyword}&match=after`)
            .then(response => {
                this.setState({
                    page_idd: this.props.match.params.keyword,
                    items: response.data.Response.Albums,
                    hasMore: true
                })
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

        if (this.props.match.params.languageName.split("-", 1)) {

            let forLangId = this.props.match.params.languageName.split("-", 1)

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
        //  this.testFnf()
    }

    componentDidUpdate(props, prevState) {

        if (prevState.page_idd !== this.props.match.params.keyword) {
            this.getData()
        }

    }

    fetchMoreData = () => {

        console.log('Fetch More Data')

        if (this.state.items.length >= 5000) {
            this.setState({
                hasMore: false
            });
            return;
        }

        this.setState({
            offset: this.state.offset + 24
        });

        setTimeout(() => {

            let forLangItem = this.props.match.params.languageName.split("-", 2)

            let urlMore = ''

            if (forLangItem[1] === 'new') {

                urlMore = `http://www.staging.koyal.pk/musicapp/?request=get-albums&action=general&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&orderBy=ReleaseDate&orderAs=DESC&keyword=${this.props.match.params.keyword}&match=after`

            } else if (forLangItem[1] === 'trend') {

                urlMore = `http://www.staging.koyal.pk/musicapp/?request=get-albums&action=popular&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&orderBy=Views&orderAs=DESC&keyword=${this.props.match.params.keyword}&match=after`

            } else if (forLangItem[1] === 'collect') {

                urlMore = `http://www.staging.koyal.pk/musicapp/?request=get-albums&action=collect&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&keyword=${this.props.match.params.keyword}&match=after`

            } else if (forLangItem[1] === 'artist') {

                urlMore = `http://www.staging.koyal.pk/musicapp/?request=get-artists-nd&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&keyword=${this.props.match.params.keyword}&match=after`


            } else if (forLangItem[1] === 'album') {

                urlMore = `http://www.staging.koyal.pk/musicapp/?request=get-albums&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&keyword=${this.props.match.params.keyword}&match=after`

            } else if (forLangItem[1] === 'islamic') {

                urlMore = `http://www.staging.koyal.pk/musicapp/?request=get-albums&action=ramadan&languageId=${this.state.langIDs}&userType=guest&limit=24&offset=${this.state.offset}&orderBy=Views&orderAs=DESC&keyword=${this.props.match.params.keyword}&match=after`
            }

            axios.get(urlMore)
                .then(response => {
                    this.setState({
                        items: this.state.items.concat(response.data.Response.Albums),
                        itemsCheck: response.data.Response.Albums
                    })

                    console.log(urlMore)

                    if ((this.state.itemsCheck.length < 24) || (this.state.itemsCheck.length === null)) {

                        this.setState({
                            hasMore: false,
                            offset: 0
                        });

                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ errMsg: 'Error Data' })
                })
        }, 10);
    }

    render() {

        const checkArtist = this.props.match.params.languageName.split("-", 2);

        const forAlbum2 = <Grid container spacing={3}> {this.state.items.map((i, index) => (
            <Grid key={index} item xs={4} md={2}>
                <Card className="viewMoreBox">
                    <Link component={Link} to={`/album/` + i.Id + `/` + i.Name}>
                        <CardActionArea>
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
                        </CardActionArea>
                    </Link>
                </Card>
            </Grid>
        ))}</Grid>

        const forArtist = <Grid container spacing={7}> {this.state.items.map((i, index) => (
            <Grid key={index} item xs={4} md={2}>
                <Card className="viewMoreBox">
                    <Link component={Link} to={`/artist/` + i.Id + `/` + i.Name}> 
                        <CardActionArea>
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
                        </CardActionArea>
                    </Link>
                </Card>
            </Grid>
        ))}</Grid>

        return (
            <div className="alphabetMainBox">
                <SearchAlphabet languageCurrent={this.props.match.params.languageName} />

                <div className="viewMoreAlphabet">
                    <InfiniteScroll
                        dataLength={this.state.items.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={<p className="endMessageViewMore"> <b>Yay! You have seen it all</b></p>}>
                        
                            {checkArtist[1] === 'artist'
                                ? forArtist
                                : forAlbum2
                            }
                        
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

