import React, { Component } from 'react'
import { Button, Modal, Image, Header } from 'semantic-ui-react'
import ReactGA from 'react-ga';
import axios from 'axios'

export default class DownloadTrackV2 extends Component {

    constructor(props) {
        super(props)

        this.directDownload = this.directDownload.bind(this)

        this.state = {
            openDownloadBox: false,
            modalSize: 'mini',
            openDownloadInfo: false,
            infoHeading: '',
            infoText: ''
        }
    }

    // Open Donwload Box
    showDownloadBox = (modalSize) => () => this.setState({ modalSize, openDownloadBox: true })
    closeDownloadBox = () => this.setState({ openDownloadBox: false })

    // Open Info Box
    closeInfoBox = () => this.setState({ openDownloadInfo: false })

    // Direct Download Function 
    directDownload = () => {

        let msisdn2 = localStorage.getItem('msisdn')

        if (msisdn2 !== null || msisdn2.length !== 0) {

            let sendData = {
                UserId: 0,
                AlbumId: this.props.Albumid,
                TrackId: this.props.TrackId,
                Action: 'download',
                Msisdn: localStorage.getItem('msisdn')
            }

            this.downloadProcess(sendData)
        }
    }

    // Download Process
    downloadProcess = (sendData) => {

        axios.post(`https://api.koyal.pk/musicapp/charge-download-web.php`, sendData)
            .then(response => {

                let url = this.props.trackURL
                let nameT = `${this.props.trackName}.mp3`;
                const method = 'GET';

                let checkResp = response.data.Response.response

                if (checkResp === 'numbererror') {

                    this.setState({
                        openDownloadBox: false,
                        openDownloadInfo: true,
                        infoHeading: 'Ooops!!',
                        infoText: 'Sorry !!! There is an Error in Number.',
                    })

                } else {

                    let checkResp2 = response.data.Response.response

                    if (checkResp2 === 'notcharged') {

                        this.setState({
                            openDownloadBox: false,
                            openDownloadInfo: true,
                            infoHeading: 'Ooops!!',
                            infoText: 'Sorry !!! you have insufficient balance.',
                        })

                    } else {

                        ReactGA.event({
                            category: 'Download Success',
                            action: 'Download Completed',
                            transport: 'beacon',
                            label: `${nameT}`
                        });

                        axios.request({
                            url,
                            method,
                            responseType: 'blob', //important
                        }).then(({ data }) => {
                            //console.log(data)
                            const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                            const link = document.createElement('a');
                            link.href = downloadUrl;
                            link.setAttribute('download', nameT); //any other extension
                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                        });

                        this.setState({
                            openDownloadBox: false,
                            openDownloadInfo: true,
                            infoHeading: 'Thank You !!!',
                            infoText: 'Your Download Will Begin Shortly',
                        })
                    }
                }

            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {

        const { openDownloadBox, modalSize, infoHeading, infoText, openDownloadInfo } = this.state
        const { trackURL, albumImage, trackName, albumName, artistName, TrackId, Albumid } = this.props

        // Download URL
        let nameT2 = `${trackName}.mp3`;
        const urlLink = `http://charge.koyal.pk/koyaldownload/scripts/download.php?pageURL=${window.location}&trackId=${TrackId}&userId=0&verifyCode=&code=&action=download&AlbumId=${Albumid}&trackURL=${trackURL}&trackName=${nameT2}`;

        // Check MSISDN
        const checkLocalStorageNum = localStorage.getItem('msisdn');

        return (
            <div className="NewPopupsContainer">

                <i aria-hidden="true" onClick={this.showDownloadBox(modalSize)} className="download icon" />

                {/* Open Download Box */}
                <Modal
                    size={modalSize}
                    open={openDownloadBox}
                    onClose={this.closeDownloadBox}
                    dimmer={'blurring'}
                    className='newPopupBox'
                    centered={true}
                    trigger={<Button className="dn">Show Modal</Button>} closeIcon
                >
                    <Modal.Header>KOYAL - SUBSCRIPTION</Modal.Header>
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
                        <p className="textDesc1">Subscribe and Download Unlimited Content, you will be charged Rs 1 per Day</p>
                        <p className="textDesc2">(for each additional track you will be charged Rs 0.2 per track after 5 tracks)</p>
                        {
                            checkLocalStorageNum === null ?
                                <a href={urlLink}><div class="ui primary button btnAction" tabindex="0">Activate</div></a> :
                                <Button color="blue" className="btnAction" onClick={() => this.directDownload()}>Activate</Button>
                        }
                    </Modal.Description>
                </Modal>
                {/* Open Download Box */}

                {/* Info Download Box */}
                <Modal
                    size={modalSize}
                    open={openDownloadInfo}
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
                        <p className="infoHeading">{infoHeading}</p>
                        <p className="infoText">{infoText}</p>
                        <Button color="blue" className="btnAction" onClick={() => this.closeInfoBox()}>Done</Button>
                    </Modal.Description>
                </Modal>
                {/* Info Download Box */}

            </div>
        )
    }
}
