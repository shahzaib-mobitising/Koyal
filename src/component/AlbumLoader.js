import React from 'react'
// import Grid from '@material-ui/core/Grid';
// import { LazyImage } from "react-lazy-images";
import { Card, Placeholder } from 'semantic-ui-react'
import { isMobile } from 'react-device-detect';

function AlbumLoader() {

    const loaderMobile2 = isMobile ?
        <Card.Group className="dummyAlbumViewMore mobileAlbumViewMore" itemsPerRow={3}>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((data, index) =>
                    <Card>
                        <Placeholder key={index}>
                            <Placeholder.Image square />
                            <Placeholder.Line />
                        </Placeholder>
                    </Card>
                )
            }
        </Card.Group>
        : <Card.Group className="dummyAlbumViewMore" itemsPerRow={6}>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((data, index) =>
                    <Card>
                        <Placeholder key={index}>
                            <Placeholder.Image square />
                            <Placeholder.Line />
                        </Placeholder>
                    </Card>
                )
            }
        </Card.Group>


    return (
        <>

            {loaderMobile2}

        </>
    )
}

export default AlbumLoader
