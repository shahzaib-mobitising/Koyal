import React from 'react'
import ContentLoader from "react-content-loader"

function SliderLoader() {
    return (
        <div>
            <ContentLoader
                height={360}
                width={580}
                speed={2}
                primaryColor="#c2c2c7"
                secondaryColor="#e0e0e2"
            >

                <rect x="15" y="4" rx="5" ry="5" width="580" height="360" />

            </ContentLoader>
        </div>
    )
}


export default SliderLoader
