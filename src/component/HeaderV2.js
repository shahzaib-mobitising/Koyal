import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { List } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import SearchView from './SearchView';
import Typography from '@material-ui/core/Typography';
import SideMenu from './SideMenu';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    }
}));

export default function HeaderV2() {
    const classes = useStyles();


    let history = useHistory();

    function handleClick() {
        // console.log(history)
        history.goBack();
    }

    return (

        <div className="webHeader">


            {isMobile ? <div className="mobileHeader">
                <div className={classes.grow}>
                    <AppBar position="fixed" color='default'>
                        <Toolbar>
                            <img src="/assets/header-back.png" alt="koyal-logo" onClick={handleClick} className="header-icons-custom backbtn" />
                            {/* <Button circular icon='arrow left' onClick={handleClick} className="searchBtn" size='md' /> */}
                            <div className="logoBox">
                                <Link to='/'> <img src="/assets/koyal-mobile.png" alt="koyal-logo" className="logo" /></Link>
                            </div>
                            <div className={classes.grow} />
                            <div className="menuRightSide">
                                <List horizontal className="menuList">
                                    <List.Item>
                                        <SearchView />
                                    </List.Item>
                                    <List.Item>
                                        <Link to='/notification'>
                                            <img src="/assets/bell.png" alt="koyal-logo" className="header-icons-custom" />
                                        </Link>
                                    </List.Item>
                                    <List.Item>
                                        <SideMenu />
                                    </List.Item>
                                </List>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>

                : <div className="desktopHeader">
                    <div className={classes.grow}>
                        <AppBar position="fixed" color='default'>
                            <Toolbar>
                                {/* {isMobile ? <Button circular icon='arrow left' onClick={''} className="searchBtn" size='md' /> : <></>} */}
                                <Typography className={classes.title} variant="h6" noWrap>
                                    <Link to='/'><img src="https://d3tzxv3uykrqm6.cloudfront.net/assets/koyal-logo.png" alt="koyal-logo" className="logo" /></Link>
                                </Typography>
                                <div className='desktopMenu'>
                                    <List horizontal className="menuList">
                                        <List.Item>
                                            <Link to={`/`}>
                                                <p>Home</p>
                                            </Link>

                                        </List.Item>
                                        <List.Item>
                                            <Link to={`/about-us`}>
                                                <p>About Us</p>
                                            </Link>
                                        </List.Item>

                                        <List.Item>
                                            <Link to="/privacy-policy">
                                                <p>Policy</p>
                                            </Link>
                                        </List.Item>

                                        <List.Item>
                                            <Link to="/terms">
                                                <p>Terms</p>
                                            </Link>
                                        </List.Item>
                                        <List.Item>
                                            <a target="_blank" href="https://rbt.koyal.pk/"><p>Caller Tune</p></a>
                                        </List.Item>
                                        <List.Item>
                                            <Link to={`/dmca`}>
                                                <p>DMCA</p>
                                            </Link>
                                        </List.Item>
                                    </List>
                                </div>
                                <div className={classes.grow} />
                                <div className="menuRightSide">
                                    <List horizontal className="menuList">
                                        <List.Item>
                                            <SearchView />
                                        </List.Item>
                                        {/* <List.Item>
                                            <NotificationHeader />
                                        </List.Item> */}
                                    </List>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </div>
                </div>
            }
        </div>
    );
}