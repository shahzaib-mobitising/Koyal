import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";

import { Grid } from "@material-ui/core";


export default function Radio(props) {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {

        setOpen(true);
    }



    function handleClose() {
        setOpen(false);
    }

    //const classes = useStyles();

    return (

        <>
            {/* <img src="/assets/download_black.png" alt='ringtone' onClick={handleClickOpen} />
            cloud download */}
            <p onClick={handleClickOpen}>Start Radio</p>

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
                      
                    </Grid>
                </DialogTitle>



                <DialogActions>
                    <Grid item xs={12}>
                        <div className="DialogContent ">
                            <div className="setCallerTune">
                                <p className="setTunec">COMING SOON</p>
                            </div>
                        </div>
                        <div className="congs_text">
                            <p>Thankyou for visit koyal.pk
                  </p>
                        </div>
                        <button onClick={handleClose} className="button_styles">
                            OK
                </button>
                    </Grid>

                </DialogActions>

                <div className="LineBreak"></div>
            </Dialog>


        </>
    );
}
