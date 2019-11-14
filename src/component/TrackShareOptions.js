import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import {
  Grid
} from "@material-ui/core";


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

export default function TrackShareOptions(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const classes = useStyles();

  return (
    <span>

      {/* <img src='/assets/share_black.png' alt="share" onClick={handleClickOpen} /> */}

      <i aria-hidden="true" class="share icon" onClick={handleClickOpen}></i>

      {/* Share Screen start */}
      <Dialog className="dialog_share"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container spacing={0}>
            {/* <Grid item xs={2}></Grid> */}
            <Grid item xs={12}>
              <div className="AlignMeCenter share_text"><b>Share</b></div>
            </Grid>
            {/* <Grid item xs={2}>
              <div className="SearchMaterialIcon">
                <Button color="secondary" onClick={handleClose}>

                </Button>
              </div>
            </Grid> */}
            {/* <Grid item xs={2}>
              <div onClick={handleClose} className={classes.closeTag}>
                <i className="material-icons">close</i>
              </div>
            </Grid> */}
          </Grid>
        </DialogTitle>

        <div className="LineBreak"></div>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="DialogContent contect_center">
              <div className="ContentRef">
                <Grid container spacing={1}>
                  {/* <Grid item xs={3}></Grid> */}
                  <Grid item xs={12}>

                    <div className={classes.AlbumImg} className="Album_img">
                      <div className={classes.SquareImg}>
                        <img src={props.albumImage} alt={props.trackName} />
                      </div>
                    </div>

                  </Grid>
                  {/* <Grid item xs={3}></Grid> */}
                </Grid>
              </div>
              <div className="trackName">
                {/* <h3>{props.trackName}</h3> */}
                <p className={classes.TrackName}>{props.trackName}</p>
              </div>
              <div>
                {/* <h5>{props.artistName}</h5> */}
                <p className={classes.ArtistName}>{props.artistName}</p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>

        <div className="LineBreak"></div>

        <DialogActions>
          <div ClassName="DialogFooterCustome">
            {/* <p>Share on</p> */}
            <p className={classes.FooterTitle} className="share_on">Share on</p>
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

              <a
                target="_blank" rel="noopener noreferrer"
                href={`http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              >
                <img src="/assets/fb.svg" alt="facebook" />
              </a>

              {/* <CopyToClipboard /> */}
              {/* <ReactFBLike /> */}
            </div>
            <div className="LineBreak"></div>
            <div className="urlShareIcon">
              <span>
                <img src="https://cdn2.iconfinder.com/data/icons/web/512/Link-512.png" alt="link" />
              </span>
              <div className="shareurllink">
                <input type="text" value={window.location.href} />
              </div>
            </div>
          </div>
        </DialogActions>
        <div className="LineBreak"></div>
      </Dialog>


    </span>
  );
}
