import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';

export default class RbtAlerts extends Component {


    constructor(props) {
        super(props)

        this.state = {
            noRBTModal: false,
            congoRBT: false
        }

        this.RBTModalClose = this.RBTModalClose.bind(this)
        this.RBTModalOpen = this.RBTModalOpen.bind(this)
        this.CongoRBTOpen = this.CongoRBTOpen.bind(this)
        this.CongoRBTClose = this.CongoRBTClose.bind(this)
    }


    RBTModalOpen = () => {
        this.setState({ noRBTModal: true })
    }

    RBTModalClose = () => {
        this.setState({ noRBTModal: false })
    }

    CongoRBTOpen() {
        this.setState({ congoRBT: true })
    }

    CongoRBTClose() {
        this.setState({ congoRBT: false })
    }

    showAlert() {
        alert('Hello World');
    }

    render() {
        const { noRBTModal, congoRBT } = this.state
        return (
            <>
                <div className="congoRBTBox">
                    <Dialog open={congoRBT} onClose={this.CongoRBTClose} aria-labelledby="form-dialog-title">
                        <DialogActions>
                            <Grid item xs={12}>
                                <div className="DialogContent ">
                                    <div className="setCallerTune">
                                        <p className="setTunec">Congratulations</p>
                                    </div>
                                </div>
                                <div className="congs_text">
                                    <p>Caller Tune has been set
  <br />
                                        <br />
                                        You will recieve a confirmation message shortly.</p>
                                </div>
                                <button className="button_styles" onClick={this.CongoRBTClose}>
                                    Done
</button>
                            </Grid>
                        </DialogActions>
                    </Dialog>
                </div>


                <div className="sorryRBTBox">
                    <Dialog open={noRBTModal} onClose={this.RBTModalClose} aria-labelledby="form-dialog-title">
                        <DialogActions>
                            <Grid item xs={12}>
                                <div className="DialogContent ">
                                    <div className="setCallerTune">
                                        <p className="setTunec">Sorry !!!!</p>
                                    </div>
                                </div>
                                <div className="congs_text rbt_text">
                                    <p>Is song ki RBT Mojood Nahi hai.</p>
                                </div>
                                <button className="button_styles" onClick={this.RBTModalClose}>
                                    Close
</button>
                            </Grid>
                        </DialogActions>
                    </Dialog>
                </div>

            </>
        );
    }
}
