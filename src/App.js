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
import Container from '@material-ui/core/Container';
import './Koyal.scss'
import Footer from './component/Footer';
import SingleTrackView from './container/SingleTrackView';



function App(props) {

  return (
    <div className="App-Wrapper">
      <Router>
        <Container className="main-container">
          <div className="header-spacer"><Header /> <p>Hello</p></div>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/track/:trackId/:trackName" component={SingleTrackView} />
            <Route path="/artist/:artistid/:artistName" component={SingleArtist} />
            <Route path="/explore/sort/:languageName/:keyword" component={AlphabetViewMore} />
            <Route path="/:type/:albumId/:albumName" component={TrackView} />
            <Route path="/explore/:languageAlbums" component={AlbumViewMore} />
            <Route path="/:language" component={Urdu} />
          </Switch>
          <Footer />
        </Container>
        <Player
          TrackData={props.globalState.tracks}
          TrackImage={props.globalState.trackAlbumImage}
          TrackName={props.globalState.trackGlobalName}
          TrackAlbumsName={props.globalState.trackAlbumName} />
      </Router>
    </div>
  );
}

export default withGlobalState(App)