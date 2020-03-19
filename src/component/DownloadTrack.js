import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import axios from 'axios'
import { Loader } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import ReactGA from 'react-ga';


const useStyles = makeStyles(theme => ({
    root: {
        width: "25%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    inline: {
        display: "inline"
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    Sharecontainer: {
        display: "flex",
        flexWrap: "wrap",
        padding: "10px"
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        width: 20
    },
    textFieldMy: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(2)
        // width: 260
    },
    textStyle: {
        color: "gray"
    },
    TrackName: {
        color: "gray",
        fontSize: "20px",
        margin: "0px"
    },
    ArtistName: {
        color: "gray",
        fontSize: "12px",
        margin: "0px"
    },
    FooterTitle: {
        color: "gray",
        fontSize: "20px",
        margin: "0px"
    },
    closeTag: {
        float: "Right"
    },
    SubPera: {
        padding: "0px",
        margin: "0px",
        fontSize: "20px",

    },
    margin: {
        margin: theme.spacing(0)
    },

    AlbumImg: {
        width: "20px",
        height: "59px",
        marginLeft: "32%",
        marginBottom: "5px"
    },
    SquareImg: {
        height: "60px",
        width: "55px",
        backgroundColor: "#555",
        textAlign: "center !important"
    }

}));

export default function DownloadTrack(props) {
    const [open, setOpen] = React.useState(false);
    const [openModal2, setOpenModal2] = React.useState(false);
    const [NoBalanceMsg, NoBalanceMsgF] = React.useState(false);
    const [trackDownloadMsg, trackDownloadMsgF] = React.useState(false);



    function handleClickOpen() {

        // ReactGA.event({
        //     category: `${props.componentName}`,
        //     action: 'Download Click',
        //     transport: 'beacon',
        //     label: `${props.trackName}`
        // });


        let sendData = {
            UserId: 0,
            AlbumId: props.Albumid,
            TrackId: props.TrackId,
            Action: 'download',
            Msisdn: localStorage.getItem('msisdn')
        }

        let msisdn2 = localStorage.getItem('msisdn')

        if (msisdn2 === null || msisdn2.length === 0) {

        } else {
            downloadTrack(sendData)
        }

    }

    function NoBalanceOpen() {

        NoBalanceMsgF(true)
    }

    function NoBalanceClose() {
        NoBalanceMsgF(false)
    }

    function trackDownloadOpen() {

        trackDownloadMsgF(true)

    }

    function trackDownloadClose() {
        trackDownloadMsgF(false)
    }


    function downloadTrack(sendData) {

        axios.post(`https://api.koyal.pk/musicapp/charge-download-web.php`, sendData)
            .then(response => {

                let url = props.trackURL
                let nameT = `${props.trackName}.mp3`;
                const method = 'GET';

                let checkResp = response.data.Response.response

                if (checkResp === 'numbererror') {

                } else {

                    let checkResp2 = response.data.Response.response

                    if (checkResp2 === 'notcharged') {
                        NoBalanceMsgF(true)

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
                        //alert('Download Complete')
                        trackDownloadMsgF(true)
                    }
                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    function handleClose() {
        setOpen(false);
    }

    function handleClickOpenModal2() {
        setOpenModal2(true);
        ReactGA.event({
            category: `${props.componentName}`,
            action: 'Download Click',
            transport: 'beacon',
            label: `${props.trackName}`
        });

    }

    function handleCloseModal2() {
        setOpenModal2(false);
    }

    const classes = useStyles();

    const [loading, setLoading] = React.useState({
        loader: false,
        formEnterNumber: true,
        formConfirmRBT: false,
        formFinalMsg: false
    });


    const finalBox = <DialogActions>
        <Grid item xs={12}>
            <div className="DialogContent ">
                <div className="setCallerTune">
                    <p className="setTunec">Congratulations</p>
                </div>
            </div>
            <div className="congs_text">
                <p>You Have Successfully Subscribed to Koyal.pk
          <br />
                    <br />
                    Now you can download <br />Unlimited Songs.</p>
            </div>
            <button className="button_styles">
                Done
      </button>
        </Grid>

    </DialogActions>

    let url2 = props.trackURL
    let nameT2 = `${props.trackName}.mp3`;

    const urlLink = `http://charge.koyal.pk/koyaldownload/scripts/download.php?pageURL=${window.location}&trackId=${props.TrackId}&userId=0&verifyCode=&code=&action=download&AlbumId=${props.Albumid}&trackURL=${url2}&trackName=${nameT2}`;
    //const urlLink = `http://localhost/koyal-download-new/download.php?pageURL=${window.location}&trackId=${props.TrackId}&userId=0&verifyCode=&code=&action=download&AlbumId=${props.Albumid}&trackURL=${url2}&trackName=${nameT2}`;
    const checkLocalStorageNum = localStorage.getItem('msisdn');


    return (

        <>

            {
                checkLocalStorageNum === null ?
                    <i aria-hidden="true" className="download icon" onClick={handleClickOpenModal2}></i> :
                    <i aria-hidden="true" className="download icon" onClick={handleClickOpen}></i>
            }


            <div className="congoTrackBox">
                <Dialog open={trackDownloadMsg} onClose={trackDownloadClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Thankyou !!!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Song will be downloaded in a moment
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={trackDownloadClose} color="primary"> OK </Button>
                    </DialogActions>
                </Dialog>
            </div>


            <div className="noBalanceBox">
                <Dialog open={NoBalanceMsg} onClose={NoBalanceClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Alert !!!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Sorry !!! you have insufficient balance. Thank You
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={NoBalanceClose} color="primary"> OK </Button>
                    </DialogActions>
                </Dialog>
            </div>


            <Dialog open={openModal2} onClose={handleCloseModal2} aria-labelledby="form-dialog-title">
                <DialogTitle id="alert-dialog-title">
                    <Grid item xs={12}>
                        <div className="AlignMeCenter share_text congoMainTitle"><b>Koyal - Subscription</b></div>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <div className={classes.AlbumImg} className="Album_img_ringtone">
                                <div className={classes.SquareImg}>
                                    <img src={props.albumImage} alt={props.trackName} />
                                </div>
                                <div className="trackName congoTrack">
                                    <p className={classes.TrackName}>{props.trackName}</p>
                                    <div className="artist_name">
                                        <p className={classes.ArtistName}>{props.artistName}</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogActions>
                    <Grid item xs={12}>
                        <div className="congs_text congo_text2">
                            <p> <span className="Line1Congo">Subscribe and Download Unlimited Content, you will be charged Rs 1 per Day</span>
                                <br />
                                <br />
                                <span className="Line2Congo"> (for each additional track you will be charged Rs 0.2 per track after 5 tracks) </span></p>
                        </div>
                        <button className="button_styles">
                            <a className="triggerClick activeLinkBtn" href={urlLink}>Activate</a>
                        </button>
                    </Grid>

                </DialogActions>
                <div className="LineBreak"></div>
            </Dialog>

            <Dialog className="dialoge_Ringtone"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Grid container spacing={0}>

                        <div onClick={handleClose} className="Cross">
                            <i className="material-icons">close</i>
                        </div>
                        <Grid item xs={12}>
                            <div className={classes.AlbumImg} className="Album_img_ringtone">
                                <div className={classes.SquareImg}>
                                    <img src={props.albumImage} alt={props.trackName} />
                                </div>
                                <div className="trackName">
                                    <p className={classes.TrackName}>{props.trackName}</p>
                                    <div className="artist_name">
                                        <p className={classes.ArtistName}>{props.artistName}</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </DialogTitle>

                {loading.loader ? <Loader active inline='centered' /> : <></>}

                {loading.formFinalMsg ? finalBox : <></>}

                <div className="LineBreak"></div>
            </Dialog>
        </>
    );
}
