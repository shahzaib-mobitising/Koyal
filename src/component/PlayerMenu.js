import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TrackLikeOption from './TrackLikeOption';
import TrackShareOptions from './TrackShareOptions';

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
              <div className="playerOptionsExtra">
                <div class={classes.gap}></div>
                <ul className="view">
                  <img src="/assets/download_black.png" alt="Download"></img>
                  <li>&nbsp;&nbsp;Download</li>
                </ul>
                <ul className="view">
                  {/* <TrackLikeOption
                    albumImage={props.albumImage}
                    trackName={props.trackName}
                    albumName={props.albumName}
                    artistName={props.artistName}
                    pageURL={props.pageURL}
                  /> */}
                  &nbsp;&nbsp;Like
                </ul>
                <ul className="view">
               
                    {/* <TrackShareOptions
                      albumImage={props.albumImage}
                      trackName={props.trackName}
                      albumName={props.albumName}
                      artistName={props.artistName}
                      pageURL={props.pageURL}
                    /> */}
                    &nbsp;&nbsp;Share
               
                </ul>
                <ul className="viewWithOutBorder">
                  <img src="/assets/ringtone_black.png" alt="Ringtone"></img>
                  <li>&nbsp;&nbsp;Caller Tune</li>
                </ul>
              </div>
            </Paper>

          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  );
}