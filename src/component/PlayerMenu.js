import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TrackLikeOption from './TrackLikeOption';
import TrackShareOptions from './TrackShareOptions';
import DownloadTrack from './DownloadTrack';
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import ReactGA from 'react-ga';


const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  paper: {
    position: "absolute",
    top: -170,
    right: 0,
    left: 0,
    background: "transparent"
  },
  fake: {
    backgroundColor: grey[200],
    height: theme.spacing(1),
    margin: theme.spacing(2),
    // Selects every two elements among any group of siblings.
    "&:nth-child(2n)": {
      marginRight: theme.spacing(3)
    }
  },
  gap: {
    paddingTop: "1px"
  }
}));

export default function PlayerMenu(props) {

  // albumImage: "https://api.koyal.pk/musicapp/assets/images/thumbnails/55/MT_12906.jpg"
  // trackName: "Allah Karesi"
  // albumName: "Coke Studio - Season 11 - Episode 3"
  // artistName: "Various Artist"
  // pageURL: "http://localhost:3000/album/14115/coke-studio-season-11-episode-3"
  // MobilinkCode: "0"
  // TelenorCode: "5250053184"
  // UfoneCode: "0"
  // ZongCode: "0"
  // OrgTrackUrl: "https://s3.eu-central-1.amazonaws.com/sep-batch-01-frankfurt/Allah-Karesi_Attaullah_Khan_Esakhelvi,_Sanwal_Esakhelvi.mp3"
  // TrackId: "78196"
  // Albumid:

  const [open, setOpen] = React.useState(false);
  // RBT
  const [openModal2, setOpenModal2] = React.useState(false);
  const [noRBTFoundMsg, noRBTFoundMsgF] = React.useState(false);
  const [openModal22, setOpenModal22] = React.useState(false);
  const [congoRBTMsg, congoRBTMsgF] = React.useState(false);
  const [noRBTSetMsg, noRBTSetMsgF] = React.useState(false);

  // DOWNLOAD
  const [NoBalanceMsg, NoBalanceMsgF] = React.useState(false);
  const [trackDownloadMsg, trackDownloadMsgF] = React.useState(false);
  const [downloadURL, downloadURLF] = React.useState(false);


  function downloadURLOpen() {

    downloadURLF(true)
  }
  function downloadURLClose() {

    downloadURLF(false)
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

  // DOWNLOAD

  const classes = useStyles();

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  function downloadURLOpen2() {

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

        let url = props.OrgTrackUrl
        let nameT = `${props.trackName}.mp3`;
        const method = 'GET';

        let checkResp = response.data.Response.response

        if (checkResp === 'numbererror') {

        } else {

          let checkResp2 = response.data.Response.response

          if (checkResp2 === 'notcharged') {
            NoBalanceMsgF(true)

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

            trackDownloadMsgF(true)
          }
        }

      })
      .catch(error => {
        console.log(error)
      })
  }

  // RBT

  function noRBT() {
    RBTModalOpen();
  }

  function handleClickOpenModal2() {
    setOpenModal2(true);
  }

  function handleCloseModal2() {
    setOpenModal2(false);
  }

  function RBTModalOpen() {
    noRBTFoundMsgF(true);
  }

  function RBTModalClose() {
    noRBTFoundMsgF(false);
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

  function congoRBTCloseOpen() {
    congoRBTMsgF(true);
  }

  function congoRBTClose() {
    congoRBTMsgF(false);
  }


  function noRBTSetOpen() {
    noRBTSetMsgF(true);
  }

  function noRBTSetClose() {
    noRBTSetMsgF(false);
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
      rbtCode: props.TelenorCode,
      trackId: props.TrackId,
      userId: 0,
      verifyCode: "verified"
    }

    // activate modal close
    setOpenModal22(false)

    axios.post(`https://api.koyal.pk/musicapp/?request=set-rbt-react`, testtt)
      .then(response => {

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

  function noRBT() {
    noRBTFoundMsgF(true);
  }



  // RBT

  const checkLocalStorageNum = localStorage.getItem('msisdn');

  const ringtoneT = props.TelenorCode > 0 ?
    <i aria-hidden="true" className="download icon" onClick={handleClickOpenModal2}></i>
    :
    <img src="/assets/ringtone_black.png" alt='ringtone' onClick={() => noRBT()} />


  let testRingtone = ''
  let testDownload = ''

  const urlLink = `http://charge.koyal.pk/koyaldownload/scripts/rbt.php?rbtCode=${props.TelenorCode}&pageURL=${window.location}album/${props.Albumid}/${props.albumName}&trackId=${props.TrackId}&userId=0&verifyCode=&code=&action=rbt`;

  const urlLink2 = `http://charge.koyal.pk/koyaldownload/scripts/download.php?pageURL=${window.location}album/${props.Albumid}/${props.albumName}&trackId=${props.TrackId}&userId=0&verifyCode=&code=&action=download&AlbumId=${props.Albumid}&trackURL=${props.OrgTrackUrl}&trackName=${props.trackName}`;


  if (checkLocalStorageNum === null || checkLocalStorageNum === '') {
    testRingtone = <i aria-hidden="true" className="download icon" onClick={handleClickOpenModal2}></i>
    testDownload = <i aria-hidden="true" className="download icon" onClick={downloadURLOpen}></i>

  } else if (checkLocalStorageNum !== "" && checkLocalStorageNum.length < 10) {

    testRingtone = <i aria-hidden="true" className="download icon" onClick={handleClickOpenModal2}></i>
    testDownload = <i aria-hidden="true" className="download icon" onClick={downloadURLOpen}></i>

  } else {

    testRingtone = <i aria-hidden="true" className="download icon" onClick={handleClickOpenModal22}></i>
    testDownload = <i aria-hidden="true" className="download icon" onClick={downloadURLOpen2}></i>
  }


  return (
    <>

      {/* Download */}

      <Dialog open={downloadURL} onClose={downloadURLClose} aria-labelledby="form-dialog-title">
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
              <a className="triggerClick activeLinkBtn" href={urlLink2}>Activate</a>
            </button>
          </Grid>

        </DialogActions>
        <div className="LineBreak"></div>
      </Dialog>

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


      {/* Download */}

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


      <div className="sorryRBTBox">
        <Dialog open={noRBTFoundMsg} onClose={RBTModalClose} aria-labelledby="form-dialog-title">
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
              <button className="button_styles" onClick={RBTModalClose}>
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
              <p> <span className="Line1Congo">Now you can set caller tune for just Rs 1.5+T/Day and content charges of Rs 3+T/track</span>
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


      <div className={classes.root}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <IconButton
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            {open ? (

              <Paper className={classes.paper}>
                <div className="playerOptionsExtra bottom_player_icons">
                  <div className={classes.gap}></div>
                  <ul className="view">
                    <i aria-hidden="true" className="download icon"></i>
                    <li>
                      Download
                      {testDownload}
                    </li>
                  </ul>
                  <ul className="view">

                    <i aria-hidden="true" className="heart outline icon"></i>
                    <li className="viewImgLike">
                      Like <TrackLikeOption
                        albumImage={props.albumImage}
                        trackName={props.trackName}
                        albumName={props.albumName}
                        artistName={props.artistName}
                        pageURL={props.pageURL}
                      />
                    </li>
                    {/* // &nbsp;&nbsp;Like */}
                  </ul>
                  <ul className="view">
                    <i aria-hidden="true" className="share icon"></i>

                    <li>
                      Share <TrackShareOptions
                        albumImage={props.albumImage}
                        trackName={props.trackName}
                        albumName={props.albumName}
                        artistName={props.artistName}
                        pageURL={props.pageURL}
                      />
                    </li>
                    {/* &nbsp;&nbsp;Share */}

                  </ul>
                  <ul className="view">
                    <i aria-hidden="true" className="bell outline icon"></i>
                    <li>
                      Caller Tune
                  {
                        props.TelenorCode > 0 ?
                          testRingtone
                          :
                          <i aria-hidden="true" className="bell outline icon" onClick={() => noRBT()}></i>
                      }

                    </li>
                  </ul>
                </div>
              </Paper>

            ) : null}
          </div>
        </ClickAwayListener>
      </div>

    </>
  );
}