import React from 'react';
import HeaderV2 from './component/HeaderV2';
import { Router, Route, Switch } from "react-router-dom";
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
import ReactGA from 'react-ga';
import './KoyalPages.modules.css';
import { createBrowserHistory } from 'history';
import Mta from './container/Mta';
import TestComp from './container/TestComp'
import MTA2 from './container/MTA2';
import MTA3 from './container/MTA3';
import Mobi from './container/Mobi';
import ReactPixel from 'react-facebook-pixel';
import Notification from './container/Notification';


const advancedMatching = { em: 'taha.kaleem@mobitisinginc.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/pixel-with-ads/conversion-tracking#advanced_match
const options = {
  autoConfig: true, 	// set pixel's autoConfig
  debug: false, 		// enable logs
};

ReactPixel.init('1017259501982732', advancedMatching, options);

const trackingId = "UA-110852046-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
  ReactPixel.pageView(location.pathname);
});




function App(props) {

  return (
    <div className="App-Wrapper">
      <Router history={history}>
        <ScrollToTop>
          <Grid container spacing={1}>
            <Grid item xs={1} sm={1}>
              <Queue
                TrackData={props.globalState.tracks}
                TrackImage={props.globalState.trackAlbumImage}
                TrackName={props.globalState.trackGlobalName}
                TrackAlbumsName={props.globalState.trackAlbumName}
                QueueData={props.globalState.queueState}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <div className="header-spacer"><HeaderV2 /> </div>
              <div className="bodyWrapper">
                <Switch>
                  <Route exact path="/" component={Homepage} />
                  <Route path="/about-us" component={About} />
                  <Route path="/terms" component={Terms} />
                  <Route path="/notification" component={Notification} />
                  <Route path="/mta-dummy" component={Mta} />
                  <Route path="/MTA" component={MTA2} />
                  <Route path="/mta" component={MTA3} />
                  <Route path="/mobitising" component={Mobi} />
                  <Route path="/testroute" component={TestComp} />
                  <Route path="/privacy-policy" component={Privacy} />
                  <Route path="/dmca" component={Dmca} />
                  <Route path="/explore/sort/:types/:titles/:keywords" component={AlphabetViewMore} />
                  <Route path="/explore/:type/:title" component={AlbumViewMore} />
                  <Route path="/track/:trackId/:trackName" component={SingleTrackView} />
                  <Route path="/artist/:artistid/:artistName" component={SingleArtist} />
                  <Route path="/:type/:albumId/:albumName" component={TrackView} />
                  <Route path="/:language" component={Urdu} />
                </Switch>
                <Footer />
              </div>
            </Grid>
            <Grid item xs={3} sm={3} className="ad-container">
              <div className="adsSide">
                <a href="#"> <img src="/assets/telenor.jpg" className="adsLeft1" alt='ads'></img></a>
                <a href="/album/15038/sohna-maashok"> <img src="/assets/ad1.jpg" className="adsLeft1" alt='ads'></img></a>
                <a href="/album/16937/Mahi"> <img src="/assets/ad2.jpg" className="adsLeft1" alt='ads'></img></a>
                {/* <a href="/album/20655/dil-sada-dukhaya"> <img src="/assets/ad3.jpg" className="adsLeft1" alt='ads'></img></a> */}
                <a href="/album/14898/rul-te-gaey-aan-per-chus-bari-ai-ay"> <img src="/assets/ad4.jpg" className="adsLeft1" alt='ads'></img></a>
              </div>
            </Grid>
          </Grid>
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