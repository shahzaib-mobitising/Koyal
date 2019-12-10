import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import axios from 'axios'
import RbtAlerts from "./RbtAlerts";


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
  const [open, setOpen] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal22, setOpenModal22] = React.useState(false);

  function handleClickOpen() {

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

      let testtt = {
        msisdn: localStorage.getItem('msisdn'),
        operator: "telenor",
        rbtCode: props.RBTCodes[0].code,
        trackId: props.TrackId,
        userId: 0,
        verifyCode: "verified"
      }

      axios.post(`https://api.koyal.pk/musicapp/?request=set-rbt-react`, testtt)
        .then(response => {
          console.log(response)
          let verifyResp = response.data.Response.Success

          if (verifyResp) {

            setLoading(values => ({
              ...values,
              loader: false,
              formEnterNumber: false,
              formConfirmRBT: false,
              formFinalMsg: true
            }));
            setOpen(true)

          } else {
            alert('RBT Not Set.')
          }

        })
        .catch(error => {
          console.log(error)

        })


    }

  }

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpenModal2() {
    setOpenModal2(true);
  }

  function handleCloseModal2() {
    setOpenModal2(false);
  }

  function handleClickOpenModal22() {
    setOpenModal22(true);
  }

  function handleCloseModal22() {
    setOpenModal22(false);
  }

  function newRBTSet() {
    let testtt = {
      msisdn: localStorage.getItem('msisdn'),
      operator: "telenor",
      rbtCode: props.RBTCodes[0].code,
      trackId: props.TrackId,
      userId: 0,
      verifyCode: "verified"
    }

    setOpenModal22(false)

    axios.post(`https://api.koyal.pk/musicapp/?request=set-rbt-react`, testtt)
      .then(response => {
        console.log(response)
        let verifyResp = response.data.Response.Success

        if (verifyResp) {

          setLoading(values => ({
            ...values,
            loader: false,
            formEnterNumber: false,
            formConfirmRBT: false,
            formFinalMsg: true
          }));
          setOpen(true)

        } else {
          alert('RBT Not Set.')
        }

      })
      .catch(error => {
        console.log(error)

      })
  }

  const classes = useStyles();

  const [values, setValues] = React.useState({
    rbtCode: "",
    msisdn: "",
    trackId: props.TrackId,
    userId: 0,
    verifyCode: "",
    operator: 'telenor',
    code: ''
  });

  const [loading, setLoading] = React.useState({
    loader: false,
    formEnterNumber: true,
    formConfirmRBT: false,
    formFinalMsg: false
  });



  function selectOperator(event) {

    event.persist()

    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));

  }

  function phoneNumber(event) {

    event.persist()

    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));

  }

  function submitRBT(event) {

    event.preventDefault();

    // Breaking Number

    let numberCount = values.msisdn.length

    if (numberCount === 12) {

      var numberArray = values.msisdn.split('')

      var mergeStartTwoNumber = numberArray[0].concat(numberArray[1])

      if (mergeStartTwoNumber === '92') {

        axios.post(`https://api.koyal.pk/musicapp/?request=send-verify-rbt-react`, values)
          .then(response => {

            setLoading(values => ({
              ...values,
              loader: false,
              formEnterNumber: false,
              formConfirmRBT: true,
              formFinalMsg: false
            }));

            setValues(values => ({
              ...values,
              code: response.data.Response.code
            }));

          })
          .catch(error => {
            console.log(error)

          })

      }
      else {
        alert('Number will start from 92');
      }
    }
    else {
      alert('Incorrect length of mobile number.')
    }


  }

  function verifysCode(event) {

    event.persist()

    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));

  }


  function confirmBtnRBT(event) {

    event.preventDefault();

    let confirmCodeLength = values.verifyCode.length
    let confirmCode = 'rbt-'.concat(values.verifyCode)


    if (confirmCodeLength === 4 && confirmCode === values.code) {


      axios.post(`https://api.koyal.pk/musicapp/?request=set-rbt-react`, values)
        .then(response => {

          let verifyResp = response.data.Response.Success

          if (verifyResp) {

            setLoading(values => ({
              ...values,
              loader: false,
              formEnterNumber: false,
              formConfirmRBT: false,
              formFinalMsg: true
            }));

            localStorage.setItem('msisdn', JSON.stringify(values.msisdn));

            setTimeout(() => setOpen(false), 10000)
          } else {
            alert('There is some error.')
          }

        })
        .catch(error => {
          console.log(error)

        })

    } else {
      alert('Code Error')
    }

  }



  const enterNumberBox = <DialogContent>
    <DialogContentText id="alert-dialog-description">
      <div className="DialogContent ">
        <div className="setCallerTune">
          <p className="setTune">Set Your Caller Tune please</p>
        </div>
      </div>
      <div className="formtune">
        <form onSubmit={submitRBT}>
          <select
            value={values.rbtCode}
            onChange={selectOperator}
            name="rbtCode"
            required
          >

            {props.RBTCodes.map((data, index) => {
              if (data.code !== "0") {
                return (
                  <option key={index} value={data.code}>
                    {data.name}
                  </option>
                );
              }
            })}
          </select>
          <input
            type="text"
            placeholder="923xx xxxxxxx"
            value={values.msisdn}
            name="msisdn"
            onChange={phoneNumber}
            id="msisdn"
            required
          />
          <button type="submit">
            set Caller Tune
          </button>
        </form>
      </div>
    </DialogContentText>
  </DialogContent>


  const confirmNumberBox = <DialogActions>
    <Grid item xs={12}>
      <div className="DialogContent ">
        <div className="setCallerTune">
          <p className="setTunesub">Caller Tune</p>
          {/* <p className="download_text">Download Unlimited Songs</p> */}
          <p className="download_text"> Enter Verification Code</p>

        </div>
      </div>
      <div className="">
        {/* <p className="setTunesub">Enter Verification Code</p> */}
      </div>
      <form onSubmit={confirmBtnRBT}>
        <div className="verification_code">

          <input
            placeholder="XXXX"
            type="text"
            value={values.verifyCode}
            name="verifyCode"
            onChange={verifysCode}
            id="msisdn"
            required
          />
          {/* <div>
          <a href="#!"> Resend Code</a>
        </div> */}
        </div>
        <button type="submit" className="button_styles">
          Verify
    </button>
      </form>
    </Grid>
  </DialogActions>


  const finalBox = <DialogActions>
    <Grid item xs={12}>
      <div className="DialogContent ">
        <div className="setCallerTune">
          <p className="setTunec">Congratulations</p>
        </div>
      </div>
      <div className="congs_text">
        <p>Caller Tune has been set
          <br />
          <br />
          You will recieve a confirmation message shortly.</p>
      </div>
      <button className="button_styles" onClick={handleClose}>
        Done
      </button>
    </Grid>

  </DialogActions>

  //const urlLink = `http://localhost/koyal-download-new/rbt.php?rbtCode=${props.RBTCodes[0].code}&pageURL=${window.location}&trackId=${props.TrackId}&userId=0&verifyCode=&code=&action=rbt`;

  const urlLink = `http://charge.koyal.pk/koyaldownload/scripts/rbt.php?rbtCode=${props.RBTCodes[0].code}&pageURL=${window.location}&trackId=${props.TrackId}&userId=0&verifyCode=&code=&action=rbt`;

  const checkLocalStorageNum = localStorage.getItem('msisdn');

  return (


    <span>

      {
        checkLocalStorageNum === null ?
          // <a className="triggerClick" href={urlLink}><i aria-hidden="true" className="download icon"> </i></a>
          <i aria-hidden="true" className="download icon" onClick={handleClickOpenModal2}></i> :
          <i aria-hidden="true" className="download icon" onClick={handleClickOpenModal22}></i>
      }

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
                {/* <br />
                <br />
                <span className="Line2Congo"> (for each additional track you will be charged Rs 0.2 per track after 5 tracks) </span> */}
              </p>
            </div>
            <button className="button_styles">
              <a className="triggerClick activeLinkBtn" href={urlLink}>Activate</a>
            </button>
          </Grid>

        </DialogActions>
        <div className="LineBreak"></div>
      </Dialog>


      <Dialog className="dialoge_Ringtone"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container spacing={0}>

            <div onClick={handleClose} className="Cross">
              <i className="material-icons">close</i>
            </div>
            <Grid item xs={12}>
              <div className={classes.AlbumImg} className="Album_img_ringtone">
                <div className={classes.SquareImg}>
                  <img src={props.albumImage} alt={props.trackName} />
                </div>
                <div className="trackName">
                  <p className={classes.TrackName}>{props.trackName}</p>
                  <div className="artist_name">
                    <p className={classes.ArtistName}>{props.artistName}</p>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </DialogTitle>

        {loading.formEnterNumber ? enterNumberBox : <></>}

        {loading.formConfirmRBT ? confirmNumberBox : <></>}

        {loading.formFinalMsg ? finalBox : <></>}

        {/* <DialogActions>
            <Grid item xs={12}>
              <div className="DialogContent ">
                <div className="setCallerTune">
                  <p className="setTunec">OOPS!!!</p>
                </div>
              </div>
              <div className="congs_text">
                  <p>This Subscription is only available for Telenor Customers
                  </p>
              </div> 
                <button className="button_styles">
                        OK
                </button>
            </Grid> 
            
        </DialogActions> */}

        <div className="LineBreak"></div>
      </Dialog>


    </span>
  );
}
