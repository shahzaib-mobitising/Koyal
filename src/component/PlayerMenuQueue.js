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
  const classes = useStyles();

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  function noRBT() {
    alert('Is song ki RBT Mojood Nahi hai.')
  }

  return (
    // <div className={classes.root}>
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

                <div class={classes.gap}></div>

                {/* <ul className={classes.view}> */}
                <ul className="view">
                  <li className="viewImg">

                    {/* <img className={classes.viewImg} src="/assets/download_black.png" alt="Download"></img> */}
                    Download <DownloadTrack
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
                    {props.TelenorCode > 0 ?
                      <TrackRington
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
                      /> :
                      <img src="/assets/ringtone_black.png" alt='ringtone' onClick={() => noRBT()} />}
                  </li>
                </ul>

              </div>
            </div>
          </Paper>
        ) : null}


      </div>
    </ClickAwayListener>
    // </div>
  );
}

