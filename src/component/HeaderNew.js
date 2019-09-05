import React from 'react'
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import { Link } from "react-router-dom";

const HeaderNew = () => {
    return (
        <>
            <AppBar position="fixed" color="inherit"> <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Link to="/"><img src="/assets/koyal-logo.png" alt="koyal-logo" className="logo" /></Link>
                </Grid>
            </Grid>
            </AppBar>

        </>
    )
}

export default HeaderNew
