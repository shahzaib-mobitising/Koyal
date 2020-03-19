import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import { grey } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TrackLikeOption from "./TrackLikeOption";
import TrackShareOptions from "./TrackShareOptions";
import DownloadTrack from "./DownloadTrack";
import TrackRington from "./TrackRington";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from 'axios'
import ReactGA from 'react-ga';

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  paper: {
    // position: "absolute",
    // // top: -170,
    // right: 0,
    // left: 120,
    // display: "flex",
    // backgroundColor: "gray",
    // border: "1px solid black"
    // // background: "transparent"
    // // background: ""
    left: "-1000px",
    // border: '1px solid black',
    display: " block",
    position: "absolute",
    // backgroundColor: "black",
    width: "inherit",
    top: "35px",
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
  },
  displaypopop: {
    backgroundColor: "blue"
  },

  playerOptionsExtra: {
    backgroundColor: "white",
    width: "230px",
    color: "gray",
    height: "160px",
    borderRadius: "10px",
    display: "block"
  },
  view: {
    display: "block",
    borderBottom: "1px gray solid",
    margin: "14px !important"
  },
  viewWithOutBorder: {
    display: "block",
    margin: "14px !important"
  },
  viewWithOutBorderImg: {
    display: "block",
    margin: "14px !important",

    width: "21px",
    height: "21px"
  },
  viewImg: {
    display: "block",
    borderBottom: "1px gray solid",
    margin: "14px !important",

    width: "21px",
    height: "21px"
  }
}));

export default function PlayerMenuQueue(props) {
  const [open, setOpen] = React.useState(false);
  const [noRBTFoundMsg, noRBTFoundMsgF] = React.useState(false);
  const [openModal22, setOpenModal22] = React.useState(false);
  const [congoRBTMsg, congoRBTMsgF] = React.useState(false);
  const [noRBTSetMsg, noRBTSetMsgF] = React.useState(false);

  const classes = useStyles();

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  function noRBT() {
    RBTModalOpen();
  }

  function RBTModalOpen() {
    noRBTFoundMsgF(true);
  }

  function RBTModalClose() {
    noRBTFoundMsgF(false);
  }


  function handleClickOpenModal22() {
    setOpenModal22(true);
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
          noRBTSetMsgF(false)
        }

      })
      .catch(error => {
        console.log(error)

      })
  }

  const checkLocalStorageNum = localStorage.getItem('msisdn');


  return (

    <>

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
                Close</button>
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
                Done </button>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>

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

      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          {/* <Button onClick={handleClick}>Open menu</Button> */}
          <IconButton onClick={handleClick}>
            <MoreVertIcon className="Hamburger_icon" />
          </IconButton>

          {open ? (
            <Paper className={classes.paper}>
              <div className={classes.playerOptionsExtra}>
                <div className="playerOptionsExtra">
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
                            <a className="triggerClick activeLinkBtn">Activate</a>
                          </button>
                        </Grid>

                      </DialogActions>
                      <div className="LineBreak"></div>
                    </Dialog>

                  </div>

                  <div class={classes.gap}></div>

                  {/* <ul className={classes.view}> */}
                  <ul className="view">
                    <li className="viewImg">

                      {/* <img className={classes.viewImg} src="/assets/download_black.png" alt="Download"></img> */}
                      Download <DownloadTrack
                        componentName={'Download From Queue'}
                        trackURL={props.OrgTrackUrl}
                        albumImage={props.albumImage}
                        trackName={props.trackName}
                        albumName={props.albumName}
                        artistName={props.artistName}
                        pageURL={window.location.href}
                        TrackId={props.TrackId}
                        Albumid={props.AlbumId}
                        RBTCodes={
                          [
                            {
                              'code': 0,
                              'name': 'Telenor'
                            },
                            {
                              'code': props.UfoneCode,
                              'name': 'Ufone'
                            },
                            {
                              'code': props.ZongCode,
                              'name': 'Zong'
                            },
                            {
                              'code': props.MobilinkCode,
                              'name': 'Mobilink'
                            }
                          ]
                        }
                      />
                      {/* &nbsp;&nbsp;Download */}
                    </li>
                  </ul>
                  <ul className="view">
                    {/* <ul className={classes.view}> */}
                    <li className="viewImgLike">
                      Like <TrackLikeOption
                        albumImage={props.albumImage}
                        trackName={props.trackName}
                        albumName={props.albumName}
                        artistName={props.artistName}
                        pageURL={props.pageURL}
                      />
                      {/* &nbsp;&nbsp;Like */}
                    </li>
                  </ul>
                  <ul className="view">
                    <li className="viewImgShare">
                      Share <TrackShareOptions
                        albumImage={props.albumImage}
                        trackName={props.trackName}
                        albumName={props.albumName}
                        artistName={props.artistName}
                        pageURL={props.pageURL}
                      />
                      {/* &nbsp;&nbsp;Share */}
                    </li>
                  </ul>
                  <ul className="view">


                    <li className="viewImgCT">
                      Caller Tune

{
                        checkLocalStorageNum != null ?
                          <div>
                            <i aria-hidden="true" class="bell outline icon" onClick={handleClickOpenModal22}></i>

                          </div>

                          :
                          props.TelenorCode > 0 ?
                            <TrackRington
                              componentName={'RBT From Queue'}
                              trackURL={props.OrgTrackUrl}
                              albumImage={props.albumImage}
                              trackName={props.trackName}
                              albumName={props.albumName}
                              artistName={props.artistName}
                              pageURL={window.location.href}
                              TrackId={props.TrackId}
                              Albumid={props.AlbumId}
                              RBTCodes={
                                [
                                  {
                                    'code': props.TelenorCode,
                                    'name': 'Telenor'
                                  },
                                  {
                                    'code': props.UfoneCode,
                                    'name': 'Ufone'
                                  },
                                  {
                                    'code': props.ZongCode,
                                    'name': 'Zong'
                                  },
                                  {
                                    'code': props.MobilinkCode,
                                    'name': 'Mobilink'
                                  }
                                ]
                              }
                            />
                            :
                            <img src="/assets/ringtone_black.png" alt='ringtone' onClick={() => noRBT()} />
                      }
                    </li>
                  </ul>

                </div>
              </div>
            </Paper>
          ) : null}


        </div>
      </ClickAwayListener>

    </>
  );
}

