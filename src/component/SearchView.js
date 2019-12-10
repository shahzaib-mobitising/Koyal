import React from "react";
//import Button from "@material-ui/core/Button";
import { Button, Header, Segment, TransitionablePortal } from 'semantic-ui-react'
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Input from "@material-ui/core/Input";
import searchDummyJson from "../dummy/search.json";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import axios from "axios";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function TabContainer(props) {

  return (
    <Typography component="div" style={{ padding: 1 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

function SearchView() {
  const [open, setOpen] = React.useState(false);
  const [openActiveUser, openActiveUserOpen] = React.useState(false);
  const [openDeleteUser, openDeleteUserOpen] = React.useState(false);

  const [searchData, setSearchDataupdate] = React.useState({
    searchDataTrack: searchDummyJson.Response.SearchResult.Tracks,
    searchDataAlbum: searchDummyJson.Response.SearchResult.Albums,
    searchDataArtist: searchDummyJson.Response.SearchResult.Artists
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleOpenActiveUser() {
    //openDeleteUserOpen(true);
    //openActiveUserOpen(true);

    let localStorageNum = localStorage.getItem('msisdn')

    let testtt = {
      msisdn: localStorageNum
    }

    if (localStorageNum != null) {
      console.log('Number Hai')
      axios.post(`https://api.koyal.pk/musicapp/checksubscriber.php`, testtt)
        .then(response => {
          let RespApi = response.data.Response.response;

          if (RespApi === false || RespApi === 'false') {
            //console.log('fase')
            openDeleteUserOpen(true)
          } else {
            //  console.log('trree')
            openActiveUserOpen(true)
          }

        })
        .catch(error => {
          console.log(error)
        })
    } else {
      //console.log('Number Nahi Hai')
      openDeleteUserOpen(true)
    }
  }

  function handleCloseActiveUser() {
    openActiveUserOpen(false);
  }

  function handleOpenActiveUser2() {
    openDeleteUserOpen(true);
  }

  function handleCloseActiveUser2() {
    openDeleteUserOpen(false);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function deactiveUser() {

    let testtt = {
      Msisdn: localStorage.getItem('msisdn')
    }

    axios.post(`https://api.koyal.pk/musicapp/?request=delete-charged-download-react`, testtt)
      .then(response => {
        let ApiResp = response.data.Response.Success
        console.log(ApiResp)

        if (ApiResp === true) {
          openActiveUserOpen(false)
          alert('Your Subscription for Koyal has now been Deactivated. Thank you for using www.koyal.pk')
          localStorage.clear();
          window.location = 'http://' + window.location.hostname + window.location.pathname;
        }



      })
      .catch(error => {
        console.log(error)
      })
  }

  function handleClose() {
    setOpen(false);
    setSearchDataupdate(values => ({
      ...values,
      searchDataTrack: searchDummyJson.Response.SearchResult.Tracks,
      searchDataAlbum: searchDummyJson.Response.SearchResult.Albums,
      searchDataArtist: searchDummyJson.Response.SearchResult.Artists
    }));
  }

  const [value, setValue] = React.useState("two");

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleInputChange(event) {
    if (event.target.value.length > 2) {
      getInfo(event.target.value);
    }
  }

  function getInfo(param) {
    axios
      .get(
        `https://api.koyal.pk/musicapp/?request=search-react&keyword=${param}&limit=20`
      )
      .then(response => {
        console.log(response);

        setSearchDataupdate(values => ({
          ...values,
          searchDataTrack: response.data.Response.SearchResult.Tracks,
          searchDataAlbum: response.data.Response.SearchResult.Albums,
          searchDataArtist: response.data.Response.SearchResult.Artists
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  function ToSeoUrl(url) {

    // make the url lowercase         
    var encodedUrl = url.toString().toLowerCase();

    // replace & with and           
    encodedUrl = encodedUrl.split(/&+/).join("-and-")

    // remove invalid characters 
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

    // remove duplicates 
    encodedUrl = encodedUrl.split(/-+/).join("-");

    // trim leading & trailing characters 
    encodedUrl = encodedUrl.trim('-');

    return encodedUrl;
  }

  const trackViewMobile = (
    <Grid container spacing={0} className="trackSpace">
      {searchData.searchDataTrack.map(track => (
        <Grid item xs={12} key={track.TrackId}>
          <List className="trackListView">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={track.Name} src={track.ThumbnailImageWeb} />
              </ListItemAvatar>
              <Link
                onClick={handleClose}

                to={`/track/` + track.TrackId + `/` + ToSeoUrl(track.Name)}
              >
                {""}
                <ListItemText primary={track.Name} />
              </Link>
            </ListItem>

            <Divider variant="inset" component="li" />
          </List>
        </Grid>
      ))}
    </Grid>
  );

  const trackView4Desktop = (
    <Grid container spacing={0}>
      {searchData.searchDataTrack.map(track => (
        <Grid item xs={3} md={3} key={track.TrackId}>
          <List className="trackListView">
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar alt={track.Name} src={track.ThumbnailImageWeb} />
              </ListItemAvatar>
              <Link
                onClick={handleClose}

                to={`/track/` + track.TrackId + `/` + ToSeoUrl(track.Name)}
              >
                <ListItemText primary={track.Name} />
              </Link>
            </ListItem>

            <Divider variant="inset" component="li" />
          </List>
        </Grid>
      ))}
    </Grid>
  );

  const trackView3Desktop = (
    <Grid container spacing={0}>
      {searchData.searchDataTrack.map(track => (
        <Grid item xs={4} md={3} key={track.TrackId}>
          <List className="trackListView">
            <ListItem >
              <ListItemAvatar>
                <Avatar alt={track.Name} src={track.ThumbnailImageWeb} />
              </ListItemAvatar>
              <Link
                onClick={handleClose}

                to={`/track/` + track.TrackId + `/` + ToSeoUrl(track.Name)}
              >
                <ListItemText primary={track.Name} />
              </Link>
            </ListItem>

            <Divider variant="inset" component="li" />
          </List>
        </Grid>
      ))}
    </Grid>
  );

  const albumView = (
    <Grid container spacing={3} className="album_serach">
      {" "}
      {searchData.searchDataAlbum.map((i, index) => (
        <Grid key={i.Id} item xs={4} md={2} className="album_grid">
          <Card className="viewMoreBox">
            <Link
              onClick={handleClose}

              to={`/album/` + i.Id + `/` + ToSeoUrl(i.Name)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={i.Name}
                  image={i.ThumbnailImageWeb}
                  title={i.Name}
                />
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {i.Name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const artistView = (
    <Grid container spacing={3} className="mobileSpace album_serach artist_v_search" >
      {" "}
      {searchData.searchDataArtist.map((i, index) => (
        <Grid key={i.Id} item xs={4} md={2} className="album_grid">
          <Card className="viewMoreBox">
            <Link
              onClick={handleClose}

              to={`/artist/` + i.Id + `/` + ToSeoUrl(i.Name)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={i.Name}
                  image={i.ThumbnailImageWeb}
                  title={i.Name}
                />
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {i.Name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const deactiveBtn = localStorage.getItem('msisdn') === null ? <></> : <Button color='red' onClick={deactiveUser}>Deactive</Button>




  return (
    <div className="searchMainBox">
      {/* <div className="SearchMaterialIcon header_icons">
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          <i className="material-icons">search</i>
        </Button>
      </div>
      <div className="SearchMaterialIcon header_icons">
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          <i className="material-icons">watch</i>
        </Button>
      </div> */}
      <div className="topHeadButton">
        <Button onClick={handleClickOpen} circular icon='search' color='pink' />
        <Button circular icon='user' color='pink' onClick={handleOpenActiveUser} />
        {/* {deactiveBtn} */}

      </div>


      <Dialog open={openDeleteUser} onClose={handleCloseActiveUser2} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className="cnfirmPoppTitle">Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmMessagesPopup">
            You are not Subscribed for Koyal.pk
          </DialogContentText>

        </DialogContent>
        <DialogActions className="cnfirmpopupFooter">
          <Button onClick={handleCloseActiveUser2} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openActiveUser} onClose={handleCloseActiveUser} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className="cnfirmPoppTitle">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmMessagesPopup">
            Are you sure you want to Deactivate Koyal Subscription.
            You will not be able to Download songs for FREE anymore
          </DialogContentText>

        </DialogContent>
        <DialogActions className="cnfirmpopupFooter">
          <Button onClick={handleCloseActiveUser} color="primary">
            Cancel
          </Button>
          <Button color='red' onClick={deactiveUser}>Deactive</Button>
        </DialogActions>
      </Dialog>



      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className="searchDialogueBody"
      >
        <AppBar className="searchAppBar">
          <Toolbar>
            <Input
              placeholder="Start Typing"
              className="searchField"
              onChange={handleInputChange}
              inputProps={{
                "aria-label": "Search"
              }}
            />
            {/* <Button color="secondary" onClick={handleClose}>
              <i className="material-icons">close</i>
            </Button> */}
            <Button onClick={handleClose} circular icon='close' color='black' />
          </Toolbar>
        </AppBar>

        <div className="searchResultContainer alignitems">
          <AppBar position="static" className="SearchUpperDiv">
            <Tabs value={value} onChange={handleChange}>
              <Tab value="two" label="Albums" />
              <Tab value="three" label="Artist" />
              <Tab value="one" label="Tracks" wrapped />
            </Tabs>
          </AppBar>

          <div className="checkClassMobile">
            {value === "one" && <TabContainer> {trackViewMobile} </TabContainer>}
          </div>
          <div className="ClassDesktopView1">
            {value === "one" && <TabContainer> {trackView3Desktop} </TabContainer>}
          </div>

          <div className="ClassDesktopView2">
            {value === "one" && <TabContainer> {trackView4Desktop} </TabContainer>}
          </div>

          {/* {value === "one" && <TabContainer> {trackView} </TabContainer>} */}
          {value === "two" && <TabContainer> {albumView} </TabContainer>}
          {value === "three" && <TabContainer>{artistView}</TabContainer>}
        </div>
      </Dialog>
    </div>
  );
}

export default SearchView;
