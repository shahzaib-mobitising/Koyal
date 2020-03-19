import React from "react";
import { Button, Modal, Image } from 'semantic-ui-react'
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
import ReactGA from 'react-ga';



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

  const [userModal, setUserModal] = React.useState(false);
  const [userHeading, setUserHeading] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [userBtn, setUserBtn] = React.useState();


  const [searchData, setSearchDataupdate] = React.useState({
    searchDataTrack: searchDummyJson.Response.SearchResult.Tracks,
    searchDataAlbum: searchDummyJson.Response.SearchResult.Albums,
    searchDataArtist: searchDummyJson.Response.SearchResult.Artists
  });

  function redirectURL() {

    window.location.assign("http://localhost/koyal-download/subscribe.php?pageURL=http://localhost:3000/");

  }


  function userModalClose() {
    setUserModal(false)
  }

  function handleOpenActiveUser() {

    let localStorageNum = localStorage.getItem('msisdn')

    let testtt = {
      msisdn: localStorageNum
    }

    if (localStorageNum != null) {

      axios.post(`https://api.koyal.pk/musicapp/checksubscriber.php`, testtt)
        .then(response => {
          let RespApi = response.data.Response.response;

          if (RespApi === false || RespApi === 'false') {

            setUserModal(true)
            setUserHeading("Sorry !!!")
            setUserInfo("You are not Subscribed Koyal.pk")
            setUserBtn('active')

          } else {

            setUserModal(true)
            setUserHeading("Confirmation !!!")
            setUserInfo("Do you want to Deactivate Koyal Subscription?")
            setUserBtn('deactive')
          }

        })
        .catch(error => {
          console.log(error)
        })
    } else {
      setUserModal(true)
      userHeading("Sorry !!!")
      userInfo("You are not Subscribed Koyal.pk")
      setUserBtn('active')
    }

  }


  function handleClickOpen() {

    setOpen(true);

    ReactGA.event({
      category: 'Search',
      action: 'Search Click',
      transport: 'beacon',
      label: 'Search Click'
    });

  }

  function activeSubsCheck() {

    let sendData = {
      UserId: 0,
      AlbumId: 77777,
      TrackId: 77777,
      Action: 'download',
      Msisdn: localStorage.getItem('msisdn')
    }

    axios.post(`https://api.koyal.pk/musicapp/charge-download-web.php`, sendData)
      .then(response => {

        let checkResp = response.data.Response.response

        if (checkResp === 'numbererror') {

          setUserModal(true)
          setUserHeading("Ooops!!")
          setUserInfo('Sorry !!! There is an Error in Number.')
          setUserBtn('active')

        } else {

          let checkResp2 = response.data.Response.response

          if (checkResp2 === 'notcharged') {

            setUserModal(true)
            setUserHeading("Ooops!!")
            setUserInfo('Sorry !!! you have insufficient balance.')
            setUserBtn('active')

            // setTimeout(() => { window.location.replace("http://localhost:3000/"); }, 2500)

          } else {

            setUserModal(true)
            setUserHeading('Congratulations !!!')
            setUserInfo('Your subscription to Koyal has been successful.')
            setUserBtn('active')

            setTimeout(() => { window.location.replace("http://localhost:3000/"); }, 3000)

          }
        }

      })
      .catch(error => {
        console.log(error)
      })

  }

  function deactiveUser() {

    let testtt = {
      Msisdn: localStorage.getItem('msisdn')
    }

    axios.post(`https://api.koyal.pk/musicapp/?request=delete-charged-download-react`, testtt)
      .then(response => {
        let ApiResp = response.data.Response.Success

        if (ApiResp === true) {

          setUserModal(true)
          setUserHeading("Thank you !!!")
          setUserInfo("Your Subscription for Koyal has now been Deactivated. Thank you for using www.koyal.pk")
          setUserBtn('active')
          localStorage.clear();

          setTimeout(() => { window.location.replace("http://localhost:3000/") }, 2500)
          

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


      // ReactGA.event({
      //   category: 'Search Values',
      //   action: 'Search Values',
      //   transport: 'beacon',
      //   label: event.target.value
      // });

      getInfo(event.target.value);
    }
  }

  function getInfo(param) {
    axios
      .get(
        `https://api.koyal.pk/musicapp/?request=search-react&keyword=${param}&limit=20`
      )
      .then(response => {
        // console.log(response);

        ReactGA.event({
          category: 'Search',
          action: 'Search Values',
          transport: 'beacon',
          label: param
        });

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


  return (
    <div className="searchMainBox">

      <div className="topHeadButton">

        <img src="/assets/header-search.png" alt="search" onClick={handleClickOpen} className="header-icons-custom serchIcon" />
        {
          localStorage.getItem('msisdn') !== null ? <img src="/assets/header-search.png" alt="search" onClick={handleOpenActiveUser} className="header-icons-custom userIcon" /> : <img src="/assets/header-search.png" alt="search" onClick={redirectURL} className="header-icons-custom userIcon" />
        }


      </div>


      {/* Activate Deactivate */}

      <Modal
        size={`mini`}
        open={userModal}
        onClose={userModalClose}
        dimmer={'blurring'}
        className='newPopupBox'
        centered={true}
        trigger={<Button className="dn">Show Modal</Button>} closeIcon
      >
        <Modal.Content>
          <Image
            src={`/assets/popupBg.png`}
            fluid
            centered
            className="bgPopup infoBgPopup"
            size='huge'
            alt={'Background'} />
        </Modal.Content>
        <Modal.Description>
          <p className="infoHeading">{userHeading}</p>
          <p className="infoText">{userInfo}</p>
          {userBtn === 'active' ?
            <Button color="blue" className="btnAction" onClick={activeSubsCheck}>Activate</Button>
            :
            <Button color="blue" className="btnAction" onClick={deactiveUser}>Deactivate </Button>
          }


        </Modal.Description>
      </Modal>

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
