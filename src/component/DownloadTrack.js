import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from 'axios'
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";



const useStyles2 = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    }
}));

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "relative"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    title2: {
        marginLeft: theme.spacing(2),
        flex: 1,
        marginTop: "50px"
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles3 = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

const useStyles4 = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
        width: "100%"
    }
}));



function DownloadTrack(props) {
    const classes = useStyles();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    const classes4 = useStyles4();

    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {

        let sendData = {
            UserId: 0,
            AlbumId: props.Albumid,
            TrackId: props.TrackId,
            Action: 'download'
            //Msisdn: '923453031820'
        }

        axios.post(`http://35.156.24.14/koyaldownload/charge-download-web.php`, sendData)
            .then(response => {

               
                let checkResp = response.data.Response.response

                if (checkResp === 'numbererror') {
                    //alert('Number nahe hau')
                    setOpen(true);
                } else {

                    let checkResp2 = response.data.Response.response
                    if (checkResp2 === 'notcharged') {
                        alert('Sorry Sir ! you have insufficient balance.')
                    } else {
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


    const [loading, setLoading] = React.useState({
        loader: false,
        enterBoxState: true,
        confirmBoxState: false,
        confirmationFinal: false
    });


    const [values, setValues] = React.useState({
        rbtCode: "",
        msisdn: "",
        trackId: props.TrackId,
        userId: 0
    });

    const [confirmRBT, setConfirmRBT] = React.useState({
        rbtCode: '',
        msisdn: '',
        trackId: props.TrackId,
        userId: 0,
        verifyCode: "",
        operator: 'telenor'
    });


    function operatorChange(event) {

        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));

        setConfirmRBT(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));

        //  console.log(event.target.value);
    }

    function phoneNumberChange(event) {
        event.persist()

        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));

        setConfirmRBT(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));

        // console.log(event.target.value);
    }


    function verifysCode(event) {

        event.persist()

        setConfirmRBT(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));

    }


    function submitRBT(event) {

        event.preventDefault();

        setLoading(values => ({
            ...values,
            loader: true,
            enterBoxState: false,
            confirmBoxState: true
        }));


        // var breakNum = values.msisdn.substring(1)
        // var phoneNo = '92' + breakNum
    

        axios.post(`http://api.koyal.pk/musicapp/?request=send-verify-rbt-react`, values)
            .then(response => {

                // console.log(response.data.Response)

                setLoading(values => ({
                    ...values,
                    loader: false
                }));
            })
            .catch(error => {
                console.log(error)
                
            })
    }

    function confirmBtnRBT(event) {

        event.preventDefault();

        axios.post(`http://api.koyal.pk/musicapp/?request=set-rbt-react`, confirmRBT)
            .then(response => {

                let verifyResp = response.data.Response.Success

                if (verifyResp) {
                    setLoading(values => ({
                        ...values,
                        confirmationFinal: true,
                        confirmBoxState: false
                    }));
                    setTimeout(() => setOpen(false), 10000)
                } else {
                    alert('Incorrect RBT Verification Code.')
                }

            })
            .catch(error => {
                console.log(error)
                
            })

    }

    return (
        <>

            <img src="/assets/download_black.png" alt='ringtone' onClick={handleClickOpen} />

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                className="ringtoneScreen"
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className="mainHeadingRingtone">
                            Set your Ringtone
            </Typography>

                    </Toolbar>
                </AppBar>

                <CssBaseline />
                <Container className="ringtoneContainer">
                    <div className={classes2.root}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" className="yourNumberHeading">
                                    Enter Your Number
                </Typography>
                            </Grid>

                            {loading.enterBoxState ?
                                <Grid item xs={12} className="enterNumberBox">
                                    <form onSubmit={submitRBT} className={classes3.root} autoComplete="off">
                                        <FormControl className={classes3.formControl}>
                                            <Select
                                                value={values.rbtCode}
                                                onChange={operatorChange}
                                                displayEmpty
                                                name="rbtCode"
                                                className="selectOperatorBox"
                                            >
                                                {props.RBTCodes.map((data, index) => {
                                                    if (data.code !== "0") {
                                                        return (
                                                            <MenuItem key={index} value={data.code}>
                                                                {data.name}
                                                            </MenuItem>
                                                        );
                                                    }
                                                })}
                                            </Select>
                                        </FormControl>

                                        <FormControl className={classes4.margin}>
                                            <Input
                                                type="text"
                                                value={values.msisdn}
                                                name="msisdn"
                                                onChange={phoneNumberChange}
                                                id="msisdn"
                                                placeholder="92345xxxxxxx"
                                                className="enterNumberField"
                                                required
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                        <div className="sendMessageBtn">
                                            <Button fullWidth={true} variant="contained" color="primary" type="submit">
                                                Set Ringtone
                </Button>
                                        </div>
                                    </form>
                                </Grid>


                                : <p className="msgInfo">Your RBT confirmation code sent to your entered number.</p>

                            }


                            {loading.confirmBoxState ?
                                <>
                                    <Grid item xs={12}>

                                        <form onSubmit={confirmBtnRBT} className={classes3.root} autoComplete="off">
                                            <FormControl className={classes4.margin}>
                                                <Input
                                                    type="text"
                                                    value={confirmRBT.verifyCode}
                                                    name="verifyCode"
                                                    onChange={verifysCode}
                                                    id="msisdn"
                                                    className="enterNumberField"
                                                    required
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <AccountCircle />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>

                                            <div className="sendMessageBtn"> <Button fullWidth={true} variant="contained" color="primary" type="submit"> Confirm RBT Code </Button> </div> </form>
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <List className={classes5.root}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar
                                                        alt={props.TrackName}
                                                        src={props.ThumbnailImageWeb}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={props.TrackName}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                className={classes.inline}
                                                                color="textPrimary"
                                                            >
                                                                {props.albumName}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid> */}
                                </>
                                : <p></p>
                            }


                            <Grid item xs={12}>

                                {loading.confirmationFinal ? <p className="msgInfo">You're Successfully Subscribed for {props.TrackName} Caller Tune.</p> : <p></p>}

                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </Dialog>

        </>

    );
};

export default DownloadTrack
