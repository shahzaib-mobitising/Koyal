import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactFBLike from "react-fb-like";
import InputAdornment from "@material-ui/core/InputAdornment";
// import clsx from "@material-ui/core";

import clsx from "clsx";

import {
  Grid,
  TextField,
  Input,
  Link,
  FormControl,
  InputLabel
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


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
    <>

      <img src='/assets/share_black.png' alt="share" onClick={handleClickOpen} />

      {/* Share Screen start */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container spacing={0}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <div className="AlignMeCenter"><b>Share</b></div>
            </Grid>
            {/* <Grid item xs={2}>
              <div className="SearchMaterialIcon">
                <Button color="secondary" onClick={handleClose}>

                </Button>
              </div>
            </Grid> */}
            <Grid item xs={2}>
              <div onClick={handleClose} className={classes.closeTag}>
                <i className="material-icons">close</i>
              </div>
            </Grid>
          </Grid>
        </DialogTitle>

        <div className="LineBreak"></div>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="DialogContent">
              <div className="ContentRef">
                <Grid container spacing={1}>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={6}>

                    <div className={classes.AlbumImg}>
                      <div className={classes.SquareImg}>
                        <img src={props.albumImage} alt={props.trackName} />
                      </div>
                    </div>


                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
              </div>
              <div>
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
            <p className={classes.FooterTitle}>Share on</p>
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
                href={`http://www.facebook.com/sharer/sharer.php?u=https://www.koyal.pk/`}
              >
                <img src="/assets/fb.svg" alt="facebook" />
              </a>

              {/* <CopyToClipboard /> */}
              {/* <ReactFBLike /> */}


            </div>
          </div>
        </DialogActions>
        <div className="LineBreak"></div>

        {/* <div>
          <form className={classes.Sharecontainer} noValidate autoComplete="off"> 
            <TextField
              fullWidth
              id="filled-simple-start-adornment"
              className={clsx(classes.margin, classes.textFieldMy)}
              variant="filled"
              // label="With filled TextField"
              placeholder='http://www.koyal.pk/album/'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 5H4C1.8 5 0 6.8 0 9s1.8 4 4 4h10v-1H4c-1.7 0-3-1.3-3-3s1.3-3 3-3h11c1.1 0 2 .9 2 2s-.9 2-2 2H6c-.6 0-1-.4-1-1s.4-1 1-1h8V7H6c-1.1 0-2 .9-2 2s.9 2 2 2h9c1.7 0 3-1.3 3-3s-1.3-3-3-3z"/></svg>
                    </InputAdornment>
                )
              }}
            />
            </form>
         
        </div>
         */}
      </Dialog>

      {/* Share Screen End */}

      {/* Congratulations Screen start */}

      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <div className="CongratulationDialogTitle"><b>CONGRATULATIONS</b></div>
            </Grid>
            <Grid item xs={2}>
              <div className="SearchMaterialIcon">
                <Button color="" onClick={handleClose}>
                  <i className="material-icons">close</i>
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="DialogContent">
              <div className="ContentRef">
                <Grid container spacing={1}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={8}>
                    <p className={classes.textStyle}>You have successfully subscribed to koyal.pk.<br></br>
                    <br></br>
                    Now you can download unlimited songs</p>
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Button fullWidth
                 className={classes.margin}  
                 size="small"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                DONE
              </Button>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </DialogActions>
      </Dialog> */}

      {/* Congratulations Screen End */}

      {/* OOP's Screen start */}

      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <div className="OOPsDialogTitle"><b>OOPS !!!</b></div>
            </Grid>
            <Grid item xs={2}>
              <div className="SearchMaterialIcon">
                <Button color="" onClick={handleClose}>
                  <i className="material-icons">close</i>
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="DialogContent">
              <div className="ContentRef">
                <Grid container spacing={1}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={8}>
                   <p className={classes.textStyle}> This subscription is only available for Telenor Customer</p>
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Button 
                className={classes.margin}  
                size="small"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                OK
              </Button>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </DialogActions>
      </Dialog> */}

      {/* OOP's Screen End */}

      {/* Subscribe Screen start */}

      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container spacing={0}>
            <Grid item xs={1}></Grid>
            <Grid item xs={9}>
              <div className="SubscribeDialogTitle">
                <b>SUBSCRIBE NOW</b>
              </div>
              <div className="SubscribeDialogSubTitle">
                Download unlimited Songs
              </div>
            </Grid>
            <Grid item xs={2}>
              <div  className="SearchMaterialIcon">
                <Button color="" onClick={handleClose}>
                  <i className="material-icons">close</i>
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="DialogContent">
              <div className="VarificationCode">
                <b> Enter Varification code</b>
              </div>
              <div className="ContentRef">
                <Grid container spacing={1}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>

                    <TextField
                      id="standard-uncontrolled"
                      // label="Uncontrolled"
                      // defaultValue="foo"
                      className={classes.textField}
                      margin="normal"
                    />
                     <TextField
                      id="standard-uncontrolled"
                      // label="Uncontrolled"
                      // defaultValue="foo"
                      className={classes.textField}
                      margin="normal"
                    />
                      <TextField
                      id="standard-uncontrolled"
                      // label="Uncontrolled"
                      // defaultValue="foo"
                      className={classes.textField}
                      margin="normal"
                    />
                      <TextField
                      id="standard-uncontrolled"
                      // label="Uncontrolled"
                      // defaultValue="foo"
                      className={classes.textField}
                      margin="normal"
                    />
                    <p className={classes.SubPera}>RESEND CODE</p>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Button
              size="small"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.margin}
              >
                VERIFY
              </Button>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </DialogActions>
      </Dialog> */}

      {/* Subscribe Screen End */}
    </>
  );
}
