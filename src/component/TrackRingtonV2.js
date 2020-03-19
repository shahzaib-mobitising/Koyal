import React, { Component } from 'react'
import { Button, Modal, Image, Header } from 'semantic-ui-react'
import ReactGA from 'react-ga';
import axios from 'axios'

export default class TrackRingtonV2 extends Component {

    constructor(props) {
        super(props)

        this.directRBTSet = this.directRBTSet.bind(this)

        this.state = {
            openRBTBox: false,
            modalSize: 'mini',
            openRBTInfo: false,
            infoHeadingRBT: '',
            infoTextRBT: ''
        }
    }

    // Open RBT Box
    showRBTBox = (modalSize) => () => this.setState({ modalSize, openRBTBox: true })
    closeRBTBox = () => this.setState({ openRBTBox: false })


    // Open Info Box
    closeInfoBox = () => this.setState({ openRBTInfo: false })


    // Direct RBT Set

    directRBTSet = () => {

        ReactGA.event({
            category: `${this.props.componentName}`,
            action: 'RBT Click',
            transport: 'beacon',
            label: this.props.trackName
        });


        let sendData = {
            msisdn: localStorage.getItem('msisdn'),
            operator: "telenor",
            rbtCode: this.props.RBTCodes[0].code,
            trackId: this.props.TrackId,
            userId: 0,
            verifyCode: "verified"
        }


        axios.post(`https://api.koyal.pk/musicapp/?request=set-rbt-react`, sendData)
            .then(response => {
                //console.log(response)
                let verifyResp = response.data.Response.Success

                if (verifyResp) {

                    this.setState({
                        openRBTBox: false,
                        openRBTInfo: true,
                        infoHeadingRBT: 'Congratulations',
                        infoTextRBT: 'You will recieve a confirmation message shortly.',
                    })

                    ReactGA.event({
                        category: 'RBT Completed',
                        action: 'RBT Success',
                        transport: 'beacon',
                        label: this.props.trackName
                    });

                } else {
                    this.setState({
                        openRBTBox: false,
                        openRBTInfo: true,
                        infoHeadingRBT: 'Ooopss !!!',
                        infoTextRBT: 'Sorry !!! Caller Tune did not set on this number.',
                    })
                }

            })
            .catch(error => {
                console.log(error)

            })

    }


    render() {

        const { openRBTBox, modalSize, infoHeadingRBT, infoTextRBT, openRBTInfo } = this.state
        const { albumImage, albumName, artistName, TrackId, RBTCodes } = this.props
        const urlLink = `http://charge.koyal.pk/koyaldownload/scripts/rbt.php?rbtCode=${RBTCodes[0].code}&pageURL=${window.location}&trackId=${TrackId}&action=rbt`;
        const checkLocalStorageNum = localStorage.getItem('msisdn');

        return (
            <div className="NewPopupsContainer">

                <div onClick={this.showRBTBox(modalSize)}>
                    <i aria-hidden="true" className="bell outline icon"></i>  Caller Tune
               </div>

                {/* Open RBT Box */}
                <Modal
                    size={modalSize}
                    open={openRBTBox}
                    onClose={this.closeRBTBox}
                    dimmer={'blurring'}
                    className='newPopupBox'
                    centered={true}
                    trigger={<Button className="dn">Show Modal</Button>} closeIcon
                >
                    <Modal.Header>KOYAL - CALLER TUNE</Modal.Header>
                    <Modal.Content>
                        <Image
                            src={albumImage}
                            wrapped
                            rounded
                            centered
                            size='small'
                            className="mainImg"
                            alt={albumName} />
                        <Image
                            src={`/assets/popupBg.png`}
                            fluid
                            centered
                            className="bgPopup"
                            size='huge'
                            alt={'Background'} />
                    </Modal.Content>
                    <Modal.Description>
                        <Header>{albumName}</Header>
                        <p className="artistName">{artistName}</p>
                        <p className="textDesc1">Now you can set caller tune for just Rs 1.5+T/Day and content charges of Rs 3+T/track</p>
                        {
                            checkLocalStorageNum === null ?
                                <a href={urlLink}><div class="ui primary button btnAction" tabindex="0">Activate</div></a> :
                                <Button color="blue" className="btnAction" onClick={() => this.directRBTSet()}>Activate</Button>
                        }
                    </Modal.Description>
                </Modal>
                {/* Open RBT Box */}

                {/* Info RBT Box */}
                <Modal
                    size={modalSize}
                    open={openRBTInfo}
                    onClose={this.closeInfoBox}
                    dimmer={'blurring'}
                    className='newPopupBox'
                    centered={true}
                >
                    <Modal.Content>
                        <Image
                            src={`/assets/popupBg.png`}
                            fluid
                            centered
                            className="bgPopup infoBgPopup"
                            size='huge'
                            alt={'Background'} />
                    </Modal.Content>
                    <Modal.Description>
                        <p className="infoHeading">{infoHeadingRBT}</p>
                        <p className="infoText">{infoTextRBT}</p>
                        <Button color="blue" className="btnAction" onClick={() => this.closeInfoBox()}>Done</Button>
                    </Modal.Description>
                </Modal>
                {/* Info RBT Box */}

            </div>
        )
    }
}
