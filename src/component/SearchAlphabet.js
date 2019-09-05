import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
//import { Col } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";

const searchWords = [
    {
        id: 0,
        langName: "0-9",
        url: "/0-9"
    },
    {
        id: 1,
        langName: "A",
        url: "/a"
    },
    {
        id: 2,
        langName: "B",
        url: "/b"
    },
    {
        id: 3,
        langName: "C",
        url: "/c"
    },
    {
        id: 4,
        langName: "D",
        url: "/d"
    },
    {
        id: 5,
        langName: "E",
        url: "/e"
    },
    {
        id: 6,
        langName: "F",
        url: "/f"
    },
    {
        id: 7,
        langName: "G",
        url: "/g"
    },
    {
        id: 8,
        langName: "H",
        url: "/h"
    },
    {
        id: 9,
        langName: "I",
        url: "/i"
    },
    {
        id: 10,
        langName: "J",
        url: "/j"
    },
    {
        id: 11,
        langName: "K",
        url: "/k"
    },
    {
        id: 12,
        langName: "L",
        url: "/l"
    },
    {
        id: 13,
        langName: "M",
        url: "/m"
    },
    {
        id: 14,
        langName: "N",
        url: "/n"
    },
    {
        id: 15,
        langName: "O",
        url: "/o"
    },
    {
        id: 16,
        langName: "P",
        url: "/p"
    },
    {
        id: 17,
        langName: "Q",
        url: "/q"
    },
    {
        id: 18,
        langName: "R",
        url: "/r"
    },
    {
        id: 19,
        langName: "S",
        url: "/s"
    },
    {
        id: 20,
        langName: "T",
        url: "/t"
    },
    {
        id: 21,
        langName: "U",
        url: "/u"
    },
    {
        id: 22,
        langName: "V",
        url: "/v"
    },
    {
        id: 23,
        langName: "W",
        url: "/w"
    },
    {
        id: 24,
        langName: "X",
        url: "/x"
    },
    {
        id: 25,
        langName: "Y",
        url: "/y"
    },
    {
        id: 26,
        langName: "Z",
        url: "/z"
    }
]

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});


function SearchAlphabet(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className="alphabetBar">


            {/* <Col className="12"> */}
                <Paper className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >

                        {searchWords.map(data =>

                            <Tab key={data.id} 
                            className="alphabet-test" 
                            label={data.langName} 
                            component={Link} to={`/explore/sort/` + props.languageCurrent + data.url} />

                        )}

                    </Tabs>
                </Paper>
            {/* </Col> */}
        </div>
    );
}

export default SearchAlphabet
