import React from 'react';
import Header from './component/Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Urdu from './container/Urdu'
import { withGlobalState } from 'react-globally'
import Homepage from './container/Homepage'
import AlbumViewMore from './component/AlbumViewMore';
import AlphabetViewMore from './component/AlphabetViewMore';
import SingleArtist from './container/SingleArtist';
import TrackView from './container/TrackView'
import Player from './component/Player';
import Grid from '@material-ui/core/Grid';
import './Koyal.scss'
import Footer from './component/Footer';
import SingleTrackView from './container/SingleTrackView';
import Queue from './component/Queue';
import ScrollToTop from 'react-router-scroll-top'
import About from './container/About';
import Dmca from './container/Dmca';
import Terms from './container/Terms';
import Privacy from './container/Privacy';
//import HeaderNew from './component/HeaderNew';


function App(props) {

  return (
    <div className="App-Wrapper">
      <Router>
        <ScrollToTop>
          {/* <Container maxWidth="xl" className="main-container"> */}
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Queue
                TrackData={props.globalState.tracks}
                TrackImage={props.globalState.trackAlbumImage}
                TrackName={props.globalState.trackGlobalName}
                TrackAlbumsName={props.globalState.trackAlbumName}
                QueueData={props.globalState.queueState}
              />
            </Grid>
            <Grid item xs={8}>
              <div className="header-spacer"><Header /> <p>Hello</p></div>
              <div className="bodyWrapper">
                {/* <HeaderNew/> */}
                <Switch>
                  <Route exact path="/" component={Homepage} />
                  <Route path="/about-us" component={About} />
                  <Route path="/terms" component={Terms} />
                  <Route path="/privacy-policy" component={Privacy} />
                  <Route path="/dmca" component={Dmca} />
                  <Route path="/track/:trackId/:trackName" component={SingleTrackView} />
                  <Route path="/artist/:artistid/:artistName" component={SingleArtist} />
                  <Route path="/explore/sort/:languageName/:keyword" component={AlphabetViewMore} />
                  <Route path="/:type/:albumId/:albumName" component={TrackView} />
                  <Route path="/explore/:languageAlbums" component={AlbumViewMore} />
                  <Route path="/:language" component={Urdu} />
                </Switch>
                <Footer />
              </div>
            </Grid>
            <Grid item xs={3} className="ad-container">

              <div className="adsSide">
                <img src="/assets/ad1.jpg" className="adsLeft1" alt='ads'></img>
                <img src="/assets/ad2.jpg" className="adsLeft1" alt='ads'></img>
                <img src="/assets/ad3.jpg" className="adsLeft1" alt='ads'></img>
                {/* <img src="/assets/ad4.jpg" className="adsLeft1" alt='ads'></img> */}
                <img src="/assets/ad5.jpg" className="adsLeft1" alt='ads'></img>
                <img src="/assets/ad6.jpg" className="adsLeft1" alt='ads'></img>
                {/* <img src="/assets/ad8.jpg" className="adsLeft1" alt='ads'></img>
                <img src="/assets/ad9.jpg" className="adsLeft1" alt='ads'></img>
                <img src="/assets/ad10.jpg" className="adsLeft1" alt='ads'></img> */}
               
              </div>

            </Grid>
          </Grid>
          {/* </Container> */}
          <Player
            TrackData={props.globalState.tracks}
            TrackImage={props.globalState.trackAlbumImage}
            TrackName={props.globalState.trackGlobalName}
            TrackAlbumsName={props.globalState.trackAlbumName} />
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default withGlobalState(App)