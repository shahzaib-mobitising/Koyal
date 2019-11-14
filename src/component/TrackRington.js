import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import axios from 'axios'


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

  function handleClickOpen() {

    let sendData = {
      UserId: 0,
      AlbumId: props.Albumid,
      TrackId: props.TrackId,
      Action: 'download',
      Msisdn: localStorage.getItem('msisdn')
    }


    let msisdn2 = localStorage.getItem('msisdn')
    // console.log(msisdn2)
    if (msisdn2 === null || msisdn2.length === 0) {

      // alert('Local storage Null ')

      axios.get(`https://api.koyal.pk/musicapp/?request=getNumber`)
        .then(response => {
          let getNumber = response.data.Response.msisdn
          let getPremium = response.data.Response.premium
          //  console.log(response)

          //  alert('Get Number API Response back')

          // alert(`Number is` + getNumber)

          if (getNumber.length === 0) {

            //   alert('No Number Found in Response API')

            setOpen(true)

          } else {

            //   alert('Number is Found in Response API')

            localStorage.setItem('msisdn', JSON.stringify(getNumber));

            if (getPremium === 1 || getPremium === '1') {

              let sendData2 = {
                UserId: 0,
                AlbumId: props.Albumid,
                TrackId: props.TrackId,
                Action: 'download',
                Msisdn: getNumber
              }


              //  alert('Premium 1 User')
            } else {
              setValues(values => ({
                ...values,
                msisdn: getNumber
              }));
              //   alert('Auto Text Field Filled.')
              setOpen(true)
            }

          }

        })
        .catch(error => {
          console.log(error)
        })
    } else {

      //   alert('This is else case.')


      let testtt = {
        msisdn: localStorage.getItem('msisdn'),
        operator: "telenor",
        rbtCode: props.RBTCodes[0].code,
        trackId: "81881",
        userId: 0,
        verifyCode: "verified"
      }


      // console.log(testtt)

      axios.post(`https://api.koyal.pk/musicapp/?request=set-rbt-react`, testtt)
        .then(response => {
          console.log(response)
          let verifyResp = response.data.Response.Success

          if (verifyResp) {

            //   alert('New RBT Set')
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
      <button className="button_styles">
        Done
      </button>
    </Grid>

  </DialogActions>

  return (


    <span>

      {/* <img src='/assets/ringtone_black.png' alt="share" onClick={handleClickOpen} /> */}
      <i aria-hidden="true" class="bell outline icon" onClick={handleClickOpen}></i>


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
