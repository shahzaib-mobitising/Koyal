import React, { Component, Fragment } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//import homeDataDummy from '../dummy/home.json'
import { Card, Image, Button, Divider, Placeholder } from 'semantic-ui-react'
//import { LazyImage } from "react-lazy-images";
import axios from 'axios'
import { LazyImageFull, ImageState } from "react-lazy-images";

export default class TestComp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            sliderSection: [],
            genreSection: [],
            newSection: [],
            popularSection: [],
            collectionsSection: [],
            artistSection: [],
            albumSection: [],
            islamicSection: []
        }
    }

    componentDidMount() {

        setTimeout(() =>

            axios.get('https://api.koyal.pk/app_files/web/new/home.json')
                .then(response => {

                    this.setState({
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

                })
                .catch(error => {
                    console.log(error)
                    this.setState({ errMsg: 'Error Data' })
                })

            , 2000)
    }

    handleLoadingClick = () => {
        this.setState({ loading: true })

        // setTimeout(() => {
        //     this.setState({ loading: false })
        // }, 3000)
    }

    render() {
        const { sliderSection, loading } = this.state
        console.log(sliderSection)

        const forSlider = sliderSection.map(data => <Card key={data.Id}>
            {loading ? (
                <Placeholder>
                    <Placeholder.Image square />
                </Placeholder>
            ) : (
                    <LazyImageFull src="https://api.koyal.pk/musicapp/assets/images/sliders/MT_16800.jpg">
                        {({ imageProps, imageState, ref }) => (
                            <img
                                alt='test'
                                {...imageProps}
                                ref={ref}
                                src={
                                    imageState === ImageState.LoadSuccess
                                        ? imageProps.src
                                        : "https://api.koyal.pk/musicapp/assets/images/sliders/MT_16749.jpg"
                                }
                                style={{ opacity: ImageState.LoadSuccess ? "1" : "0.5" }}
                            />
                        )}
                    </LazyImageFull>
                )}
        </Card>)



        return (
            <React.Fragment>

                <Button loading={loading} onClick={this.handleLoadingClick} primary>
                    Simulate loading
        </Button>
                <Divider />

                <OwlCarousel
                    className="owl-theme"
                    loop
                    margin={10}
                    nav
                    stagePadding={20}
                >
                    {forSlider}
                </OwlCarousel>
            </React.Fragment >
        )
    }
}
