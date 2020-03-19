import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import { Grid } from '@material-ui/core';
import { Button, Icon, Label } from 'semantic-ui-react'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FacebookLogin from 'react-facebook-login';




export default function TrackLikeOption(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const responseFacebook = (response) => {
    console.log(response);
  }


  return (
    <span>

      {
        props.forTop === 1 ?
          <Button as='div' onClick={handleClickOpen} labelPosition='right'> <Button color=''>
            <Icon name='heart' /> <span> Like </span> </Button> <Label as='a' basic color='red' pointing='left'>
              {props.NoOfShares < 1 ? <> 1K </> : <> {props.NoOfShares} </>}
            </Label> </Button>
          :
          props.forTop === 11 ?
            <Button as='div' onClick={handleClickOpen} labelPosition='left'><Icon name='heart' /><span> {props.NoOfShares < 1 ? <> 1.3 K </> : <> {props.NoOfShares} K </>}</span></Button>
            :
            <i aria-hidden="true" className="heart icon" onClick={handleClickOpen}></i>
      }


      <Dialog className="like_dialogue"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="AlignMeCenter share_text"><strong>Like</strong> <Icon name='close' onClick={handleClose} /></div>
        </DialogTitle>

        <div className="LineBreak"></div>

        <DialogContent className="contect_center">
          <DialogContentText id="alert-dialog-description">
            <div className="DialogContent">
              <div className="ContentRef">
                {/* <div className="test">
                  <p>Album img</p>
                </div> */}

                <Grid container spacing={1}>

                  <Grid item xs={12}>
                    <img src={props.albumImage} alt={props.trackName} />
                  </Grid>

                </Grid>
              </div>
              <div className="trackName">
                <p >{props.trackName}</p>
              </div>
              <div>
                <p className="artist_name">{props.artistName}</p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>

        <div className="LineBreak"></div>

        <DialogActions>
          <div className="DialogFooterCustome logindiv">
            <p className="share_on">Login via </p>
            <div className="socialIconsShare">
              <FacebookLogin
                appId="168997670356490"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} />
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
    </span>
  );
}


