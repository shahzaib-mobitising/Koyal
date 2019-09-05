import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Grid, GridList, Link } from '@material-ui/core';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactFBLike from 'react-fb-like';
//import ReactFBLike from 'react-fb-like';



export default function TrackLikeOption(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <img src="/assets/like_black.png" alt="like" onClick={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="AlignMeCenter">Like</div>
        </DialogTitle>

        <div className="LineBreak"></div>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="DialogContent">
              <div className="ContentRef">
                {/* <div className="test">
                  <p>Album img</p>
                </div> */}

                <Grid container spacing={1}>
                  <Grid item xs={3}>
                  </Grid>
                  <Grid item xs={6}>
                    <img src={props.albumImage} alt={props.trackName} />
                  </Grid>

                </Grid>
              </div>
              <div>
                <h3>{props.trackName}</h3>
              </div>
              <div>
                <h5>{props.artistName}</h5>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>

        <div className="LineBreak"></div>

        <DialogActions>
          <div ClassName="DialogFooterCustome">
            <p>Login via </p>
            <div className="socialIconsShare">
              <a
                target="_blank" rel="noopener noreferrer"
                href={`https://twitter.com/intent/tweet/?text=${props.trackName}`}
              >
                <img src="/assets/twitter.svg" alt="twitter" />
              </a>

              {/* <a target="_blank" rel="noopener noreferrer" href={`https://www.instagram.com/?hl=en`}>
                <img src="/assets/insta.svg" alt="instagram" />
              </a> */}

              {/* <a
                target="_blank" rel="noopener noreferrer"
                href={`http://www.facebook.com/sharer/sharer.php?u=https://www.koyal.pk/`}
              >
                <img src="/assets/fb.svg" alt="facebook" />
              </a> */}

              <ReactFBLike />

            </div>
          </div>

          {/* <Button onClick={handleClose} color="primary">Close</Button> */}
        </DialogActions>
      </Dialog>

      {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Like"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="socialIconsShare">
                           
                            <a target="blank" href={`https://www.facebook.com/sharer/sharer.php?u="http://3.121.196.113:3000/"`}>
                                    <img src="/assets/fb.svg" alt='facebook' />
                                </a>
                            <a target="blank" href={`https://twitter.com/intent/tweet/?text="Koyal"&url="http://3.121.196.113:3000/"`}>
                                <img src="/assets/twitter.svg" alt='twitter' />
                            </a>
                            <a target="blank" href={`https://www.instagram.com/?hl=en`}>
                                <img src="/assets/insta.svg" alt='instagram' />
                            </a>
                            <CopyToClipboard text="http://3.121.196.113:3000/">
                                <Button variant="contained">Copy Link</Button>
                            </CopyToClipboard>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
          </Button>

                </DialogActions>
            </Dialog> */}
    </div>
  );
}


