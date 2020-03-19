import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import axios from 'axios'
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


export default function TrackRington(props) {

  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal22, setOpenModal22] = React.useState(false);
  const [congoRBTMsg, congoRBTMsgF] = React.useState(false);
  const [noRBTSetMsg, noRBTSetMsgF] = React.useState(false);

  function handleClickOpenModal2() {
    setOpenModal2(true);
  }

  function handleCloseModal2() {
    setOpenModal2(false);
  }

  function handleClickOpenModal22() {
    setOpenModal22(true);

    ReactGA.event({
      category: `${props.componentName}`,
      action: 'RBT Click',
      transport: 'beacon',
      label: props.trackName
    });
  }

  function handleCloseModal22() {
    setOpenModal22(false);
  }

  function noRBTSetOpen() {
    noRBTSetMsgF(true);
  }

  function noRBTSetClose() {
    noRBTSetMsgF(false);
  }

  function congoRBTCloseOpen() {
    congoRBTMsgF(true);
  }

  function congoRBTClose() {
    congoRBTMsgF(false);
  }


  function newRBTSet() {

    ReactGA.event({
      category: `${props.componentName}`,
      action: 'RBT Click',
      transport: 'beacon',
      label: props.trackName
    });


    let testtt = {
      msisdn: localStorage.getItem('msisdn'),
      operator: "telenor",
      rbtCode: props.RBTCodes[0].code,
      trackId: props.TrackId,
      userId: 0,
      verifyCode: "verified"
    }

    // activate modal close
    setOpenModal22(false)

    axios.post(`https://api.koyal.pk/musicapp/?request=set-rbt-react`, testtt)
      .then(response => {
        //console.log(response)
        let verifyResp = response.data.Response.Success

        if (verifyResp) {

          congoRBTMsgF(true);

          ReactGA.event({
            category: 'RBT Completed',
            action: 'RBT Success',
            transport: 'beacon',
            label: props.trackName
          });


        } else {
          noRBTSetMsgF(true)
        }

      })
      .catch(error => {
        console.log(error)

      })
  }

  const classes = useStyles();


  //const urlLink = `http://localhost/koyal-download-new/rbt.php?rbtCode=${props.RBTCodes[0].code}&pageURL=${window.location}&trackId=${props.TrackId}&userId=0&verifyCode=&code=&action=rbt`;

  const urlLink = `http://charge.koyal.pk/koyaldownload/scripts/rbt.php?rbtCode=${props.RBTCodes[0].code}&pageURL=${window.location}&trackId=${props.TrackId}&userId=0&verifyCode=&code=&action=rbt`;

  const checkLocalStorageNum = localStorage.getItem('msisdn');

  let testRingtone = ''

  if (checkLocalStorageNum === null || checkLocalStorageNum === '') {
    testRingtone = <i aria-hidden="true" className="download icon" onClick={handleClickOpenModal2}></i>
  } else if (checkLocalStorageNum !== "" && checkLocalStorageNum.length < 10) {
    testRingtone = <i aria-hidden="true" className="download icon" onClick={handleClickOpenModal2}></i>
  } else {
    testRingtone = <i aria-hidden="true" className="download icon" onClick={handleClickOpenModal22}></i>
  }

  return (

    <span>

      {
        testRingtone
      }

      <div className="sorryRBTBox">
        <Dialog open={noRBTSetMsg} onClose={noRBTSetClose} aria-labelledby="form-dialog-title">
          <DialogActions>
            <Grid item xs={12}>
              <div className="DialogContent ">
                <div className="setCallerTune">
                  <p className="setTunec">Error !!!!</p>
                </div>
              </div>
              <div className="congs_text rbt_text">
                <p>Sorry !!! RBT Not Set on this Number.</p>
              </div>
              <button className="button_styles" onClick={noRBTSetClose}>
                Close
      </button>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>

      <Dialog open={openModal22} onClose={handleCloseModal22} aria-labelledby="form-dialog-title">
        <DialogTitle id="alert-dialog-title">
          <Grid item xs={12}>
            <div className="AlignMeCenter share_text congoMainTitle"><b>Koyal - Caller Tune</b></div>
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
              <p> <span className="Line1Congo">Now you can set caller tune for just Rs 1.5+T/Day and content charges of Rs 3+T/track</span>
              </p>
            </div>
            <button className="button_styles">
              <a className="triggerClick activeLinkBtn" onClick={newRBTSet}>Activate</a>
            </button>
          </Grid>
        </DialogActions>
        <div className="LineBreak"></div>
      </Dialog>



      <Dialog open={openModal2} onClose={handleCloseModal2} aria-labelledby="form-dialog-title">
        <DialogTitle id="alert-dialog-title">
          <Grid item xs={12}>
            <div className="AlignMeCenter share_text congoMainTitle"><b>Koyal - Caller Tune</b></div>
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
              <p> <span className="Line1Congo">Link to aNOTHER pAGE Now you can set caller tune for just Rs 1.5+T/Day and content charges of Rs 3+T/track</span>
              </p>
            </div>
            <button className="button_styles">
              <a className="triggerClick activeLinkBtn" href={urlLink}>Activate</a>
            </button>
          </Grid>
        </DialogActions>
        <div className="LineBreak"></div>
      </Dialog>


      <div className="congoRBTBox">
        <Dialog open={congoRBTMsg} onClose={congoRBTClose} aria-labelledby="form-dialog-title">
          <DialogActions>
            <Grid item xs={12}>
              <div className="DialogContent ">
                <div className="setCallerTune">
                  <p className="setTunec">Congratulations</p>
                </div>
              </div>
              <div className="congs_text">
                <p>Caller Tune has been set <br /> <br /> You will recieve a confirmation message shortly.</p>
              </div>
              <button className="button_styles" onClick={congoRBTClose}>
                Done
      </button>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    </span>

  );
}
