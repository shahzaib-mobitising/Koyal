import React from 'react'
import ContentLoader from "react-content-loader"

function SliderTest() {
    return (
        <div>
            <ContentLoader
                height={475}
                width={800}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
            >
                <rect x="10" y="5" rx="5" ry="5" width="206" height="206" />
                <rect x="249" y="4" rx="5" ry="5" width="206" height="206" />
                <rect x="487" y="1" rx="5" ry="5" width="206" height="206" />
            </ContentLoader>
        </div>
    )
}

export default SliderTest
