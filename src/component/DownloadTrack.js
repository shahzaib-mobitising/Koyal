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


    function handleClickOpen() {

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
                        alert('Sorry Sir ! you have insufficient balance.')
                    } else {

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

                        alert('Song will be downloaded in a moment')
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
    }

    function handleCloseModal2() {
        setOpenModal2(false);
    }

    const classes = useStyles();

    const [values, setValues] = React.useState({
        rbtCode: "",
        msisdn: "",
        trackId: props.TrackId,
        userId: 0,
        verifyCode: "",
        operator: 'telenor',
        code: ''
    });

    const [loading, setLoading] = React.useState({
        loader: false,
        formEnterNumber: true,
        formConfirmRBT: false,
        formFinalMsg: false
    });


    function selectOperator(event) {

        event.persist()

        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));

    }

    function phoneNumber(event) {

        event.persist()

        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
        console.log(event.target.value)

    }

    function submitRBT(event) {

        event.preventDefault();

        // Breaking Number

        setLoading(values => ({
            ...values,
            loader: true,
        }));

        let numberCount = values.msisdn.length

        if (numberCount === 12) {

            var numberArray = values.msisdn.split('')

            var mergeStartTwoNumber = numberArray[0].concat(numberArray[1])

            if (mergeStartTwoNumber === '92') {
                //console.log(values.msisdn)
                axios.post(`https://api.koyal.pk/musicapp/?request=send-verify-download-react`, values)
                    .then(response => {
                        //console.log(response)

                        setLoading(values => ({
                            ...values,
                            loader: false,
                            formEnterNumber: false,
                            formConfirmRBT: true,
                            formFinalMsg: false
                        }));

                        setValues(values => ({
                            ...values,
                            code: response.data.Response.code
                        }));

                    })
                    .catch(error => {
                        console.log(error)

                    })
            }
            else {
                alert('Number will start from 92');
            }
        }
        else {
            alert('Incorrect length of mobile number.')
        }


    }

    function verifysCode(event) {

        event.persist()

        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));

    }


    function confirmBtnRBT(event) {

        event.preventDefault();

        let confirmCodeLength = values.verifyCode.length
        let confirmCode = 'download-'.concat(values.verifyCode)

        setLoading(values => ({
            ...values,
            loader: true,
        }));

        console.log(values.code)

        if (confirmCodeLength === 4 && confirmCode === values.code) {

            localStorage.setItem('msisdn', JSON.stringify(values.msisdn));

            axios.post(`https://api.koyal.pk/musicapp/?request=set-download-react`, values)
                .then(response => {

                    let verifyResp = response.data.Response.Success

                    let sendData = {
                        UserId: 0,
                        AlbumId: props.Albumid,
                        TrackId: props.TrackId,
                        Action: 'download',
                        Msisdn: values.msisdn
                    }

                    downloadTrack(sendData)

                    if (verifyResp) {

                        setLoading(values => ({
                            ...values,
                            loader: false,
                            formEnterNumber: false,
                            formConfirmRBT: false,
                            formFinalMsg: true
                        }));

                        setTimeout(() => setOpen(false), 5000)
                    } else {
                        alert('There is some error.')
                    }

                })
                .catch(error => {
                    console.log(error)

                })

        } else {

            alert('Incorrect Code.')
        }

    }

    const enterNumberBox = <DialogContent>
        <DialogContentText id="alert-dialog-description">
            <div className="DialogContent ">
                <div className="setCallerTune">
                    <p className="setTune">Subscribe Now</p>
                    <p>Download unlimited songs, you will be charged Rs. 1+Tax/Day</p>
                </div>
            </div>
            <div className="formtune">
                <form onSubmit={submitRBT}>
                    <select
                        value={values.rbtCode}
                        onChange={selectOperator}
                        name="rbtCode"
                        required
                    >
                        {/* <option value="">Select</option> */}
                        {props.RBTCodes.map((data, index) => {
                            if (data.code !== "0") {
                                return (
                                    <option key={index} value={data.code}>
                                        {data.name}
                                    </option>
                                );
                            }
                        })}
                    </select>
                    <input
                        type="text"
                        placeholder="923xx xxxxxxx"
                        value={values.msisdn}
                        name="msisdn"
                        onChange={phoneNumber}
                        id="msisdn"
                        required
                    />
                    <button type="submit">
                        Submit
          </button>
                </form>
            </div>
        </DialogContentText>
    </DialogContent>


    const confirmNumberBox = <DialogActions>
        <Grid item xs={12}>
            <div className="DialogContent ">
                <div className="setCallerTune">
                    <p className="setTunesub">Subscribe Now</p>
                    <p className="download_text">Download Unlimited Songs</p>
                </div>
            </div>
            <div className="">
                <p className="setTunesub">Enter Verification Code</p>
            </div>
            <form onSubmit={confirmBtnRBT}>
                <div className="verification_code">

                    <input
                        placeholder="XXXX"
                        type="text"
                        value={values.verifyCode}
                        name="verifyCode"
                        onChange={verifysCode}
                        id="msisdn"
                        required
                    />

                    {/* <div>
          <a href="#!"> Resend Code</a>
        </div> */}
                </div>
                <button type="submit" className="button_styles">
                    Verify
    </button>
            </form>
        </Grid>
    </DialogActions>


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

                {loading.formEnterNumber ? enterNumberBox : <></>}

                {loading.formConfirmRBT ? confirmNumberBox : <></>}

                {loading.formFinalMsg ? finalBox : <></>}

                <div className="LineBreak"></div>
            </Dialog>
        </>
    );
}
