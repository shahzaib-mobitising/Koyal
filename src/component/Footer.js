import React from 'react'
import Grid from '@material-ui/core/Grid';

function Footer() {
    return (
        <div className="footerMain">
            <Grid spacing={3} container>
                <Grid item xs={12} >
                 <h1>Hello Footer</h1>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
