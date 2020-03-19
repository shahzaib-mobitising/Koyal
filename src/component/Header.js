import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import SearchView from './SearchView';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import Queue from './Queue';

const useStyles = makeStyles({
  list: {
    width: '100%',
  },
  fullList: {
    width: 'auto',
  },

  menuIcon: {
    padding: '8px 0px',
  },

  alignRight: {
    textAlign: 'right',
  },

  drawerPaper: {
    width: '50%',
  },

});


function testAlert() {
  alert('123')
}

const Header = props => {

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >

      <Grid container spacing={0}>
        <Grid item xs={12} className="menu_custom_css">
          <List>
            <ListItem button to="/"><Link to="/"><img src="/assets/site-logo.png" alt="koyal-logo" className="logo" /></Link></ListItem>
            <ListItem button to="/"><ListItemText>My Account</ListItemText></ListItem>
            <ListItem button to="/"><ListItemText>Home</ListItemText></ListItem>
            <ListItem button to="/"><ListItemText>About Us</ListItemText></ListItem>
            <ListItem button to="/"><ListItemText>Contact Us</ListItemText></ListItem>
            <ListItem button to="/"><ListItemText>DMCA</ListItemText></ListItem>
            <ListItem button to="/"><a className="linkToCls" href="https://rbt.koyal.pk/">Caller Tune</a></ListItem>

          </List>
        </Grid>
        {/* <Grid item xs={12} className={classes.alignRight}>
          <Button className={classes.menuIcon} onClick={toggleDrawer('left', true)} ><i className="material-icons md-24">close</i></Button>
        </Grid> */}
      </Grid>

    </div>
  );


  return (
    <div className="header-parent">
      <AppBar position="fixed" color="inherit">
        <Container maxWidth="xl" className="main-container">
          <Box display={{ xs: 'block', md: 'none' }} >
            <Grid container spacing={0} className="align_item_center">
              <Grid item xs={4} sm={4}  >
                <Button className={classes.menuIcon} onClick={toggleDrawer('left', true)} ><i className="material-icons md-36">menu</i></Button>
                {/* <Button className={classes.menuIcon} href="/MTA"><i className="material-icons md-36">menu</i></Button> */}
                <Drawer classes={{ paper: classes.drawerPaper, }} open={state.left} onClose={toggleDrawer('left', false)}>
                  {sideList('left')}
                </Drawer>
              </Grid>
              <Grid item xs={4} sm={4} className="koyal_logo">

                <Link to="/"><img src="https://d3tzxv3uykrqm6.cloudfront.net/assets/koyal-logo.png" alt="koyal-logo" className="logo" /></Link>
              </Grid>
              <Grid item xs={4} sm={4}>
                <div className="searchBox searchBoxSpace">
                  {/* <h5>   App Download <i className="material-icons android_icon">android</i></h5> */}
                  <h5>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://play.google.com/store/apps/details?id=com.mobitising.koyeel"
                    >
                    </a>
                  </h5>

                  {/* https://play.google.com/store/apps/details?id=com.mobitising.koyeel */}

                  <SearchView />
                </div>
              </Grid>
            </Grid>
          </Box>

          <Box display={{ xs: 'none', md: 'block' }} >
            <Grid container spacing={0}>
              <Grid item md={1} className="logoContainer">
                <Link to="/"><img src="https://d3tzxv3uykrqm6.cloudfront.net/assets/koyal-logo.png" alt="koyal-logo" className="logo" /></Link>
              </Grid>
              <Grid item md={6}>
                <div className="desktop-nav">
                  <div className="desktop-menu-item first-item">
                    <Link to="/">Home</Link>
                  </div>
                  <div className="desktop-menu-item">
                    <Link to="/about-us">About Us</Link></div>
                  <div className="desktop-menu-item"> <Link to="/privacy-policy">Policy</Link></div>
                  <div className="desktop-menu-item"> <Link to="/terms">Terms</Link></div>
                  <div className="desktop-menu-item">  <a target="_blank" href="https://rbt.koyal.pk/">Caller Tune</a></div>
                  <div className="desktop-menu-item"> <Link to="/">DMCA</Link></div>
                </div>
              </Grid>
              <Grid item md={5}>
                <div className="searchBox">
                  {/* <h5>   App Download <i className="material-icons android_icon">android</i></h5> */}
                  <h5>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://play.google.com/store/apps/details?id=com.mobitising.koyeel"
                    >
                      App Download <i className="material-icons android_icon">android</i>
                    </a>
                  </h5>

                  {/* https://play.google.com/store/apps/details?id=com.mobitising.koyeel */}

                  <SearchView />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </AppBar>
    </div>
  )
}
export default Header