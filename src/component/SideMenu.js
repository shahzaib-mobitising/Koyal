import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Button, Image } from 'semantic-ui-react'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";


const useStyles = makeStyles({
    list: {
        width: 180,
    }
});

export default function SideMenu() {

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

    const genral = [
        {
            'id': 1,
            'title': 'About Us',
            'url': '/about-us'
        },
        {
            'id': 2,
            'title': 'DMCA',
            'url': '/dmca'
        },
        // {
        //     'id': 3,
        //     'title': 'Contact Us',
        //     'url': '/contact'
        // },
        {
            'id': 4,
            'title': 'Terms',
            'url': '/terms'
        },
        {
            'id': 5,
            'title': 'Policy',
            'url': '/privacy-policy'
        }
    ]

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List className="SideMenuListOpen">
                <Link to={`/`}>
                    <Image className="logoImg" alt={`koyal-logo`} src='https://d3tzxv3uykrqm6.cloudfront.net/assets/koyal-logo.png' />
                </Link>
                <Divider />
                <ListItem>
                    <a target="_blank" href="https://rbt.koyal.pk/">Caller Tune
                </a>
                </ListItem>


                <Divider />
                {genral.map((data, i) => (
                    <div className="listItemMenuOpenSide" key={i}>

                        <Divider />
                        <ListItem button key={data.title}>
                            <Link to={data.url}>
                                <ListItemText primary={data.title} />
                            </Link>
                        </ListItem>

                        <Divider />
                    </div>

                ))}

            </List>


        </div>
    );

    return (

        <div className="sideMenuWrapper">

            {/* <Button circular icon='bars' onClick={toggleDrawer('right', true)} className="searchBtn" /> */}
            <img src="/assets/header-nav.png" alt="koyal-logo" onClick={toggleDrawer('right', true)} className="header-icons-custom" />

            {/* handleClickOpen */}

            <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
                {sideList('right')}
            </Drawer>

        </div>
    );
}