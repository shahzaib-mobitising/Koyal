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
import TrackRington from './TrackRington';

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
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          {/* <Button onClick={handleClick}>Open menu</Button> */}
          <IconButton
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          {open ? (

            <Paper className={classes.paper}>
              <div className="playerOptionsExtra bottom_player_icons">
                <div class={classes.gap}></div>
                <ul className="view">
                
                <i aria-hidden="true" className="download icon"></i>
                  <li>
                  Download  <DownloadTrack
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
            </Paper>

          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  );
}