import React, { Component } from 'react'
import axios from 'axios'
import { Container, Grid, Image, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";


export default class Notification extends Component {

    constructor(props) {
        super(props)

        this.state = {
            notifyData: []

        }
    }

    getNotification(notiApi) {

        axios.get(notiApi)
            .then(response => {

                this.setState({
                    notifyData: response.data.Response.Info
                })
                
            })
            .catch(error => {
                console.log(error)
            })

    }

    componentDidMount() {

        let localStorageMsisdn = localStorage.getItem('msisdn')
        let notiApi = ''
        if (localStorageMsisdn === null || localStorageMsisdn === '' || localStorageMsisdn.length < 14) {

            notiApi = 'https://api.koyal.pk/musicapp/?request=getNotifs'
            this.getNotification(notiApi)
        } else {
            notiApi = 'https://api.koyal.pk/musicapp/?request=getNotifs&msisdn=' + localStorageMsisdn.replace(/["']/g, "")
            this.getNotification(notiApi)
        }

    }



    render() {

        const { notifyData } = this.state

        return (

            <div className="notificationBox">
                <Container>
                    {
                        notifyData.length !== 0 ?
                            notifyData.map((data, i) =>
                                (data.Type === 'Type') ?
                                    <Segment key={i} raised className="segmentRowRBT">
                                        <Grid>
                                            <Grid.Column width={4} verticalAlign='middle'>
                                                <div className="segImg segChild">
                                                    <Image src={data.TrackImage} size='tiny' />
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column width={12} verticalAlign='middle'>
                                                <div className="segDesc segChild">
                                                    <h4>{data.TrackTitle}</h4>
                                                    <p>{data.Notif}</p>
                                                    <p className="timerText timerText2"><i aria-hidden="true" className={`clock outline icon`}></i> {data.Time}</p>
                                                </div>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                    :
                                    (data.Type === 'song') ?
                                        <Segment key={i} raised className="segmentRowRBT">
                                            <Link to={`/track/${data.TrackId}/${data.TrackTitle}`}>
                                                <Grid>
                                                    <Grid.Column width={4} verticalAlign='middle'>
                                                        <div className="segImg segChild">
                                                            <Image src={data.TrackImage} size='tiny' />
                                                        </div>
                                                    </Grid.Column>
                                                    <Grid.Column width={12} verticalAlign='middle'>
                                                        <div className="segDesc segChild">
                                                            <h4>{data.TrackTitle}</h4>
                                                            <p>{data.Notif}</p>
                                                            <p className="timerText"><i aria-hidden="true" className={`clock outline icon`}></i> {data.Time}</p>
                                                        </div>
                                                    </Grid.Column>
                                                </Grid>
                                            </Link>
                                        </Segment>
                                        :
                                        (data.Type === 'album') ?
                                            <Segment key={i} raised className="segmentRowRBT">
                                                <Link to={`/album/${data.TrackId}/${data.TrackTitle}`}>
                                                    <Grid>
                                                        <Grid.Column width={4} verticalAlign='middle'>
                                                            <div className="segImg segChild">
                                                                <Image src={data.TrackImage} size='tiny' />
                                                            </div>
                                                        </Grid.Column>
                                                        <Grid.Column width={12} verticalAlign='middle'>
                                                            <div className="segDesc segChild">
                                                                <h4>{data.TrackTitle}</h4>
                                                                <p>{data.Notif}</p>
                                                                <p className="timerText"><i aria-hidden="true" className={`clock outline icon`}></i> {data.Time}</p>
                                                            </div>
                                                        </Grid.Column>
                                                    </Grid>
                                                </Link>
                                            </Segment>
                                            :
                                            (data.Type === 'artist') ?
                                                <Segment key={i} raised className="segmentRowRBT">
                                                    <Link to={`/artist/${data.TrackId}/${data.TrackTitle}`}>
                                                        <Grid>
                                                            <Grid.Column width={4} verticalAlign='middle'>
                                                                <div className="segImg segChild">
                                                                    <Image src={data.TrackImage} size='tiny' />
                                                                </div>
                                                            </Grid.Column>
                                                            <Grid.Column width={12} verticalAlign='middle'>
                                                                <div className="segDesc segChild">
                                                                    <h4>{data.TrackTitle}</h4>
                                                                    <p>{data.Notif}</p>
                                                                    <p className="timerText"><i aria-hidden="true" className={`clock outline icon`}></i> {data.Time}</p>
                                                                </div>
                                                            </Grid.Column>
                                                        </Grid>
                                                    </Link>
                                                </Segment>
                                                :
                                                (data.Type === 'collection') ?
                                                    <Segment key={i} raised className="segmentRowRBT">
                                                        <Link to={`/collection/${data.TrackId}/${data.TrackTitle}`}>
                                                            <Grid>
                                                                <Grid.Column width={4} verticalAlign='middle'>
                                                                    <div className="segImg segChild">
                                                                        <Image src={data.TrackImage} size='tiny' />
                                                                    </div>
                                                                </Grid.Column>
                                                                <Grid.Column width={12} verticalAlign='middle'>
                                                                    <div className="segDesc segChild">
                                                                        <h4>{data.TrackTitle}</h4>
                                                                        <p>{data.Notif}</p>
                                                                        <p className="timerText"><i aria-hidden="true" className={`clock outline icon`}></i> {data.Time}</p>
                                                                    </div>
                                                                </Grid.Column>
                                                            </Grid>
                                                        </Link>
                                                    </Segment> : <></>) : <></>}
                </Container>
            </div>
        )
    }
}

