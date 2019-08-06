import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Facebook, Twitter, Email } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));





export default function TrackShareOptions(props) {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const classes = useStyles();

    // const [copyLink, copyChange] = React.useState({
    //     value: '',
    //     copied: false
    // });

    // function valueChange(event) {
    //     console.log(event.target.value)

    //     copyChange(value => ({
    //         ...value,
    //         copied: false,
    //     }));
    // }

    // function onCopyfunc() {

      
    // }

    //() => this.setState({ copied: true })


    return (
        <>

            <img src='/assets/share_black.png' alt="share" onClick={handleClickOpen} />

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >

               

                <DialogTitle id="alert-dialog-slide-title">{"Share"}</DialogTitle>
                <Divider variant="inset" component="li" />
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <List className={classes.root}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={props.albumName} src={props.albumImage} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={props.trackName}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {props.albumName}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                            <Divider variant="inset" component="li" />
                            <Facebook url={props.pageURL} />
                            <Twitter url={props.pageURL} shareText={props.trackName} />
                            <Email url={props.pageURL} subject={props.trackName} text='EMAIL' />
                            <CopyToClipboard text={props.pageURL}>
                    <span>Copy to clipboard with</span>
                </CopyToClipboard>
                        </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}