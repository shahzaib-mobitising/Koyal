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


const Ringtone = props => {
    const classes = useStyles();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    const classes4 = useStyles4();

    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
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




        axios.post(`https://api.koyal.pk/musicapp/?request=send-verify-rbt-react`, values)
            .then(response => {
                console.log(response)
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

        axios.post(`https://api.koyal.pk/musicapp/?request=set-rbt-react`, confirmRBT)
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

            {/* <img src="/assets/ringtone_black.png" alt='ringtone' onClick={handleClickOpen} /> */}

            <i aria-hidden="true" class="bell outline icon" onClick={handleClickOpen}></i>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                className="ringtoneScreen ringtone_css"
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        {/* <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton> */}
                        <Typography variant="h6" className="">
                            Set your Caller Tune
            </Typography>

                    </Toolbar>
                </AppBar>

                <CssBaseline />
                <Container className="ringtoneContainer">
                    <div className={classes2.root}>
                        <Grid container >
                            <Grid item xs={12}>
                                <Typography variant="h5" className="yourNumberHeading">
                                    Telenor
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
                                            <Button fullWidth={true} variant="contained" color="" type="submit">
                                                Set Caller Tune
                                            </Button>
                                        </div>
                                    </form>
                                </Grid>


                                : <p className="msgInfo">Enter Verification Code</p>

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

                                            <div className="sendMessageBtn"> <Button fullWidth={true} variant="contained" color="primary" type="submit"> Verify</Button> </div> </form>
                                    </Grid>

                                </>
                                : <p></p>
                            }
                            <Grid item xs={12}>

                                {loading.confirmationFinal ? <p className="msgInfo">Caller tune has been successfully set to your phone</p> : <p></p>}

                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </Dialog>

        </>

    );
};

export default Ringtone;
