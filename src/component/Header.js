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
        <Grid item xs={6}>
          <List>
            <ListItem button component={Link} to="/"><ListItemText>Home</ListItemText></ListItem>
            <ListItem button component={Link} to="/"><ListItemText>About Us</ListItemText></ListItem>
            <ListItem button component={Link} to="/"><ListItemText>Contact US</ListItemText></ListItem>
            <ListItem button component={Link} to="/"><ListItemText>DMCA</ListItemText></ListItem>
          </List>
        </Grid>
        <Grid item xs={6} className={classes.alignRight}>
          <Button className={classes.menuIcon} onClick={toggleDrawer('left', true)} ><i className="material-icons md-24">close</i></Button>
        </Grid>
      </Grid>

    </div>
  );


  return (
    <div className="header-parent">
      <AppBar position="fixed" color="inherit">
        <Container maxWidth="xl" className="main-container">
          <Box display={{ xs: 'block', md: 'none' }} >
            <Grid container spacing={0}>
              <Grid item xs={1}>
                <Button className={classes.menuIcon} onClick={toggleDrawer('left', true)} ><i className="material-icons md-36">menu</i></Button>
                <Drawer classes={{ paper: classes.drawerPaper, }} open={state.left} onClose={toggleDrawer('left', false)}>
                  {sideList('left')}
                </Drawer>
              </Grid>
              <Grid item xs={6}>

                <Link to="/"><img src="assets/koyal-logo.png" alt="koyal-logo" className="logo" /></Link>
              </Grid>
            </Grid>
          </Box>

          <Box display={{ xs: 'none', md: 'block' }} >
            <Grid container spacing={0}>
              <Grid item md={1} className="logoContainer">
                <Link to="/"><img src="assets/koyal-logo.png" alt="koyal-logo" className="logo" /></Link>
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
                  <div className="desktop-menu-item"> <Link to="/dmca">DMCA</Link></div>
                </div>
              </Grid>
              <Grid item md={5}>
                <div className="searchBox">
                  <h5>App Download <i className="material-icons android_icon">android</i></h5>

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