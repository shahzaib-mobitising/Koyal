import React from 'react'
import PropTypes from 'prop-types';
//import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";



const languages = [
    {
        id: 1,
        langName: "Urdu",
        url: "/urdu-songs"
    },
    {
        id: 2,
        langName: "Punjabi",
        url: "/punjabi-songs"
    },
    {
        id: 3,
        langName: "Saraiki",
        url: "/saraiki-songs"
    },
    {
        id: 4,
        langName: "Sindhi",
        url: "/sindhi-songs"
    },
    {
        id: 5,
        langName: "Pashto",
        url: "/pashto-songs"
    },
    {
        id: 6,
        langName: "Balochi",
        url: "/balochi-songs"
    },
    {
        id: 7,
        langName: "Hindko",
        url: "/hindko-songs"
    }
]


const languagesHTML = languages.map(lang =>

    <Tab key={lang.id} label={lang.langName} component={Link} to={lang.url} />
)


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//         width: '100%',
//         backgroundColor: theme.palette.background.paper,
//         marginBottom:'50px', marginTop:'100px'
//     },
// }));

const LanguageBar2 = ({ match }) => {

    //const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
       
    }

    return (
        <div className="languageBar">

            <AppBar position="static" color="default" className="languageAppBar">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="on"
                >
                    {languagesHTML}
                </Tabs>

            </AppBar>

            {/* {value === 0 && <TabContainer>Item zer0</TabContainer>}
            {value === 1 && <TabContainer>Item Two</TabContainer>}
            {value === 2 && <TabContainer>Item Three</TabContainer>}
            {value === 3 && <TabContainer>Item Four</TabContainer>}
            {value === 4 && <TabContainer>Item Five</TabContainer>}
            {value === 5 && <TabContainer>Item Six</TabContainer>}
            {value === 6 && <TabContainer>Item Seven</TabContainer>} */}
        </div>
    );
}

export default LanguageBar2
